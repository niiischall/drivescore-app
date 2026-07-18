import { BrandMark, scrollToTop } from "../ui/brand";

export function StickyCta() {
  return (
    <div className="landing-sticky flex items-center gap-3 rounded-full bg-surface-paper py-2.5 pr-2.5 pl-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.55)]">
      <BrandMark size={32} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[14.5px] font-bold text-text-on-paper">
          First check free
        </span>
        <span className="text-[11.5px] text-[color-mix(in_srgb,var(--color-text-on-paper)_45%,transparent)]">
          Early access · launching soon
        </span>
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        className="landing-cta-dark h-11 flex-none cursor-pointer rounded-full border-none bg-primary px-5 text-[14.5px] font-bold text-surface-paper"
      >
        Join
      </button>
    </div>
  );
}
