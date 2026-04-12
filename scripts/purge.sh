#!/bin/sh
set -e

# docker exec doesn't inherit runtime env vars; source them from the
# file written by entrypoint.sh at container startup.
if [ -z "$BUNNY_API_KEY" ] && [ -f /etc/environment ]; then
  . /etc/environment
fi

CDN_HOST="${CDN_HOST:-cdn.andrewstiefel.net}"

if [ -z "$BUNNY_API_KEY" ] || [ -z "$BUNNY_PULLZONE_ID" ]; then
  echo "Error: BUNNY_API_KEY and BUNNY_PULLZONE_ID must be set"
  exit 1
fi

# Purge the pull zone (clears CDN cache and rotates Perma-Cache directory)
echo "Purging pull zone ${BUNNY_PULLZONE_ID}..."
curl -sf -X POST \
  -H "AccessKey: ${BUNNY_API_KEY}" \
  "https://api.bunny.net/pullzone/${BUNNY_PULLZONE_ID}/purgeCache"
echo "Cache purged successfully"

# Wait for purge to propagate before warming
sleep 5

# Warm the cache by requesting each page through the CDN,
# which triggers a fresh origin fetch and Perma-Cache fill.
echo "Warming cache via sitemap..."
SITEMAP_URL="https://${CDN_HOST}/sitemap.xml"
URLS=$(curl -sf "$SITEMAP_URL" | grep -oP '(?<=<loc>)[^<]+') || true

if [ -z "$URLS" ]; then
  echo "No URLs found in sitemap, warming key paths instead"
  for path in / /posts/ /sitemap.xml; do
    curl -sf -o /dev/null "https://${CDN_HOST}${path}" \
      && echo "  Warmed: ${path}" \
      || echo "  Failed: ${path}"
  done
else
  echo "$URLS" | while read -r url; do
    curl -sf -o /dev/null "$url" \
      && echo "  Warmed: $url" \
      || echo "  Failed: $url"
  done
fi

echo "Done"
