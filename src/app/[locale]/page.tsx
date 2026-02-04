import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { TrainingAgent } from "@/components/TrainingAgent";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-gradient-radial"></div>

      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <TrainingAgent />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
