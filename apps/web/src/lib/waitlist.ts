import { Resend } from 'resend';

const EMAIL_RE =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export function normalizeWaitlistEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return null;
  return email;
}

function isAlreadyExistsError(message: string | undefined): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return (
    m.includes('already exists') ||
    m.includes('already been registered') ||
    m.includes('duplicate') ||
    m.includes('contact already')
  );
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

function requireEnv(name: 'RESEND_AUDIENCE_ID' | 'RESEND_FROM_EMAIL'): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export async function upsertWaitlistContact(email: string): Promise<void> {
  const resend = getResendClient();
  const segmentId = requireEnv('RESEND_AUDIENCE_ID');

  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });

  if (!error) return;

  if (isAlreadyExistsError(error.message)) {
    const { error: updateError } = await resend.contacts.update({
      email,
      unsubscribed: false,
    });
    if (updateError && !isAlreadyExistsError(updateError.message)) {
      throw new Error(updateError.message);
    }

    const { error: segmentError } = await resend.contacts.segments.add({
      email,
      segmentId,
    });
    if (segmentError && !isAlreadyExistsError(segmentError.message)) {
      const msg = segmentError.message?.toLowerCase() ?? '';
      if (
        msg.includes('already') ||
        msg.includes('exists') ||
        msg.includes('in the segment')
      ) {
        return;
      }
      throw new Error(segmentError.message);
    }
    return;
  }

  throw new Error(error.message);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export async function sendWaitlistConfirmation(email: string): Promise<void> {
  const resend = getResendClient();
  const from = requireEnv('RESEND_FROM_EMAIL');
  const safeEmail = escapeHtml(email);

  const subject = "You're on the DriveScore waitlist";
  const text = [
    "You're on the DriveScore waitlist.",
    '',
    `We'll email ${email} when DriveScore launches.`,
    'Your first E20 compatibility check stays free.',
    '',
    'No spam. Unsubscribe anytime.',
    '',
    '— DriveScore',
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#0c0a12;font-family:Helvetica,Arial,sans-serif;color:#f4f1fa;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0c0a12;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:480px;background:#16121f;border:1px solid #2a2438;border-radius:16px;padding:28px 24px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.04em;color:#b8a4e8;">
                  <strong style="color:#f4f1fa;">Drive</strong>score
                </p>
                <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;font-weight:700;color:#f4f1fa;">
                  You're on the waitlist
                </h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:#c9c2d6;">
                  We'll email <strong style="color:#f4f1fa;">${safeEmail}</strong> when DriveScore launches.
                  Your first E20 compatibility check stays free.
                </p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#8e869c;">
                  No spam · Unsubscribe anytime · Built for Indian cars
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
