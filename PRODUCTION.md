# JuriVite — Checklist production (VPS)

## 1. Observabilité

### Sentry (obligatoire)

1. Créer un projet sur [sentry.io](https://sentry.io) → plateforme **Next.js**
2. Ajouter dans `.env` production :

```env
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ENVIRONMENT=production
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
```

3. Configurer une alerte **Email** ou **Slack** sur les erreurs `unhandled` et `level:error`
4. Tester : forcer une erreur sur `/api/generate-pdf` en dev → vérifier l’événement dans Sentry

Fichiers déjà en place : `instrumentation.ts`, `sentry.server.config.ts`, `instrumentation-client.ts`, `global-error.tsx`, `captureServerError()` sur PDF / Stripe / API.

### Uptime (obligatoire)

**Option A — Uptime Kuma** (sur le VPS, gratuit) :

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data louislam/uptime-kuma:1
```

Surveiller : `https://jurivite.fr` et **`https://jurivite.fr/api/health`** (vérifie aussi la connexion PostgreSQL). Alerte Telegram/Email si status ≠ 200.

**Option B — Better Stack / UptimeRobot** (externe, gratuit jusqu’à 50 monitors).

---

## 2. Backups PostgreSQL (obligatoire)

```bash
chmod +x scripts/backup-postgres.sh
```

Variables :

```env
DATABASE_URL=postgresql://...
BACKUP_DIR=/var/backups/jurivite
BACKUP_RETENTION_DAYS=14
# Optionnel Scaleway Object Storage / AWS S3 :
S3_BUCKET=s3://jurivite-backups
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Cron :

```cron
0 3 * * * /opt/jurivite/scripts/backup-postgres.sh >> /var/log/jurivite-backup.log 2>&1
```

**Test de restauration** (une fois avant prod) :

```bash
gunzip -c backups/jurivite_YYYYMMDD.sql.gz | psql "$DATABASE_URL_TEST"
```

---

## 3. Back-office admin

```env
ADMIN_EMAILS=votre@email.fr,autre@co-fondateur.fr
```

- URL : `https://jurivite.fr/admin` (connexion requise + e-mail dans la liste)
- Actions : forcer plan `pro` / `business`, éditer JSON document, regénérer PDF, télécharger

---

## 4. PDF — robustesse

Déjà actif :

- Sanitisation HTML / `{` `}` Handlebars / troncature champs longs
- CSS `page-break-inside: avoid` sur signatures et tableaux
- Puppeteer `--disable-dev-shm-usage` (évite crash RAM Docker)
- Timeout 45s + erreurs remontées dans Sentry

---

## 5. Stripe — support & remboursements

| Action | Où |
|--------|-----|
| Rembourser un client | Dashboard Stripe → Paiement → Rembourser |
| Annuler abonnement | Clients → Abonnement → Annuler |
| Chargeback | Stripe → Contestations → répondre sous 7 jours |
| Vérifier webhook | Developers → Webhooks → logs 200 |

Webhook prod : `https://jurivite.fr/api/webhooks/stripe` avec secret **live** `whsec_...`

---

## 6. Variables d’environnement production

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://jurivite.fr
DATABASE_URL=
AUTH_SECRET=
STRIPE_SECRET_KEY=sk_live_
STRIPE_WEBHOOK_SECRET=whsec_
STRIPE_PRICE_ID_PRO=
STRIPE_PRICE_ID_BUSINESS=
RESEND_API_KEY=
EMAIL_FROM=JuriVite <noreply@jurivite.fr>
ADMIN_EMAILS=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
JURIVITE_HOSTING_PROVIDER=Hetzner Online GmbH
JURIVITE_HOSTING_ADDRESS=Industriestr. 25, 91710 Gunzenhausen, Allemagne
```

---

## 7. Coolify / Docker

- Mémoire Puppeteer : **≥ 2 Go** RAM pour le conteneur app (Chromium reste en mémoire entre deux PDF — pool partagé)
- `serverExternalPackages: puppeteer` déjà dans `next.config.ts`
- **Perf PDF** : le 1er PDF après démarrage est plus lent (lancement Chromium ~2–3 s) ; les suivants sont nettement plus rapides. Optionnel : `PDF_WARM_ON_START=1` pour préchauffer au boot (voir `instrumentation.ts`)
- Healthcheck HTTP : `GET /api/health` → `200` avec `"database":"ok"`
- **Build** : définir `NEXT_PUBLIC_SITE_URL=https://jurivite.fr` **avant** `npm run build` (canonical, sitemap, Open Graph)
- Variables hébergeur LCEN : `JURIVITE_HOSTING_PROVIDER`, `JURIVITE_HOSTING_ADDRESS`

---

## 8. Checklist jour J

- [ ] Domaine + DNS + HTTPS
- [ ] Resend domaine vérifié
- [ ] Stripe live + webhook live testé
- [ ] Sentry alertes actives
- [ ] Uptime monitor actif
- [ ] Backup cron + test restore
- [ ] `ADMIN_EMAILS` configuré
- [ ] `NEXT_PUBLIC_SITE_URL=https://jurivite.fr` au build
- [ ] `JURIVITE_HOSTING_*`, `JURIVITE_DIRECTOR_NAME`, `JURIVITE_PRIVACY_EMAIL` (pages légales LCEN/RGPD)
- [ ] Stripe Billing Portal activé dans le dashboard Stripe (résiliation abonnement)
- [ ] Paiement test réel 9€ → plan Pro en DB → PDF sans filigrane
