import { NextResponse } from "next/server";
import { normalizeWaitlistEmail } from "@/lib/waitlist";

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

  console.log("[waitlist] join", email);
  return NextResponse.json({ ok: true });
}
