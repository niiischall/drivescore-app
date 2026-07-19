"use client";

import { ArrowRight, Check, X } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { useJoinWaitlist } from "@/hooks/use-join-waitlist";
import { BrandWordmark } from "./brand";

export type WaitlistSource = "hero" | "sticky" | "sample";

type WaitlistModalProps = {
  open: boolean;
  joinedEmail: string | null;
  source: WaitlistSource;
  onClose: () => void;
  onJoined: (email: string) => void;
};

export function WaitlistModal({
  open,
  joinedEmail,
  source,
  onClose,
  onJoined,
}: WaitlistModalProps) {
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const joinWaitlist = useJoinWaitlist();

  const loading = joinWaitlist.isPending;
  const success = Boolean(joinedEmail) || joinWaitlist.isSuccess;
  const displayEmail = joinedEmail ?? email;
  const errorMessage =
    joinWaitlist.error instanceof Error
      ? joinWaitlist.error.message
      : "Couldn't join — try again";

  function handleClose() {
    if (loading) return;
    if (!joinedEmail) {
      setEmail("");
      joinWaitlist.reset();
    }
    onClose();
  }

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let focusTimer = 0;
    if (!success) {
      focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
    // handleClose closes over latest loading/joinedEmail
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, loading, success, joinedEmail]);

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

  if (!open) return null;

  return (
    <div className="landing-modal" role="presentation">
      <button
        type="button"
        className="landing-modal__backdrop"
        aria-label="Close waitlist dialog"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="landing-modal__panel"
      >
        <button
          type="button"
          className="landing-modal__close"
          aria-label="Close"
          disabled={loading}
          onClick={handleClose}
        >
          <X weight="bold" size={18} />
        </button>

        {!success ? (
          <>
            <p className="landing-modal__brand">
              <BrandWordmark />
            </p>
            <h2 id={titleId} className="landing-modal__title">
              Join the waitlist
            </h2>
            <p id={descId} className="landing-modal__body">
              Be first to check your car&apos;s E20 score. Free first check —
              we&apos;ll email you at launch.
            </p>

            <form onSubmit={handleSubmit} className="landing-modal__form">
              <label className="landing-modal__label" htmlFor="waitlist-email">
                Email
              </label>
              <input
                ref={inputRef}
                id="waitlist-email"
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
            <p className="landing-modal__meta">
              No spam · Unsubscribe anytime · Built for Indian cars
            </p>
          </>
        ) : (
          <div
            className="landing-modal__success"
            role="status"
            aria-live="polite"
          >
            <span className="landing-joined__icon" aria-hidden>
              <Check weight="bold" size={22} />
            </span>
            <h2 id={titleId} className="landing-modal__title">
              You&apos;re on the list
            </h2>
            <p id={descId} className="landing-modal__body">
              We&apos;ll email{" "}
              <span className="font-semibold text-text-primary">
                {displayEmail}
              </span>{" "}
              when DriveScore launches. Your first check stays free.
            </p>
            <button
              type="button"
              className="landing-cta landing-modal__submit"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
