import { getTranslations } from "next-intl/server";

export async function CTA() {
  const t = await getTranslations("CTA");

  return (
    <section className="py-32 px-4 md:px-8 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-[var(--jm-text-secondary)] mb-8 max-w-xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/accounts/signup/" className="px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.35)] transition-all">
            {t("analyzeResume")}
          </a>
          <a href="#how-it-works" className="px-8 py-4 rounded-2xl font-semibold text-lg bg-[var(--jm-card)] text-[var(--jm-text)] border border-[var(--jm-border-subtle)] hover:border-jm-accent hover:bg-purple-500/10 transition-all">
            {t("seeDemo")}
          </a>
        </div>
        <p className="mt-6 text-sm text-[var(--jm-text-secondary)]">{t("note")}</p>
      </div>
    </section>
  );
}
