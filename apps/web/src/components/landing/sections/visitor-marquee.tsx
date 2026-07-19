import { UsersThree } from "@phosphor-icons/react";

export function VisitorMarquee({ visitorCount }: { visitorCount: number }) {
  const visitorLabel = visitorCount.toLocaleString("en-IN");

  const item = (
    <span className="flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-surface-paper">
      <UsersThree weight="fill" size={15} />
      <b className="font-bold">{visitorLabel}</b> car owners have visited so far
    </span>
  );

  return (
    <div className="landing-marquee">
      <div className="landing-marquee__track">
        {[0, 1, 2, 3].map((copy) => (
          <span
            key={copy}
            className="flex flex-none items-center gap-10 pr-10"
            aria-hidden={copy > 0}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
