export const homeFaqs = [
  {
    question: "JuriVite remplace-t-il un avocat ?",
    answer:
      "Non. JuriVite fournit des modèles structurés pour freelances et TPE. Pour des situations complexes ou réglementées, consultez un professionnel du droit.",
  },
  {
    question: "Quels documents juridiques puis-je générer ?",
    answer:
      "CGV, mentions légales, politique de confidentialité RGPD, contrat de prestation de services et devis conforme — avec export PDF.",
  },
  {
    question: "Combien coûte JuriVite ?",
    answer:
      "Gratuit avec filigrane. Pro à 9 €/mois (20 PDF sans filigrane). Business à 30 €/mois (illimité + clé API).",
  },
  {
    question: "Les PDF sont-ils conformes pour un site français ?",
    answer:
      "Les modèles couvrent les mentions essentielles pour les cas standards. Personnalisez selon votre activité et faites relire si nécessaire.",
  },
  {
    question: "Puis-je utiliser JuriVite en auto-entrepreneur ?",
    answer:
      "Oui, les formulaires sont pensés pour micro-entreprises, freelances et petites structures avec SIRET.",
  },
  {
    question: "Comment fonctionne la clé API Business ?",
    answer:
      "Le plan Business inclut POST /api/v1/generate-pdf avec Authorization Bearer pour intégrer la génération dans vos outils.",
  },
] as const;
