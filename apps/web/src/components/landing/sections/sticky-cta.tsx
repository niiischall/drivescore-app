import type { RefObject } from "react";
import type { LandingPage } from "@/sanity/types";
import { useScrolledPast } from "../hooks/use-scrolled-past";
import { BrandMark } from "../ui/brand";

export function StickyCta({
  content,
  heroRef,
  onJoinClick,
}: {
  content: LandingPage["stickyCta"];
  heroRef: RefObject<HTMLElement | null>;
  onJoinClick: () => void;
}) {
  const visible = useScrolledPast(heroRef);

  return (
    <div
      className={`landing-sticky flex items-center gap-3 rounded-full bg-surface-paper py-2.5 pr-2.5 pl-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.55)]${
        visible ? " landing-sticky--visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <BrandMark size={32} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[14.5px] font-bold text-text-on-paper">
          {content.title}
        </span>
        <span className="text-[11.5px] text-[color-mix(in_srgb,var(--color-text-on-paper)_45%,transparent)]">
          {content.subtitle}
        </span>
      </div>
      <button
        type="button"
        onClick={onJoinClick}
        tabIndex={visible ? 0 : -1}
        className="landing-cta-dark h-11 flex-none cursor-pointer rounded-full border-none bg-primary px-5 text-[14.5px] font-bold text-surface-paper"
      >
        {content.buttonLabel}
      </button>
    </div>
  );
}
