"use client";

import { Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { FAQS } from "../data/content";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="flex flex-col px-4 pb-11">
      <span className="mb-3.5 text-xs font-bold tracking-[0.12em] text-[var(--landing-lilac)]">
        QUESTIONS, ANSWERED
      </span>
      <h2 className="landing-reveal mb-2 text-[27px] leading-[1.2] font-bold tracking-tight text-balance">
        First time? <span className="text-[var(--landing-lilac)]">Read</span>{" "}
        these first.
      </h2>
      {FAQS.map((f, i) => {
        const open = openFaq === i;
        return (
          <div key={f.q} className="border-b border-[var(--landing-hairline)]">
            <button
              type="button"
              onClick={() => {
                const nextOpen = !open;
                setOpenFaq(nextOpen ? i : -1);
                track("landing_faq_toggled", {
                  question: f.q,
                  open: nextOpen,
                  index: i,
                });
              }}
              className="flex w-full cursor-pointer items-center justify-between gap-3.5 border-none bg-transparent py-[18px] text-left text-text-primary"
            >
              <span className="text-[15.5px] leading-snug font-bold">{f.q}</span>
              <span
                className="flex size-[38px] flex-none items-center justify-center rounded-full border text-base font-bold"
                style={{
                  borderColor: open
                    ? "var(--landing-lilac)"
                    : "color-mix(in srgb, var(--color-text-invert) 18%, transparent)",
                  background: open ? "var(--landing-lilac)" : "transparent",
                  color: open
                    ? "var(--color-text-on-paper)"
                    : "var(--color-text-secondary)",
                }}
              >
                {open ? (
                  <X weight="bold" size={16} />
                ) : (
                  <Plus weight="bold" size={16} />
                )}
              </span>
            </button>
            {open ? (
              <p className="landing-faq-answer m-0 pr-[46px] pb-[18px] text-[14.5px] leading-[1.6] text-[var(--landing-muted)]">
                {f.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
