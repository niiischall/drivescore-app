import { Resend } from 'resend';
import { buildWaitlistConfirmationEmail } from './waitlist-email';

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

export async function sendWaitlistConfirmation(email: string): Promise<void> {
  const resend = getResendClient();
  const from = requireEnv('RESEND_FROM_EMAIL');
  const { subject, text, html } = buildWaitlistConfirmationEmail(email);

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
