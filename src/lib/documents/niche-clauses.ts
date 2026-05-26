/** Clauses métier injectées dans le PDF CGV (Article complémentaire). */
export type IndustryClause =
  | "clause_maintenance"
  | "clause_propriete_code"
  | "clause_hebergement"
  | "clause_cession_droits"
  | "clause_retouches"
  | "clause_droit_image"
  | "clause_obligation_moyens"
  | "clause_delais_validation"
  | "clause_disclaimer_medical"
  | "clause_annulation"
  | "clause_confidentialite"
  | "clause_qualiopi"
  | "clause_retractation"
  | "clause_livraison"
  | "clause_stock"
  | "clause_propriete_intellectuelle_formation";

export const INDUSTRY_CLAUSE_LABELS: Record<IndustryClause, string> = {
  clause_maintenance: "Maintenance & évolutions",
  clause_propriete_code: "Propriété du code source",
  clause_hebergement: "Hébergement & mise en production",
  clause_cession_droits: "Cession de droits d'auteur",
  clause_retouches: "Retouches & allers-retours",
  clause_droit_image: "Droit à l'image",
  clause_obligation_moyens: "Obligation de moyens",
  clause_delais_validation: "Délais & validations client",
  clause_disclaimer_medical: "Disclaimer non médical",
  clause_annulation: "Annulation & acompte",
  clause_confidentialite: "Confidentialité",
  clause_qualiopi: "Formation & Qualiopi",
  clause_retractation: "Droit de rétractation B2C",
  clause_livraison: "Livraison & transfert des risques",
  clause_stock: "Stock & ruptures",
  clause_propriete_intellectuelle_formation: "Propriété des supports de formation",
};

export const INDUSTRY_CLAUSE_TEXTS: Record<IndustryClause, string> = {
  clause_maintenance:
    "Les prestations de maintenance corrective sont limitées au périmètre défini au devis. Toute évolution fonctionnelle ou refonte fait l'objet d'un avenant ou d'un nouveau devis.",
  clause_propriete_code:
    "La cession des droits patrimoniaux sur le code source, les scripts et les livrables numériques n'intervient qu'après paiement intégral. Jusqu'à cette date, le Vendeur conserve l'ensemble des droits de propriété intellectuelle.",
  clause_hebergement:
    "Sauf stipulation contraire, l'hébergement, la mise en production et la surveillance applicative ne sont pas inclus dans le prix de base. Ils peuvent faire l'objet d'un contrat de maintenance distinct.",
  clause_cession_droits:
    "Les droits d'exploitation sur les créations graphiques, maquettes ou visuels sont cédés au Client après paiement complet, pour les usages et territoires précisés au devis. Toute réutilisation hors périmètre requiert une licence complémentaire.",
  clause_retouches:
    "Le nombre de cycles de retouches inclus est précisé au devis. Au-delà, les retouches supplémentaires sont facturées au tarif horaire en vigueur ou forfaitairement selon l'accord écrit des parties.",
  clause_droit_image:
    "Le Client garantit disposer des autorisations nécessaires pour toute personne photographiée ou filmée. Le Vendeur se réserve le droit d'utiliser les visuels à titre de portfolio, sauf opposition écrite du Client.",
  clause_obligation_moyens:
    "Les prestations de conseil, rédaction, community management ou publicité en ligne relèvent d'une obligation de moyens. Aucun résultat chiffré (trafic, ventes, abonnés) n'est garanti.",
  clause_delais_validation:
    "Les délais de livraison courent à compter de la réception de l'ensemble des éléments nécessaires (brief, accès, validations intermédiaires). Tout retard de validation du Client suspend le délai correspondant.",
  clause_disclaimer_medical:
    "Les prestations de bien-être, coaching ou accompagnement ne constituent ni un acte médical ni un diagnostic. Le Client est invité à consulter un professionnel de santé pour tout trouble nécessitant un avis médical.",
  clause_annulation:
    "Toute annulation par le Client moins de 48 heures avant la séance ou la prestation peut entraîner la facturation d'un acompte non remboursable, dans la limite des frais engagés et du temps réservé.",
  clause_confidentialite:
    "Les informations échangées dans le cadre de la mission sont traitées comme confidentielles. Chaque partie s'engage à ne pas les divulguer à des tiers sans accord préalable, sauf obligation légale.",
  clause_qualiopi:
    "Lorsque le Vendeur est organisme de formation, les modalités d'inscription, d'évaluation et de certification sont précisées au programme. Les conditions de report ou d'annulation de session sont communiquées avant la commande.",
  clause_retractation:
    "Pour les ventes à distance auprès de consommateurs, le droit de rétractation s'applique conformément au Code de la consommation, sous réserve des exceptions légales (produits personnalisés, contenus numériques, etc.).",
  clause_livraison:
    "Les délais de livraison sont indicatifs. Le transfert des risques intervient à la remise au transporteur ou à la mise à disposition du produit selon les modalités choisies au checkout.",
  clause_stock:
    "En cas de rupture de stock ou d'indisponibilité d'un composant, le Vendeur informe le Client dans les meilleurs délais et propose un remboursement, un avoir ou un délai de réapprovisionnement raisonnable.",
  clause_propriete_intellectuelle_formation:
    "Les supports de formation, vidéos et ressources pédagogiques restent la propriété du Vendeur. Le Client dispose d'une licence personnelle et non transférable, sans droit de revente ou de diffusion publique.",
};

export function buildIndustryClausesHtml(clauses: IndustryClause[]): string {
  if (clauses.length === 0) return "";
  const items = clauses
    .map((key) => `<li>${INDUSTRY_CLAUSE_TEXTS[key]}</li>`)
    .join("");
  return `<ul>${items}</ul>`;
}
