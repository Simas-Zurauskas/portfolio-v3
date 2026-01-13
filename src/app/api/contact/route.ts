import { NextRequest, NextResponse } from 'next/server';
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(process.env.MAILJET_API_KEY || '', process.env.MAILJET_SECRET_KEY || '');

const RECIPIENT_EMAIL = 'hello@simaszurauskas.com';
const SENDER_EMAIL = 'hello@simaszurauskas.com'; // Must be verified in Mailjet
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';
const RECAPTCHA_SCORE_THRESHOLD = 0.5; // Adjust threshold as needed (0.0 - 1.0)

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
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

    if (data.score !== undefined && data.score < RECAPTCHA_SCORE_THRESHOLD) {
      return { success: false, score: data.score, error: 'Suspicious activity detected' };
    }

    return { success: true, score: data.score };
  } catch {
    return { success: false, error: 'reCAPTCHA verification error' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json({ error: 'reCAPTCHA token missing' }, { status: 400 });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      console.log('reCAPTCHA failed:', recaptchaResult);
      return NextResponse.json({ error: recaptchaResult.error || 'Verification failed' }, { status: 400 });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

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
            Email: email,
            Name: name,
          },
          Subject: `Portfolio Contact: ${name}`,
          TextPart: `
Name: ${name}
Email: ${email}

Message:
${message}

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
      <div class="value">${name}</div>
    </div>
    
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
    </div>
    
    <div class="field">
      <div class="label">Message</div>
      <div class="message">${message.replace(/\n/g, '<br>')}</div>
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
