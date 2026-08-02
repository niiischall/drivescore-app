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
      className={`landing-sticky flex items-center gap-3 rounded-full py-2.5 pr-2.5 pl-3.5${
        visible ? " landing-sticky--visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <BrandMark size={32} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="landing-sticky__title text-[14.5px] font-bold">
          {content.title}
        </span>
        <span className="landing-sticky__subtitle text-[11.5px]">
          {content.subtitle}
        </span>
      </div>
      <button
        type="button"
        onClick={onJoinClick}
        tabIndex={visible ? 0 : -1}
        className="landing-sticky__btn h-11 flex-none cursor-pointer rounded-full border-none px-5 text-[14.5px] font-bold"
      >
        {content.buttonLabel}
      </button>
    </div>
  );
}
