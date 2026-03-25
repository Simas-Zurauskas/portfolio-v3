# Contact Form

The contact form lives in the `#contact` section of the home page. It collects a name, email, and message, verifies the submission with Google reCAPTCHA v3, and delivers the message via Mailjet.

**Related**: [Provider Hierarchy](../architecture/provider-hierarchy.md) | [Configuration](configuration.md)

---

## Client-Side Flow

**Component**: `src/screens/HomeScreen/sections/ContactSection/ContactSection.tsx`

### Form Fields

| Field     | Type       | Input     | Required |
| --------- | ---------- | --------- | -------- |
| `name`    | `text`     | `<Input>` | Yes      |
| `email`   | `email`    | `<Input>` | Yes      |
| `message` | (textarea) | `<TextArea>` | Yes   |

All fields are disabled while the form is in the `loading` state. Font size is set to `16px` to prevent iOS auto-zoom on focus.

### State Machine

```
idle --> loading --> success --> idle (5 s timeout)
                \-> error   --> idle (5 s timeout)
```

The `FormStatus` type is `'idle' | 'loading' | 'success' | 'error'`. After either `success` or `error`, a `setTimeout` resets the status back to `idle` after 5 seconds. The submit button icon and colour change to match the current state (green check for success, red alert for error).

### reCAPTCHA Token Acquisition

```tsx
const { executeRecaptcha } = useGoogleReCaptcha();

// Inside handleSubmit:
const recaptchaToken = await executeRecaptcha('contact_form');
```

If `executeRecaptcha` is not yet available (provider still loading), the form transitions to `error` with a "reCAPTCHA not ready" message.

### API Request

```tsx
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message, recaptchaToken }),
});
```

On success the form fields are cleared. On failure the error message from the API response (or a generic fallback) is displayed below the form.

### Email Copy Button

The email address is displayed as a `mailto:` link with an adjacent copy button. Clipboard logic uses the modern Clipboard API with a legacy fallback:

```tsx
try {
  await navigator.clipboard.writeText(EMAIL);
} catch {
  // Fallback: hidden textarea + document.execCommand('copy')
}
```

After copying, a "Copied!" confirmation shows for 2 seconds (the button icon swaps from `<Copy>` to `<Check>`).

---

## API Route Flow

**File**: `src/app/api/contact/route.ts`

The route exports a single `POST` handler. Processing happens in five sequential steps:

### Step 1 -- Extract reCAPTCHA Token

```ts
const { name, email, message, recaptchaToken } = body;
if (!recaptchaToken) {
  return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
}
```

### Step 2 -- Server-Side reCAPTCHA Verification

The `verifyRecaptcha` function POSTs the token to Google's endpoint:

```ts
const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  }),
});
```

### Step 3 -- Score Threshold Check

The threshold is `0.5` (configurable via `RECAPTCHA_SCORE_THRESHOLD`). Scores below this value are rejected with `"Suspicious activity detected"`.

```ts
if (data.score !== undefined && data.score < RECAPTCHA_SCORE_THRESHOLD) {
  return { success: false, score: data.score, error: 'Suspicious activity detected' };
}
```

### Step 4 -- Field Validation

- All three fields (`name`, `email`, `message`) must be non-empty.
- Email is validated against `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.

### Step 5 -- Send via Mailjet

```ts
await mailjet.post('send', { version: 'v3.1' }).request({
  Messages: [{
    From:    { Email: SENDER_EMAIL, Name: 'Portfolio Contact Form' },
    To:      [{ Email: RECIPIENT_EMAIL, Name: 'Simas Zurauskas' }],
    ReplyTo: { Email: email, Name: name },
    Subject: `Portfolio Contact: ${name}`,
    TextPart: '...',
    HTMLPart: '...',
  }],
});
```

Key details:
- **`ReplyTo`** is set to the submitter's email so "Reply" in the mail client goes directly to them.
- **HTML template** uses inline styles with an orange accent header (`border-bottom: 2px solid #ff6b35`), uppercase field labels, and a `white-space: pre-wrap` message block.
- **Text part** is included as a plain-text fallback.
- Timestamp is appended in the footer via `new Date().toISOString()`.

---

## Environment Variables

| Variable                          | Scope       | Purpose                              |
| --------------------------------- | ----------- | ------------------------------------ |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`  | Client      | reCAPTCHA v3 site key (public)       |
| `RECAPTCHA_SECRET_KEY`            | Server only | reCAPTCHA v3 secret key              |
| `MAILJET_API_KEY`                 | Server only | Mailjet API key                      |
| `MAILJET_SECRET_KEY`              | Server only | Mailjet API secret                   |

---

## Security

- **reCAPTCHA v3** runs invisibly. The badge is hidden via CSS (Google's Terms of Service require branding text instead -- rendered as the `RecaptchaNotice` component with links to Google's Privacy Policy and Terms of Service).
- The **secret key** is never exposed to the client. It is only referenced in the server-side route handler.
- The **score threshold** (0.5) filters automated/bot submissions while allowing legitimate users through. Scores range from 0.0 (likely bot) to 1.0 (likely human).
- Email format is validated server-side regardless of client-side `type="email"` enforcement.
