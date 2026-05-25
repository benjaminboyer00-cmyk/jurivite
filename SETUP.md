# JuriVite — Configuration avant le 1er juin

Checklist pour le parcours E2E complet en local.

## 0. Sécurité Git

`.env.local` est dans `.gitignore` — **ne jamais** `git add .env.local`.

Vérifier :

```bash
git check-ignore -v .env.local   # doit afficher une règle .gitignore
bash scripts/check-env.sh
```

## 1. Fichier `.env.local`

```bash
cp .env.example .env.local
openssl rand -base64 32   # coller dans AUTH_SECRET et NEXTAUTH_SECRET
```

| Variable | Où la trouver |
|----------|----------------|
| `DATABASE_URL` | `postgresql://jurivite:secret@localhost:5432/jurivite` (Docker) |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Développeurs → Clés API (mode test) |
| `STRIPE_PRICE_ID_PRO` | Produit « JuriVite Pro » 9€/mois (20 PDF) → `price_...` |
| `STRIPE_PRICE_ID_BUSINESS` | Produit « JuriVite Business » 30€/mois (illimité + API) |
| `STRIPE_WEBHOOK_SECRET` | `stripe listen` (voir §3) |
| `RESEND_API_KEY` | resend.com → API Keys |

## 2. Base de données locale

```bash
npm run db:up      # Docker Postgres
npm run db:push    # Tables Drizzle
```

## 3. Stripe (mode test)

1. [dashboard.stripe.com](https://dashboard.stripe.com) → **Mode test**
2. Produits récurrents : **Pro** 9 €/mois → `STRIPE_PRICE_ID_PRO` · **Business** 30 €/mois → `STRIPE_PRICE_ID_BUSINESS`
3. Installer [Stripe CLI](https://stripe.com/docs/stripe-cli)

```bash
# Terminal 1
npm run dev

# Terminal 2
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copier whsec_... dans STRIPE_WEBHOOK_SECRET puis redémarrer npm run dev
```

Carte test : `4242 4242 4242 4242` — date future — CVC quelconque.

## 4. Resend (magic link)

**Sans domaine** (tests locaux) :

- `EMAIL_FROM=JuriVite <onboarding@resend.dev>`
- Envoi **uniquement** vers l’email de ton compte Resend

**Avec domaine** (prod) :

- Ajouter `jurivite.fr` sur Resend
- Configurer DNS (SPF, DKIM)
- `EMAIL_FROM=JuriVite <noreply@jurivite.fr>`

## 5. Google OAuth (optionnel)

Google Cloud Console → OAuth 2.0 → redirect URI :

`http://localhost:3000/api/auth/callback/google`

## 6. Test E2E (la vérité du terrain)

| Étape | Attendu |
|-------|---------|
| 1. `/generate/cgv` déconnecté | PDF téléchargé **avec filigrane** |
| 2. `/login` → magic link ou Google | Session OK |
| 3. `/dashboard` | Historique du PDF |
| 4. `/tarifs` → Pro ou Business | Redirect Stripe Checkout |
| 5. Paiement test 4242... | Webhook → `plan: pro` ou `business` |
| 6. Regénérer PDF | **Sans filigrane** (Pro : max 20/mois) |
| 7. Business → Dashboard | Générer clé API → `POST /api/v1/generate-pdf` |

Vérifier le plan en DB :

```bash
npm run db:studio
# table user → colonne plan = pro
```

## 7. Commandes utiles

```bash
npm run dev          # Node 20 via fnm automatique
bash scripts/check-env.sh
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"slug":"cgv","data":{...}}' \
  --output test.pdf
```
