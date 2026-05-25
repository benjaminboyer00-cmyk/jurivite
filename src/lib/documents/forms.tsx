import type { ComponentType } from "react";

import { CgvForm } from "@/components/forms/cgv-form";
import { ContratPrestationForm } from "@/components/forms/contrat-prestation-form";
import { DevisForm } from "@/components/forms/devis-form";
import { MentionsLegalesForm } from "@/components/forms/mentions-legales-form";
import { PolitiqueConfidentialiteForm } from "@/components/forms/politique-confidentialite-form";
import type { DocumentSlug } from "@/lib/documents/registry";

export const documentForms: Record<DocumentSlug, ComponentType> = {
  cgv: CgvForm,
  "mentions-legales": MentionsLegalesForm,
  "politique-confidentialite": PolitiqueConfidentialiteForm,
  "contrat-prestation": ContratPrestationForm,
  devis: DevisForm,
};
