"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
    { q: t("q7"), a: t("a7") },
    { q: t("q8"), a: t("a8") },
    { q: t("q9"), a: t("a9") },
    { q: t("q10"), a: t("a10") },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[var(--jm-bg-secondary)]" id="faq">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-space-mono)] text-sm text-jm-accent uppercase tracking-[0.15em] mb-4">{t("badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--jm-text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[var(--jm-card)] border border-[var(--jm-border-subtle)] rounded-2xl overflow-hidden transition-all hover:border-[var(--jm-border-accent)] jm-card-shadow">
              <div
                className="flex justify-between items-center px-6 py-5 cursor-pointer font-semibold"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span className="text-jm-accent text-2xl transition-transform" style={{ transform: openIndex === i ? "rotate(45deg)" : "none" }}>
                  +
                </span>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openIndex === i ? "500px" : "0px" }}
              >
                <p className="px-6 pb-5 text-[var(--jm-text-secondary)] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
