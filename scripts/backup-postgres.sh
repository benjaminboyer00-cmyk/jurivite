#!/usr/bin/env bash
# Sauvegarde PostgreSQL JuriVite → fichier local + option S3/Scaleway
#
# Cron exemple (tous les jours à 3h) :
#   0 3 * * * /opt/jurivite/scripts/backup-postgres.sh >> /var/log/jurivite-backup.log 2>&1
#
# Variables (.env ou export) :
#   DATABASE_URL          — obligatoire
#   BACKUP_DIR            — défaut ./backups
#   BACKUP_RETENTION_DAYS — défaut 14
#   S3_BUCKET             — optionnel (ex. s3://jurivite-backups)
#   AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY — si S3

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$ROOT/backups}"
RETENTION="${BACKUP_RETENTION_DAYS:-14}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
FILENAME="jurivite_${TIMESTAMP}.sql.gz"

if [ -f "$ROOT/.env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env.local"
  set +a
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "❌ DATABASE_URL manquant"
  exit 1
fi

mkdir -p "$BACKUP_DIR"
OUT="$BACKUP_DIR/$FILENAME"

echo "→ Dump PostgreSQL → $OUT"
pg_dump "$DATABASE_URL" | gzip -9 > "$OUT"
echo "✓ $(du -h "$OUT" | cut -f1)"

if [ -n "${S3_BUCKET:-}" ]; then
  echo "→ Upload $S3_BUCKET/$FILENAME"
  aws s3 cp "$OUT" "$S3_BUCKET/$FILENAME"
  echo "✓ Upload terminé"
fi

echo "→ Rotation (${RETENTION} jours)"
find "$BACKUP_DIR" -name 'jurivite_*.sql.gz' -mtime +"$RETENTION" -delete 2>/dev/null || true

echo "✓ Backup OK — $TIMESTAMP"
