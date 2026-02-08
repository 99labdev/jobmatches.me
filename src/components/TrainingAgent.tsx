"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

export function TrainingAgent() {
  const t = useTranslations("TrainingAgent");

  const coachMessages = useMemo(() => [
    { role: "assistant", text: t("coachMsg1") },
    { role: "user", text: t("coachMsg2") },
    { role: "assistant", text: t("coachMsg3") },
    { role: "user", text: t("coachMsg4") },
    { role: "assistant", text: t("coachMsg5") },
    { role: "user", text: t("coachMsg6") },
  ], [t]);

  const [phase, setPhase] = useState<"config" | "chat" | "analyzing" | "results">("config");
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [typing, setTyping] = useState(false);
  const [typingRole, setTypingRole] = useState("assistant");
  const [inputVisible, setInputVisible] = useState(false);
  const [credits, setCredits] = useState(5);
  const [cardVisible, setCardVisible] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState<number[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animStarted = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animStarted.current) {
          setCardVisible(true);
          animStarted.current = true;
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observerRef.current.observe(sectionRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [inputText]);

  const restartAnimation = useCallback(() => {
    setPhase("config");
    setMessages([]);
    setTyping(false);
    setTypingRole("assistant");
    setInputVisible(false);
    setInputText("");
    setCredits(5);
    setAnalysisStep(0);
    setAnalysisSteps([]);
  }, []);

  const showResults = useCallback(() => {
    setPhase("results");
    setTimeout(restartAnimation, 5000);
  }, [restartAnimation]);

  const runAnalysis = useCallback(() => {
    setPhase("analyzing");
    const steps = [1, 2, 3, 4];
    let idx = 0;
    function nextStep() {
      if (idx < steps.length) {
        setAnalysisStep(idx);
        setAnalysisSteps((prev) => [...prev, steps[idx]]);
        idx++;
        setTimeout(nextStep, 800);
      } else {
        setTimeout(showResults, 1000);
      }
    }
    setTimeout(nextStep, 600);
  }, [showResults]);

  useEffect(() => {
    if (phase !== "config" || !cardVisible) return;

    timerRef.current = setTimeout(() => {
      setPhase("chat");
      setCredits(4);

      let msgIdx = 0;

      function typeInInput(text: string, onDone: () => void) {
        let charIdx = 0;
        function nextChar() {
          if (charIdx < text.length) {
            charIdx++;
            setInputText(text.slice(0, charIdx));
            setTimeout(nextChar, 30);
          } else {
            setTimeout(onDone, 400);
          }
        }
        nextChar();
      }

      function showMessage() {
        if (msgIdx >= coachMessages.length) {
          setTimeout(() => runAnalysis(), 1500);
          return;
        }

        const msg = coachMessages[msgIdx];

        if (msg.role === "user") {
          setInputText("");
          typeInInput(msg.text, () => {
            setInputText("");
            setMessages((prev) => [...prev, msg]);
            msgIdx++;

            setTimeout(() => {
              if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
              }
            }, 50);

            setTimeout(showMessage, 1200);
          });
        } else {
          setTyping(true);
          setTypingRole(msg.role);

          setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, msg]);
            msgIdx++;

            if (msgIdx === 1) {
              setInputVisible(true);
            }

            setTimeout(() => {
              if (messagesRef.current) {
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
              }
            }, 50);

            setTimeout(showMessage, 1200);
          }, 1500);
        }
      }

      setTimeout(showMessage, 500);
    }, 2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, cardVisible, runAnalysis, coachMessages]);

  const analysisLabels = [
    t("analysisStep1"),
    t("analysisStep2"),
    t("analysisStep3"),
    t("analysisStep4"),
  ];

  const configFields = [
    { label: t("difficultyLevel"), value: t("difficultyValue") },
    { label: t("interviewType"), value: t("interviewTypeValue") },
    { label: t("interviewLanguage"), value: t("interviewLanguageValue") },
    { label: t("numberOfQuestions"), value: t("numberOfQuestionsValue") },
  ];

  const chips = [t("chipSenior"), t("chipBehavioral"), t("chipEnglish"), t("chipLeadership")];

  const resultScores = [
    { label: t("communication"), score: 90 },
    { label: t("technicalKnowledge"), score: 85 },
    { label: t("problemSolving"), score: 88 },
    { label: t("confidence"), score: 82 },
    { label: t("relevance"), score: 90 },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[var(--jm-bg-secondary)]" id="ai-coach" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-1 order-2 lg:text-left text-center">
            <span className="inline-block font-[family-name:var(--font-space-mono)] text-sm text-jm-accent uppercase tracking-[0.15em] mb-4">{t("badge")}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-[var(--jm-text-secondary)] mb-4 lg:text-left text-center">
              {t("subtitle")}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-[var(--jm-border-accent)] mb-8">
              <svg className="w-5 h-5 text-jm-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <span className="text-sm font-semibold text-jm-accent">
                {t("creditNote")}
              </span>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              {[
                { emoji: "\u{1F3A4}", title: t("feat1Title"), desc: t("feat1Desc") },
                { emoji: "\u{1F4A1}", title: t("feat2Title"), desc: t("feat2Desc") },
                { emoji: "\u{1F4CA}", title: t("feat3Title"), desc: t("feat3Desc") },
                { emoji: "\u2699\uFE0F", title: t("feat4Title"), desc: t("feat4Desc") },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start lg:flex-row flex-col lg:items-start items-center">
                  <div className="w-12 h-12 min-w-[48px] bg-purple-500/15 rounded-xl flex items-center justify-center text-xl">{item.emoji}</div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-[var(--jm-text-secondary)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Visual */}
          <div className={`lg:order-2 order-1 mx-auto ${cardVisible ? "coach-chat-visible" : "coach-chat-hidden"}`} style={{ perspective: "1000px" }}>
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

                  {/* App Header */}
                  <div className="flex items-center gap-2.5 px-4 py-2 border-b border-[var(--jm-border-subtle)]">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold truncate">{t("interviewTraining")}</h4>
                      <p className="text-[9px] text-[var(--jm-text-secondary)] truncate">
                        {phase === "config" ? t("configureInterview") : t("chatSubtitle")}
                      </p>
                    </div>
                    <div className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex-shrink-0">
                      {t("credits", { count: credits })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative overflow-hidden">
                    {/* Config phase */}
                    {phase === "config" && (
                      <div className="p-3 overflow-y-auto h-full">
                        <div className="flex flex-col items-center text-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 text-jm-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                          <h3 className="text-xs font-semibold text-[var(--jm-text)] mb-0.5">{t("readyTitle")}</h3>
                          <p className="text-[9px] text-[var(--jm-text-secondary)]">{t("readySubtitle")}</p>
                        </div>
                        <div className="bg-[var(--jm-bg)] border border-[var(--jm-border-subtle)] rounded-xl p-2.5 mb-3">
                          <div className="grid grid-cols-2 gap-2">
                            {configFields.map((field, i) => (
                              <div key={i}>
                                <label className="block text-[9px] font-semibold text-[var(--jm-text-secondary)] mb-0.5">{field.label}</label>
                                <div className="w-full px-2 py-1.5 rounded-lg bg-[var(--jm-card)] border border-[var(--jm-border-subtle)] text-[10px] text-[var(--jm-text)]">
                                  {field.value}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2">
                            <label className="block text-[9px] font-semibold text-[var(--jm-text-secondary)] mb-0.5">
                              {t("specificFocus")} <span className="font-normal text-[var(--jm-text-secondary)]/70">{t("specificFocusOptional")}</span>
                            </label>
                            <div className="w-full px-2 py-1.5 rounded-lg bg-[var(--jm-card)] border border-[var(--jm-border-subtle)] text-[10px] text-[var(--jm-text)]">
                              {t("specificFocusValue")}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="px-4 py-2 rounded-xl font-semibold text-xs bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)]">
                            {t("startInterview")}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chat phase */}
                    {(phase === "chat" || phase === "analyzing") && (
                      <div className="flex flex-col h-full">
                        <div className="flex flex-wrap items-center gap-1 px-3 py-1.5 border-b border-[var(--jm-border-subtle)] flex-shrink-0">
                          <svg className="w-3 h-3 text-jm-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          {chips.map((chip) => (
                            <span key={chip} className="px-1.5 py-0.5 rounded-full text-[8px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {chip}
                            </span>
                          ))}
                        </div>
                        <div ref={messagesRef} className="px-3 py-2 flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
                          {messages.map((msg, i) => (
                            <div
                              key={i}
                              className={`chat-bubble-visible max-w-[85%] px-3 py-2 text-[10px] leading-relaxed whitespace-pre-wrap ${
                                msg.role === "assistant"
                                  ? "bg-purple-500/10 border border-[var(--jm-border-accent)] rounded-xl rounded-bl-sm self-start"
                                  : "bg-[var(--jm-bg-secondary)] border border-[var(--jm-border-subtle)] rounded-xl rounded-br-sm self-end"
                              }`}
                            >
                              {msg.text}
                            </div>
                          ))}
                          {typing && (
                            <div className={`chat-typing-indicator ${typingRole === "user" ? "from-user" : ""}`}>
                              <div className="chat-typing-dot"></div>
                              <div className="chat-typing-dot"></div>
                              <div className="chat-typing-dot"></div>
                            </div>
                          )}
                        </div>
                        <div className={`flex items-end gap-2 px-3 py-2 border-t border-[var(--jm-border-subtle)] flex-shrink-0 mt-auto ${inputVisible ? "coach-input-visible" : "coach-input-hidden"}`}>
                          <textarea
                            ref={textareaRef}
                            placeholder={t("typeAnswer")}
                            value={inputText}
                            rows={1}
                            className="flex-1 bg-[var(--jm-bg-secondary)] border border-[var(--jm-border-subtle)] rounded-lg px-3 py-1.5 text-[var(--jm-text)] text-[10px] focus:outline-none focus:border-jm-accent resize-none overflow-hidden max-h-24"
                            readOnly
                          />
                          <button className={`w-8 h-8 border-none rounded-lg text-white flex items-center justify-center flex-shrink-0 transition-all ${inputText ? "bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 cursor-pointer opacity-100" : "bg-[var(--jm-border-subtle)] cursor-default opacity-50"}`} disabled={!inputText}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18m0 0l-6-6m6 6l-6 6" />
                            </svg>
                          </button>
                        </div>

                        {/* Analysis overlay */}
                        {phase === "analyzing" && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="bg-[var(--jm-card)] border border-[var(--jm-border-subtle)] rounded-2xl p-4 w-[85%] max-w-xs shadow-2xl flex flex-col items-center text-center">
                              <div className="relative w-10 h-10 mb-2">
                                <div className="absolute inset-0 rounded-full border-[3px] border-purple-500/20"></div>
                                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500 animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-jm-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                </div>
                              </div>
                              <h3 className="text-xs font-bold text-[var(--jm-text)] mb-0.5">{t("generatingAnalysis")}</h3>
                              <p className="text-[10px] text-[var(--jm-text-secondary)] mb-2">{analysisLabels[analysisStep] || analysisLabels[0]}</p>
                              <div className="w-full space-y-1">
                                {analysisLabels.map((label, i) => (
                                  <div key={i} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all duration-500 ${analysisSteps.includes(i + 1) ? "opacity-100" : "opacity-40"}`}>
                                    <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${analysisSteps.includes(i + 1) ? "bg-green-500" : "bg-[var(--jm-bg-secondary)]"}`}>
                                      {analysisSteps.includes(i + 1) ? (
                                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      ) : (
                                        <svg className="w-2.5 h-2.5 text-[var(--jm-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <circle cx="12" cy="12" r="4" strokeWidth="2" />
                                        </svg>
                                      )}
                                    </div>
                                    <span className="text-[10px] text-[var(--jm-text-secondary)]">{label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Results phase */}
                    {phase === "results" && (
                      <div className="p-3 overflow-y-auto h-full">
                        <div className="text-center mb-3">
                          <h3 className="text-xs font-bold mb-1">{t("performanceAnalysis")}</h3>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-semibold">
                            {t("overall")}
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          {resultScores.map((item) => (
                            <div key={item.label} className="flex items-center gap-1.5">
                              <span className="text-[9px] text-[var(--jm-text-secondary)] w-20 text-right">{item.label}</span>
                              <div className="flex-1 h-1 bg-[var(--jm-bg-secondary)] rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full" style={{ width: `${item.score}%` }}></div>
                              </div>
                              <span className="text-[9px] font-semibold text-jm-accent w-7">{item.score}%</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 mb-2">
                          <h4 className="text-[10px] font-semibold text-green-400 mb-0.5">{t("strengths")}</h4>
                          <ul className="text-[9px] text-[var(--jm-text-secondary)] space-y-0.5">
                            <li>- {t("strength1")}</li>
                            <li>- {t("strength2")}</li>
                          </ul>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-2 mb-2">
                          <h4 className="text-[10px] font-semibold text-orange-400 mb-0.5">{t("areasForImprovement")}</h4>
                          <ul className="text-[9px] text-[var(--jm-text-secondary)] space-y-0.5">
                            <li>- {t("improvement1")}</li>
                            <li>- {t("improvement2")}</li>
                          </ul>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2">
                          <h4 className="text-[10px] font-semibold text-purple-400 mb-0.5">{t("summary")}</h4>
                          <p className="text-[9px] text-[var(--jm-text-secondary)] leading-relaxed">
                            {t("summaryText")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Home Indicator */}
                  <div className="iphone-home-indicator" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
