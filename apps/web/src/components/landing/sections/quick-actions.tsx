"use client";

import { GasPump, Gauge, ListChecks, Question } from "@phosphor-icons/react";
import { track } from "@/lib/analytics";
import type { LandingPage } from "@/sanity/types";
import { IconChip } from "../ui/brand";

const actionIcon = {
  listChecks: <ListChecks weight="fill" size={22} />,
  gauge: <Gauge weight="fill" size={22} />,
  gasPump: <GasPump weight="fill" size={22} />,
  question: <Question weight="fill" size={22} />,
};

export function QuickActions({
  actions,
}: {
  actions: LandingPage["quickActions"];
}) {
  return (
    <section className="landing-quick-actions">
      {actions.map((item) => (
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
          <IconChip>{actionIcon[item.icon]}</IconChip>
          <span className="text-[15px] font-bold">{item.label}</span>
        </a>
      ))}
    </section>
  );
}
