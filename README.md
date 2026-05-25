# JuriVite

Générateur de documents juridiques pour freelances et TPE (CGV, mentions légales, contrats).

## Prérequis

- **Node.js 20+** (voir `.nvmrc`)
- npm

Avec [fnm](https://github.com/Schniz/fnm) :

```bash
fnm use
```

## Démarrage local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

- Accueil : `/`
- Générateur CGV : `/generate/cgv`

## Stack (MVP)

- Next.js 16 (App Router)
- Tailwind CSS 4 + Shadcn/UI
- React Hook Form + Zod
- Templates HTML dans `templates/` (moteur PDF Puppeteer — à brancher)

## Structure

```
src/
  app/              # Routes (landing, generate/cgv, SEO)
  components/       # UI, formulaires, layout
  lib/
    documents/      # Registre des types de documents
    schemas/        # Validation Zod
    seo.ts          # Metadata & Open Graph
templates/          # Modèles HTML pour PDF
```

## Prochaines étapes

1. Moteur PDF (Puppeteer Core + injection template)
2. Auth.js + PostgreSQL (Drizzle)
3. Stripe (filigrane gratuit / Pro sans filigrane)
4. Pages SEO programmatiques supplémentaires
