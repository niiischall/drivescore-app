"use client";

import type { RefObject } from "react";
import { useScrolledPast } from "../hooks/use-scrolled-past";
import { BrandMark, BrandWordmark } from "../ui/brand";

export function StickyHeader({
  heroRef,
  onCheckClick,
}: {
  heroRef: RefObject<HTMLElement | null>;
  onCheckClick: () => void;
}) {
  const visible = useScrolledPast(heroRef);

  return (
    <div
      className={`landing-sticky-header${
        visible ? " landing-sticky-header--visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <div className="landing-sticky-header__inner">
        <div className="landing-sticky-header__brand flex items-center gap-2">
          <BrandMark size={26} />
          <BrandWordmark size="sm" />
        </div>
        <button
          type="button"
          onClick={onCheckClick}
          tabIndex={visible ? 0 : -1}
          className="landing-sticky-header__btn h-10 flex-none cursor-pointer rounded-full border-none px-4 text-[13.5px] font-bold"
        >
          Check your car
        </button>
      </div>
    </div>
  );
}
