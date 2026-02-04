"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const localeConfig = [
  { code: "en" as const, flag: "\u{1F1FA}\u{1F1F8}", labelKey: "english" },
  { code: "es" as const, flag: "\u{1F1EA}\u{1F1F8}", labelKey: "spanish" },
  { code: "pt" as const, flag: "\u{1F1E7}\u{1F1F7}", labelKey: "portuguese" },
];

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isDark, setIsDark] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    html.classList.add("theme-transition");
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("jm-theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("jm-theme", "dark");
      setIsDark(true);
    }
    setTimeout(() => html.classList.remove("theme-transition"), 300);
  }

  function switchLocale(newLocale: "en" | "pt" | "es") {
    setLangOpen(false);
    router.replace(pathname, { locale: newLocale });
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  const currentLocale = localeConfig.find((l) => l.code === locale) || localeConfig[0];

  const navLinks = [
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#features", label: t("features") },
    { href: "#ai-coach", label: t("trainingAgent") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 bg-[var(--jm-nav-bg)] backdrop-blur-xl border-b border-[var(--jm-border-subtle)] transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 no-underline text-[var(--jm-text)]">
            <div className="w-[42px] h-[42px] bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 rounded-xl flex items-center justify-center font-extrabold text-lg text-white">
              JM
            </div>
            <span className="font-bold text-xl tracking-tight">
              Job<span className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">Matches</span>
            </span>
          </Link>

          <ul className="hidden md:flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[var(--jm-text-secondary)] hover:text-[var(--jm-text)] transition-colors text-sm font-medium">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 items-center">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                className="lang-toggle-btn"
                onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                aria-label={t("changeLanguage")}
                aria-expanded={langOpen}
              >
                <span className="text-sm" aria-hidden="true">{currentLocale.flag}</span>
                <span className="text-xs font-semibold hidden sm:inline">{t(currentLocale.labelKey as "english" | "spanish" | "portuguese")}</span>
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {langOpen && (
                <div className="lang-dropdown lang-dropdown-open" role="menu">
                  {localeConfig.map((loc) => (
                    <button
                      key={loc.code}
                      className={`lang-option ${locale === loc.code ? "lang-option-active" : ""}`}
                      role="menuitem"
                      onClick={() => switchLocale(loc.code)}
                    >
                      <span className="text-sm">{loc.flag}</span>
                      <span className="text-sm">{t(loc.labelKey as "english" | "spanish" | "portuguese")}</span>
                      {locale === loc.code && (
                        <svg className="w-3.5 h-3.5 text-jm-accent ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label={t("toggleTheme")}>
              {isDark ? <span>☀</span> : <span>☾</span>}
            </button>

            <a href="/accounts/login/" className="text-[var(--jm-text-secondary)] hover:text-[var(--jm-text)] transition-colors text-sm font-medium hidden md:inline-block">
              {t("signIn")}
            </a>
            <a href="/accounts/signup/" className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.35)] transition-all hidden md:inline-block">
              {t("startFree")}
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
              onClick={() => setMobileOpen(true)}
              aria-label={t("openMenu")}
            >
              <span className="w-6 h-0.5 bg-[var(--jm-text)] transition-all"></span>
              <span className="w-6 h-0.5 bg-[var(--jm-text)] transition-all"></span>
              <span className="w-6 h-0.5 bg-[var(--jm-text)] transition-all"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" onClick={closeMobile} />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-[var(--jm-card)] border-l border-[var(--jm-border-subtle)] z-[70] transition-transform duration-300 ease-in-out flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--jm-border-subtle)]">
          <span className="font-bold text-lg text-[var(--jm-text)]">
            Job<span className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">Matches</span>
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--jm-text-secondary)] hover:text-[var(--jm-text)] hover:bg-purple-500/10 transition-all"
            onClick={closeMobile}
            aria-label={t("closeMenu")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-1 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="mobile-sidebar-link" onClick={closeMobile}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-[var(--jm-border-subtle)] flex flex-col gap-3">
            <a href="/accounts/login/" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-[var(--jm-text-secondary)] hover:text-[var(--jm-text)] hover:bg-purple-500/10 border border-[var(--jm-border-subtle)] transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
              {t("signIn")}
            </a>
            <a href="/accounts/signup/" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-br from-purple-300 via-purple-500 to-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)] transition-all">
              {t("signUp")}
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
