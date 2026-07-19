import { NextResponse } from "next/server";
import {
  normalizeWaitlistEmail,
  sendWaitlistConfirmation,
  upsertWaitlistContact,
} from "@/lib/waitlist";

export const runtime = "nodejs";

type WaitlistBody = {
  email?: unknown;
};

export async function POST(request: Request) {
  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const email = normalizeWaitlistEmail(body.email);
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  try {
    await upsertWaitlistContact(email);
    await sendWaitlistConfirmation(email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not join waitlist";
    const misconfigured =
      message.includes("is not configured") ||
      message.includes("RESEND_");

    console.error("[waitlist]", message);

    return NextResponse.json(
      {
        ok: false,
        error: misconfigured
          ? "Waitlist is temporarily unavailable"
          : "Couldn't join — try again",
      },
      { status: misconfigured ? 503 : 500 },
    );
  }
}
