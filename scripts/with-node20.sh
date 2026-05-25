#!/usr/bin/env bash
# Force Node 20+ via fnm (Next.js 16 exige >= 20.9.0)
set -e

FNM_DIR="${FNM_DIR:-$HOME/.local/share/fnm}"
export PATH="$FNM_DIR:$PATH"

if command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env)"
  fnm use --install-if-missing 20 >/dev/null 2>&1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo ""
  echo "Node $(node -v) détecté — Next.js 16 exige Node >= 20.9.0."
  echo ""
  echo "Solution rapide :"
  echo "  export PATH=\"\$HOME/.local/share/fnm:\$PATH\""
  echo "  eval \"\$(fnm env)\""
  echo "  fnm use 20"
  echo "  npm run dev"
  echo ""
  exit 1
fi

exec "$@"
