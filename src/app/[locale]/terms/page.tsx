import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: `${t("title")} | Job Matches`,
    description: t("metaDescription"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  const sections = [
    { title: t("acceptanceTitle"), text: t("acceptanceText") },
    { title: t("serviceTitle"), text: t("serviceText") },
    { title: t("obligationsTitle"), text: t("obligationsText") },
    { title: t("intellectualPropertyTitle"), text: t("intellectualPropertyText") },
    { title: t("limitationTitle"), text: t("limitationText") },
    { title: t("terminationTitle"), text: t("terminationText") },
    { title: t("changesTitle"), text: t("changesText") },
    { title: t("contactTitle"), text: t("contactText") },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("title")}</h1>
          <p className="text-[var(--jm-text-secondary)] text-sm mb-10">
            {t("lastUpdated")}
          </p>
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                <p className="text-[var(--jm-text-secondary)] leading-relaxed">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
