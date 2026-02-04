"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { HeroWizard } from "./HeroWizard";

export function HeroSection() {
  const t = useTranslations("Hero");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const lines = [t("line1"), t("line2"), t("line3")];
    let lineIndex = 0;
    let charIndex = 0;
    let currentHTML = "";
    const el = titleRef.current;
    if (!el) return;

    function type() {
      if (lineIndex >= lines.length) {
        const cursor = el?.querySelector(".typing-cursor");
        if (cursor) cursor.remove();
        return;
      }
      const line = lines[lineIndex];
      if (charIndex === 0 && lineIndex > 0) currentHTML += "<br>";
      if (charIndex < line.length) {
        charIndex++;
        const partial = line.slice(0, charIndex);
        if (el) {
          if (lineIndex === 1) {
            el.innerHTML = currentHTML + `<span class="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">${partial}</span><span class="typing-cursor">&nbsp;</span>`;
          } else {
            el.innerHTML = currentHTML + partial + `<span class="typing-cursor">&nbsp;</span>`;
          }
        }
        setTimeout(type, 40);
      } else {
        if (lineIndex === 1) {
          currentHTML += `<span class="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">${line}</span>`;
        } else {
          currentHTML += line;
        }
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 200);
      }
    }

    const timer = setTimeout(type, 300);
    const cardTimer = setTimeout(() => setCardVisible(true), 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(cardTimer);
    };
  }, [t]);

  return (
    <section className="min-h-screen flex items-center pt-32 pb-16 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="animate-fade-in-up lg:text-left text-center">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight hero-typing"
          />
          <p className="text-lg text-[var(--jm-text-secondary)] mb-8 max-w-xl leading-relaxed lg:mx-0 mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex gap-4 mb-12 lg:justify-start justify-center flex-wrap">
            <a
              href="/accounts/signup/"
              className="px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.35)] transition-all inline-flex items-center gap-2"
            >
              {t("analyzeResume")}
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-2xl font-semibold text-lg bg-[var(--jm-card)] text-[var(--jm-text)] border border-[var(--jm-border-subtle)] hover:border-jm-accent hover:bg-purple-500/10 transition-all inline-flex items-center gap-2"
            >
              {t("seeHowItWorks")}
            </a>
          </div>
          <div className="flex gap-12 lg:justify-start justify-center flex-wrap">
            <div className="text-left">
              <div className="font-[family-name:var(--font-space-mono)] text-3xl font-bold text-jm-accent mb-1">94%</div>
              <div className="text-sm text-[var(--jm-text-secondary)]">{t("matchRate")}</div>
            </div>
            <div className="text-left">
              <div className="font-[family-name:var(--font-space-mono)] text-3xl font-bold text-jm-accent mb-1">+50K</div>
              <div className="text-sm text-[var(--jm-text-secondary)]">{t("optimizedResumes")}</div>
            </div>
            <div className="text-left">
              <div className="font-[family-name:var(--font-space-mono)] text-3xl font-bold text-jm-accent mb-1">3x</div>
              <div className="text-sm text-[var(--jm-text-secondary)]">{t("moreInterviews")}</div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div ref={cardRef} className={`relative max-w-2xl lg:max-w-none mx-auto ${cardVisible ? "hero-card-visible" : "hero-card-hidden"}`}>
          <HeroWizard />
        </div>
      </div>
    </section>
  );
}
