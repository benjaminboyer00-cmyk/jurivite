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

### Compte utilisateur

- **Inscription** : `/login` → onglet « Inscription » (e-mail + mot de passe, 8 car. min.)
- **Un e-mail = un compte** (normalisation minuscules, contrainte SQL `unique`)
- **Connexion** : mot de passe, lien magique Resend, ou Google OAuth
- **Espace compte** : `/dashboard/compte` (mot de passe, abonnement Stripe, suppression RGPD)

## 3. Stripe (mode test)

1. [dashboard.stripe.com](https://dashboard.stripe.com) → **Mode test**
2. Produits récurrents : **Pro** 9 €/mois → `STRIPE_PRICE_ID_PRO` · **Business** 30 €/mois → `STRIPE_PRICE_ID_BUSINESS`
3. Installer [Stripe CLI](https://stripe.com/docs/stripe-cli)

```bash
# Terminal 1
npm run dev

# Terminal 2
stripe login
bash scripts/stripe-webhook-dev.sh
# Copier whsec_... dans STRIPE_WEBHOOK_SECRET puis redémarrer npm run dev
```

Carte test : `4242 4242 4242 4242` — date future — CVC quelconque.

## 4. Pages légales JuriVite (dogfooding)

Le site expose déjà les pages statiques générées à partir de la structure de nos modèles :

| Page | URL |
|------|-----|
| CGV | `/cgv` |
| Mentions légales | `/mentions-legales` |
| Confidentialité | `/confidentialite` |

**Avant la prod**, complétez `src/lib/legal/jurivite-site.ts` (SIRET, adresse, hébergeur, directeur de publication). Vous pouvez aussi regénérer le texte via `/generate/cgv` etc. avec vos vraies données et mettre à jour les pages.

Liens dans le footer du site.

## 5. Nom de domaine & Resend (à faire de votre côté)

1. Acheter **jurivite.fr** (OVH, Cloudflare, Hostinger…)
2. Resend → ajouter le domaine → copier les enregistrements **TXT / MX / DKIM** chez le registrar
3. `EMAIL_FROM=JuriVite <noreply@jurivite.fr>` dans `.env.local`
4. `NEXT_PUBLIC_SITE_URL=https://jurivite.fr`
5. Au déploiement VPS : enregistrement **A** vers l’IP du serveur

Sans domaine vérifié, les magic links partent de `onboarding@resend.dev` (limité à votre email de test).

## 6. Resend (magic link) — détail technique

**Sans domaine** (tests locaux) :

- `EMAIL_FROM=JuriVite <onboarding@resend.dev>`
- Envoi **uniquement** vers l’email de ton compte Resend

**Avec domaine** (prod) :

- Ajouter `jurivite.fr` sur Resend
- Configurer DNS (SPF, DKIM)
- `EMAIL_FROM=JuriVite <noreply@jurivite.fr>`

## 7. Google OAuth (optionnel)

Google Cloud Console → OAuth 2.0 → redirect URI :

`http://localhost:3000/api/auth/callback/google`

## 8. Test E2E (la vérité du terrain)

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

Logs attendus après paiement test :

```
[stripe webhook] checkout.session.completed (evt_...)
[stripe webhook] utilisateur <id> → plan pro (session cs_...)
```

## 9. Commandes utiles

```bash
npm run dev          # Node 20 via fnm automatique
bash scripts/check-env.sh
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"slug":"cgv","data":{...}}' \
  --output test.pdf
```
