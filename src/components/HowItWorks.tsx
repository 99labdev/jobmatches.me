import { getTranslations } from "next-intl/server";

export async function HowItWorks() {
  const t = await getTranslations("HowItWorks");

  const steps = [
    { num: "1", emoji: "\u{1F4C4}", title: t("step1Title"), desc: t("step1Desc") },
    { num: "2", emoji: "\u{1F517}", title: t("step2Title"), desc: t("step2Desc") },
    { num: "3", emoji: "\u26A1", title: t("step3Title"), desc: t("step3Desc") },
    { num: "4", emoji: "\u2728", title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[var(--jm-bg-secondary)]" id="how-it-works">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-[var(--jm-border-accent)] to-transparent"></div>
          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="w-[70px] h-[70px] mx-auto mb-6 bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 rounded-full flex items-center justify-center font-[family-name:var(--font-space-mono)] text-2xl font-bold text-white relative z-10">
                {step.num}
              </div>
              <div className="text-4xl mb-4">{step.emoji}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-[var(--jm-text-secondary)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
