import type { IndustryClause } from "@/lib/documents/niche-clauses";
import { buildIndustryClausesHtml } from "@/lib/documents/niche-clauses";

export type SeoFaq = { question: string; answer: string };

export type CgvNicheCluster =
  | "tech"
  | "design"
  | "marketing"
  | "wellness"
  | "consulting"
  | "ecommerce";

export type CgvNicheClusterMeta = {
  id: CgvNicheCluster;
  label: string;
  shortLabel: string;
  description: string;
  focus: string;
};

export const CGV_NICHE_CLUSTERS: Record<CgvNicheCluster, CgvNicheClusterMeta> = {
  tech: {
    id: "tech",
    label: "Tech & Web",
    shortLabel: "Tech",
    description: "Développeurs, intégrateurs, cloud, cybersécurité, data.",
    focus: "propriété intellectuelle sur le code, maintenance et hébergement",
  },
  design: {
    id: "design",
    label: "Création & Design",
    shortLabel: "Design",
    description: "Graphistes, photographes, vidéastes, architectes d'intérieur.",
    focus: "cession de droits, retouches et droit à l'image",
  },
  marketing: {
    id: "marketing",
    label: "Marketing & Contenu",
    shortLabel: "Marketing",
    description: "CM, rédacteurs, traffic managers, traducteurs, UGC.",
    focus: "obligation de moyens, délais de validation et livrables",
  },
  wellness: {
    id: "wellness",
    label: "Bien-être & Santé",
    shortLabel: "Bien-être",
    description: "Sophrologues, coachs sportifs, yoga, esthétique à domicile.",
    focus: "disclaimer non médical, annulations et séances",
  },
  consulting: {
    id: "consulting",
    label: "Conseil & Coaching",
    shortLabel: "Conseil",
    description: "Coaches, formateurs, RH, finance, événementiel.",
    focus: "confidentialité, Qualiopi et cadre des prestations",
  },
  ecommerce: {
    id: "ecommerce",
    label: "E-commerce & Artisanat",
    shortLabel: "E-commerce",
    description: "Shopify, Etsy, dropshipping, infopreneurs, artisans.",
    focus: "rétractation, livraison et gestion des stocks",
  },
};

type RawNiche = {
  slug: string;
  cluster: CgvNicheCluster;
  profession: string;
  searchTerms: string[];
  clauses: IndustryClause[];
  activityDefault: string;
  faqQuestion: string;
  faqAnswer: string;
};

export type CgvNiche = {
  slug: string;
  cluster: CgvNicheCluster;
  profession: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoKeywords: string[];
  seoBlocks: { heading: string; body: string }[];
  specificFAQ: SeoFaq[];
  industrySpecificClauses: IndustryClause[];
  activityDescriptionDefault: string;
  activityDescriptionPlaceholder: string;
  industryClausesHtml: string;
  searchTerms: string[];
};

