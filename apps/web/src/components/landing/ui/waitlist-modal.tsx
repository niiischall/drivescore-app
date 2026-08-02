"use client";

import { Check, X } from "@phosphor-icons/react";
import { useEffect, useId } from "react";
import { BrandWordmark } from "./brand";
import { WaitlistForm } from "./waitlist-form";

export type WaitlistSource = "hero" | "sticky" | "sample" | "header";

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

  const success = Boolean(joinedEmail);
  const displayEmail = joinedEmail ?? "";

  function handleClose() {
    onClose();
  }

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
              Check your car
            </h2>
            <p id={descId} className="landing-modal__body">
              Be first to check your car&apos;s E20 report.
            </p>

            <WaitlistForm
              source={source}
              onJoined={onJoined}
              autoFocus
            />
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
