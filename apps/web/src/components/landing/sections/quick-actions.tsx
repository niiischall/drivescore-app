import { GasPump, Gauge, ListChecks, Question } from "@phosphor-icons/react";
import { IconChip } from "../ui/brand";

const ACTIONS = [
  {
    href: "#how",
    icon: <ListChecks weight="fill" size={22} />,
    label: "How scoring works",
    delay: "",
  },
  {
    href: "#sample",
    icon: <Gauge weight="fill" size={22} />,
    label: "See a sample score",
    delay: "[transition-delay:80ms]",
  },
  {
    href: "#problem",
    icon: <GasPump weight="fill" size={22} />,
    label: "Why E20 matters",
    delay: "[transition-delay:160ms]",
  },
  {
    href: "#faq",
    icon: <Question weight="fill" size={22} />,
    label: "Questions, answered",
    delay: "[transition-delay:240ms]",
  },
] as const;

export function QuickActions() {
  return (
    <section className="grid grid-cols-2 gap-3 px-4 pb-10">
      {ACTIONS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`landing-reveal landing-card-hover flex flex-col gap-3.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] px-4 py-[18px] text-text-primary ${item.delay}`}
        >
          <IconChip>{item.icon}</IconChip>
          <span className="text-[15px] font-bold">{item.label}</span>
        </a>
      ))}
    </section>
  );
}
