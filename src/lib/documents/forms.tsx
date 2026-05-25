import type { ComponentType } from "react";

import { AccordConfidentialiteForm } from "@/components/forms/accord-confidentialite-form";
import { CessionDroitsForm } from "@/components/forms/cession-droits-form";
import { CgvForm } from "@/components/forms/cgv-form";
import { ConditionsUtilisationForm } from "@/components/forms/conditions-utilisation-form";
import { ContratPrestationForm } from "@/components/forms/contrat-prestation-form";
import { ConventionStageForm } from "@/components/forms/convention-stage-form";
import { DevisForm } from "@/components/forms/devis-form";
import { FactureForm } from "@/components/forms/facture-form";
import { MentionsLegalesForm } from "@/components/forms/mentions-legales-form";
import { PolitiqueConfidentialiteForm } from "@/components/forms/politique-confidentialite-form";
import type { DocumentSlug } from "@/lib/documents/registry";

export const documentForms: Record<DocumentSlug, ComponentType> = {
  cgv: CgvForm,
  "mentions-legales": MentionsLegalesForm,
  "politique-confidentialite": PolitiqueConfidentialiteForm,
  "contrat-prestation": ContratPrestationForm,
  devis: DevisForm,
  facture: FactureForm,
  "cession-droits-auteur": CessionDroitsForm,
  "conditions-utilisation": ConditionsUtilisationForm,
  "accord-confidentialite": AccordConfidentialiteForm,
  "convention-stage": ConventionStageForm,
};
