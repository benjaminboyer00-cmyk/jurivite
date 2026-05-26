# Changelog

Toutes les modifications notables du projet JuriVite sont documentées dans ce fichier.

Le format suit [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et le versionnement [Semantic Versioning](https://semver.org/lang/fr/).

## [0.3.0] — 2026-05-26

### Ajouté

- Tarification hybride : document **4,90 €**, pack **19,90 €**, abonnement **Pro 29,90 €/mois**
- Checkout Stripe one-shot (`/api/checkout/one-shot`) + droits document (`purchase`, `document_entitlement`)
- Configurateur d'offre sur `/tarifs`, CTA achat depuis les formulaires (filigrane)
- Mises à jour à vie (document unitaire) et crédits pack (3 documents / 3 mois)

### Modifié

- Pro : PDF illimités (plus de quota 20/mois) ; Business : sur devis uniquement (pas de checkout public)
- CGV, accueil, FAQ et JSON-LD alignés sur les nouveaux prix

## [0.2.0] — 2026-05-26

### Ajouté

- Identification éditeur : Benjamin Boyer, EI micro-entreprise « bzign », SIRET 94430254600014
- Pages de transparence : `/a-propos`, `/avis-juridique`
- Disclaimer LCEN/RGPD aligné consultation juridique (art. 54, case à cocher PDF)
- Bandeau légal visible sur l'accueil (disclaimer + liens RGPD)
- Identification éditeur renforcée (SIRET, directeur de publication, contact)
- IBAN sur factures/devis, RNA associations, hébergeur RGPD
- Convention de stage : rappel Cerfa / tripartite
- Support mobile/tablette (viewport, safe areas)
- Ce fichier CHANGELOG et `VERSION`

### Modifié

- Mentions légales, politique de confidentialité et pied de page enrichis
- JSON-LD Organisation avec coordonnées éditeur

## [0.1.0] — 2026-05

### Ajouté

- Générateur de 10 documents juridiques (PDF)
- Authentification (e-mail, Google), abonnements Stripe Pro/Business
- Pages légales site : CGU, CGV, confidentialité, mentions légales
- API REST Business, tableau de bord, SEO landings

[0.2.0]: https://github.com/jurivite/jurivite/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/jurivite/jurivite/releases/tag/v0.1.0
