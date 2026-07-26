"use client";

import { GasPump, Gauge, ListChecks, Question } from "@phosphor-icons/react";
import { track } from "@/lib/analytics";
import { IconChip } from "../ui/brand";

const ACTIONS = [
  {
    href: "#how",
    icon: <ListChecks weight="fill" size={22} />,
    label: "How scoring works",
    target: "method",
  },
  {
    href: "#sample",
    icon: <Gauge weight="fill" size={22} />,
    label: "See a sample score",
    target: "sample",
  },
  {
    href: "#problem",
    icon: <GasPump weight="fill" size={22} />,
    label: "Why E20 matters",
    target: "problem",
  },
  {
    href: "#faq",
    icon: <Question weight="fill" size={22} />,
    label: "Questions, answered",
    target: "faq",
  },
] as const;

export function QuickActions() {
  return (
    <section className="landing-quick-actions">
      {ACTIONS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() =>
            track("landing_quick_action_clicked", {
              target: item.target,
              label: item.label,
            })
          }
          className="landing-card-hover flex flex-col gap-3.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] px-4 py-[18px] text-text-primary"
        >
          <IconChip>{item.icon}</IconChip>
          <span className="text-[15px] font-bold">{item.label}</span>
        </a>
      ))}
    </section>
  );
}
