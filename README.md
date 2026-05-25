# JuriVite

Générateur de documents juridiques pour freelances et TPE — CGV, mentions légales, RGPD, contrats, devis.

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

1. Valide les données (Zod)
2. Compile le template Handlebars (`templates/*.html`)
3. Génère le PDF via Puppeteer
4. Applique un filigrane si plan `free`
5. Sauvegarde en base si utilisateur connecté

## Stripe en local

```bash
# Terminal 1
npm run dev

# Terminal 2 — après création du produit Pro dans Stripe Dashboard
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copiez le `whsec_...` dans `STRIPE_WEBHOOK_SECRET`.

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
