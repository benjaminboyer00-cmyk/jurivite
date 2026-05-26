import type { DocumentSlug } from "@/lib/documents/registry";

export type SeoFaq = { question: string; answer: string };

export type DocumentPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  seoBlocks: { heading: string; body: string }[];
  faqs: SeoFaq[];
};

export const documentPageContent: Record<DocumentSlug, DocumentPageContent> = {
  cgv: {
    metaTitle:
      "Sécurisez votre activité de freelance — CGV conformes pour indépendants et TPE",
    metaDescription:
      "Conditions Générales de Vente adaptées à votre statut : prix, délais, rétractation, TVA micro ou société. Conformité, sérénité et cadre contractuel clair pour freelances et petites entreprises.",
    h1: "Sécurisez votre activité de freelance",
    intro:
      "Les Conditions Générales de Vente encadrent chaque vente et vous protègent en cas de litige, de retard de paiement ou de désaccord sur le périmètre. JuriVite vous guide pour être conforme et rassurer vos clients — sans jargon ni paperasse interminable. Fini les modèles génériques copiés-collés qui ne correspondent pas à votre réalité.",
    seoBlocks: [
      {
        heading: "Qu'est-ce que des CGV et à qui s'adressent-elles ?",
        body: "Les Conditions Générales de Vente (CGV) sont le document qui fixe les règles applicables à toute commande : identification du vendeur, description des prestations, prix, modalités de paiement, délais, livraison ou exécution, garanties et responsabilité. Elles s'adressent aux freelances, consultants, agences, artisans, e-commerçants et TPE qui vendent à des particuliers (B2C) ou à des professionnels (B2B). Contrairement à une simple page « À propos », les CGV ont une valeur contractuelle : le client les accepte en passant commande. Pour un indépendant, c'est le socle qui transforme une relation informelle en cadre commercial lisible, sur votre site, dans vos devis ou par e-mail avant signature.",
      },
      {
        heading: "CGV : quelles obligations légales en France ?",
        body: "Le Code de la consommation impose une information précontractuelle claire pour les ventes à distance et hors établissement : prix TTC, frais annexes, délai d'exécution, droit de rétractation (14 jours en B2C sauf exceptions), moyens de paiement, médiation de la consommation et coordonnées du vendeur. En B2B, les règles diffèrent mais la transparence reste essentielle pour éviter les litiges. Les CGV doivent être accessibles avant la commande et rédigées en français. Si vous exercez une activité réglementée (formation certifiante, santé, finance), des mentions supplémentaires peuvent s'appliquer. JuriVite structure ces informations en articles numérotés pour faciliter la lecture et la mise à jour lorsque vos tarifs ou délais évoluent.",
      },
      {
        heading: "Risques, litiges et sanctions sans CGV adaptées",
        body: "Sans CGV, chaque désaccord repose sur des échanges oraux ou des e-mails dispersés : révisions non facturées, retards de paiement, contestation du périmètre, demandes de remboursement. En B2C, l'absence d'information sur la rétractation ou les frais peut entraîner des sanctions administratives et renforcer la position du client en cas de contentieux. Même en B2B, un client structuré refusera parfois de commander sans conditions écrites. L'image compte autant que la loi : un site sans CGV visible paraît amateur et freine la conversion. Le coût d'un litige ou d'un impayé dépasse largement celui d'un document généré en quelques minutes. Anticiper vaut mieux que défendre a posteriori devant un médiateur ou un tribunal.",
      },
      {
        heading: "Pourquoi JuriVite plutôt qu'un PDF gratuit du web ?",
        body: "Les modèles gratuits en ligne sont souvent obsolètes, trop génériques ou copiés d'un autre pays. Ils ne connaissent ni votre statut (micro-entreprise en franchise TVA ou SAS avec capital social), ni votre activité réelle, ni vos délais de livraison. JuriVite pose les bonnes questions : SIRET, adresse, forme juridique, TVA, délais, paiement, rétractation. Le PDF exporté est structuré en articles professionnels, pas une liste de paragraphes bruts. Vous gardez la main sur le texte final tout en gagnant un temps considérable par rapport à une rédaction from scratch ou à un copier-coller qui oublie la médiation ou la mention TVA 293 B. Version gratuite avec filigrane pour tester ; plan Pro pour des exports sans filigrane destinés à vos clients.",
      },
      {
        heading: "Micro-entreprise, EURL, SAS : le formulaire s'adapte",
        body: "Un auto-entrepreneur en franchise de TVA n'affiche pas les mêmes mentions qu'une société assujettie. JuriVite adapte les clauses selon la forme choisie : mention d'activité non salariée, article 293 B du CGI le cas échéant, ou au contraire capital social, RCS et taux de TVA pour une société. Les délais de paiement et pénalités peuvent être alignés sur vos pratiques réelles. Cette personnalisation réduit le risque d'incohérence entre vos factures, devis et CGV — un point que les contrôleurs et les clients attentifs remarquent. Vous n'avez pas besoin de jargon juridique : le parcours vous guide. Pour une activité à fort enjeu (données sensibles, mineurs, finance), une relecture par un avocat reste recommandée en complément du modèle généré.",
      },
      {
        heading: "Conseils pratiques : publier, mettre à jour, lier vos documents",
        body: "Publiez vos CGV sur une page dédiée (/cgv) accessible depuis le pied de site et, si possible, depuis le tunnel de commande ou le devis. Lors d'un changement de tarif ou de délai, régénérez ou mettez à jour la date en tête de document. Associez vos CGV à une politique de confidentialité si vous collectez des données, et à un contrat de prestation pour les missions sur mesure. En e-commerce (Shopify, WooCommerce), liez l'URL de votre page CGV dans les paramètres légaux du checkout. Conservez une version datée des PDF envoyés aux clients importants. En cas de litige, la preuve d'une information claire avant commande joue en votre faveur. JuriVite vous permet de regénérer rapidement après une évolution de statut (passage de micro à société, par exemple).",
      },
    ],
    faqs: [
      {
        question: "Combien de temps pour créer ses CGV avec JuriVite ?",
        answer:
          "Comptez environ cinq minutes : formulaire en plusieurs étapes, prévisualisation logique, puis téléchargement PDF immédiat. Vous pouvez reprendre vos informations entreprise pour d'autres documents (devis, facture, mentions légales).",
      },
      {
        question: "Les CGV générées ont-elles une valeur juridique ?",
        answer:
          "Ce sont des modèles structurés à personnaliser et à publier correctement. Ils couvrent les mentions courantes pour freelances et TPE ; pour une activité réglementée ou internationale, faites valider par un professionnel du droit.",
      },
      {
        question: "CGV obligatoires pour un freelance qui ne vend qu'en B2B ?",
        answer:
          "L'obligation d'information précontractuelle est plus poussée en B2C, mais des CGV (ou conditions générales de vente B2B) restent fortement recommandées pour cadrer paiement, livrables et responsabilité.",
      },
      {
        question: "Puis-je générer des CGV gratuitement ?",
        answer:
          "Oui en version gratuite avec filigrane. Le plan Pro permet des exports sans filigrane, adaptés à un usage client et site public professionnel.",
      },
    ],
  },
  "mentions-legales": {
    metaTitle:
      "Générateur de mentions légales pour site web — LCEN, SIRET, hébergeur",
    metaDescription:
      "Créez vos mentions légales obligatoires en PDF : éditeur, directeur de publication, hébergeur, contact. Conforme LCEN pour freelance, TPE et site vitrine.",
    h1: "Générateur de mentions légales",
    intro:
      "Tout site web professionnel en France doit afficher des mentions légales identifiables (LCEN). JuriVite collecte vos informations d'éditeur, de publication et d'hébergement pour produire une page prête à intégrer. Un pied de page conforme rassure prospects, partenaires et plateformes de paiement.",
    seoBlocks: [
      {
        heading: "Mentions légales : définition et rôle sur votre site",
        body: "Les mentions légales identifient l'éditeur du site, le responsable de publication et l'hébergeur. Elles permettent à tout visiteur — client, autorité, partenaire — de savoir qui est derrière le site et comment le contacter. Pour un freelance ou une TPE, c'est souvent la première page juridique consultée avant un devis. Elles ne remplacent pas les CGV ni la politique RGPD, mais elles complètent le dispositif de transparence. Un site vitrine, un portfolio, une boutique en ligne ou un SaaS en phase MVP doit les afficher dès qu'il y a une activité professionnelle. Sans elles, vous envoyez un signal de négligence, même si votre prestation est excellente.",
      },
      {
        heading: "Obligation LCEN : qui est concerné ?",
        body: "La loi pour la confiance dans l'économie numérique (LCEN) s'applique aux personnes physiques et morales qui éditent un site à titre professionnel : commerçant, artisan, profession libérale, société, association avec activité économique. Les informations minimales incluent l'identité de l'éditeur (nom, adresse, téléphone, e-mail), le directeur de publication, et pour un hébergeur tiers, son nom et adresse. Si vous êtes auto-entrepreneur, le SIRET et l'adresse professionnelle doivent figurer. JuriVite aligne le texte sur votre forme juridique pour éviter les mentions inadaptées (capital social absent en micro-entreprise, présent en société). Les plateformes de paiement, les marketplaces et certains clients B2B demandent une URL de mentions à jour avant activation. Un texte incomplet peut retarder l'ouverture de compte marchand au moment du lancement commercial.",
      },
      {
        heading: "Amendes, contrôles et risques réputationnels",
        body: "L'absence ou l'incomplétude des mentions légales peut entraîner des sanctions administratives, dont le montant varie selon la personne visée (personne physique ou morale). Au-delà de l'amende, les plateformes (Stripe, marketplaces) et les clients B2B demandent parfois une URL de mentions à jour avant d'ouvrir un compte. En cas de litige (diffamation, contrefaçon, RGPD), l'identification claire de l'éditeur facilite aussi les procédures — à votre avantage ou non selon le fond. Un pied de page vide ou un lien mort vers une page « en construction » nuit à la crédibilité. Investir quelques minutes dans un document correct coûte infiniment moins qu'une relation commerciale perdue.",
      },
      {
        heading: "JuriVite vs modèle Word ou générateur anonyme",
        body: "Copier un modèle daté de 2018 oublie souvent l'hébergeur actuel (Vercel, Netlify, o2switch) ou affiche une forme juridique incorrecte. Les générateurs « one click » sans SIRET produisent des textes creux. JuriVite vous demande les données réelles : raison sociale ou nom commercial, SIRET, adresse, contact, hébergeur. Le rendu PDF est lisible et prêt à être recopié dans votre CMS, Notion ou footer HTML. Vous évitez les placeholders « [À COMPLÉTER] » oubliés au lancement. La cohérence avec vos autres documents JuriVite (même adresse, même SIRET) renforce la confiance sur l'ensemble de votre parcours client. Vous obtenez un PDF cohérent avec vos devis et factures JuriVite, sans champs « à compléter » oubliés au go-live. La mise à jour après changement d'hébergeur se fait en régénérant le document en quelques minutes.",
      },
      {
        heading: "Auto-entrepreneur ou société : mentions adaptées",
        body: "En micro-entreprise, vous indiquez l'identité du entrepreneur, le numéro SIREN/SIRET et l'adresse déclarée. Pour une SAS, SARL ou EURL, le capital social, le siège, le RCS et la forme juridique apparaissent. Le directeur de publication est en général le représentant légal ou la personne identifiée comme responsable éditoriale. Côté hébergeur, renseignez le prestataire effectif (OVH, o2switch, Amazon AWS, Vercel, etc.) — l'information figure dans votre contrat ou l'espace client. JuriVite structure ces blocs sans mélanger les statuts. Lors d'une création de société, régénérez la page pour refléter la nouvelle personne morale. Vérifiez que le directeur de publication correspond bien à la personne habilitée et que l'hébergeur indiqué est celui qui stocke réellement les fichiers du site. Une incohérence entre statut affiché et Kbis peut faire rejeter un dossier partenaire.",
      },
      {
        heading: "Où et comment publier : bonnes pratiques",
        body: "Créez une page /mentions-legales (ou équivalent) liée depuis le footer de toutes les pages, y compris la page d'accueil et les landing marketing. Le lien doit être visible sans scroller excessivement sur desktop ; sur mobile, le menu ou le pied de page suffit. Évitez les PDF uniquement : les autorités et les utilisateurs attendent du HTML accessible. Mettez à jour après un déménagement, un changement d'hébergeur ou de directeur de publication. Si vous avez plusieurs sites, une page par domaine. Combinez avec une politique de confidentialité dès que vous collectez des e-mails ou des cookies analytics. JuriVite exporte un PDF de référence que vous pouvez aussi archiver pour votre dossier interne.",
      },
    ],
    faqs: [
      {
        question: "Qui doit avoir des mentions légales en France ?",
        answer:
          "Tout éditeur de site professionnel : freelance, TPE, e-commerce, SaaS, association avec activité commerciale. Un simple blog personnel sans activité pro est un cas différent.",
      },
      {
        question: "Où trouver les coordonnées de mon hébergeur ?",
        answer:
          "Dans votre espace client (OVH, o2switch, Vercel, etc.), section mentions légales, CGV ou contact support. Indiquez le nom et l'adresse du prestataire d'hébergement, pas seulement le registrar du nom de domaine.",
      },
      {
        question: "Mentions légales et politique RGPD : même page ?",
        answer:
          "Non. Les mentions légales identifient l'éditeur (LCEN). La politique de confidentialité décrit les traitements de données (RGPD). Deux pages distinctes, deux liens dans le footer.",
      },
      {
        question: "Puis-je utiliser le même texte sur plusieurs domaines ?",
        answer:
          "Adaptez l'hébergeur et l'URL du site par domaine. L'identité de l'éditeur peut être identique si c'est la même entité juridique.",
      },
    ],
  },
  "politique-confidentialite": {
    metaTitle:
      "Politique de confidentialité RGPD — générateur pour site et freelance",
    metaDescription:
      "Générez une politique de confidentialité conforme : finalités, durées, droits, cookies, sous-traitants. PDF pour site vitrine, SaaS et TPE.",
    h1: "Politique de confidentialité (RGPD)",
    intro:
      "Dès que vous collectez un e-mail, un cookie analytics ou une donnée via un formulaire, le RGPD impose une information transparente. JuriVite vous aide à lister vos traitements réels et à produire une politique structurée, alignée sur votre statut et vos outils (CRM, newsletter, calendrier en ligne).",
    seoBlocks: [
      {
        heading: "Qu'est-ce qu'une politique de confidentialité ?",
        body: "C'est le document qui explique quelles données personnelles vous collectez (identité, contact, navigation, paiement), pour quelles finalités (devis, facturation, newsletter, support), sur quelles bases légales, combien de temps vous les conservez, qui y accède et quels droits exercent les personnes concernées. Elle s'adresse aux visiteurs de votre site, prospects et clients. Elle complète le bandeau cookies (consentement) et les contrats avec vos sous-traitants (hébergeur, e-mailing). Pour un freelance ou une TPE, une politique claire rassure les clients B2B soumis à leurs propres obligations de conformité et évite les questions répétitives en cycle de vente. Elle doit être accessible depuis le footer, rédigée en français clair et tenue à jour lorsque vous ajoutez un outil marketing ou un formulaire. C'est souvent le premier document juridique lu par un acheteur enterprise avant signature.",
      },
      {
        heading: "RGPD : obligations pour indépendants et petites structures",
        body: "Le règlement européen s'applique dès qu'un traitement porte sur des données de personnes situées dans l'UE, quelle que soit la taille de l'organisme. Vous devez informer, sécuriser, limiter la collecte au nécessaire, tenir un registre des traitements (recommandé même pour une micro-structure) et répondre aux demandes d'accès ou d'effacement. Si vous utilisez Google Analytics, Meta Pixel, Calendly, Stripe ou un CRM, vous devez les nommer et décrire les flux. JuriVite intègre les rubriques standard : responsable de traitement, finalités, durées, droits, réclamation CNIL, transferts hors UE le cas échéant. Documentez aussi la durée de conservation des leads, la base légale du traitement (contrat, intérêt légitime, consentement) et la procédure interne pour répondre à une demande d'effacement. Un registre simplifié des traitements aide en cas de question d'un client ou de la CNIL.",
      },
      {
        heading: "Sanctions CNIL et risques business sans politique sérieuse",
        body: "La CNIL peut infliger des amendes importantes en cas de manquement grave (consentement cookies, fuite de données, absence d'information). Pour un freelance, le risque immédiat est souvent commercial : un client enterprise exige une politique à jour avant signature ; un partenaire refuse l'intégration API sans DPA. Un texte copié-collé d'un autre site qui cite des outils que vous n'utilisez pas crée une fausse sécurité et peut être considéré comme trompeur. En cas de plainte, l'incohérence entre la réalité technique et le document affiché aggrave la situation. Mieux vaut une politique modeste mais exacte qu'un pavé juridique fantaisiste. Au-delà des amendes, une fuite ou un défaut de consentement cookies peut entraîner bad buzz et résiliation de contrats. Les assureurs cyber et les due diligences investisseurs scrutent désormais la qualité de votre documentation privacy.",
      },
      {
        heading: "Pourquoi ne pas récupérer un modèle RGPD gratuit ?",
        body: "Les modèles gratuits multiplient les clauses inutiles (DPO obligatoire, transferts USA) sans refléter votre stack. JuriVite vous guide pour décrire vos traitements concrets : formulaire de contact, facturation, newsletter, analytics. Le PDF est découpé en articles lisibles, prêt à être publié sur votre site (page « Politique de confidentialité » ou « Vie privée »). Vous gagnez en cohérence avec vos mentions légales (même éditeur, même contact). La régénération est simple quand vous changez d'outil (passage de Mailchimp à Brevo, par exemple). Le document reste un modèle : pour du traitement de données de santé ou des mineurs, consultez un spécialiste. Un modèle sur-mesure via formulaire réduit le risque de clauses contradictoires avec vos CGU et vos contrats clients. Vous pouvez archiver chaque version datée pour prouver quelle information était affichée à un instant donné.",
      },
      {
        heading: "Micro-entreprise vs société : responsable et coordonnées",
        body: "Le responsable de traitement est en principe la personne qui détermine les finalités : vous en nom personnel en freelance, ou la société pour une SAS/SARL avec contact dédié (général ou DPO si désigné). JuriVite adapte l'en-tête selon la forme juridique renseignée. Les sous-traitants (hébergeur, prestataire e-mail) doivent être listés avec leur rôle. En micro-entreprise, évitez de vous présenter comme « groupe international » : restez factuel. Si vous traitez des données pour le compte d'un client (prestation marketing), précisez le partage de responsabilité dans un contrat séparé — la politique du site couvre surtout vos propres traitements en tant qu'éditeur.",
      },
      {
        heading: "Cookies, formulaires et mise à jour : conseils terrain",
        body: "Associez politique de confidentialité et bandeau cookies conforme (consentement préalable pour les traceurs non essentiels). Dans le formulaire JuriVite, cochez uniquement les outils que vous utilisez réellement. Revoyez la politique après ajout d'un chatbot, d'un pixel publicitaire ou d'un nouvel export CRM. Indiquez un e-mail dédié (contact@ ou dpo@) pour les demandes d'exercice des droits et répondez sous un délai raisonnable (un mois en principe). Conservez une trace des versions publiées. Pour les apps mobiles, adaptez le même contenu dans les stores. JuriVite accélère la rédaction ; la exactitude des outils listés reste votre responsabilité opérationnelle. Testez le parcours utilisateur : le lien vers la politique doit être cliquable depuis le bandeau cookies et depuis le formulaire d'inscription. En cas de sous-traitant hors UE, documentez les garanties (clauses types, BCR) si applicable.",
      },
    ],
    faqs: [
      {
        question: "Politique de confidentialité et bandeau cookies : même chose ?",
        answer:
          "Non. La politique informe sur les traitements ; le bandeau recueille le consentement pour les cookies non essentiels. Les deux sont complémentaires et doivent être cohérents.",
      },
      {
        question: "Faut-il une politique RGPD pour un simple formulaire de contact ?",
        answer:
          "Oui. Nom, e-mail et message sont des données personnelles. Vous devez expliquer la finalité (réponse commerciale), la durée de conservation et les droits.",
      },
      {
        question: "Une politique générée suffit-elle pour être « conforme CNIL » ?",
        answer:
          "Elle couvre l'information obligatoire si vos réponses sont exactes. Les cookies, la sécurité technique et les contrats sous-traitants restent à mettre en œuvre en parallèle.",
      },
      {
        question: "Dois-je nommer un DPO en freelance ?",
        answer:
          "Rarement obligatoire pour une activité classique. Si vous désignez un correspondant, indiquez-le ; sinon le responsable de traitement assume le contact.",
      },
    ],
  },
  "contrat-prestation": {
    metaTitle:
      "Contrat de prestation de services freelance — modèle PDF structuré",
    metaDescription:
      "Générez un contrat de prestation : mission, prix, délais, TVA, paiement, confidentialité. Sécurisez vos missions et limitez impayés et scope creep.",
    h1: "Contrat de prestation de services",
    intro:
      "Formaliser une mission avant le premier jour de travail protège le freelance comme le client : périmètre, prix, calendrier et modalités de paiement deviennent écrits. JuriVite produit un contrat en articles professionnels, calé sur votre statut (micro ou société) et réutilisable mission après mission.",
    seoBlocks: [
      {
        heading: "Contrat de prestation : à quoi sert-il concrètement ?",
        body: "C'est l'accord qui lie le prestataire (freelance, agence, consultant) et le client sur la nature des services, les livrables, le prix, les délais, les conditions de paiement et les règles en cas de retard ou de résiliation. Il complète le devis accepté en entrant dans le détail juridique : obligations réciproques, confidentialité, propriété intellectuelle selon les cas, loi applicable. Pour une TPE ou un indépendant, c'est la barrière contre le « on verra pour la suite » qui gonfle le scope sans budget. Un contrat signé (ou accepté par e-mail de manière explicite) constitue une preuve précieuse en cas de litige ou d'impayé.",
      },
      {
        heading: "Est-il obligatoire d'avoir un contrat écrit ?",
        body: "Le droit français n'impose pas toujours un écrit pour toutes les prestations de services, mais en pratique les clients structurés l'exigent. Certaines relations (formation, sous-traitance dans la commande publique) imposent des formalismes spécifiques. Même sans obligation stricte, l'écrit est fortement recommandé dès que le montant ou la durée dépasse quelques jours de travail. Le Code de commerce encadre par ailleurs la facturation et les délais de paiement entre professionnels. JuriVite aligne le contrat sur les mentions TVA et d'identification cohérentes avec vos devis et factures, ce qui facilite la chaîne documentaire devant un comptable ou un service achats. Pour les missions récurrentes ou les forfaits élevés, l'écrit est quasi systématique dans les appels d'offres privés. Il facilite aussi la facturation d'acomptes et la preuve du service fait en cas de retard de paiement.",
      },
      {
        heading: "Litiges, impayés et travail non facturé sans contrat",
        body: "Sans contrat, les désaccords portent sur des interprétations : nombre de révisions incluses, délais de validation client, propriété des fichiers sources, paiement à la livraison ou à 30 jours. Les allers-retours « hors scope » s'accumulent. En cas d'impayé, les preuves e-mail dispersées compliquent le recouvrement. Un client peut invoquer une prestation non conforme pour retarder le paiement. Un document structuré fixe le prix, les jalons et les pénalités ou intérêts de retard. Pour les créatifs, sans clause PI ou sans cession de droits séparée, le client peut croire acquérir plus de droits que prévu. Anticiper par écrit coûte peu ; défendre une créance floue coûte cher.",
      },
      {
        heading: "JuriVite face aux modèles Word trouvés sur Internet",
        body: "Les modèles gratuits sont souvent américains, incomplets sur la TVA française ou silencieux sur l'article 293 B. JuriVite pose les variables utiles : parties, description de mission, montant, échéancier, TVA, confidentialité, signatures. Le rendu PDF est présentable en face d'un service juridique client. Vous réutilisez les mêmes données entreprise que pour devis et facture, ce qui limite les erreurs de SIRET ou de raison sociale. Le ton est professionnel sans surcharger de latin inutile. Vous restez libre d'ajouter des annexes (planning, spécifications techniques) référencées dans le contrat. Les annexes techniques (cahier des charges, planning) peuvent être référencées dans le contrat sans tout recopier. Le document reste lisible pour un dirigeant de TPE comme pour un service achats.",
      },
      {
        heading: "Adaptation micro-entreprise / société dans le formulaire",
        body: "Selon que vous facturez en franchise de TVA ou avec TVA collectée, les mentions et le calcul des montants HT/TTC diffèrent. JuriVite injecte la mention adaptée et, pour une société, les éléments d'identification réglementaires. Les délais de paiement peuvent refléter la loi ou vos pratiques négociées (acompte, solde à livraison). Si vous passez de micro à EURL en cours d'année, régénérez vos modèles pour éviter d'envoyer un contrat au nom de l'ancien statut. Le contrat peut être complété par une cession de droits d'auteur pour les livrables créatifs — document séparé disponible sur JuriVite. Pensez à harmoniser délais de paiement et pénalités avec ceux figurant déjà sur vos factures pour éviter toute contradiction en recouvrement. Un changement de seuil TVA impose de régénérer contrats et devis en cours de négociation.",
      },
      {
        heading: "Bonnes pratiques : devis, signature, archivage",
        body: "Enchaînez devis → acceptation → contrat → acompte éventuel → facturation. Envoyez le PDF par e-mail avec une phrase d'acceptation claire ou utilisez une signature électronique. Définissez un nombre de cycles de retours inclus et facturez le hors périmètre par avenant ou devis complémentaire. Archivez la version signée et les échanges qui précisent le périmètre. Pour les missions longues, prévoyez des points d'arrêt et des factures intermédiaires. En cas de résiliation, respectez les clauses de préavis et de restitution des éléments fournis par le client. JuriVite ne remplace pas un avocat pour des montants très élevés ou des secteurs réglementés, mais couvre le socle quotidien du freelance B2B.",
      },
    ],
    faqs: [
      {
        question: "Contrat de prestation ou devis en premier ?",
        answer:
          "Le devis sert à proposer le prix et le périmètre ; le contrat formalise l'engagement avant le démarrage. L'acceptation du devis peut suffire pour de petites missions, le contrat renforce la sécurité.",
      },
      {
        question: "Le contrat couvre-t-il la cession des droits d'auteur ?",
        answer:
          "Le modèle de base traite mission et paiement. Pour des créations (design, code, rédaction), ajoutez une cession de droits dédiée via le document JuriVite prévu à cet effet.",
      },
      {
        question: "Signature électronique : est-ce valable ?",
        answer:
          "Oui pour de nombreux contrats B2B, sous réserve de preuve de consentement. Pour des montants critiques, des outils de signature qualifiée peuvent être préférés.",
      },
      {
        question: "Puis-je réutiliser le même contrat pour plusieurs clients ?",
        answer:
          "Régénérez ou dupliquez en changeant le client, la mission et le prix. Évitez les anciennes parties ou montants dans le PDF final.",
      },
    ],
  },
  devis: {
    metaTitle:
      "Devis conforme freelance et auto-entrepreneur — générateur PDF",
    metaDescription:
      "Créez un devis professionnel avec SIRET, prestation détaillée, HT/TVA/TTC, validité et mentions légales. Micro-entreprise et sociétés.",
    h1: "Devis conforme",
    intro:
      "Un devis clair accélère la signature et limite les malentendus sur le prix et le périmètre. JuriVite calcule HT, TVA et TTC selon votre statut, intègre les mentions attendues par les services comptables clients et exporte un PDF au nom de fichier professionnel.",
    seoBlocks: [
      {
        heading: "Le devis : rôle et différence avec la facture",
        body: "Le devis est une proposition commerciale chiffrée envoyée avant l'exécution de la prestation. Il détaille ce que vous allez faire, pour combien, et pendant combien de temps l'offre reste valable. La facture, elle, constate la vente réalisée et déclenche la comptabilité et, le cas échéant, la TVA collectée. Un devis accepté peut servir de base contractuelle, surtout s'il est précis sur les livrables. Pour un freelance ou une TPE, le devis est souvent le premier document « officiel » vu par le client : sa qualité influence la perception de votre sérieux. Ne le confondez pas avec un simple message Slack chiffrant un forfait.",
      },
      {
        heading: "Mentions obligatoires et usages comptables",
        body: "Un devis professionnel en France comporte en pratique : numéro et date, identité complète du prestataire (dont SIRET), identité du client, description détaillée des prestations, montant HT, taux de TVA applicable, montant TTC, durée de validité, conditions de paiement éventuelles. En franchise de TVA (article 293 B du CGI), la mention spécifique et un TTC égal au HT sont requis. Les entreprises clientes archivent le devis pour leurs engagements et budgets. JuriVite structure ces blocs et évite les oublis récurrents (SIRET, validité, TVA à 0 % mal expliquée). Un devis conforme réduit les allers-retours avec la compta du client. Ajoutez si besoin un bloc « Bon pour accord » ou des conditions d'annulation alignées sur votre contrat type. Le service comptable du client valide plus vite un PDF qui reprend les mêmes identifiants que la facture finale.",
      },
      {
        heading: "Risques d'un devis imprécis ou non conforme",
        body: "Un périmètre flou (« refonte site » sans nombre de pages) ouvre la porte au scope creep. Oublier la validité expose à des contestations de prix des mois plus tard. Une TVA incorrecte complique la déduction côté client assujetti. L'absence de SIRET ou d'adresse peut bloquer la validation interne chez un grand compte. Sur le plan relationnel, un PDF amateur retarde la signature au profit d'un concurrent mieux présenté. En cas de litige, le devis accepté fait foi sur le prix et le contenu s'il est suffisamment détaillé — sinon le juge ou le médiateur interprète au détriment de celui qui a été le moins précis.",
      },
      {
        heading: "Pourquoi générer son devis avec JuriVite ?",
        body: "Les tableurs maison oublient souvent une mention ou recalculent mal la TVA. Les PDF téléchargés sur des sites généralistes ne connaissent pas votre SIRET ni votre franchise. JuriVite réutilise votre profil entreprise, applique le bon régime TVA et produit un layout lisible avec bloc « Bon pour accord ». Vous gagnez un temps précieux à chaque prospect. La cohérence avec vos factures et contrats JuriVite rassure les clients qui enchaînent les documents. Version gratuite pour tester ; exports Pro sans filigrane pour l'envoi client final. Chaque nouveau prospect bénéficie du même niveau de présentation sans ressaisir SIRET et adresse. Vous réduisez les erreurs de calcul TVA qui bloquent la validation interne chez les clients assujettis.",
      },
      {
        heading: "Micro-entreprise, auto-entrepreneur ou société : calcul adapté",
        body: "En micro-entreprise ou auto-entrepreneur en franchise, sélectionnez le statut adapté : TVA à 0 % avec mention légale 293 B, TTC identique au HT sauf cas particulier. Pour une SAS ou SARL assujettie, indiquez le taux de TVA (20 %, 10 %, etc.) et les mentions de société. Le formulaire évite d'afficher un capital social sur un document micro. Lors d'un dépassement de seuil de franchise, mettez à jour votre profil avant de nouveaux devis. Les clients assujettis à la TVA vérifient la cohérence entre votre statut affiché et la facture finale — une chaîne homogène évite les rejets. En cas de mix B2B France et export, vérifiez avec votre expert-comptable les mentions intracommunautaires ou d'autoliquidation avant d'envoyer le devis. Le formulaire couvre le cas standard français le plus fréquent pour freelances et TPE.",
      },
      {
        heading: "Conseils : validité, acompte, enchaînement contractuel",
        body: "Indiquez une validité courante (30 jours) et précisez que les tarifs peuvent évoluer au-delà. Pour les grosses missions, prévoyez un acompte dans le devis ou le contrat. Numérotez vos devis de façon séquentielle (DEV-2025-001). Après acceptation, enchaînez avec un contrat de prestation et une facture d'acompte si besoin. Conservez la preuve d'acceptation (e-mail, signature). Détaillez les exclusions (contenus fournis par le client, licences tierces) pour limiter les surprises. JuriVite vous permet de régénérer rapidement une variante (option premium, lot supplémentaire) sans repartir de zéro. Mentionnez explicitement ce qui n'est pas inclus (hébergement, stock photos, traduction) pour verrouiller le périmètre. Un devis daté et numéroté facilite la recherche en cas d'audit interne client ou de contrôle fiscal.",
      },
    ],
    faqs: [
      {
        question: "Un devis engage-t-il juridiquement le prestataire ?",
        answer:
          "Un devis accepté par le client peut constituer un accord sur le prix et le périmètre décrit. Un contrat de prestation renforce encore les obligations réciproques et les clauses de résiliation.",
      },
      {
        question: "Quelle durée de validité choisir ?",
        answer:
          "Trente jours est une pratique courante. Au-delà, indiquez que les tarifs et disponibilités peuvent être révisés.",
      },
      {
        question: "Devis sans TVA : est-ce normal ?",
        answer:
          "Oui si vous êtes en franchise en base (art. 293 B). Le devis doit alors mentionner cette franchise et afficher un TTC égal au HT.",
      },
      {
        question: "Numéro de devis obligatoire ?",
        answer:
          "Fortement recommandé pour la traçabilité comptable et en cas de litige. JuriVite vous aide à structurer un document daté et identifiable.",
      },
    ],
  },
  facture: {
    metaTitle:
      "Générateur de facture conforme — freelance, micro-entreprise et société",
    metaDescription:
      "Facture PDF avec mentions obligatoires, SIRET, TVA ou art. 293 B, échéance et pénalités. Pour auto-entrepreneur, freelance et TPE.",
    h1: "Générateur de facture",
    intro:
      "La facture est le document comptable et fiscal qui acte la vente. JuriVite génère une facture structurée avec les mentions adaptées à votre forme juridique, le calcul TVA correct et des conditions de paiement professionnelles.",
    seoBlocks: [
      {
        heading: "La facture : définition et place dans votre activité",
        body: "La facture atteste qu'une prestation ou une vente a été réalisée à un prix donné. Elle sert au client pour sa comptabilité et à vous pour suivre votre chiffre d'affaires, vos encaissements et, le cas échéant, votre TVA. Contrairement au devis, elle intervient après exécution (ou à l'émission d'un acompte selon les règles). Pour un freelance ou une TPE, une facture lisible accélère le paiement et limite les questions du service comptable. Elle doit être numérotée de façon chronologique et unique, sans rupture incohérente. Archiver vos factures PDF est une obligation pratique en cas de contrôle fiscal ou de litige commercial.",
      },
      {
        heading: "Mentions obligatoires sur une facture en France",
        body: "Selon les cas, la facture doit comporter : date d'émission, numéro unique, identités complètes vendeur et acheteur, SIRET/SIREN, adresse, description des biens ou services, quantité, prix unitaire HT, taux et montant de TVA ou mention de franchise (293 B), total TTC, date de paiement ou échéance, pénalités de retard et indemnité forfaitaire de recouvrement pour les professionnels, mention d'escompte le cas échéant. Les sociétés ajoutent capital social, forme juridique et RCS. JuriVite intègre ces blocs selon les réponses du formulaire pour limiter les rejets côté client et les risques en contrôle. Les opérations intracommunautaires ou les autoliquidations relèvent de mentions spécifiques à valider avec votre expert-comptable. Pour le cas courant B2B France, JuriVite couvre le socle attendu par la plupart des services comptables clients.",
      },
      {
        heading: "Sanctions, rejets comptables et impayés liés à une facture défectueuse",
        body: "Une facture incomplète peut être refusée par le client, retardant le paiement de plusieurs semaines. Des erreurs de TVA exposent à des régularisations. En cas de contrôle, l'administration fiscale exige des factures conformes pour justifier le chiffre d'affaires et la TVA déclarée. Les retards de paiement entre professionnels sont encadrés ; des pénalités mal mentionnées compliquent le recouvrement. Une numérotation anarchique (doublons, trous non justifiés) soulève des questions. Au-delà de la loi, une facture amateur nuit à l'image d'un freelance qui vise des clients exigeants. Investir quelques minutes sur un modèle fiable est rentable. Un retard de paiement légal mal mentionné complique les relances et les indemnités forfaitaires de recouvrement entre professionnels. Une facture propre accélère souvent l'inscription au paiement dans les outils SEPA ou virement du client.",
      },
      {
        heading: "JuriVite vs facture Excel ou modèle PDF statique",
        body: "Les fichiers Excel se cassent à chaque copie, oublient la mention 293 B ou le RCS, et demandent un recalcul manuel de TVA. Les modèles PDF gratuits laissent des champs vides. JuriVite centralise votre identité, adapte automatiquement les mentions TVA et société, et propose un nom de fichier professionnel à l'export. Vous alignez factures, devis et contrats sur les mêmes données. Le gain de temps est réel quand vous facturez chaque fin de mois plusieurs clients. Le document reste à émettre au bon moment (livraison, acompte conforme à la réglementation) — JuriVite structure, vous gardez la responsabilité comptable. Le nom de fichier et la mise en page constante renforcent votre image sur des missions récurrentes. Vous pouvez enchaîner devis accepté, contrat et facture d'acompte avec les mêmes données entreprise sans ressaisie.",
      },
      {
        heading: "Facture micro-entreprise vs facture société",
        body: "En micro-entreprise ou auto-entrepreneur en franchise, la TVA n'apparaît pas au taux classique : la mention d'exigibilité article 293 B du CGI est affichée et le TTC reflète l'absence de TVA facturée. Pour une SAS, SARL ou EURL assujettie, le taux applicable et le détail HT/TVA/TTC sont calculés. Le capital social et le greffe (RCS) figurent sur les documents société. Si vous changez de statut en cours d'année, mettez à jour le profil avant toute nouvelle facture. Les clients en autoliquidation ou intracommunautaires relèvent de cas spécifiques non couverts par le parcours standard — consultez votre expert-comptable. Après création de société, mettez à jour immédiatement le profil pour ne pas émettre au nom de l'ancien statut. Les clients vérifient la cohérence SIRET, forme juridique et mention TVA entre devis, contrat et facture finale.",
      },
      {
        heading: "Bonnes pratiques : numérotation, échéance, relance",
        body: "Adoptez une numérotation continue (FAC-2025-042). Indiquez une échéance claire (30 jours fin de mois, à réception). Mentionnez IBAN et mode de paiement. Envoyez la facture dès la livraison validée pour respecter les délais légaux d'émission. Relancez de façon professionnelle en vous appuyant sur les pénalités prévues. Conservez les factures et les preuves de service fait. Pour les acomptes, respectez les règles de facturation d'acompte. JuriVite facilite la production ; la tenue du livre des recettes ou la comptabilité complète reste à organiser avec votre expert-comptable selon votre statut. Notez dans votre CRM la date d'émission et l'échéance pour automatiser les relances. En cas d'avoir ou d'annulation, respectez les règles de numérotation et conservez la justification. Un tableau de suivi complète le PDF généré.",
      },
    ],
    faqs: [
      {
        question: "Puis-je facturer sans TVA en micro-entreprise ?",
        answer:
          "Oui en franchise en base de TVA (art. 293 B). Sélectionnez le statut Micro-entreprise ou Auto-entrepreneur dans JuriVite pour afficher la mention adaptée.",
      },
      {
        question: "Quand émettre la facture ?",
        answer:
          "En principe au plus tard à la date de réalisation de la prestation ou de la vente, sauf règles spécifiques pour les acomptes. Évitez de facturer avant le service fait sans cadre d'acompte conforme.",
      },
      {
        question: "Numéro de facture : puis-je en sauter ?",
        answer:
          "La numérotation doit être chronologique et sans doublon. Un trou peut se justifier (annulation selon règles) mais doit rester documenté.",
      },
      {
        question: "La facture JuriVite suffit-elle pour ma comptabilité ?",
        answer:
          "Elle couvre les mentions courantes sur le PDF. Vous devez toujours déclarer votre CA et, si applicable, votre TVA selon votre régime fiscal.",
      },
    ],
  },
  "cession-droits-auteur": {
    metaTitle:
      "Contrat de cession de droits d'auteur — modèle PDF pour créateurs",
    metaDescription:
      "Cédez reproduction et représentation : œuvre, territoire, durée, prix, garanties. Contrat structuré pour freelances créatifs, agences et TPE.",
    h1: "Cession de droits d'auteur",
    intro:
      "Créer pour un client ne signifie pas automatiquement qu'il peut tout exploiter : la cession doit être écrite, précise et rémunérée. JuriVite formalise périmètre, supports, territoire et durée dans un contrat lisible, complémentaire à votre contrat de prestation.",
    seoBlocks: [
      {
        heading: "Cession de droits d'auteur : de quoi parle-t-on ?",
        body: "Lorsqu'un freelance produit une œuvre protégée (texte, illustration, photo, vidéo, code créatif, maquette), le droit d'auteur appartient en principe au créateur. Le client n'acquiert le droit d'exploiter l'œuvre (reproduction, représentation, adaptation selon les cas) que si une cession valide est consentie. La cession doit être expresse, écrite pour chaque droit cédé, et délimitée en étendue, destination, lieu, durée. Sans cela, le client risque d'utiliser les fichiers hors périmètre (campagnes, sous-licence, modification). Pour les agences et TPE créatives, un contrat de cession évite les malentendus sur le portfolio, les études de cas et les droits moraux (respect de l'œuvre, paternité). Les droits moraux (paternité, respect de l'œuvre) subsistent même après cession patrimoniale : le contrat doit le rappeler. Pour les collaborations, chaque auteur peut devoir signer ou apparaître dans les garanties.",
      },
      {
        heading: "Obligations légales et limites de la cession",
        body: "Le Code de la propriété intellectuelle encadre strictement la cession : elle ne peut couvrir l'avenir indéterminé de façon générale, doit être stipulée au profit du cessionnaire nommément désigné, et donne lieu à une rémunération proportionnelle ou forfaitaire selon les cas. Les droits moraux restent en principe inaliénables même quand les droits patrimoniaux sont cédés. Une simple clause « le client devient propriétaire » dans un devis est souvent insuffisante ou imprécise. JuriVite détaille les droits cédés (reproduction, représentation), les supports, le territoire et la durée, ainsi que les garanties habituelles (originalité, absence de contrefaçon connue). La rémunération de la cession doit être claire (forfait inclus ou ligne dédiée). En cas de contestation, un tribunal analysera la précision de chaque droit cédé, pas une formule vague de « cession totale ».",
      },
      {
        heading: "Risques sans cession claire : exploitation, litiges, portfolio",
        body: "Sans écrit, le client peut croire pouvoir réutiliser les visuels sur tous ses produits à l'infini, modifier sans limite ou revendre à des tiers. Le créateur peut croire pouvoir réutiliser l'œuvre dans son book alors que le client s'y oppose. En cas de campagne publicitaire, l'absence de cession élargie peut bloquer la diffusion. Les litiges coûtent cher en temps et en image. Les plateformes et annonceurs demandent parfois une preuve de droits avant publication. Une cession mal rédigée peut être jugée nulle ou limitée, laissant le client sans droits attendus. Mieux vaut négocier clairement avant la livraison des fichiers sources.",
      },
      {
        heading: "Pourquoi JuriVite plutôt qu'une ligne dans un e-mail ?",
        body: "Une phrase « cession des droits incluse » dans un devis ne précise ni les supports ni la durée. Les modèles américains « work made for hire » ne s'appliquent pas tel quel en France. JuriVite propose un document dédié, en articles, avec champs pour l'œuvre, le prix de cession (distinct ou inclus), les garanties et le respect des droits moraux. Vous complétez le contrat de prestation plutôt que de tout mélanger. Le PDF est présentable en due diligence startup ou chez un annonceur. Vous gardez la main sur une cession partielle (France, web, 2 ans) ou plus large selon votre négociation.",
      },
      {
        heading: "Freelance, agence et société : mentions et TVA",
        body: "La cession est souvent facturée séparément ou incluse dans le forfait — dans les deux cas, le document précise la rémunération. JuriVite adapte l'identification des parties et la TVA comme pour vos autres documents commerciaux. Une société prestataire cède au nom de la société ; un micro-entrepreneur en franchise affiche les mentions 293 B sur la facture liée. Si vous êtes salarié, ce document ne s'applique pas : les créations relevant du contrat de travail suivent d'autres règles. Pour les œuvres composites (équipe), identifiez le cédant et, si besoin, plusieurs cessionnaires dans des avenants. Si plusieurs auteurs interviennent, précisez qui cède quoi ou prévoyez des avenants. La facture liée doit refléter le prix de la cession ou le forfait global de prestation + droits selon votre devis.",
      },
      {
        heading: "Conseils : négociation, livraison des fichiers, portfolio",
        body: "Discutez des droits avant le devis : usage web seul, print, réseaux sociaux du client, durée illimitée ou 3 ans. Livrez les sources après signature et paiement des jalons prévus. Réservez explicitement le droit d'afficher l'œuvre dans votre portfolio si le client l'accepte. Pour les photos de personnes ou marques tierces, vérifiez les autorisations en amont. En cas d'élargissement mid-project, signez un avenant de cession avec supplément. Archivez le contrat avec les fichiers livrés. JuriVite accélère la formalisation ; pour des campagnes internationales ou des droits audiovisuels complexes, un avocat PI reste pertinent. Négociez les droits réseaux sociaux du client séparément si la campagne dépasse le site web initial. En cas d'usage publicitaire, prévoyez souvent une redevance ou une extension de cession par avenant signé avant diffusion.",
      },
    ],
    faqs: [
      {
        question: "Cession totale ou partielle : que choisir ?",
        answer:
          "Le formulaire permet de limiter territoire, supports et durée. Une cession totale au sens commercial est rare en droit français ; soyez précis sur chaque droit patrimonial cédé.",
      },
      {
        question: "Cession incluse dans le devis : suffisant ?",
        answer:
          "Souvent insuffisant si les droits, supports et durée ne sont pas détaillés. Un contrat de cession dédié renforce la preuve.",
      },
      {
        question: "Puis-je réutiliser l'œuvre dans mon portfolio ?",
        answer:
          "Seulement si le contrat le prévoit ou si le client consent. Sinon, l'exploitation peut constituer une contrefaçon.",
      },
      {
        question: "Code informatique : même document ?",
        answer:
          "Le code peut relever de régimes spécifiques (logiciel). Pour des créations mixtes, faites relire par un spécialiste si le enjeu est élevé.",
      },
    ],
  },
  "conditions-utilisation": {
    metaTitle:
      "CGU — Générateur de Conditions Générales d'Utilisation pour SaaS et app",
    metaDescription:
      "Créez des CGU pour application ou SaaS : compte, usage licite, PI, responsabilité, données. Complément CGV et politique RGPD pour freelances et TPE.",
    h1: "Conditions Générales d'Utilisation",
    intro:
      "Les CGU encadrent l'accès et l'usage de votre service en ligne : compte utilisateur, contenus, limitations de responsabilité et propriété intellectuelle. JuriVite produit un document en articles adapté aux éditeurs de SaaS, d'apps et de plateformes, en complément de vos CGV et de votre politique de confidentialité.",
    seoBlocks: [
      {
        heading: "CGU : définition et différence avec les CGV",
        body: "Les Conditions Générales d'Utilisation (CGU) régissent la relation entre l'éditeur du service et l'utilisateur qui crée un compte ou accède à l'application : règles d'usage, suspension de compte, contenus publiés, propriété intellectuelle sur le logiciel, limitation de responsabilité, mise à jour du service. Les CGV, elles, encadrent surtout la vente, le prix et le paiement. Un SaaS B2B peut avoir CGU + contrat cadre ; un outil gratuit avec compte nécessite surtout des CGU claires. Pour un freelance qui lance un MVP, les CGU complètent la politique RGPD et les mentions légales pour former un triptyque crédible aux yeux des utilisateurs et investisseurs.",
      },
      {
        heading: "Sont-elles obligatoires pour une application ou un SaaS ?",
        body: "Il n'existe pas toujours une obligation intitulée « CGU » au sens strict, mais l'information de l'utilisateur et la preuve des règles d'usage sont essentielles. Dès qu'il y a un compte, des données personnelles ou un contenu généré par l'utilisateur, vous devez encadrer les droits et devoirs. Les stores (Apple, Google) et les clients B2B demandent une URL de conditions. Sans CGU, vous exposez votre service aux abus (spam, scraping, revente de comptes) sans levier contractuel pour suspendre un utilisateur. JuriVite structure les clauses types : objet, accès, usage interdit, PI, responsabilité, résiliation, droit applicable. Les CGU facilitent la suspension d'un compte abusif, la limitation de responsabilité dans les bornes légales et la clarification sur les contenus générés par les utilisateurs. Elles complètent les CGV d'abonnement et la politique de confidentialité.",
      },
      {
        heading: "Risques sans CGU adaptées à votre produit",
        body: "Un utilisateur peut invoquer une attente implicite de disponibilité 24/7 ou de support illimité. En cas de fuite de données ou de bug majeur, l'absence de limitation de responsabilité (dans les limites légales) augmente l'exposition. Les contenus illicites publiés sur votre plateforme peuvent vous engager si vous n'avez pas prévu de modération et de signalement. Un investisseur ou un partenaire API refusera d'intégrer un service juridiquement flou. Copier les CGU d'un géant américain sans adaptation crée des incohérences (arbitrage, droit, définitions). Un document français aligné sur votre réalité réduit ces angles morts. Un utilisateur peut exiger un SLA implicite ou un support illimité si rien n'est écrit. Les investisseurs et intégrateurs API refusent souvent un produit sans cadre contractuel d'usage clair et daté.",
      },
      {
        heading: "JuriVite vs CGU téléchargées sur un blog juridique",
        body: "Les modèles gratuits ignorent votre modèle économique (freemium, essai, API), votre hébergement UE ou vos règles de contenu UGC. JuriVite pose des questions ciblées et génère un PDF en articles numérotés, lisible pour un utilisateur non juriste. Vous pouvez le publier sur /cgu et lier depuis l'inscription. La cohérence avec la politique de confidentialité JuriVite évite des contradictions sur les données ou les sous-traitants. Vous mettez à jour quand vous ajoutez une fonctionnalité majeure (marketplace, IA générative). Le document reste un modèle : pour du financement participatif réglementé ou santé, faites auditer. Vous publiez un texte aligné sur votre modèle freemium, API ou marketplace interne. Les mises à jour sont rapides quand vous ajoutez une fonctionnalité sensible (IA, paiement entre utilisateurs, modération UGC).",
      },
      {
        heading: "Éditeur micro-entreprise ou société : ce qui change",
        body: "L'éditeur du service est identifié selon votre forme : entrepreneur individuel avec SIRET ou société avec capital et RCS. Les coordonnées de contact pour le support et les réclamations doivent être exactes. Si vous facturez via une entité distincte de l'éditeur technique, clarifiez les rôles ou unifiez les mentions. La TVA sur l'abonnement relève des CGV ou des conditions commerciales, pas des CGU seules. JuriVite harmonise l'identité avec vos autres documents. En cas de croissance (passage en SAS), régénérez les CGU pour refléter la nouvelle personne morale. Si l'éditeur technique diffère de l'entité qui facture, clarifiez les rôles dans les CGU ou unifiez les coordonnées pour limiter la confusion utilisateur. Les réclamations doivent aboutir à une boîte mail surveillée.",
      },
      {
        heading: "Publication, acceptation et évolution du service",
        body: "Affichez un lien vers les CGU avant la création de compte, avec case à cocher ou bouton d'acceptation explicite. Conservez une preuve de la version acceptée (date, version). Prévoyez une clause de modification avec information des utilisateurs. Pour les APIs, référencez les limites de taux et l'usage commercial interdit. En cas de suppression de compte, indiquez le sort des données (renvoi vers la politique RGPD). Testez l'accessibilité mobile du lien. JuriVite vous fait gagner du temps sur la rédaction initiale ; la gouvernance produit (ce qui est vraiment interdit) reste votre choix business. Conservez logs de version et date d'acceptation à l'inscription. Pour une modification substantielle, prévoyez notification par e-mail et délai raisonnable avant application aux abonnés en cours.",
      },
    ],
    faqs: [
      {
        question: "CGU obligatoires pour un SaaS B2B ?",
        answer:
          "Fortement recommandées, souvent exigées par les clients et les due diligences. Elles complètent le contrat commercial ou les CGV d'abonnement.",
      },
      {
        question: "CGU et CGV : faut-il les deux ?",
        answer:
          "Oui si vous vendez un abonnement ou des crédits : CGV pour le prix et le paiement, CGU pour l'usage du service et du compte.",
      },
      {
        question: "Puis-je modifier les CGU sans prévenir ?",
        answer:
          "Le contrat doit prévoir une procédure d'évolution et d'information. Les changements substantiels sur des abonnements en cours peuvent nécessiter un accord ou un préavis.",
      },
      {
        question: "Les CGU JuriVite couvrent-elles l'IA et les contenus générés ?",
        answer:
          "Le modèle couvre les clauses types ; si votre cœur de produit est l'IA ou l'UGC, ajoutez des sections spécifiques ou faites relire par un avocat.",
      },
    ],
  },
  "accord-confidentialite": {
    metaTitle:
      "NDA — Accord de confidentialité français en PDF pour freelances et TPE",
    metaDescription:
      "Modèle NDA bilatéral : définition des informations confidentielles, obligations, durée, exceptions. Avant partenariat, levée ou due diligence.",
    h1: "Accord de confidentialité (NDA)",
    intro:
      "Avant de partager roadmap, code, données clients ou chiffres, un accord de confidentialité cadre ce qui est secret, pendant combien de temps et quelles exceptions s'appliquent. JuriVite génère un NDA structuré, paramétrable, utilisable entre freelances, startups et PME.",
    seoBlocks: [
      {
        heading: "Qu'est-ce qu'un accord de confidentialité (NDA) ?",
        body: "Le NDA (Non-Disclosure Agreement) ou accord de confidentialité est le contrat par lequel une ou plusieurs parties s'engagent à ne pas divulguer certaines informations échangées dans le cadre de négociations, d'un partenariat, d'une prestation ou d'une due diligence. Il définit ce qui est « Information confidentielle », les obligations de protection, les exceptions (informations déjà publiques, développement indépendant), la durée et les sanctions en cas de violation. Pour un freelance ou une TPE, c'est la barrière avant de montrer un prototype, un pipeline commercial ou un carnet de commandes à un investisseur, un sous-traitant ou un gros prospect. Il peut être bilatéral (les deux parties échangent des secrets) ou unilatéral selon le scénario. Il ne couvre pas la propriété intellectuelle des livrables ni le paiement : ce sont d'autres documents.",
      },
      {
        heading: "Quand le signer est-il pertinent ou attendu ?",
        body: "Avant une levée de fonds, un rachat, un partenariat technologique, un appel d'offres sensible ou l'intégration d'un freelance sur des données internes. Les grands groupes imposent parfois leur propre NDA : lisez-le avant de signer. En l'absence de NDA, la protection repose sur des règles générales (concurrence déloyale, secret des affaires) plus difficiles à prouver. Le NDA ne remplace pas un contrat de prestation ni une cession de droits : il encadre seulement la confidentialité. JuriVite permet un modèle bilatéral courant, avec durée et survie des obligations paramétrables. Avant pitch investisseur, due diligence, partenariat tech ou accès à des données clients en avant-vente. Certains grands comptes imposent leur propre NDA : lisez les définitions et durées avant signature.",
      },
      {
        heading: "Violations, preuves et risques sans NDA",
        body: "Si un interlocuteur réutilise vos idées, votre code ou votre liste clients, la charge de la preuve sans NDA écrit est lourde. Les dommages sont difficiles à chiffrer. Un concurrent peut lancer un produit similaire après un pitch. Un freelance peut être accusé à tort de fuite s'il n'y a pas de définition claire des informations couvertes. Un NDA mal rédigé (trop large, illégal) peut être partiellement inapplicable. À l'inverse, un NDA équilibré et signé avant l'échange crée un cadre et un effet dissuasif. Les violations peuvent entraîner des dommages-intérêts contractuels si le contrat le prévoit. Sans clause de restitution des documents, un partenaire peut conserver des PDF sensibles après échec des négociations. Prévoyez dommages-intérêts contractuels raisonnables et voie de preuve (e-mails, accès logs).",
      },
      {
        heading: "JuriVite vs NDA copié depuis un modèle américain",
        body: "Les modèles US citent loi de l'État du Delaware, injonction devant tribunaux lointains ou définitions inadaptées au droit français. JuriVite propose un texte en français, structuré en articles, avec parties identifiées, durée, survie, restitution des documents et loi applicable française. Vous évitez les placeholders oubliés. Le PDF est présentable en réunion investisseur ou chez un avocat partenaire pour relecture rapide. Pour des secrets industriels de haute valeur, complétez par des mesures techniques (accès limité, watermark) — le contrat seul ne suffit pas. Le texte est en français avec loi applicable française et structure en articles lisible. Vous paramétrez durée, survie et exceptions sans jurisprudence US inadaptée.",
      },
      {
        heading: "Micro, société et sens du bilatéral",
        body: "Le NDA lie les entités que vous désignez : vous en nom personnel ou votre SAS, et le partenaire identique. Vérifiez que la personne qui signe a le pouvoir d'engager la société. En micro-entreprise, votre patrimoine professionnel et personnel mérite réflexion sur les garanties demandées. Le formulaire JuriVite adapte l'en-tête comme pour vos autres documents. Un NDA « unilatéral » (une seule partie divulgue) est un cas d'usage différent — choisissez le bon modèle selon l'échange réel. Harmonisez la durée avec la durée des négociations (souvent 2 à 5 ans avec survie de 2 à 3 ans sur les secrets).",
      },
      {
        heading: "Conseils pratiques : timing, périmètre, retour des documents",
        body: "Signez avant d'envoyer les documents sensibles, pas après. Listez par niveau ce qui est vraiment confidentiel — tout ne doit pas tomber sous NDA au risque d'étouffer la discussion. Prévoyez la restitution ou destruction des supports à la fin des négociations. Marquez « CONFIDENTIEL » sur les PDF partagés. Limitez les copies. Pour les appels, un e-mail récap confirmant ce qui est couvert aide. Si le projet aboutit, enchaînez contrat de prestation et clauses de confidentialité dans le contrat principal. JuriVite accélère la mise en place ; la discipline opérationnelle reste la clé. Marquez les pièces « CONFIDENTIEL » et limitez les destinataires en copie. Si le projet aboutit, intégrez des clauses de confidentialité dans le contrat de prestation principal pour la durée de la mission.",
      },
    ],
    faqs: [
      {
        question: "Durée standard d'un NDA ?",
        answer:
          "Souvent deux à cinq ans pour la confidentialité active, avec une clause de survie de deux à trois ans sur les secrets après la fin. Paramétrable dans le formulaire JuriVite.",
      },
      {
        question: "NDA unilatéral ou bilatéral ?",
        answer:
          "Bilatéral si les deux parties échangent des informations sensibles. Unilatéral si seul le divulgateur expose des secrets — adaptez le modèle en conséquence.",
      },
      {
        question: "Un NDA empêche-t-il la concurrence ?",
        answer:
          "Non. Il interdit de divulguer ou d'utiliser les informations confidentielles définies, pas d'exercer une activité concurrente sauf clause non-concurrence séparée (encadrée par la loi).",
      },
      {
        question: "Le NDA JuriVite vaut-il pour une levée de fonds ?",
        answer:
          "C'est une base sérieuse pour les premiers échanges. Les fonds imposent souvent leur propre document ; faites-le relire par votre conseil.",
      },
    ],
  },
  "convention-stage": {
    metaTitle:
      "Convention de stage — modèle PDF organisme d'accueil et stagiaire",
    metaDescription:
      "Générez une convention de stage : mission, tuteur, durée, gratification, assurance. Base structurée pour TPE, PME et freelances accueillant des stagiaires.",
    h1: "Convention de stage",
    intro:
      "Accueillir un stagiaire impose un cadre écrit : mission, encadrement, durée, gratification éventuelle et assurance. JuriVite fournit une convention structurée entre organisme d'accueil et stagiaire, à compléter avec l'établissement d'enseignement dans le cadre tripartite officiel.",
    seoBlocks: [
      {
        heading: "Convention de stage : rôle et parties concernées",
        body: "La convention de stage formalise la relation entre l'organisme d'accueil (entreprise, association, administration, freelance structuré), le stagiaire et l'établissement d'enseignement. Elle décrit la mission, les activités, le tuteur, la durée, les horaires, la gratification le cas échéant, l'assurance accident et la responsabilité civile. Le stage n'est pas un contrat de travail : le stagiaire reste étudiant. Pour une TPE ou un indépendant qui accueille ponctuellement un stagiaire, disposer d'un document clair évite les malentendus sur les tâches autorisées et les limites légales (durée, temps de travail, congés). L'établissement d'enseignement reste partie prenante dans la convention tripartite officielle. Le document JuriVite structure surtout le volet organisme d'accueil et la mission pédagogique avant intégration au formulaire de l'école.",
      },
      {
        heading: "Obligations légales de l'organisme d'accueil",
        body: "Le Code de l'éducation encadre les stages : convention écrite, durée maximale selon le niveau, temps de travail, repos, interdiction de certaines tâches dangereuses ou de remplacement d'un salarié. Au-delà de deux mois consécutifs, une gratification minimale est due (montant légal à vérifier au moment de la génération). L'organisme doit désigner un tuteur et veiller à l'assurance du stagiaire (via l'école et/ou l'organisme selon les cas). Le stage doit avoir un objet pédagogique en lien avec la formation. JuriVite intègre les blocs usuels mission, encadrement, gratification et confidentialité pour structurer votre accueil. Vérifiez l'assurance responsabilité civile et accident du stagiaire avec votre assureur et l'établissement. Le tuteur doit disposer du temps réel pour encadrer, pas seulement un intitulé sur le papier.",
      },
      {
        heading: "Sanctions, contentieux et risques d'un accueil non encadré",
        body: "Sans convention ou avec une mission floue, un stagiaire peut effectuer des tâches inadaptées, exposant l'organisme à un accident non couvert ou à un redressement. La requalification en salariat est un risque si les conditions de stage ne sont pas respectées (subordination excessive, durée abusive, missions de production pure sans lien pédagogique). L'absence de gratification due après deux mois peut entraîner des rappels de sommes. Les écoles exigent souvent leur propre formulaire tripartite signé avant le début — un document interne seul ne suffit pas toujours. Mieux vaut anticiper avec l'établissement et une convention cohérente. Une mission assimilée à un poste de production permanente ou à de la subordination excessive augmente le risque de requalification. Respectez durée légale, temps de repos et tâches interdites pour les stagiaires.",
      },
      {
        heading: "Pourquoi JuriVite plutôt qu'un PDF vieux de dix ans ?",
        body: "Les modèles trouvés en ligne oublient la gratification à jour, les règles RGPD sur les données du stagiaire ou les clauses de confidentialité utiles en startup tech. JuriVite pose les informations de l'organisme (forme juridique, SIRET, tuteur, mission) et génère un PDF lisible. Vous gagnez du temps pour la partie « organisme d'accueil » tout en sachant que la convention officielle de l'université ou de l'école doit souvent être complétée et signée en trois exemplaires. Le document JuriVite sert de base alignée sur votre réalité avant intégration au formulaire de l'établissement. Gratification minimale, confidentialité et identification de l'organisme sont à jour dans le parcours guidé. Vous gagnez du temps pour la partie entreprise avant de caler le document sur le modèle tripartite de l'université.",
      },
      {
        heading: "TPE, micro-entreprise ou société : identité de l'organisme",
        body: "L'organisme d'accueil est identifié avec la même rigueur que pour vos devis : raison sociale ou nom, SIRET, adresse, représentant. En micro-entreprise, vérifiez que votre statut permet d'accueillir un stagiaire selon votre activité et votre assurance. Une société désigne un tuteur interne avec l'organigramme adapté. La gratification et les frais (transport, restauration) doivent être cohérents avec la politique RH. JuriVite adapte les mentions d'identification ; la décision d'accueillir un stagiaire relève de votre capacité opérationnelle et pédagogique, pas seulement du document. Confirmez avec l'école que votre statut et votre assurance permettent l'accueil. Le tuteur doit être identifié avec ses coordonnées professionnelles et sa fonction réelle dans l'organisme.",
      },
      {
        heading: "Conseils : tripartite, tutorat, fin de stage",
        body: "Contactez l'établissement dès le début pour obtenir leur modèle tripartite et caler les dates. Nommez un tuteur disponible, pas seulement sur le papier. Rédigez une mission pédagogique avec objectifs et compétences visées. Respectez la durée maximale et les temps de repos. Ouvrez un dialogue en cas de difficulté avant rupture conflictuelle. À la fin, fournissez une attestation et un retour pour l'évaluation scolaire. Conservez la convention signée et les preuves d'assurance. JuriVite structure la partie organisme ; la validation finale passe par l'école et les signatures des trois parties. Planifiez des objectifs pédagogiques mesurables et une évaluation de fin de stage. En cas de télétravail, précisez les règles d'accès aux outils et la protection des données personnelles du stagiaire.",
      },
    ],
    faqs: [
      {
        question: "La convention JuriVite remplace-t-elle le document de l'école ?",
        answer:
          "Non. Elle complète et prépare le volet organisme d'accueil. La convention tripartite officielle fournie par l'établissement reste en principe indispensable.",
      },
      {
        question: "Gratification de stage : quand est-elle due ?",
        answer:
          "Au-delà de deux mois consécutifs de stage dans le même organisme, une gratification minimale légale est due. Indiquez le montant dans le formulaire en vérifiant le seuil en vigueur.",
      },
      {
        question: "Un auto-entrepreneur peut-il accueillir un stagiaire ?",
        answer:
          "Sous conditions liées à l'activité, à l'assurance et à la capacité d'encadrement. Renseignez-vous auprès de l'établissement et de votre caisse avant de vous engager.",
      },
      {
        question: "Stage et données personnelles (RGPD) ?",
        answer:
          "Si le stagiaire accède à des données clients, prévoyez confidentialité et politique interne. La politique de confidentialité du site ne couvre pas seule les accès internes du stagiaire.",
      },
    ],
  },
};
