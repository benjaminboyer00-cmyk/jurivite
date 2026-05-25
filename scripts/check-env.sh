#!/usr/bin/env bash
# Vérifie .env.local avant tests E2E
set -e

ENV_FILE="${1:-.env.local}"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}✗ $ENV_FILE introuvable. Lance : cp .env.example .env.local${NC}"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE" 2>/dev/null || true

check() {
  local name="$1"
  local val="$2"
  local required="${3:-optional}"
  if [ -n "$val" ] && [ "$val" != "" ]; then
    echo -e "${GREEN}✓${NC} $name"
    return 0
  fi
  if [ "$required" = "required" ]; then
    echo -e "${RED}✗${NC} $name (requis)"
    return 1
  fi
  echo -e "${YELLOW}○${NC} $name (optionnel — fonctionnalité limitée)"
  return 0
}

echo "=== JuriVite — vérification $ENV_FILE ==="
echo ""

MISSING=0

SECRET="${AUTH_SECRET:-$NEXTAUTH_SECRET}"
check "AUTH_SECRET / NEXTAUTH_SECRET" "$SECRET" required || MISSING=1
check "AUTH_URL / NEXTAUTH_URL" "${AUTH_URL:-$NEXTAUTH_URL}" required || MISSING=1
check "DATABASE_URL" "$DATABASE_URL" optional
check "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY" optional
check "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET" optional
check "STRIPE_PRICE_ID_PRO" "${STRIPE_PRICE_ID_PRO:-$STRIPE_PRICE_ID}" optional
check "STRIPE_PRICE_ID_BUSINESS" "$STRIPE_PRICE_ID_BUSINESS" optional
check "NEXT_PUBLIC_SITE_URL" "$NEXT_PUBLIC_SITE_URL" optional
check "RESEND_API_KEY" "$RESEND_API_KEY" optional
check "GOOGLE_CLIENT_ID" "$GOOGLE_CLIENT_ID" optional
check "JURIVITE_HOSTING_PROVIDER" "$JURIVITE_HOSTING_PROVIDER" optional

echo ""
if git check-ignore -q .env.local 2>/dev/null; then
  echo -e "${GREEN}✓${NC} .env.local est bien ignoré par Git"
else
  echo -e "${RED}✗${NC} ATTENTION : .env.local pourrait être commité ! Vérifie .gitignore"
  MISSING=1
fi

echo ""
if [ "$MISSING" -eq 0 ]; then
  echo -e "${GREEN}Prêt pour npm run dev${NC}"
  echo "Parcours E2E complet : voir SETUP.md"
else
  echo -e "${RED}Corrige les variables requises ci-dessus.${NC}"
  exit 1
fi
