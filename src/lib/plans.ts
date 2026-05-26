import { juriviteLegal } from "@/lib/legal/jurivite-site";

export type Plan = "free" | "pro" | "business";

export const DOCUMENT_CATALOG_SIZE = 10;

export const PLAN_LIMITS = {
  free: {
    label: "Gratuit",
    priceMonthly: 0,
    pdfPerMonth: null as number | null,
    watermark: true,
    apiAccess: false,
  },
  pro: {
    label: "Pro",
    priceMonthly: 9,
    pdfPerMonth: 20,
    watermark: false,
    apiAccess: false,
  },
  business: {
    label: "Business",
    priceMonthly: 30,
    pdfPerMonth: null,
    watermark: false,
    apiAccess: true,
  },
} as const;

export function hasPaidPlan(plan: Plan): boolean {
  return plan === "pro" || plan === "business";
}

export function hasNoWatermark(plan: Plan): boolean {
  return hasPaidPlan(plan);
}

export function isUnlimited(plan: Plan): boolean {
  return plan === "business";
}

export function getMonthlyLimit(plan: Plan): number | null {
  return PLAN_LIMITS[plan].pdfPerMonth;
}

export function planFromStripePriceId(priceId: string): Plan | null {
  const business = process.env.STRIPE_PRICE_ID_BUSINESS;
  const pro =
    process.env.STRIPE_PRICE_ID_PRO ?? process.env.STRIPE_PRICE_ID;

  if (business && priceId === business) return "business";
  if (pro && priceId === pro) return "pro";
  return null;
}

export function stripePriceIdForPlan(plan: "pro" | "business"): string | undefined {
  if (plan === "business") return process.env.STRIPE_PRICE_ID_BUSINESS;
  return process.env.STRIPE_PRICE_ID_PRO ?? process.env.STRIPE_PRICE_ID;
}

/** Libellés tarifs — alignés sur PLAN_LIMITS et le code d’application. */
export const PLAN_MARKETING_FEATURES: Record<Plan, readonly string[]> = {
  free: [
    `${DOCUMENT_CATALOG_SIZE} types de documents juridiques`,
    "Formulaires guidés",
    "PDF avec filigrane",
    "Sans carte bancaire",
  ],
  pro: [
    `Catalogue complet (${DOCUMENT_CATALOG_SIZE} documents)`,
    "20 PDF / mois sans filigrane",
    "Historique & retéléchargement",
    `Support e-mail : ${juriviteLegal.email}`,
  ],
  business: [
    "Tout le plan Pro inclus",
    "PDF illimités sans filigrane",
    "Clé API REST (POST /api/v1/generate-pdf)",
    "Automatisation (CRM, ERP…)",
  ],
};
