#!/usr/bin/env bash
# Packages the extension into dist/ for release (Chrome Web Store, Edge
# Add-ons, Firefox AMO: same zip; Safari: convert the unzipped folder).
set -euo pipefail
cd "$(dirname "$0")/.."

VERSION=$(node -p "require('./manifest.json').version")
ZIP="dist/clever-logs-pokemon-extension-v${VERSION}.zip"

npm test

mkdir -p dist
rm -f "$ZIP"
zip -qr "$ZIP" manifest.json content.js pokemon-names.js sprites icons \
  -x "icons/icon.svg" -x "*.DS_Store"

echo "Built $ZIP ($(du -h "$ZIP" | cut -f1))"
unzip -l "$ZIP" | tail -2
