import { getTranslations } from "next-intl/server";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export async function Pricing() {
  const t = await getTranslations("Pricing");

  const benefits = [
    t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4"), t("benefit5"),
    t("benefit6"), t("benefit7"), t("benefit8"), t("benefit9"), t("benefit10"),
  ];

  const plans = [
    {
      subtitle: t("plan1Subtitle"),
      price: "R$4.90",
      credits: "1",
      perCredit: null,
      popular: false,
    },
    {
      subtitle: t("plan2Subtitle"),
      price: "R$19.90",
      credits: "10",
      perCredit: t("perCredit2"),
      popular: true,
    },
    {
      subtitle: t("plan3Subtitle"),
      price: "R$49.90",
      credits: "50",
      perCredit: t("perCredit3"),
      popular: false,
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-space-mono)] text-sm text-jm-accent uppercase tracking-[0.15em] mb-4">{t("badge")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--jm-text-secondary)] max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="text-sm text-[var(--jm-text-secondary)] mt-2">
            {t("creditExplanation")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-[var(--jm-card)] border rounded-3xl p-10 relative transition-all duration-300 hover:-translate-y-1 jm-card-shadow ${
                plan.popular ? "border-jm-accent md:scale-105" : "border-[var(--jm-border-subtle)]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                  {t("mostPopular")}
                </span>
              )}
              <p className="text-[var(--jm-text-secondary)] text-sm mb-6">{plan.subtitle}</p>
              <div className="mb-6">
                <span className="font-[family-name:var(--font-space-mono)] text-4xl font-bold">{plan.price}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-purple-500/10 rounded-xl mb-6 text-sm">
                <strong className="text-jm-accent font-[family-name:var(--font-space-mono)]">{plan.credits}</strong>
                {plan.credits === "1" ? t("credit") : t("credits")}
              </div>
              {plan.perCredit && (
                <p className="text-xs text-[var(--jm-text-secondary)] mb-6">{plan.perCredit}</p>
              )}
              <div className="mb-6 mt-2">
                <h4 className="font-semibold text-[var(--jm-text)] text-sm mb-3">{t("whatsIncluded")}</h4>
                <ul className="space-y-2">
                  {benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-[var(--jm-text-secondary)]">
                      <CheckIcon />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="/accounts/signup/"
                className={`block w-full text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.35)]"
                    : "bg-[var(--jm-bg-secondary)] text-[var(--jm-text)] border border-[var(--jm-border-subtle)] hover:border-jm-accent hover:bg-purple-500/10"
                }`}
              >
                {t("getStarted")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
