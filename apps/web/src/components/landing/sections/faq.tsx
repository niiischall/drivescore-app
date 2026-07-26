"use client";

import { Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { FAQS } from "../data/content";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="landing-section landing-section--faq">
      <span className="landing-section__eyebrow">QUESTIONS, ANSWERED</span>
      <h2 className="landing-section__title">
        First time? <span className="text-[var(--landing-lilac)]">Read</span>{" "}
        these first.
      </h2>
      {FAQS.map((f, i) => {
        const open = openFaq === i;
        return (
          <div
            key={f.q}
            className="landing-faq__item border-b border-[var(--landing-hairline)]"
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => {
                const nextOpen = !open;
                setOpenFaq(nextOpen ? i : -1);
                track("landing_faq_toggled", {
                  question: f.q,
                  open: nextOpen,
                  index: i,
                });
              }}
              className="landing-faq__question flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent text-left text-text-primary"
            >
              <span className="landing-faq__question-text">{f.q}</span>
              <span
                className="landing-faq__toggle flex flex-none items-center justify-center rounded-full border font-bold"
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
                  <X weight="bold" size={18} />
                ) : (
                  <Plus weight="bold" size={18} />
                )}
              </span>
            </button>
            {open ? <p className="landing-faq__answer m-0">{f.a}</p> : null}
          </div>
        );
      })}
    </section>
  );
}
