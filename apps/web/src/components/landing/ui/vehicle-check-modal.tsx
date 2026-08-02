"use client";

import { X } from "@phosphor-icons/react";
import { useEffect, useId } from "react";
import { trackVehicleCheckModalOpened } from "@/lib/vehicle-check-analytics";
import { BrandWordmark } from "./brand";
import { VehicleCheckForm } from "./vehicle-check-form";

export type VehicleCheckSource = "hero" | "sticky" | "sample" | "header";

type VehicleCheckModalProps = {
  open: boolean;
  source: VehicleCheckSource;
  onClose: () => void;
};

export function VehicleCheckModal({
  open,
  source,
  onClose,
}: VehicleCheckModalProps) {
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;

    trackVehicleCheckModalOpened(source);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, source]);

  if (!open) return null;

  return (
    <div className="landing-modal" role="presentation">
      <button
        type="button"
        className="landing-modal__backdrop"
        aria-label="Close vehicle check dialog"
        onClick={onClose}
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
          onClick={onClose}
        >
          <X weight="bold" size={18} />
        </button>

        <p className="landing-modal__brand">
          <BrandWordmark />
        </p>
        <h2 id={titleId} className="landing-modal__title">
          Check your car
        </h2>
        <p id={descId} className="landing-modal__body">
          Select your make, model, and variant to see your E20 compatibility.
        </p>

        <VehicleCheckForm source={source} autoFocus />
      </div>
    </div>
  );
}
