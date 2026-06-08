import type { DocumentSlug } from "@/lib/documents/registry";
import { NDA_STEPS } from "@/lib/schemas/accord-confidentialite";
import { CESSION_DROITS_STEPS } from "@/lib/schemas/cession-droits-auteur";
import { CGV_FORM_STEPS } from "@/lib/schemas/cgv";
import { CGU_STEPS } from "@/lib/schemas/conditions-utilisation";
import { CONTRAT_PRESTATION_STEPS } from "@/lib/schemas/contrat-prestation";
import { CONVENTION_STAGE_STEPS } from "@/lib/schemas/convention-stage";
import { DEVIS_STEPS } from "@/lib/schemas/devis";
import { FACTURE_STEPS } from "@/lib/schemas/facture";
import { MENTIONS_LEGALES_STEPS } from "@/lib/schemas/mentions-legales";
import { POLITIQUE_CONFIDENTIALITE_STEPS } from "@/lib/schemas/politique-confidentialite";

const STEP_COUNTS: Record<DocumentSlug, number> = {
  cgv: CGV_FORM_STEPS.length,
  "mentions-legales": MENTIONS_LEGALES_STEPS.length,
  "politique-confidentialite": POLITIQUE_CONFIDENTIALITE_STEPS.length,
  "contrat-prestation": CONTRAT_PRESTATION_STEPS.length,
  devis: DEVIS_STEPS.length,
  facture: FACTURE_STEPS.length,
  "cession-droits-auteur": CESSION_DROITS_STEPS.length,
  "conditions-utilisation": CGU_STEPS.length,
  "accord-confidentialite": NDA_STEPS.length,
  "convention-stage": CONVENTION_STAGE_STEPS.length,
};

export function getDocumentStepCount(slug: DocumentSlug): number {
  return STEP_COUNTS[slug];
}
