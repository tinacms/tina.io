#!/usr/bin/env bash
#
# Vercel "Ignored Build Step" command.
#   exit 0  -> SKIP the build
#   exit 1  -> PROCEED with the build
#
# Wire this up in: Vercel Project Settings -> Git -> Ignored Build Step
#   Command:  bash scripts/vercel-ignore-build.sh
#
# Goal: stop spending ~7.5 min builds on PREVIEW deployments for bot-generated
# branches that nobody reviews (Chinese translations, release-notes). Production
# (main) and human PRs always build.

set -euo pipefail

echo "VERCEL_ENV=${VERCEL_ENV:-} VERCEL_GIT_COMMIT_REF=${VERCEL_GIT_COMMIT_REF:-}"

# Always build production deployments.
if [ "${VERCEL_ENV:-}" = "production" ]; then
  echo "Production deployment — building."
  exit 1
fi

# Skip preview builds for automated bot branches.
case "${VERCEL_GIT_COMMIT_REF:-}" in
  translate-pr-*|releaseNotes/*)
    echo "Bot branch preview (${VERCEL_GIT_COMMIT_REF}) — skipping build."
    exit 0
    ;;
esac

echo "Building."
exit 1
