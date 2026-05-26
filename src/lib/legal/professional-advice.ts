import type { DocumentSlug } from "@/lib/documents/registry";

export type ProfessionalAdvice = {
  title: string;
  summary: string;
  bullets: string[];
};

const ADVICE: Partial<Record<DocumentSlug, ProfessionalAdvice>> = {
  cgv: {
    title: "CGV — vente aux particuliers (B2C)",
    summary:
      "Si vous vendez à des consommateurs, faites relire vos CGV par un avocat ou un juriste avant publication.",
    bullets: [
      "Vérifiez le délai de rétractation (14 jours par défaut), les frais de retour et les clauses de responsabilité.",
      "Personnalisez le médiateur de la consommation si vous n'utilisez pas le CNPM.",
      "Les clauses limitant la responsabilité peuvent être réputées abusives en B2C.",
    ],
  },
  "politique-confidentialite": {
    title: "RGPD — collecte de données clients",
    summary:
      "Dès que vous collectez des e-mails, coordonnées ou cookies analytics, faites valider votre politique par un DPO ou un conseil juridique.",
    bullets: [
      "Listez précisément les données, finalités, durées et sous-traitants (hébergeur, CRM, e-mailing).",
      "Tenez un registre des traitements et signez des accords art. 28 RGPD avec vos prestataires.",
      "Transferts hors UE (outils US) : documentez les garanties (CCT, décision d'adéquation).",
    ],
  },
  "mentions-legales": {
    title: "Mentions légales — LCEN",
    summary:
      "Indiquez l'hébergeur réel (nom + adresse postale) et le directeur de publication. Associations : RNA recommandé.",
    bullets: [
      "Vérifiez la cohérence SIRET / forme juridique avec votre Kbis ou avis INSEE.",
      "Mettez à jour après changement d'hébergeur ou de responsable de publication.",
    ],
  },
  facture: {
    title: "Facture — mentions obligatoires",
    summary:
      "Une facture professionnelle comporte vos coordonnées bancaires (IBAN) et les mentions CGI / Code de commerce.",
    bullets: [
      "Numérotation chronologique unique, SIRET, HT/TTC ou mention TVA art. 293 B.",
      "Société : capital social, forme juridique et RCS.",
      "Anticipez la facturation électronique B2B (réforme 2026+).",
    ],
  },
  devis: {
    title: "Devis professionnel",
    summary:
      "Un devis complet facilite la signature : validité, montants, conditions et coordonnées bancaires si acompte.",
    bullets: [
      "Travaux B2B > 1 000 € HT : devis obligatoire (Code de commerce).",
      "Le devis ne remplace pas le contrat — prévoyez un « bon pour accord » signé.",
    ],
  },
  "convention-stage": {
    title: "Convention de stage — document officiel",
    summary:
      "Ce PDF est une base de travail. La convention tripartite signée par l'établissement d'enseignement est obligatoire.",
    bullets: [
      "Utilisez le modèle Cerfa / la plateforme de votre école (Onisep, services scolarité).",
      "Tripartite : organisme d'accueil + établissement + stagiaire (art. L124-1 Code de l'éducation).",
      "Gratification obligatoire si le stage dure plus de 2 mois consécutifs (art. L124-6).",
      "Vérifiez assurance accident du travail et responsabilité civile.",
    ],
  },
};

export function getDocumentProfessionalAdvice(
  slug: DocumentSlug,
): ProfessionalAdvice | undefined {
  return ADVICE[slug];
}
