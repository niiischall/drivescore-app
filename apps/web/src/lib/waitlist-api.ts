export type WaitlistResponse = {
  ok: boolean;
  error?: string;
};

export class WaitlistApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WaitlistApiError";
  }
}

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = (await res.json().catch(() => null)) as WaitlistResponse | null;

  if (!res.ok || !data?.ok) {
    throw new WaitlistApiError(data?.error ?? "Couldn't join — try again");
  }

  return data;
}
