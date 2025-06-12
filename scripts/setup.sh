#!/usr/bin/env bash
set -e

echo "🔧 Setting up CHAD-MVP dev environment..."

# Install dependencies
corepack enable
corepack prepare yarn@stable --activate
yarn install

# TODO: Add database setup (Postgres, Redis) if needed
# echo "Starting Postgres and Redis..."

echo "✅ Setup complete. You can now run: ./scripts/dev.sh"
