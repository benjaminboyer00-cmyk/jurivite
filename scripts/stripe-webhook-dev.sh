#!/usr/bin/env bash
# Forward Stripe webhooks vers le serveur local JuriVite.
# Prérequis : Stripe CLI installée (https://stripe.com/docs/stripe-cli)
set -euo pipefail

PORT="${PORT:-3000}"
URL="localhost:${PORT}/api/webhooks/stripe"

if ! command -v stripe >/dev/null 2>&1; then
  echo "❌ Stripe CLI introuvable. Installez-la :"
  echo "   https://stripe.com/docs/stripe-cli"
  exit 1
fi

echo "→ Forward webhooks Stripe vers http://${URL}"
echo "→ Copiez le whsec_... affiché dans STRIPE_WEBHOOK_SECRET (.env.local)"
echo "→ Redémarrez npm run dev après mise à jour du secret"
echo ""

stripe listen --forward-to "http://${URL}"
