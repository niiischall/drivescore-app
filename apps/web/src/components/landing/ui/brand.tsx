import Image from "next/image";
import type { ReactNode } from "react";

export const toneColor = {
  compatible: "var(--color-score-compatible)",
  caution: "var(--color-score-caution)",
  risk: "var(--color-score-risk)",
} as const;

export function scrollToTop() {
  const el = document.scrollingElement || document.documentElement;
  el.scrollTo({ top: 0, behavior: "smooth" });
}

export function BrandMark({ size }: { size: number }) {
  return (
    <Image
      src="/icon.svg"
      alt="DriveScore"
      width={size}
      height={size}
      className="block rounded-[10px]"
      priority={size >= 36}
      unoptimized
    />
  );
}

export function BrandWordmark({ size = "md" }: { size?: "sm" | "md" }) {
  const text = size === "sm" ? "text-[17px]" : "text-[20px]";
  return (
    <span className={`tracking-tight ${text}`}>
      <span className="font-bold">Drive</span>
      <span className="font-normal">score</span>
    </span>
  );
}

export function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="landing-icon-chip flex size-11 flex-none items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--color-primary)_55%,transparent)] bg-primary">
      {children}
    </span>
  );
}
