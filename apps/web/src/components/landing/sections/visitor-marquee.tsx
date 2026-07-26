import { UsersThree } from "@phosphor-icons/react";

export function VisitorMarquee({
  visitorCount,
  suffix,
}: {
  visitorCount: number;
  suffix: string;
}) {
  const visitorLabel = visitorCount.toLocaleString("en-IN");

  return (
    <div className="landing-marquee">
      <div className="landing-marquee__track">
        <span className="flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-surface-paper">
          <UsersThree weight="fill" size={15} />
          <b className="font-bold">{visitorLabel}</b> {suffix}
        </span>
      </div>
    </div>
  );
}
