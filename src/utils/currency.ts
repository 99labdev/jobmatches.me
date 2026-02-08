import { headers } from "next/headers";

/**
 * Detects if the user is from Brazil based on geolocation
 * Uses Vercel's geolocation header or falls back to accept-language
 */
export async function isBrazilUser(): Promise<boolean> {
  const headersList = await headers();

  // Try Vercel's geolocation header first
  const country = headersList.get("x-vercel-ip-country");
  if (country === "BR") {
    return true;
  }

  // Fallback: Check accept-language header
  const acceptLanguage = headersList.get("accept-language");
  if (acceptLanguage?.includes("pt-BR")) {
    return true;
  }

  return false;
}

/**
 * Gets the appropriate pricing locale based on user location
 * Returns 'pt' for Brazil (BRL), 'en' for others (USD)
 */
export async function getPricingLocale(): Promise<"pt" | "en"> {
  const isBrazil = await isBrazilUser();
  return isBrazil ? "pt" : "en";
}
