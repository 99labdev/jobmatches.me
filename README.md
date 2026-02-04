<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/i18n-EN%20|%20PT%20|%20ES-purple" alt="i18n" />
</p>

# JobMatches

AI-powered platform that analyzes your resume against job descriptions, shows exactly what to improve, generates an optimized version, and prepares you for interviews with a virtual coaching agent.

## Features

- **Smart Match Score** — Advanced algorithm that calculates real compatibility between your profile and job requirements
- **Gap Detection** — Identifies missing skills, certifications, keywords, and formatting issues
- **AI Rewriting** — Rewrites experiences using impact language and metrics aligned with recruiter expectations
- **ATS Optimization** — Resumes formatted to pass applicant tracking systems used by 99% of large companies
- **Training Agent** — AI-powered interview simulation with real-time feedback and performance reports
- **Multiple Formats** — Export in PDF, Word, or plain text
- **Internationalization** — Full support for English, Portuguese, and Spanish

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| i18n | [next-intl](https://next-intl.dev/) (EN, PT, ES) |
| Analytics | [Google Analytics 4](https://analytics.google.com/) |
| Fonts | [Outfit](https://fonts.google.com/specimen/Outfit) + [Space Mono](https://fonts.google.com/specimen/Space+Mono) |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/hudsonbrendon/jobmatches.me.git
cd jobmatches.me
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # Root layout (theme, fonts, i18n provider)
│   │   ├── page.tsx          # Landing page
│   │   ├── terms/page.tsx    # Terms of Use
│   │   └── privacy/page.tsx  # Privacy Policy
│   ├── globals.css           # Global styles & CSS variables
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx            # Navigation bar with language switcher
│   ├── HeroSection.tsx       # Hero with stats
│   ├── HeroWizard.tsx        # Interactive 7-step wizard demo
│   ├── HowItWorks.tsx        # 4-step process section
│   ├── Features.tsx          # Feature grid
│   ├── TrainingAgent.tsx     # AI coaching agent showcase
│   ├── Pricing.tsx           # Credit-based pricing plans
│   ├── FAQ.tsx               # Accordion FAQ
│   ├── CTA.tsx               # Call to action
│   ├── Footer.tsx            # Footer with links
│   ├── WhatsAppButton.tsx    # Floating WhatsApp button
│   ├── ThemeScript.tsx       # Dark/light theme script
│   └── GoogleAnalytics.tsx   # GA4 script (conditional on env var)
├── i18n/
│   ├── routing.ts            # Locale routing config
│   ├── navigation.ts         # i18n-aware Link, useRouter, etc.
│   └── request.ts            # Server-side locale resolution
└── middleware.ts              # Locale redirect middleware
messages/
├── en.json                   # English translations
├── pt.json                   # Portuguese translations
└── es.json                   # Spanish translations
```

## Internationalization

The app supports three locales with URL prefix routing:

| Locale | URL | Example |
|---|---|---|
| English | `/en/*` | `/en/terms` |
| Portuguese | `/pt/*` | `/pt/privacy` |
| Spanish | `/es/*` | `/es/terms` |

Translation files are located in `messages/`. Each component uses `getTranslations()` (server) or `useTranslations()` (client) from `next-intl`.

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) | No |

On Vercel, add it in **Settings > Environment Variables**.

## License

All rights reserved.

---

Developed by [99lab.dev](https://99lab.dev/)
