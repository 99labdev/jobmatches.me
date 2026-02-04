"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

export function HeroWizard() {
  const t = useTranslations("HeroWizard");

  const steps = useMemo(() => [
    {
      emoji: "\u{1F3AF}", label: t("step1Label"), title: t("step1Title"), subtitle: t("step1Subtitle"),
      type: "options",
      options: [
        { emoji: "\u{1F3C6}", text: t("step1Opt1") },
        { emoji: "\u{1F504}", text: t("step1Opt2") },
        { emoji: "\u{1F4B0}", text: t("step1Opt3") },
        { emoji: "\u{1F680}", text: t("step1Opt4") },
      ],
    },
    {
      emoji: "\u{1F4E8}", label: t("step2Label"), title: t("step2Title"), subtitle: t("step2Subtitle"),
      type: "grid",
      options: [
        { emoji: "\u{1F634}", text: t("step2Opt1") },
        { emoji: "\u{1F4E8}", text: t("step2Opt2") },
        { emoji: "\u{1F4EC}", text: t("step2Opt3") },
        { emoji: "\u{1F525}", text: t("step2Opt4") },
      ],
    },
    {
      emoji: "\u{1F464}", label: t("step3Label"), title: t("step3Title"), subtitle: t("step3Subtitle"),
      type: "form",
      fields: [
        { label: t("step3Field1"), value: "Ana Carolina Silva" },
        { label: t("step3Field2"), value: "ana.silva@email.com" },
        { label: t("step3Field3"), value: "+55 11 98765-4321" },
        { label: t("step3Field4"), value: "São Paulo, SP" },
      ],
    },
    {
      emoji: "\u{1F4BC}", label: t("step4Label"), title: t("step4Title"), subtitle: t("step4Subtitle"),
      type: "textarea",
      text: t("step4Text"),
    },
    {
      emoji: "\u{1F4CA}", label: t("step5Label"), title: t("step5Title"), subtitle: t("step5Subtitle"),
      type: "keywords",
    },
    {
      emoji: "\u{1F4C4}", label: t("step6Label"), title: t("step6Title"), subtitle: t("step6Subtitle"),
      type: "templates",
    },
    {
      emoji: "\u2728", label: t("step7Label"), title: t("step7Title"), subtitle: t("step7Subtitle"),
      type: "generating",
    },
  ], [t]);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [formTexts, setFormTexts] = useState<string[]>(["", "", "", ""]);
  const [textareaText, setTextareaText] = useState("");
  const [keywordsVisible, setKeywordsVisible] = useState<boolean[]>(new Array(8).fill(false));
  const [matchPercent, setMatchPercent] = useState(0);
  const [genSteps, setGenSteps] = useState<number[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimating = useRef(false);

  const advanceStep = useCallback(() => {
    if (currentStep < 6) {
      setCurrentStep((s) => s + 1);
      setSelectedOption(-1);
      setShowNext(false);
      isAnimating.current = false;
    } else {
      setTimeout(() => {
        setCurrentStep(0);
        setSelectedOption(-1);
        setShowNext(false);
        setFormTexts(["", "", "", ""]);
        setTextareaText("");
        setKeywordsVisible(new Array(8).fill(false));
        setMatchPercent(0);
        setGenSteps([]);
        setPreviewVisible(false);
        isAnimating.current = false;
      }, 3000);
    }
  }, [currentStep]);

  useEffect(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const step = steps[currentStep];

    if (step.type === "options" || step.type === "grid") {
      timerRef.current = setTimeout(() => {
        setSelectedOption(0);
        setTimeout(() => setShowNext(true), 300);
        setTimeout(() => advanceStep(), 1500);
      }, 800);
    } else if (step.type === "form") {
      const fields = step.fields!;
      let fieldIdx = 0;
      let charIdx = 0;

      function typeField() {
        if (fieldIdx >= fields.length) {
          setTimeout(() => setShowNext(true), 200);
          setTimeout(() => advanceStep(), 1200);
          return;
        }
        const value = fields[fieldIdx].value;
        if (charIdx < value.length) {
          charIdx++;
          setFormTexts((prev) => {
            const next = [...prev];
            next[fieldIdx] = value.slice(0, charIdx);
            return next;
          });
          timerRef.current = setTimeout(typeField, 30);
        } else {
          fieldIdx++;
          charIdx = 0;
          timerRef.current = setTimeout(typeField, 200);
        }
      }
      timerRef.current = setTimeout(typeField, 500);
    } else if (step.type === "textarea") {
      const text = step.text!;
      let charIdx = 0;

      function typeText() {
        if (charIdx < text.length) {
          charIdx++;
          setTextareaText(text.slice(0, charIdx));
          timerRef.current = setTimeout(typeText, 20);
        } else {
          setTimeout(() => setShowNext(true), 200);
          setTimeout(() => advanceStep(), 1200);
        }
      }
      timerRef.current = setTimeout(typeText, 500);
    } else if (step.type === "keywords") {
      const keywords = [0, 1, 2, 3, 4, 5, 6, 7];
      let idx = 0;
      let percent = 0;

      function showKeyword() {
        if (idx < keywords.length) {
          setKeywordsVisible((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          idx++;
          timerRef.current = setTimeout(showKeyword, 200);
        } else {
          animatePercent();
        }
      }

      function animatePercent() {
        if (percent < 84) {
          percent += 2;
          setMatchPercent(percent);
          timerRef.current = setTimeout(animatePercent, 20);
        } else {
          setMatchPercent(84);
          setTimeout(() => setShowNext(true), 300);
          setTimeout(() => advanceStep(), 1500);
        }
      }

      timerRef.current = setTimeout(showKeyword, 500);
    } else if (step.type === "templates") {
      timerRef.current = setTimeout(() => {
        setSelectedOption(0);
        setTimeout(() => setShowNext(true), 300);
        setTimeout(() => advanceStep(), 1500);
      }, 800);
    } else if (step.type === "generating") {
      const genOrder = [1, 2, 3, 4];
      let idx = 0;

      function showGen() {
        if (idx < genOrder.length) {
          setGenSteps((prev) => [...prev, genOrder[idx]]);
          idx++;
          timerRef.current = setTimeout(showGen, 800);
        } else {
          setTimeout(() => setPreviewVisible(true), 500);
          setTimeout(() => advanceStep(), 2000);
        }
      }
      timerRef.current = setTimeout(showGen, 600);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentStep, advanceStep, steps]);

  const keywordData = [
    { text: "Python", color: "purple" },
    { text: "Django", color: "purple" },
    { text: "React", color: "purple" },
    { text: "TypeScript", color: "purple" },
    { text: "AWS", color: "purple" },
    { text: "Docker", color: "purple" },
    { text: "Full Stack", color: "green" },
    { text: "Leadership", color: "green" },
  ];

  return (
    <div className="bg-[var(--jm-card)] border border-[var(--jm-border-subtle)] rounded-2xl backdrop-blur-xl relative overflow-hidden jm-card-shadow">
      {/* Mobile Browser Bar */}
      <div className="flex md:hidden flex-col border-b border-[var(--jm-border-subtle)] bg-[var(--jm-bg-secondary)]/50">
        <div className="flex items-center justify-between px-5 pt-2 pb-1">
          <span className="text-[10px] font-semibold text-[var(--jm-text-secondary)]">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[var(--jm-text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-3.5 h-3.5 text-[var(--jm-text-secondary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2">
          <svg className="w-4 h-4 text-[var(--jm-text-secondary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-1.5 bg-[var(--jm-bg)] rounded-full px-3 py-1 w-full border border-[var(--jm-border-subtle)]">
              <svg className="w-3 h-3 text-[var(--jm-text-secondary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[11px] text-[var(--jm-text-secondary)] truncate">jobmatches.me</span>
            </div>
          </div>
          <svg className="w-4 h-4 text-[var(--jm-text-secondary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </div>

      {/* Desktop Browser Bar */}
      <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-[var(--jm-border-subtle)] bg-[var(--jm-bg-secondary)]/50">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
          <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-[var(--jm-bg)] rounded-lg px-3 py-1.5 max-w-xs w-full border border-[var(--jm-border-subtle)]">
            <svg className="w-3.5 h-3.5 text-[var(--jm-text-secondary)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-[var(--jm-text-secondary)] truncate">jobmatches.me</span>
          </div>
        </div>
        <div className="w-[52px]"></div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 min-h-[420px] relative overflow-hidden">
        {/* Progress bar */}
        <div className="flex items-center gap-1 mb-5">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= currentStep + 1 ? "bg-gradient-to-r from-purple-500 to-purple-700" : "bg-[var(--jm-bg-secondary)]"}`}
            />
          ))}
        </div>

        {/* Steps */}
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`wizard-step absolute inset-0 p-5 md:p-6 pt-10 ${currentStep === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
          >
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{step.emoji}</span>
                <span className="text-xs font-semibold text-jm-accent uppercase tracking-wider">{step.label}</span>
              </div>
              <h3 className="text-base md:text-lg font-bold mb-1">{step.title}</h3>
              <p className="text-xs text-[var(--jm-text-secondary)] mb-4">{step.subtitle}</p>

              {/* Options */}
              {step.type === "options" && (
                <div className="flex flex-col gap-2">
                  {step.options!.map((opt, i) => (
                    <div
                      key={i}
                      className={`wizard-option flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[var(--jm-border-subtle)] bg-[var(--jm-bg-secondary)]/50 cursor-pointer text-sm ${selectedOption === i && currentStep === idx ? "wizard-option-selected" : ""}`}
                    >
                      <span className="text-base">{opt.emoji}</span>
                      <span className="flex-1 font-medium">{opt.text}</span>
                      <span className={`w-4 h-4 rounded-full border-2 transition-all wizard-radio ${selectedOption === i && currentStep === idx ? "border-purple-500 bg-purple-500" : "border-[var(--jm-border-subtle)]"}`}></span>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid */}
              {step.type === "grid" && (
                <div className="grid grid-cols-2 gap-2">
                  {step.options!.map((opt, i) => (
                    <div
                      key={i}
                      className={`wizard-option flex flex-col items-center gap-1 px-3 py-3 rounded-xl border border-[var(--jm-border-subtle)] bg-[var(--jm-bg-secondary)]/50 cursor-pointer text-center ${selectedOption === i && currentStep === idx ? "wizard-option-selected" : ""}`}
                    >
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="text-xs font-semibold">{opt.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Form */}
              {step.type === "form" && (
                <div className="flex flex-col gap-2.5">
                  {step.fields!.map((field, i) => (
                    <div key={i}>
                      <label className="text-[11px] text-[var(--jm-text-secondary)] font-medium mb-0.5 block">
                        {field.label}
                      </label>
                      <div className={`h-9 bg-[var(--jm-bg-secondary)]/80 border border-[var(--jm-border-subtle)] rounded-lg px-3 flex items-center text-sm ${formTexts[i] && formTexts[i].length < field.value.length ? "wizard-input-typing" : ""}`}>
                        {formTexts[i]}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Textarea */}
              {step.type === "textarea" && (
                <>
                  <div className="bg-[var(--jm-bg-secondary)]/80 border border-[var(--jm-border-subtle)] rounded-xl p-3 text-xs leading-relaxed min-h-[160px] text-[var(--jm-text)] whitespace-pre-wrap">
                    {textareaText}
                  </div>
                  <div className="flex items-center gap-2 mt-2 px-2">
                    <span className="text-xs text-jm-accent">💡</span>
                    <span className="text-[10px] text-[var(--jm-text-secondary)]">{t("step4Tip")}</span>
                  </div>
                </>
              )}

              {/* Keywords */}
              {step.type === "keywords" && (
                <>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {keywordData.map((kw, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${kw.color === "purple" ? "bg-purple-500/15 text-jm-accent border-purple-500/20" : "bg-green-500/15 text-green-400 border-green-500/20"} ${keywordsVisible[i] ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                      >
                        {kw.text}
                      </span>
                    ))}
                  </div>
                  <div className="bg-[var(--jm-bg-secondary)]/80 rounded-xl p-3 flex items-center gap-3">
                    <div className="relative w-12 h-12 shrink-0">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{
                          background: `conic-gradient(#a855f7 0deg ${matchPercent * 3.6}deg, var(--jm-conic-empty) ${matchPercent * 3.6}deg 360deg)`,
                        }}
                      >
                        <div className="absolute w-8 h-8 bg-[var(--jm-bg-secondary)]/80 rounded-full"></div>
                        <span className="relative z-10 font-[family-name:var(--font-space-mono)] text-xs font-bold text-jm-accent">
                          {matchPercent}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{t("compatibilityScore")}</div>
                      <div className="text-[10px] text-[var(--jm-text-secondary)]">{t("matchWithPosition")}</div>
                    </div>
                  </div>
                </>
              )}

              {/* Templates */}
              {step.type === "templates" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className={`wizard-option rounded-xl border-2 border-[var(--jm-border-subtle)] p-2 cursor-pointer transition-all ${selectedOption === 0 && currentStep === idx ? "wizard-option-selected" : ""}`}>
                    <div className="bg-[var(--jm-bg-secondary)] rounded-lg p-2 mb-2 aspect-[3/4] flex">
                      <div className="w-1/3 bg-purple-500/20 rounded-l-md"></div>
                      <div className="w-2/3 p-1.5 flex flex-col gap-1">
                        <div className="h-1.5 w-3/4 bg-[var(--jm-border-subtle)] rounded-full"></div>
                        <div className="h-1 w-1/2 bg-[var(--jm-border-subtle)] rounded-full"></div>
                        <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full mt-1"></div>
                        <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full"></div>
                        <div className="h-1 w-2/3 bg-[var(--jm-border-subtle)] rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-center">{t("templateModern")}</p>
                  </div>
                  <div className={`wizard-option rounded-xl border-2 border-[var(--jm-border-subtle)] p-2 cursor-pointer transition-all ${selectedOption === 1 && currentStep === idx ? "wizard-option-selected" : ""}`}>
                    <div className="bg-[var(--jm-bg-secondary)] rounded-lg p-2 mb-2 aspect-[3/4] flex flex-col items-center gap-1">
                      <div className="h-1.5 w-1/2 bg-[var(--jm-border-subtle)] rounded-full mt-1"></div>
                      <div className="h-1 w-1/3 bg-[var(--jm-border-subtle)] rounded-full"></div>
                      <div className="h-px w-full bg-[var(--jm-border-subtle)] mt-1"></div>
                      <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full mt-0.5"></div>
                      <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full"></div>
                      <div className="h-1 w-3/4 bg-[var(--jm-border-subtle)] rounded-full"></div>
                      <div className="h-px w-full bg-[var(--jm-border-subtle)] mt-0.5"></div>
                      <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full mt-0.5"></div>
                      <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full"></div>
                    </div>
                    <p className="text-[11px] font-semibold text-center">{t("templateClassic")}</p>
                  </div>
                </div>
              )}

              {/* Generating */}
              {step.type === "generating" && (
                <>
                  <div className="flex flex-col gap-3">
                    {[t("gen1"), t("gen2"), t("gen3"), t("gen4")].map((text, i) => (
                      <div key={i} className={`gen-step flex items-center gap-3 text-xs ${genSteps.includes(i + 1) ? "opacity-100" : "opacity-40"}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${genSteps.includes(i + 1) ? "border-green-500 bg-green-500" : "border-[var(--jm-border-subtle)]"}`}>
                          {genSteps.includes(i + 1) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-4 transition-opacity duration-500 ${previewVisible ? "opacity-100" : "opacity-0"}`}>
                    <div className="bg-[var(--jm-bg-secondary)]/80 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-lg">✅</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-green-400">{t("resumeReady")}</div>
                        <div className="text-[10px] text-[var(--jm-text-secondary)]">{t("resumeReadyDesc")}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Next button */}
        <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 z-10">
          <div className={`px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_15px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center gap-1.5 ${showNext ? "opacity-100" : "opacity-0"}`}>
            {t("next")}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
