#!/bin/bash
set -e

echo "Installing rclone..."
curl https://rclone.org/install.sh | bash

echo "Configuring rclone for Bunny..."
mkdir -p ~/.config/rclone
cat > ~/.config/rclone/rclone.conf <<EOF
[bunny]
type = ftp
host = ${BUNNY_STORAGE_HOSTNAME}
user = ${BUNNY_STORAGE_ZONE}
pass = $(rclone obscure "${BUNNY_STORAGE_PASSWORD}")
EOF

echo "Syncing to Bunny CDN..."
rclone sync _site/ bunny:/ --progress --delete-before

echo "Purging CDN cache..."
curl -X POST "https://api.bunny.net/pullzone/${BUNNY_PULLZONE_ID}/purgeCache" \
  -H "AccessKey: ${BUNNY_API_KEY}"

echo "Deployment complete!"