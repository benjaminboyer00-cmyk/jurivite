import { juriviteLegal } from "@/lib/legal/jurivite-site";

export type Plan = "free" | "pro" | "business";

/** Produits one-shot (Stripe mode payment) */
export type OneShotProduct = "single_doc" | "pack_essential";

export const DOCUMENT_CATALOG_SIZE = 10;

/** Prix TTC affichés — alignés Stripe Dashboard */
export const PRICING = {
  singleDoc: 4.9,
  packEssential: 19.9,
  proMonthly: 29.9,
} as const;

export const PACK_ESSENTIAL_DOCUMENTS = 3;
export const PACK_ESSENTIAL_UPDATE_MONTHS = 3;

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
    priceMonthly: PRICING.proMonthly,
    pdfPerMonth: null,
    watermark: false,
    apiAccess: false,
  },
  business: {
    label: "Business",
    priceMonthly: null as number | null,
    pdfPerMonth: null,
    watermark: false,
    apiAccess: true,
  },
} as const;

export const ONE_SHOT_PRODUCTS: Record<
  OneShotProduct,
  {
    label: string;
    price: number;
    description: string;
  }
> = {
  single_doc: {
    label: "Document à l'unité",
    price: PRICING.singleDoc,
    description:
      "1 document au choix, sans filigrane, mises à jour à vie sur ce document.",
  },
  pack_essential: {
    label: "Pack Essentiel",
    price: PRICING.packEssential,
    description: `3 documents au choix + ${PACK_ESSENTIAL_UPDATE_MONTHS} mois de mises à jour.`,
  },
};

export function hasPaidSubscription(plan: Plan): boolean {
  return plan === "pro" || plan === "business";
}

export function hasNoWatermark(plan: Plan): boolean {
  return hasPaidSubscription(plan);
}

export function isUnlimited(plan: Plan): boolean {
  return plan === "pro" || plan === "business";
}

export function getMonthlyLimit(plan: Plan): number | null {
  return PLAN_LIMITS[plan].pdfPerMonth;
}

export function planFromStripePriceId(priceId: string): Plan | null {
  const pro =
    process.env.STRIPE_PRICE_ID_PRO ?? process.env.STRIPE_PRICE_ID;

  if (pro && priceId === pro) return "pro";
  return null;
}

export function stripePriceIdForPlan(plan: "pro"): string | undefined {
  return process.env.STRIPE_PRICE_ID_PRO ?? process.env.STRIPE_PRICE_ID;
}

export function stripePriceIdForOneShot(
  product: OneShotProduct,
): string | undefined {
  if (product === "single_doc") {
    return process.env.STRIPE_PRICE_ID_SINGLE_DOC;
  }
  return process.env.STRIPE_PRICE_ID_PACK_ESSENTIAL;
}

export function formatPriceEur(amount: number): string {
  return amount.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
}

/** Libellés tarifs — page /tarifs et dashboard */
export const PLAN_MARKETING_FEATURES: Record<Plan, readonly string[]> = {
  free: [
    `${DOCUMENT_CATALOG_SIZE} types de documents juridiques`,
    "Formulaires guidés",
    "PDF avec filigrane",
    "Sans carte bancaire",
  ],
  pro: [
    `Catalogue complet (${DOCUMENT_CATALOG_SIZE} documents)`,
    "PDF illimités sans filigrane",
    "Mises à jour juridiques en continu",
    "Historique & tableau de bord",
    `Support e-mail : ${juriviteLegal.email}`,
  ],
  business: [
    "Tout le plan Pro inclus",
    "Clé API REST (POST /api/v1/generate-pdf)",
    "Volume & intégration sur votre site",
    "Déploiement et accompagnement sur devis",
  ],
};

export const ONE_SHOT_MARKETING_FEATURES: Record<
  OneShotProduct,
  readonly string[]
> = {
  single_doc: [
    "1 document au choix",
    "PDF sans filigrane",
    "Mises à jour à vie sur ce document",
    "Payez une fois, pas d'abonnement",
  ],
  pack_essential: [
    "3 documents au choix",
    "PDF sans filigrane",
    `${PACK_ESSENTIAL_UPDATE_MONTHS} mois de mises à jour inclus`,
    "Idéal pour un lancement ou un dossier ponctuel",
  ],
};
