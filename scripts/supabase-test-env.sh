#!/usr/bin/env bash
# Prints env lines for tests from a running LOCAL Supabase (`supabase start`).
# Handles both new (PUBLISHABLE_KEY/SECRET_KEY) and legacy (ANON_KEY/SERVICE_ROLE_KEY) names.
# Usage: bash scripts/supabase-test-env.sh >> "$GITHUB_ENV"   (CI)
#        bash scripts/supabase-test-env.sh > .env.test.local   (your PC, with Docker)
set -euo pipefail
if command -v supabase >/dev/null 2>&1; then SB=supabase; else SB="npx supabase"; fi
eval "$($SB status -o env 2>/dev/null)"
URL="${API_URL:?supabase is not running}"
PUB="${PUBLISHABLE_KEY:-${ANON_KEY:?no publishable/anon key}}"
SEC="${SECRET_KEY:-${SERVICE_ROLE_KEY:?no secret/service_role key}}"
MAIL="${MAILPIT_URL:-${INBUCKET_URL:-http://127.0.0.1:54324}}"
cat <<OUT
SUPABASE_TEST_URL=$URL
SUPABASE_TEST_PUBLISHABLE_KEY=$PUB
SUPABASE_TEST_SECRET_KEY=$SEC
MAILPIT_URL=$MAIL
NEXT_PUBLIC_SUPABASE_URL=$URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$PUB
SUPABASE_SECRET_KEY=$SEC
OUT
