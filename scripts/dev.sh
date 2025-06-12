#!/usr/bin/env bash
set -euo pipefail

echo "\u25B6 Booting CHAD-MVP..."

# Start frontend & backend in parallel
yarn workspace frontend dev &
yarn workspace backend dev &

wait
