import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tWhatsApp = await getTranslations("WhatsApp");

  return (
    <footer className="bg-[var(--jm-bg-secondary)] pt-16 pb-8 px-4 md:px-8 border-t border-[var(--jm-border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 no-underline text-[var(--jm-text)] mb-4">
              <img src="/logo.png" alt="JobMatches" className="w-[42px] h-[42px] rounded-xl" />
              <span className="font-bold text-xl tracking-tight">
                Job<span className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">Matches</span>
              </span>
            </Link>
            <p className="text-[var(--jm-text-secondary)] text-sm max-w-xs">
              {t("description")}
            </p>
          </div>
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <h4 className="font-semibold mb-4">{t("product")}</h4>
              <ul className="list-none space-y-2">
                <li><a href="#how-it-works" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("howItWorks")}</a></li>
                <li><a href="#features" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("features")}</a></li>
                <li><a href="#ai-coach" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("trainingAgent")}</a></li>
                <li><a href="#pricing" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("pricing")}</a></li>
                <li><a href="#faq" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("faq")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("support")}</h4>
              <ul className="list-none space-y-2">
                <li><a href={`https://wa.me/5584981297116?text=${encodeURIComponent(tWhatsApp("message"))}`} target="_blank" rel="noopener noreferrer" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("supportLink")}</a></li>
                <li><Link href="/terms" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("terms")}</Link></li>
                <li><Link href="/privacy" className="text-[var(--jm-text-secondary)] text-sm hover:text-jm-accent transition-colors">{t("privacy")}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--jm-border-subtle)]">
          <p className="text-[var(--jm-text-secondary)] text-sm">{t("copyright")}</p>
          <div className="flex items-center gap-2">
            <span className="text-[var(--jm-text-secondary)] text-sm">{t("developedBy")}</span>
            <a href="https://99lab.dev/" target="_blank" rel="noopener noreferrer">
              <img src="/99lab-logo.webp" alt="99lab.dev" className="h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