const RAW_NICHES: RawNiche[] = [
  {
    slug: "developpeur-web",
    cluster: "tech",
    profession: "Développeur Web",
    searchTerms: ["dev web", "freelance développeur", "intégrateur"],
    clauses: ["clause_propriete_code", "clause_maintenance", "clause_hebergement"],
    activityDefault:
      "Conception, développement et maintenance de sites web et applications sur mesure pour clients professionnels et particuliers.",
    faqQuestion: "Dois-je inclure une clause sur le code source ?",
    faqAnswer:
      "Oui. La cession des droits patrimoniaux sur le code doit être explicite, conditionnée au paiement intégral, et distinguer maintenance corrective des évolutions fonctionnelles.",
  },
  {
    slug: "developpeur-mobile",
    cluster: "tech",
    profession: "Développeur Mobile",
    searchTerms: ["ios android", "app mobile freelance"],
    clauses: ["clause_propriete_code", "clause_maintenance", "clause_hebergement"],
    activityDefault:
      "Développement d'applications mobiles iOS et Android, publication sur stores et maintenance corrective.",
    faqQuestion: "Les CGV couvrent-elles la publication sur l'App Store ?",
    faqAnswer:
      "Précisez si la soumission aux stores, les comptes développeur et les mises à jour OS sont inclus ou facturés séparément.",
  },
  {
    slug: "integrateur-web",
    cluster: "tech",
    profession: "Intégrateur Web",
    searchTerms: ["webmaster", "intégration html css"],
    clauses: ["clause_propriete_code", "clause_delais_validation", "clause_hebergement"],
    activityDefault:
      "Intégration HTML/CSS, déploiement et maintenance de sites vitrine et e-commerce pour TPE.",
    faqQuestion: "Comment limiter le scope creep en intégration ?",
    faqAnswer:
      "Fixez le nombre de pages, de cycles de recette et les délais de validation client dans vos CGV et devis.",
  },
  {
    slug: "administrateur-systeme",
    cluster: "tech",
    profession: "Administrateur Système",
    searchTerms: ["sysadmin", "réseaux freelance"],
    clauses: ["clause_maintenance", "clause_confidentialite", "clause_hebergement"],
    activityDefault:
      "Administration de serveurs, supervision, sauvegardes et support infrastructure pour PME.",
    faqQuestion: "Faut-il une clause de confidentialité ?",
    faqAnswer:
      "Fortement recommandée : vous accédez à des systèmes sensibles. Mentionnez les accès, logs et obligations de sécurité.",
  },
  {
    slug: "consultant-cybersecurite",
    cluster: "tech",
    profession: "Consultant Cybersécurité",
    searchTerms: ["pentest", "audit sécurité"],
    clauses: ["clause_confidentialite", "clause_obligation_moyens", "clause_delais_validation"],
    activityDefault:
      "Audits de sécurité, tests d'intrusion et recommandations de conformité pour entreprises.",
    faqQuestion: "Comment cadrer un audit de sécurité ?",
    faqAnswer:
      "Les CGV doivent préciser le périmètre testé, les limites de responsabilité et le caractère non garanti des résultats.",
  },
  {
    slug: "expert-seo",
    cluster: "tech",
    profession: "Expert SEO",
    searchTerms: ["référencement naturel", "consultant seo"],
    clauses: ["clause_obligation_moyens", "clause_delais_validation"],
    activityDefault:
      "Audit SEO, optimisation technique et éditoriale, suivi de positionnement pour sites web.",
    faqQuestion: "Puis-je garantir la première page Google ?",
    faqAnswer:
      "Non. Formulez une obligation de moyens sans promesse de positionnement. Les CGV JuriVite intègrent cette nuance.",
  },
  {
    slug: "data-analyst",
    cluster: "tech",
    profession: "Data Analyst",
    searchTerms: ["data scientist freelance", "analyse données"],
    clauses: ["clause_confidentialite", "clause_propriete_code", "clause_obligation_moyens"],
    activityDefault:
      "Analyse de données, tableaux de bord et reporting décisionnel pour directions marketing et opérationnelles.",
    faqQuestion: "Comment traiter les données clients dans les CGV ?",
    faqAnswer:
      "Prévoyez confidentialité, durée de conservation et conformité RGPD si vous traitez des données personnelles.",
  },
  {
    slug: "consultant-cloud",
    cluster: "tech",
    profession: "Consultant Cloud",
    searchTerms: ["aws azure", "architecte cloud"],
    clauses: ["clause_hebergement", "clause_maintenance", "clause_confidentialite"],
    activityDefault:
      "Migration cloud, architecture AWS/Azure et optimisation des coûts d'infrastructure.",
    faqQuestion: "L'hébergement cloud est-il inclus ?",
    faqAnswer:
      "Non par défaut. Séparez conseil, mise en place et run/monitoring dans vos CGV pour éviter les malentendus.",
  },
  {
    slug: "graphiste",
    cluster: "design",
    profession: "Graphiste",
    searchTerms: ["designer indépendant", "identité visuelle"],
    clauses: ["clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Création de logos, chartes graphiques et supports print et digital pour marques et indépendants.",
    faqQuestion: "Quand céder les droits au client ?",
    faqAnswer:
      "La cession intervient généralement après paiement complet, pour les usages précisés au devis (print, web, réseaux sociaux).",
  },
  {
    slug: "ux-ui-designer",
    cluster: "design",
    profession: "UX/UI Designer",
    searchTerms: ["design interface", "ux freelance"],
    clauses: ["clause_cession_droits", "clause_retouches", "clause_delais_validation"],
    activityDefault:
      "Conception d'expériences utilisateur, maquettes Figma et design systems pour applications et sites.",
    faqQuestion: "Les fichiers sources Figma sont-ils cédés ?",
    faqAnswer:
      "Précisez dans vos CGV si vous livrez les fichiers éditables ou uniquement les exports, et à quelle condition de paiement.",
  },
  {
    slug: "webdesigner",
    cluster: "design",
    profession: "Webdesigner",
    searchTerms: ["design site web", "maquette web"],
    clauses: ["clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Design de sites vitrine et landing pages, responsive et orientés conversion.",
    faqQuestion: "Combien de maquettes inclure ?",
    faqAnswer:
      "Indiquez le nombre de propositions et de retouches incluses. Au-delà, facturez à l'heure ou au forfait.",
  },
  {
    slug: "illustrateur",
    cluster: "design",
    profession: "Illustrateur",
    searchTerms: ["illustration freelance", "dessin sur commande"],
    clauses: ["clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Illustrations sur commande pour édition, presse, packaging et communication digitale.",
    faqQuestion: "Puis-je réutiliser mes illustrations en portfolio ?",
    faqAnswer:
      "Oui, sauf clause contraire. Mentionnez le droit de portfolio dans vos CGV sauf opposition écrite du client.",
  },
  {
    slug: "photographe",
    cluster: "design",
    profession: "Photographe",
    searchTerms: ["photo corporate", "photographe mariage"],
    clauses: ["clause_droit_image", "clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Shootings photo corporate, événementiel et mariage ; retouches et livraison numérique.",
    faqQuestion: "Faut-il une autorisation de droit à l'image ?",
    faqAnswer:
      "Oui pour les personnes identifiables. Vos CGV peuvent rappeler que le client garantit les autorisations nécessaires.",
  },
  {
    slug: "videaste",
    cluster: "design",
    profession: "Vidéaste",
    searchTerms: ["réalisateur freelance", "vidéo entreprise"],
    clauses: ["clause_droit_image", "clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Captation et montage vidéo pour entreprises, réseaux sociaux et événements.",
    faqQuestion: "La musique sous licence est-elle incluse ?",
    faqAnswer:
      "Précisez qui fournit les licences musicales et stock. Les CGV clarifient le périmètre des livrables.",
  },
  {
    slug: "monteur-video",
    cluster: "design",
    profession: "Monteur Vidéo",
    searchTerms: ["montage vidéo freelance", "post-production"],
    clauses: ["clause_cession_droits", "clause_delais_validation", "clause_retouches"],
    activityDefault:
      "Montage et post-production vidéo à partir de rushes fournis par le client.",
    faqQuestion: "Que se passe-t-il si les rushes arrivent en retard ?",
    faqAnswer:
      "Les délais courent à réception des éléments. Cette règle doit figurer dans vos CGV et devis.",
  },
  {
    slug: "motion-designer",
    cluster: "design",
    profession: "Motion Designer",
    searchTerms: ["animation motion", "after effects freelance"],
    clauses: ["clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Animations motion design pour publicités, réseaux sociaux et présentations corporate.",
    faqQuestion: "Les fichiers sources AE sont-ils livrés ?",
    faqAnswer:
      "Non par défaut. Indiquez dans vos CGV si les projets sources sont cédés moyennant supplément.",
  },
  {
    slug: "architecte-interieur",
    cluster: "design",
    profession: "Architecte d'intérieur",
    searchTerms: ["décorateur intérieur", "aménagement"],
    clauses: ["clause_cession_droits", "clause_delais_validation", "clause_obligation_moyens"],
    activityDefault:
      "Conception et accompagnement de projets d'aménagement intérieur pour particuliers et pros.",
    faqQuestion: "Les CGV couvrent-elles le suivi de chantier ?",
    faqAnswer:
      "Distinguez mission de conception et coordination de travaux. Chaque phase peut faire l'objet d'un devis séparé.",
  },
  {
    slug: "community-manager",
    cluster: "marketing",
    profession: "Community Manager",
    searchTerms: ["cm freelance", "gestion réseaux sociaux"],
    clauses: ["clause_obligation_moyens", "clause_delais_validation"],
    activityDefault:
      "Animation de communautés, création de contenus et modération sur les réseaux sociaux.",
    faqQuestion: "Puis-je garantir un nombre d'abonnés ?",
    faqAnswer:
      "Non. Vos CGV formulent une obligation de moyens sans engagement sur les KPIs de croissance.",
  },
  {
    slug: "redacteur-web",
    cluster: "marketing",
    profession: "Rédacteur Web",
    searchTerms: ["copywriter", "rédaction seo"],
    clauses: ["clause_cession_droits", "clause_obligation_moyens", "clause_delais_validation"],
    activityDefault:
      "Rédaction d'articles, pages web et contenus SEO pour sites et blogs professionnels.",
    faqQuestion: "Les textes sont-ils uniques et cédés ?",
    faqAnswer:
      "Précisez cession des droits d'auteur après paiement et interdiction de revente ou duplication sans accord.",
  },
  {
    slug: "traffic-manager",
    cluster: "marketing",
    profession: "Traffic Manager",
    searchTerms: ["google ads freelance", "facebook ads"],
    clauses: ["clause_obligation_moyens", "clause_delais_validation"],
    activityDefault:
      "Gestion de campagnes publicitaires Google Ads, Meta Ads et optimisation des budgets média.",
    faqQuestion: "Le budget publicitaire est-il inclus ?",
    faqAnswer:
      "Non. Séparez honoraires de gestion et budget média avancé par le client sur les plateformes.",
  },
  {
    slug: "consultant-marketing",
    cluster: "marketing",
    profession: "Consultant Marketing",
    searchTerms: ["stratégie marketing freelance"],
    clauses: ["clause_obligation_moyens", "clause_confidentialite"],
    activityDefault:
      "Conseil en stratégie marketing, positionnement et plans d'action pour TPE et startups.",
    faqQuestion: "Comment limiter ma responsabilité en conseil ?",
    faqAnswer:
      "Obligation de moyens, confidentialité et exclusion de garantie de résultats chiffrés.",
  },
  {
    slug: "attache-presse",
    cluster: "marketing",
    profession: "Attaché de presse",
    searchTerms: ["relations presse freelance", "rp"],
    clauses: ["clause_obligation_moyens", "clause_confidentialite"],
    activityDefault:
      "Relations presse, rédaction de communiqués et médiation avec les journalistes.",
    faqQuestion: "Puis-je garantir une parution presse ?",
    faqAnswer:
      "Non. Les retombées média dépendent des rédactions. Formulez une obligation de moyens dans vos CGV.",
  },
  {
    slug: "voix-off",
    cluster: "marketing",
    profession: "Voix-off",
    searchTerms: ["comédien voix", "voice over"],
    clauses: ["clause_cession_droits", "clause_retouches"],
    activityDefault:
      "Enregistrement de voix-off pour publicités, e-learning, vidéos corporate et podcasts.",
    faqQuestion: "Quels usages sont cédés au client ?",
    faqAnswer:
      "Précisez territoire, durée, supports (TV, web, radio) et nombre de retakes inclus.",
  },
  {
    slug: "traducteur",
    cluster: "marketing",
    profession: "Traducteur",
    searchTerms: ["interprète freelance", "traduction professionnelle"],
    clauses: ["clause_confidentialite", "clause_cession_droits", "clause_delais_validation"],
    activityDefault:
      "Traduction et relecture professionnelle de documents commerciaux, juridiques et techniques.",
    faqQuestion: "Comment traiter la confidentialité des documents ?",
    faqAnswer:
      "Clause de confidentialité recommandée, surtout pour contenus sensibles ou non publics.",
  },
  {
    slug: "createur-contenu",
    cluster: "marketing",
    profession: "Créateur de contenu",
    searchTerms: ["ugc", "influenceur micro"],
    clauses: ["clause_cession_droits", "clause_droit_image", "clause_obligation_moyens"],
    activityDefault:
      "Création de contenus UGC, vidéos courtes et collaborations marque pour réseaux sociaux.",
    faqQuestion: "Le client peut-il réutiliser mes vidéos en pub ?",
    faqAnswer:
      "Définissez les droits d'exploitation (organique vs paid media) et la durée de licence dans vos CGV.",
  },
  {
    slug: "sophrologue",
    cluster: "wellness",
    profession: "Sophrologue",
    searchTerms: ["sophrologie auto-entrepreneur", "séance sophrologie"],
    clauses: ["clause_disclaimer_medical", "clause_annulation"],
    activityDefault:
      "Accompagnement en sophrologie en cabinet et à distance pour particuliers et entreprises.",
    faqQuestion: "Dois-je préciser que ce n'est pas un acte médical ?",
    faqAnswer:
      "Oui. Un disclaimer clair limite les risques et informe le client sur la nature bien-être de la prestation.",
  },
  {
    slug: "naturopathe",
    cluster: "wellness",
    profession: "Naturopathe",
    searchTerms: ["naturopathie freelance", "consultation naturo"],
    clauses: ["clause_disclaimer_medical", "clause_annulation"],
    activityDefault:
      "Consultations de naturopathie et conseils hygiène de vie (hors actes médicaux).",
    faqQuestion: "Quelles mentions pour un naturopathe ?",
    faqAnswer:
      "Disclaimer non médical, annulations et absence de promesse de guérison. Faites valider si activité réglementée.",
  },
  {
    slug: "coach-sportif",
    cluster: "wellness",
    profession: "Coach Sportif",
    searchTerms: ["coach fitness freelance", "coaching en ligne"],
    clauses: ["clause_disclaimer_medical", "clause_annulation"],
    activityDefault:
      "Coaching sportif individuel, en salle, à domicile ou en visio pour particuliers.",
    faqQuestion: "Faut-il un questionnaire de santé ?",
    faqAnswer:
      "Recommandé. Vos CGV peuvent renvoyer à un certificat médical et exclure la responsabilité sans contre-indication signalée.",
  },
  {
    slug: "dieteticien",
    cluster: "wellness",
    profession: "Diététicien",
    searchTerms: ["nutritionniste freelance", "conseil nutrition"],
    clauses: ["clause_disclaimer_medical", "clause_annulation"],
    activityDefault:
      "Conseils nutritionnels et accompagnement alimentaire pour particuliers (hors pathologies nécessitant un avis médical).",
    faqQuestion: "Puis-je promettre une perte de poids ?",
    faqAnswer:
      "Non. Restez sur un accompagnement éducatif avec disclaimer et renvoi vers un médecin si besoin.",
  },
  {
    slug: "professeur-yoga",
    cluster: "wellness",
    profession: "Professeur de Yoga",
    searchTerms: ["yoga pilates freelance", "cours yoga"],
    clauses: ["clause_disclaimer_medical", "clause_annulation"],
    activityDefault:
      "Cours de yoga et pilates en studio, entreprise ou en ligne pour groupes et particuliers.",
    faqQuestion: "Comment gérer les annulations de cours ?",
    faqAnswer:
      "Prévoyez un délai d'annulation et éventuellement un acompte non remboursable pour les cours privés.",
  },
  {
    slug: "masseur-bien-etre",
    cluster: "wellness",
    profession: "Masseur bien-être",
    searchTerms: ["massage non thérapeutique", "massage domicile"],
    clauses: ["clause_disclaimer_medical", "clause_annulation"],
    activityDefault:
      "Massages bien-être non thérapeutiques à domicile ou en cabinet.",
    faqQuestion: "Massage bien-être vs thérapeutique ?",
    faqAnswer:
      "Précisez le caractère non médical et les contre-indications. Certaines activités nécessitent un diplôme ou agrément.",
  },
  {
    slug: "estheticienne",
    cluster: "wellness",
    profession: "Esthéticienne",
    searchTerms: ["esthétique domicile", "soins beauté"],
    clauses: ["clause_annulation", "clause_disclaimer_medical"],
    activityDefault:
      "Soins esthétiques et beauté à domicile ou en institut pour particuliers.",
    faqQuestion: "Comment encadrer les produits utilisés ?",
    faqAnswer:
      "Mentionnez allergies éventuelles, contre-indications et politique d'annulation des rendez-vous.",
  },
  {
    slug: "coach-vie",
    cluster: "consulting",
    profession: "Coach de vie",
    searchTerms: ["life coach", "coaching personnel"],
    clauses: ["clause_confidentialite", "clause_obligation_moyens", "clause_disclaimer_medical"],
    activityDefault:
      "Accompagnement au développement personnel et professionnel (coaching, pas thérapie).",
    faqQuestion: "Coaching vs psychothérapie ?",
    faqAnswer:
      "Clarifiez que vous n'êtes pas thérapeute. Confidentialité et obligation de moyens sont essentielles.",
  },
  {
    slug: "formateur",
    cluster: "consulting",
    profession: "Formateur",
    searchTerms: ["formateur indépendant qualiopi", "organisme formation"],
    clauses: ["clause_qualiopi", "clause_propriete_intellectuelle_formation", "clause_annulation"],
    activityDefault:
      "Formation professionnelle inter et intra-entreprise, présentiel et distanciel.",
    faqQuestion: "Qualiopi change-t-il les CGV ?",
    faqAnswer:
      "Oui : modalités d'inscription, évaluation, accessibilité et conditions d'annulation de session doivent être transparentes.",
  },
  {
    slug: "consultant-rh",
    cluster: "consulting",
    profession: "Consultant RH",
    searchTerms: ["recruteur freelance", "conseil rh"],
    clauses: ["clause_confidentialite", "clause_obligation_moyens"],
    activityDefault:
      "Conseil RH, recrutement et accompagnement des managers pour PME.",
    faqQuestion: "Données candidats : que prévoir ?",
    faqAnswer:
      "Confidentialité stricte, durée de conservation et conformité RGPD pour les données personnelles traitées.",
  },
  {
    slug: "assistante-virtuelle",
    cluster: "consulting",
    profession: "Assistante Virtuelle",
    searchTerms: ["adv freelance", "assistante administrative"],
    clauses: ["clause_confidentialite", "clause_delais_validation"],
    activityDefault:
      "Assistance administrative, gestion d'agendas, e-mails et tâches opérationnelles à distance.",
    faqQuestion: "Comment facturer une assistante virtuelle ?",
    faqAnswer:
      "Forfait mensuel ou hourly. Précisez disponibilité, délais de réponse et périmètre des tâches dans vos CGV.",
  },
  {
    slug: "consultant-financier",
    cluster: "consulting",
    profession: "Consultant Financier",
    searchTerms: ["daf externalisé", "conseil finance tpe"],
    clauses: ["clause_confidentialite", "clause_obligation_moyens"],
    activityDefault:
      "Conseil financier, reporting et pilotage de trésorerie pour dirigeants de TPE.",
    faqQuestion: "Suis-je un conseiller en investissement ?",
    faqAnswer:
      "Si vous n'êtes pas CIF/IAS, ne promettez pas de conseil en investissement réglementé. Cadrez votre mission.",
  },
  {
    slug: "conciergerie",
    cluster: "consulting",
    profession: "Conciergerie",
    searchTerms: ["conciergerie entreprise", "services aux entreprises"],
    clauses: ["clause_confidentialite", "clause_obligation_moyens"],
    activityDefault:
      "Services de conciergerie d'entreprise : accueil, logistique et demandes premium pour collaborateurs.",
    faqQuestion: "Comment limiter les demandes hors périmètre ?",
    faqAnswer:
      "Listez les services inclus et les suppléments. Les CGV encadrent les délais et la confidentialité.",
  },
  {
    slug: "event-planner",
    cluster: "consulting",
    profession: "Organisateur d'événements",
    searchTerms: ["event planner freelance", "organisation séminaire"],
    clauses: ["clause_annulation", "clause_delais_validation", "clause_obligation_moyens"],
    activityDefault:
      "Organisation d'événements corporate, séminaires et lancements produits.",
    faqQuestion: "Annulation d'événement : que prévoir ?",
    faqAnswer:
      "Échelle d'annulation selon le délai (acomptes fournisseurs, pénalités). Indispensable dans vos CGV.",
  },
  {
    slug: "wedding-planner",
    cluster: "consulting",
    profession: "Wedding Planner",
    searchTerms: ["organisation mariage", "wedding planner france"],
    clauses: ["clause_annulation", "clause_delais_validation", "clause_obligation_moyens"],
    activityDefault:
      "Organisation complète ou partielle de mariages et célébrations privées.",
    faqQuestion: "Acompte et annulation mariage ?",
    faqAnswer:
      "Prévoyez acompte à la réservation, barème d'annulation et coordination des prestataires tiers.",
  },
  {
    slug: "ecommerce-shopify",
    cluster: "ecommerce",
    profession: "E-commerçant Shopify",
    searchTerms: ["boutique shopify", "vente en ligne"],
    clauses: ["clause_retractation", "clause_livraison", "clause_stock"],
    activityDefault:
      "Vente en ligne de produits via boutique Shopify auprès de particuliers et professionnels.",
    faqQuestion: "Rétractation 14 jours en e-commerce ?",
    faqAnswer:
      "Oui en B2C, avec exceptions (produits personnalisés, scellés, etc.). Vos CGV doivent les lister clairement.",
  },
  {
    slug: "dropshipper",
    cluster: "ecommerce",
    profession: "Dropshipper",
    searchTerms: ["dropshipping france", "e-commerce sans stock"],
    clauses: ["clause_retractation", "clause_livraison", "clause_stock"],
    activityDefault:
      "Vente en ligne avec expédition directe depuis fournisseurs tiers (dropshipping).",
    faqQuestion: "Délais de livraison longs : que dire ?",
    faqAnswer:
      "Indiquez délais indicatifs, origine des produits et procédure en cas de rupture ou retard transporteur.",
  },
  {
    slug: "vendeur-etsy",
    cluster: "ecommerce",
    profession: "Vendeur Etsy",
    searchTerms: ["etsy france cgv", "artisanat en ligne"],
    clauses: ["clause_retractation", "clause_livraison", "clause_stock"],
    activityDefault:
      "Créations artisanales fait-main vendues sur Etsy et site personnel.",
    faqQuestion: "Produits faits main et rétractation ?",
    faqAnswer:
      "Les produits personnalisés peuvent être exemptés de rétractation si le client a donné son accord exprès.",
  },
  {
    slug: "artisan",
    cluster: "ecommerce",
    profession: "Artisan",
    searchTerms: ["artisan bijoux", "créations fait main cgv"],
    clauses: ["clause_retractation", "clause_livraison", "clause_stock"],
    activityDefault:
      "Fabrication et vente de créations artisanales (bijoux, bougies, textiles) sur commande et en stock.",
    faqQuestion: "Commandes sur mesure : rétractation ?",
    faqAnswer:
      "Exemption possible pour biens personnalisés. Mentionnez-le avant validation de commande.",
  },
  {
    slug: "box-abonnement",
    cluster: "ecommerce",
    profession: "Créateur de Box",
    searchTerms: ["box abonnement", "subscription box france"],
    clauses: ["clause_retractation", "clause_livraison", "clause_annulation"],
    activityDefault:
      "Box par abonnement mensuel ou trimestriel, livrées à domicile.",
    faqQuestion: "Résiliation d'abonnement box ?",
    faqAnswer:
      "Précisez durée d'engagement, préavis de résiliation et politique de remboursement des box expédiées.",
  },
  {
    slug: "infopreneur",
    cluster: "ecommerce",
    profession: "Infopreneur",
    searchTerms: ["formation en ligne", "vente ebook"],
    clauses: [
      "clause_propriete_intellectuelle_formation",
      "clause_retractation",
      "clause_obligation_moyens",
    ],
    activityDefault:
      "Vente de formations en ligne, ebooks et programmes d'accompagnement digital.",
    faqQuestion: "Rétractation sur formation en ligne ?",
    faqAnswer:
      "Renonciation possible si exécution immédiate avec accord exprès. Indispensable au checkout.",
  },
  {
    slug: "bricoleur",
    cluster: "ecommerce",
    profession: "Bricoleur",
    searchTerms: ["homme toutes mains", "petits travaux"],
    clauses: ["clause_obligation_moyens", "clause_annulation", "clause_delais_validation"],
    activityDefault:
      "Petits travaux de bricolage, montage et réparations à domicile pour particuliers.",
    faqQuestion: "Assurance décennale nécessaire ?",
    faqAnswer:
      "Selon la nature des travaux. Vos CGV précisent le périmètre et renvoient aux assurances obligatoires le cas échéant.",
  },
  {
    slug: "traiteur",
    cluster: "ecommerce",
    profession: "Traiteur",
    searchTerms: ["chef à domicile", "traiteur événement"],
    clauses: ["clause_annulation", "clause_livraison", "clause_stock"],
    activityDefault:
      "Prestations traiteur, buffets et repas à domicile pour événements privés et corporate.",
    faqQuestion: "Annulation événement traiteur ?",
    faqAnswer:
      "Barème selon délai (denrées commandées, personnel mobilisé). À intégrer clairement dans vos CGV.",
  },
  {
    slug: "dj",
    cluster: "ecommerce",
    profession: "DJ",
    searchTerms: ["dj mariage", "animateur soirée"],
    clauses: ["clause_annulation", "clause_cession_droits", "clause_droit_image"],
    activityDefault:
      "Animation musicale DJ pour mariages, soirées privées et événements corporate.",
    faqQuestion: "Acompte et matériel DJ ?",
    faqAnswer:
      "Précisez acompte à la réservation, annulation tardive et responsabilité du client pour l'accès électrique et la salle.",
  },
  {
    slug: "agent-immobilier",
    cluster: "ecommerce",
    profession: "Agent Immobilier",
    searchTerms: ["mandataire immobilier ei", "agent immo indépendant"],
    clauses: ["clause_confidentialite", "clause_obligation_moyens", "clause_annulation"],
    activityDefault:
      "Mandataire immobilier indépendant : vente et location de biens pour particuliers.",
    faqQuestion: "CGV ou mandat pour l'immobilier ?",
    faqAnswer:
      "Le mandat de vente prime, mais des CGV générales encadrent votre site et vos prestations annexes (estimation en ligne, etc.).",
  },
];

export const POPULAR_NICHE_SLUGS = [
  "developpeur-web",
  "graphiste",
  "photographe",
  "sophrologue",
  "coach-sportif",
  "community-manager",
  "ecommerce-shopify",
  "formateur",
] as const;

function buildSeoBlocks(raw: RawNiche): { heading: string; body: string }[] {
  const cluster = CGV_NICHE_CLUSTERS[raw.cluster];
  const profLower = raw.profession.toLowerCase();

  return [
    {
      heading: `Pourquoi un ${profLower} a besoin de CGV ?`,
      body: `En tant que ${profLower}, vous vendez des prestations ou des produits sans toujours avoir un cadre écrit. Sans CGV, un retard de paiement, une annulation ou un litige sur le périmètre devient difficile à trancher. Des Conditions Générales de Vente claires rassurent vos clients et vous protègent avant même le premier devis.`,
    },
    {
      heading: `Clauses adaptées : ${cluster.focus}`,
      body: `Les ${profLower}s ont des enjeux juridiques spécifiques. JuriVite prévoit des mentions orientées ${cluster.focus}, en complément des articles standards (prix, délais, rétractation B2C, médiation). Vous personnalisez le formulaire avec votre SIRET et vos conditions réelles.`,
    },
    {
      heading: `Activité type : ${raw.profession}`,
      body: `${raw.activityDefault} Ce modèle reprend les formulations adaptées à ce profil (${raw.searchTerms.slice(0, 3).join(", ")}). Vous ajustez le texte final avant publication sur votre site ou boutique.`,
    },
    {
      heading: "Publier vos CGV sur votre site",
      body: `Créez une page /cgv accessible depuis le footer. En e-commerce ou prise de rendez-vous en ligne, le lien doit apparaître avant la commande. Combinez CGV, mentions légales et politique RGPD si vous collectez des données.`,
    },
  ];
}

function buildNiche(raw: RawNiche): CgvNiche {
  const cluster = CGV_NICHE_CLUSTERS[raw.cluster];
  const profLower = raw.profession.toLowerCase();

  return {
    slug: raw.slug,
    cluster: raw.cluster,
    profession: raw.profession,
    path: `/modeles/cgv-${raw.slug}`,
    metaTitle: `CGV ${raw.profession} auto-entrepreneur — modèle conforme PDF`,
    metaDescription: `Créez vos CGV de ${profLower} en 5 min : ${cluster.focus}, paiement, rétractation, SIRET. Modèle structuré pour freelances et micro-entreprises — aperçu gratuit.`,
    h1: `Sécurisez votre activité de ${profLower}`,
    intro: `Des Conditions Générales de Vente pensées pour les ${profLower}s : clauses sur ${cluster.focus}, plus le socle légal (prix, délais, médiation). Formulaire guidé, PDF en quelques minutes — pas un modèle générique copié-collé.`,
    seoKeywords: [
      `cgv ${profLower}`,
      `cgv ${profLower} auto-entrepreneur`,
      `conditions générales vente ${profLower}`,
      `modèle cgv ${profLower}`,
      ...raw.searchTerms.map((t) => `cgv ${t}`),
    ],
    seoBlocks: buildSeoBlocks(raw),
    specificFAQ: [
      {
        question: raw.faqQuestion,
        answer: raw.faqAnswer,
      },
      {
        question: `Un ${profLower} en micro-entreprise doit-il avoir des CGV ?`,
        answer:
          "Dès que vous vendez en ligne ou à distance, des CGV accessibles avant la commande sont fortement recommandées — voire obligatoires en B2C pour l'information précontractuelle.",
      },
      {
        question: `Combien de temps pour rédiger ses CGV de ${profLower} ?`,
        answer:
          "Comptez environ 5 minutes : identité (SIRET), description d'activité pré-remplie, conditions commerciales, puis export PDF. Les clauses métier sont ajoutées automatiquement.",
      },
    ],
    industrySpecificClauses: raw.clauses,
    activityDescriptionDefault: raw.activityDefault,
    activityDescriptionPlaceholder: raw.activityDefault.slice(0, 80) + "…",
    industryClausesHtml: buildIndustryClausesHtml(raw.clauses),
    searchTerms: [raw.profession, ...raw.searchTerms],
  };
}

export const cgvNiches: CgvNiche[] = RAW_NICHES.map(buildNiche);

export const cgvNicheSlugs = cgvNiches.map((n) => n.slug);

export function getCgvNichePath(slug: string): string {
  return `/modeles/cgv-${slug}`;
}

export function getCgvNicheModelSlug(nicheSlug: string): string {
  return `cgv-${nicheSlug}`;
}

export function parseCgvNicheModelSlug(slug: string): string | null {
  if (!slug.startsWith("cgv-")) return null;
  const nicheSlug = slug.slice(4);
  return isCgvNicheSlug(nicheSlug) ? nicheSlug : null;
}

export function getCgvNiche(slug: string): CgvNiche | undefined {
  return cgvNiches.find((n) => n.slug === slug);
}

export function isCgvNicheSlug(slug: string): boolean {
  return cgvNicheSlugs.includes(slug);
}

export function getCgvNichesByCluster(cluster: CgvNicheCluster): CgvNiche[] {
  return cgvNiches.filter((n) => n.cluster === cluster);
}

export function searchCgvNiches(query: string, limit = 8): CgvNiche[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = cgvNiches
    .map((niche) => ({ niche, score: scoreNicheMatch(niche, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ niche }) => niche);
}

/** Évite les faux positifs (ex. « nda » dans « mandataire ») */
function scoreNicheMatch(niche: CgvNiche, q: string): number {
  let score = 0;
  const profession = niche.profession.toLowerCase();
  const slug = niche.slug.toLowerCase();
  const slugSpaced = slug.replace(/-/g, " ");
  const terms = [
    profession,
    slugSpaced,
    ...niche.searchTerms.map((t) => t.toLowerCase()),
    ...niche.seoKeywords.map((k) => k.toLowerCase()),
  ];

  if (slug === q || slugSpaced === q) score += 20;
  if (profession === q) score += 18;
  if (slug.startsWith(q) || slugSpaced.startsWith(q)) score += 12;
  if (profession.startsWith(q)) score += 10;

  for (const term of terms) {
    if (term === q) score += 8;
    else if (q.length >= 3 && term.startsWith(q)) score += 5;
    else if (q.length >= 4 && term.includes(q)) score += 3;
  }

  const queryWords = q.split(/\s+/).filter((w) => w.length >= 2);
  for (const word of queryWords) {
    if (terms.some((t) => t === word || (word.length >= 3 && t.startsWith(word)))) {
      score += 3;
    }
  }

  if (
    queryWords.length > 1 &&
    queryWords.every((word) =>
      terms.some(
        (t) =>
          t.includes(word) ||
          t.replace(/-/g, " ").includes(word),
      ),
    )
  ) {
    score += 10;
  }

  return score;
}

export function getGenerateCgvUrl(nicheSlug: string): string {
  return `/generate/cgv?metier=${encodeURIComponent(nicheSlug)}`;
}

export function getPopularNiches(): CgvNiche[] {
  return POPULAR_NICHE_SLUGS.map((slug) => getCgvNiche(slug)).filter(
    (n): n is CgvNiche => Boolean(n),
  );
}

export function nicheHowToSteps(profession: string): string[] {
  return [
    `Choisissez le modèle CGV ${profession.toLowerCase()} et ouvrez le formulaire`,
    "Complétez votre SIRET, adresse et conditions de paiement",
    "Vérifiez les clauses métier et téléchargez votre PDF conforme",
  ];
}
