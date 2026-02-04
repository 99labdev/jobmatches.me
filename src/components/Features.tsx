import { getTranslations } from "next-intl/server";

export async function Features() {
  const t = await getTranslations("Features");

  const features = [
    { emoji: "\u{1F4CA}", title: t("f1Title"), desc: t("f1Desc") },
    { emoji: "\u{1F3AF}", title: t("f2Title"), desc: t("f2Desc") },
    { emoji: "\u270D\uFE0F", title: t("f3Title"), desc: t("f3Desc") },
    { emoji: "\u{1F916}", title: t("f4Title"), desc: t("f4Desc") },
    { emoji: "\u{1F4DD}", title: t("f5Title"), desc: t("f5Desc") },
    { emoji: "\u{1F4C8}", title: t("f6Title"), desc: t("f6Desc") },
  ];

  return (
    <section className="py-24 px-4 md:px-8" id="features">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group bg-[var(--jm-card)] border border-[var(--jm-border-subtle)] rounded-2xl p-8 transition-all duration-300 hover:border-[var(--jm-border-accent)] hover:-translate-y-1 relative overflow-hidden jm-card-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-[60px] h-[60px] bg-purple-500/15 rounded-2xl flex items-center justify-center text-3xl mb-6">{f.emoji}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-[var(--jm-text-secondary)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
