"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { useJoinWaitlist } from "@/hooks/use-join-waitlist";
import type { WaitlistSource } from "./waitlist-modal";

type WaitlistFormProps = {
  source: WaitlistSource;
  onJoined: (email: string) => void;
  variant?: "modal" | "hero";
  autoFocus?: boolean;
};

export function WaitlistForm({
  source,
  onJoined,
  variant = "modal",
  autoFocus = false,
}: WaitlistFormProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const joinWaitlist = useJoinWaitlist();

  const loading = joinWaitlist.isPending;
  const errorMessage =
    joinWaitlist.error instanceof Error
      ? joinWaitlist.error.message
      : "Couldn't join — try again";

  const formClass =
    variant === "hero" ? "landing-hero__form" : "landing-modal__form";
  const metaClass =
    variant === "hero" ? "landing-hero__form-meta" : "landing-modal__meta";

  useEffect(() => {
    if (!autoFocus) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [autoFocus]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const normalized = email.trim().toLowerCase();
    track("waitlist_submit_attempted", {
      source,
      email_domain: normalized.split("@")[1] ?? null,
    });
    joinWaitlist.mutate(normalized, {
      onSuccess: () => onJoined(normalized),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={formClass}>
        <label className="landing-modal__label" htmlFor={inputId}>
          Email
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="you@email.com"
          value={email}
          disabled={loading}
          onChange={(e) => {
            setEmail(e.target.value);
            if (joinWaitlist.isError) joinWaitlist.reset();
          }}
          className="landing-modal__input"
        />
        <button
          type="submit"
          disabled={loading}
          className="landing-cta landing-modal__submit"
        >
          {loading ? "Joining…" : "Get early access"}
          {!loading ? (
            <ArrowRight weight="bold" size={18} className="ml-1.5" />
          ) : null}
        </button>
        {joinWaitlist.isError ? (
          <p className="landing-modal__error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
      <p className={metaClass}>
        No spam · Unsubscribe anytime · Built for Indian cars
      </p>
    </>
  );
}
