"use client";

import { Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { PortableBody } from "@/sanity/lib/portable-text";
import type { FaqItem, LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";

export function FaqSection({
  content,
  items,
}: {
  content: LandingPage["faq"];
  items: FaqItem[];
}) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="landing-section landing-section--faq">
      <div className="landing-faq__header">
        <span className="landing-section__eyebrow">{content.eyebrow}</span>
        <h2 className="landing-section__title">
          <AccentTitle
            before={content.titleBefore}
            accent={content.titleAccent}
            after={content.titleAfter}
          />
        </h2>
      </div>
      <div className="landing-faq__list">
        {items.map((f, i) => {
          const open = openFaq === i;
          return (
            <div
              key={f._id}
              className="landing-faq__item border-b border-[var(--landing-hairline)]"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => {
                  const nextOpen = !open;
                  setOpenFaq(nextOpen ? i : -1);
                  track("landing_faq_toggled", {
                    question: f.question,
                    open: nextOpen,
                    index: i,
                  });
                }}
                className="landing-faq__question flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent text-left text-text-primary"
              >
                <span className="landing-faq__question-text">{f.question}</span>
                <span
                  className="landing-faq__toggle flex flex-none items-center justify-center rounded-full border font-bold"
                  style={{
                    borderColor: open
                      ? "var(--landing-lilac)"
                      : "var(--landing-card-border)",
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
              {open ? (
                <div className="landing-faq__answer [&_p]:m-0">
                  <PortableBody value={f.answer} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
