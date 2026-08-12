import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(process.env.MAILJET_API_KEY || '', process.env.MAILJET_SECRET_KEY || '');

const RECIPIENT_EMAIL = 'hello@simaszurauskas.com';
const SENDER_EMAIL = 'hello@simaszurauskas.com'; // Must be verified in Mailjet
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';
const RECAPTCHA_SCORE_THRESHOLD = 0.5; // Adjust threshold as needed (0.0 - 1.0)
const RECAPTCHA_EXPECTED_ACTION = 'contact_form'; // Must match executeRecaptcha('contact_form') in ContactSection.tsx

// Defensive input caps — the UI does not enforce these.
const NAME_MAX_LENGTH = 200;
const EMAIL_MAX_LENGTH = 320; // RFC 3696 upper bound for an address
const MESSAGE_MAX_LENGTH = 5000;
const TOKEN_MAX_LENGTH = 10000; // reCAPTCHA v3 tokens are ~1-2 KB

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

/** Escape a string for safe interpolation into an HTML context. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data: RecaptchaResponse = await response.json();

    if (!data.success) {
      return { success: false, error: 'reCAPTCHA verification failed' };
    }

    // Fail closed: the token must have been minted for our action,
    // and a v3 score must be present and meet the threshold.
    if (data.action !== RECAPTCHA_EXPECTED_ACTION) {
      return { success: false, score: data.score, error: 'reCAPTCHA verification failed' };
    }

    if (data.score === undefined || data.score < RECAPTCHA_SCORE_THRESHOLD) {
      return { success: false, score: data.score, error: 'Suspicious activity detected' };
    }

    return { success: true, score: data.score };
  } catch {
    return { success: false, error: 'reCAPTCHA verification error' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { name, email, message, recaptchaToken } = body as Record<string, unknown>;

    // Validate shape and types FIRST — before spending a round-trip on siteverify.
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (typeof recaptchaToken !== 'string' || recaptchaToken.length === 0) {
      return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (
      trimmedName.length > NAME_MAX_LENGTH ||
      trimmedEmail.length > EMAIL_MAX_LENGTH ||
      trimmedMessage.length > MESSAGE_MAX_LENGTH ||
      recaptchaToken.length > TOKEN_MAX_LENGTH
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Verify reCAPTCHA token — only after the payload itself is valid.
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      console.log('reCAPTCHA failed:', recaptchaResult);
      return NextResponse.json({ error: recaptchaResult.error || 'Verification failed' }, { status: 400 });
    }

    // The name reaches the email Subject and the ReplyTo display name —
    // strip line breaks and tabs so it stays a single header-safe line.
    const safeName = trimmedName.replace(/[\r\n\t]+/g, ' ');

    // HTML-escape everything interpolated into HTMLPart.
    const htmlName = escapeHtml(safeName);
    const htmlEmail = escapeHtml(trimmedEmail);
    const htmlMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br>');

    // Send email via Mailjet
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: SENDER_EMAIL,
            Name: 'Portfolio Contact Form',
          },
          To: [
            {
              Email: RECIPIENT_EMAIL,
              Name: 'Simas Žurauskas',
            },
          ],
          ReplyTo: {
            Email: trimmedEmail,
            Name: safeName,
          },
          Subject: `Portfolio Contact: ${safeName}`,
          TextPart: `
Name: ${safeName}
Email: ${trimmedEmail}

Message:
${trimmedMessage}

---
Sent from portfolio contact form
          `.trim(),
          HTMLPart: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { border-bottom: 2px solid #ff6b35; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { margin: 0; color: #0f172a; font-size: 24px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { margin-top: 4px; }
    .message { background: #f8fafc; padding: 16px; border-radius: 4px; white-space: pre-wrap; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>

    <div class="field">
      <div class="label">Name</div>
      <div class="value">${htmlName}</div>
    </div>

    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${htmlEmail}">${htmlEmail}</a></div>
    </div>

    <div class="field">
      <div class="label">Message</div>
      <div class="message">${htmlMessage}</div>
    </div>

    <div class="footer">
      Sent from portfolio contact form at ${new Date().toISOString()}
    </div>
  </div>
</body>
</html>
          `.trim(),
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
