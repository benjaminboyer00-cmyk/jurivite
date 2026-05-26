# JuriVite

Générateur de documents juridiques pour freelances et TPE — CGV, mentions légales, RGPD, contrats, devis.

**Version :** voir [`VERSION`](./VERSION) et [`CHANGELOG.md`](./CHANGELOG.md).

## Transparence & légal (site)

| Page | URL |
|------|-----|
| Avis juridique (disclaimer) | `/avis-juridique` |
| Politique de confidentialité | `/confidentialite` |
| Mentions légales | `/mentions-legales` |
| À propos de l'éditeur | `/a-propos` |
| CGU | `/cgu` |
| CGV abonnements | `/cgv` |

Éditeur : micro-entreprise JuriVite — SIRET `94430254600014`. Identité complète dans `src/lib/legal/jurivite-site.ts` et variables `JURIVITE_*` (voir `.env.example`).

## Prérequis

- Node.js 20+ (`fnm use`)
- Docker (PostgreSQL local)
- Comptes optionnels : Google Cloud (OAuth), Resend, Stripe

## Installation rapide

```bash
cp .env.example .env.local
npm run check:env      # Vérifie les variables + que Git ignore .env.local
npm install
npm run db:up          # PostgreSQL Docker
npm run db:push
npm run dev
```

**Checklist complète avant lancement :** voir [SETUP.md](./SETUP.md)

→ [http://localhost:3000](http://localhost:3000)

## Fonctionnalités

| Module | Route / Commande |
|--------|------------------|
| PDF Puppeteer | `POST /api/generate-pdf` |
| Auth Google + Magic Link | `/api/auth/[...nextauth]`, `/login` |
| Dashboard | `/dashboard` (historique + retéléchargement) |
| Stripe Pro 9€/mo | `/api/checkout`, `/api/webhooks/stripe` |
| SEO | `/generate/[slug]`, `/sitemap.xml`, `/robots.txt` |

## PDF local

Les formulaires appellent `/api/generate-pdf` qui :

1. Valide les données (Zod par slug + `validatePdfPayload`)
2. Nettoie les champs (`sanitizePdfPayload`)
3. Compile le template Handlebars (`templates/*.html`, échappement `{{ }}`)
4. Sanitize le HTML final (`isomorphic-dompurify` dans `generate.ts`)
5. Génère le PDF via Puppeteer (JS désactivé, requêtes externes bloquées, timeout 45 s)
6. Applique un filigrane si plan `free`
7. Sauvegarde en base si utilisateur connecté

## Sécurité

| Mesure | Implémentation |
|--------|----------------|
| Validation API | Zod sur routes sensibles + enum des 10 slugs PDF |
| HTML → PDF | DOMPurify + Puppeteer durci (`src/lib/pdf/generate.ts`) |
| Rate limiting | Middleware — mémoire ou **Upstash** si `UPSTASH_REDIS_REST_*` |
| Webhook Stripe | `verifyStripeWebhookEvent()` → `constructEvent` obligatoire |
| En-têtes HTTP | CSP, X-Frame-Options, HSTS en production (`middleware` + `next.config.ts`) |
| Tests | `npm test` (Vitest) — rate limit, sanitization, payloads, webhook |

**Puppeteer :** ne définissez `PDF_CHROME_NO_SANDBOX=1` que dans un conteneur isolé (utilisateur non-root). Jamais sur un VPS classique sans isolation.

```bash
npm test
```

## Stripe en local

```bash
# Terminal 1
npm run dev

# Terminal 2 — après création du produit Pro dans Stripe Dashboard
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copiez le `whsec_...` dans `STRIPE_WEBHOOK_SECRET`. Le handler vérifie chaque requête avec `stripe.webhooks.constructEvent` (voir `src/lib/stripe/verify-webhook.ts`).

## Google OAuth local

URL de redirection autorisée : `http://localhost:3000/api/auth/callback/google`

## Structure

```
src/
  app/api/          # PDF, auth, checkout, webhooks
  auth.ts           # Auth.js config
  db/               # Drizzle schema
  lib/pdf/          # Handlebars + Puppeteer
  lib/documents/    # Registre, contenu SEO
templates/          # HTML Handlebars
```

## Scripts

- `npm run dev` — développement
- `npm run db:up` — lance PostgreSQL (Docker)
- `npm run db:push` — synchronise le schéma
- `npm run db:studio` — interface Drizzle Studio
- `npm test` — tests unitaires (sécurité, PDF, Stripe)
