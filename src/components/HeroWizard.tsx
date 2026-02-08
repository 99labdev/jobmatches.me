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
    <div className="iphone-mockup">
      <div className="iphone-frame">
        <div className="iphone-screen">
          {/* Dynamic Island */}
          <div className="iphone-dynamic-island" />

          {/* Status Bar */}
          <div className="flex justify-between items-center px-5 pt-2.5 pb-2 text-sm font-semibold text-[var(--jm-text)] relative z-20">
            <span className="text-[15px] font-semibold">9:41</span>
            <div className="flex items-center gap-1 text-[var(--jm-text)]">
              <svg width="9" height="8" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.5" />
                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
                <rect x="9" y="3" width="3" height="9" rx="0.5" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
              </svg>
              <svg width="12" height="9" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 2.4c2.5 0 4.8 1 6.5 2.6.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0C12 4.8 10.1 4 8 4S4 4.8 2.6 6.1c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1C3.2 3.4 5.5 2.4 8 2.4zm0 3c1.6 0 3.1.6 4.2 1.7.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0-.8-.8-1.9-1.2-3.1-1.2s-2.3.4-3.1 1.2c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1C4.9 6 6.4 5.4 8 5.4zm0 3c.8 0 1.5.3 2 .9.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0-.2-.2-.5-.4-.9-.4s-.7.2-.9.4c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1.5-.6 1.2-.9 2-.9z" />
              </svg>
              <div className="iphone-battery-icon-sm">
                <div className="iphone-battery-level" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 relative overflow-hidden">
            {/* Progress bar */}
            <div className="flex items-center gap-1 mx-4 mt-1 mb-0">
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
                className={`wizard-step absolute inset-0 px-4 pt-7 pb-3 ${currentStep === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
              >
                <div className="mt-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base">{step.emoji}</span>
                    <span className="text-[10px] font-semibold text-jm-accent uppercase tracking-wider">{step.label}</span>
                  </div>
                  <h3 className="text-sm font-bold mb-0.5">{step.title}</h3>
                  <p className="text-[10px] text-[var(--jm-text-secondary)] mb-3">{step.subtitle}</p>

                  {/* Options */}
                  {step.type === "options" && (
                    <div className="flex flex-col gap-1.5">
                      {step.options!.map((opt, i) => (
                        <div
                          key={i}
                          className={`wizard-option flex items-center gap-2.5 px-2.5 py-2 rounded-xl border border-[var(--jm-border-subtle)] bg-[var(--jm-bg-secondary)]/50 cursor-pointer text-xs ${selectedOption === i && currentStep === idx ? "wizard-option-selected" : ""}`}
                        >
                          <span className="text-sm">{opt.emoji}</span>
                          <span className="flex-1 font-medium">{opt.text}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all wizard-radio ${selectedOption === i && currentStep === idx ? "border-purple-500 bg-purple-500" : "border-[var(--jm-border-subtle)]"}`}></span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grid */}
                  {step.type === "grid" && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {step.options!.map((opt, i) => (
                        <div
                          key={i}
                          className={`wizard-option flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl border border-[var(--jm-border-subtle)] bg-[var(--jm-bg-secondary)]/50 cursor-pointer text-center ${selectedOption === i && currentStep === idx ? "wizard-option-selected" : ""}`}
                        >
                          <span className="text-lg">{opt.emoji}</span>
                          <span className="text-[10px] font-semibold">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Form */}
                  {step.type === "form" && (
                    <div className="flex flex-col gap-2">
                      {step.fields!.map((field, i) => (
                        <div key={i}>
                          <label className="text-[10px] text-[var(--jm-text-secondary)] font-medium mb-0.5 block">
                            {field.label}
                          </label>
                          <div className={`h-8 bg-[var(--jm-bg-secondary)]/80 border border-[var(--jm-border-subtle)] rounded-lg px-2.5 flex items-center text-xs ${formTexts[i] && formTexts[i].length < field.value.length ? "wizard-input-typing" : ""}`}>
                            {formTexts[i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Textarea */}
                  {step.type === "textarea" && (
                    <>
                      <div className="bg-[var(--jm-bg-secondary)]/80 border border-[var(--jm-border-subtle)] rounded-xl p-2.5 text-[10px] leading-relaxed min-h-[120px] text-[var(--jm-text)] whitespace-pre-wrap">
                        {textareaText}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 px-1">
                        <span className="text-[10px] text-jm-accent">{"\u{1F4A1}"}</span>
                        <span className="text-[9px] text-[var(--jm-text-secondary)]">{t("step4Tip")}</span>
                      </div>
                    </>
                  )}

                  {/* Keywords */}
                  {step.type === "keywords" && (
                    <>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {keywordData.map((kw, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium border transition-all ${kw.color === "purple" ? "bg-purple-500/15 text-jm-accent border-purple-500/20" : "bg-green-500/15 text-green-400 border-green-500/20"} ${keywordsVisible[i] ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                          >
                            {kw.text}
                          </span>
                        ))}
                      </div>
                      <div className="bg-[var(--jm-bg-secondary)]/80 rounded-xl p-2.5 flex items-center gap-2.5">
                        <div className="relative w-10 h-10 shrink-0">
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center"
                            style={{
                              background: `conic-gradient(#a855f7 0deg ${matchPercent * 3.6}deg, var(--jm-conic-empty) ${matchPercent * 3.6}deg 360deg)`,
                            }}
                          >
                            <div className="absolute w-6 h-6 bg-[var(--jm-bg-secondary)]/80 rounded-full"></div>
                            <span className="relative z-10 font-[family-name:var(--font-space-mono)] text-[10px] font-bold text-jm-accent">
                              {matchPercent}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold">{t("compatibilityScore")}</div>
                          <div className="text-[9px] text-[var(--jm-text-secondary)]">{t("matchWithPosition")}</div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Templates */}
                  {step.type === "templates" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`wizard-option rounded-xl border-2 border-[var(--jm-border-subtle)] p-1.5 cursor-pointer transition-all ${selectedOption === 0 && currentStep === idx ? "wizard-option-selected" : ""}`}>
                        <div className="bg-[var(--jm-bg-secondary)] rounded-lg p-1.5 mb-1.5 aspect-[3/4] flex">
                          <div className="w-1/3 bg-purple-500/20 rounded-l-md"></div>
                          <div className="w-2/3 p-1 flex flex-col gap-0.5">
                            <div className="h-1.5 w-3/4 bg-[var(--jm-border-subtle)] rounded-full"></div>
                            <div className="h-1 w-1/2 bg-[var(--jm-border-subtle)] rounded-full"></div>
                            <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full mt-0.5"></div>
                            <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full"></div>
                            <div className="h-1 w-2/3 bg-[var(--jm-border-subtle)] rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-[10px] font-semibold text-center">{t("templateModern")}</p>
                      </div>
                      <div className={`wizard-option rounded-xl border-2 border-[var(--jm-border-subtle)] p-1.5 cursor-pointer transition-all ${selectedOption === 1 && currentStep === idx ? "wizard-option-selected" : ""}`}>
                        <div className="bg-[var(--jm-bg-secondary)] rounded-lg p-1.5 mb-1.5 aspect-[3/4] flex flex-col items-center gap-0.5">
                          <div className="h-1.5 w-1/2 bg-[var(--jm-border-subtle)] rounded-full mt-0.5"></div>
                          <div className="h-1 w-1/3 bg-[var(--jm-border-subtle)] rounded-full"></div>
                          <div className="h-px w-full bg-[var(--jm-border-subtle)] mt-0.5"></div>
                          <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full mt-0.5"></div>
                          <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full"></div>
                          <div className="h-1 w-3/4 bg-[var(--jm-border-subtle)] rounded-full"></div>
                          <div className="h-px w-full bg-[var(--jm-border-subtle)] mt-0.5"></div>
                          <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full mt-0.5"></div>
                          <div className="h-1 w-full bg-[var(--jm-border-subtle)] rounded-full"></div>
                        </div>
                        <p className="text-[10px] font-semibold text-center">{t("templateClassic")}</p>
                      </div>
                    </div>
                  )}

                  {/* Generating */}
                  {step.type === "generating" && (
                    <>
                      <div className="flex flex-col gap-2.5">
                        {[t("gen1"), t("gen2"), t("gen3"), t("gen4")].map((text, i) => (
                          <div key={i} className={`gen-step flex items-center gap-2.5 text-[10px] ${genSteps.includes(i + 1) ? "opacity-100" : "opacity-40"}`}>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${genSteps.includes(i + 1) ? "border-green-500 bg-green-500" : "border-[var(--jm-border-subtle)]"}`}>
                              {genSteps.includes(i + 1) && (
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span>{text}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`mt-3 transition-opacity duration-500 ${previewVisible ? "opacity-100" : "opacity-0"}`}>
                        <div className="bg-[var(--jm-bg-secondary)]/80 rounded-xl p-2.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-sm">{"\u2705"}</div>
                          <div className="flex-1">
                            <div className="text-[10px] font-semibold text-green-400">{t("resumeReady")}</div>
                            <div className="text-[9px] text-[var(--jm-text-secondary)]">{t("resumeReadyDesc")}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Next button */}
            <div className="absolute bottom-3 right-3 z-20">
              <div className={`px-3 py-1.5 rounded-xl text-[10px] font-semibold bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_15px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center gap-1 ${showNext ? "opacity-100" : "opacity-0"}`}>
                {t("next")}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="iphone-home-indicator" />
        </div>
      </div>
    </div>
  );
}
