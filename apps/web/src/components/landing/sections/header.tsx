import { BrandMark, BrandWordmark } from "../ui/brand";
import { IndiaFlag } from "../ui/india-flag";

export function LandingHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-text-invert)_7%,transparent)] px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <BrandMark size={28} />
        <BrandWordmark />
      </div>
      <span className="flex items-center gap-1.5 rounded-full border border-[var(--landing-card-border)] bg-[var(--landing-card)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-text-secondary">
        <IndiaFlag size={16} />
        Made for India
      </span>
    </header>
  );
}
