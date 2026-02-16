#!/bin/bash
set -e

# ────────────────────────────────────────────────────────────────────
# Visual Branch Comparison
#
# Captures full-page screenshots of every page on two branches
# and generates an HTML diff report highlighting visual changes.
#
# Usage:
#   pnpm visual:compare <pr-branch> [base-branch]
#
# Examples:
#   pnpm visual:compare fix/seo-phase-1-critical-issues
#   pnpm visual:compare feature/new-header main
#   pnpm visual:compare my-branch staging
#
# Requirements:
#   - Clean working tree (commit or stash changes first)
#   - Port 3000 free (script manages the dev server)
#   - Playwright browsers installed (pnpm exec playwright install chromium)
# ────────────────────────────────────────────────────────────────────

PR_BRANCH="${1:?Usage: pnpm visual:compare <pr-branch> [base-branch]}"
BASE_BRANCH="${2:-main}"
ORIGINAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SCREENSHOT_DIR="$ROOT_DIR/tests/visual-compare/screenshots"

# Everything lives in temp during the run — immune to branch switches
TEMP_DIR=$(mktemp -d)

# Colours
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

info()  { echo -e "${BLUE}▸${NC} $1"; }
ok()    { echo -e "${GREEN}✓${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
err()   { echo -e "${RED}✗${NC} $1"; }

# Force-remove injected test files (they're untracked on other branches)
remove_injected_files() {
  rm -f "$ROOT_DIR/tests/visual-compare/capture.spec.ts" 2>/dev/null || true
  rm -f "$ROOT_DIR/tests/visual-compare/discover-pages.ts" 2>/dev/null || true
  rm -rf "$ROOT_DIR/tests/visual-compare/screenshots" 2>/dev/null || true
  # Remove the directory only if it's now empty
  rmdir "$ROOT_DIR/tests/visual-compare" 2>/dev/null || true
  rmdir "$ROOT_DIR/tests" 2>/dev/null || true
}

cleanup() {
  # Kill any dev server we started
  if [ -n "$DEV_PID" ]; then
    kill "$DEV_PID" 2>/dev/null || true
    wait "$DEV_PID" 2>/dev/null || true
  fi
  # Clean up injected files so branch switch works
  remove_injected_files
  # Return to original branch
  if [ "$(git rev-parse --abbrev-ref HEAD)" != "$ORIGINAL_BRANCH" ]; then
    warn "Returning to $ORIGINAL_BRANCH"
    git checkout "$ORIGINAL_BRANCH" --quiet 2>/dev/null || git checkout -f "$ORIGINAL_BRANCH" --quiet
  fi
  # Clean temp
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# ── Preflight checks ──────────────────────────────────────────────

echo ""
echo -e "${BOLD}Visual Branch Comparison${NC}"
echo -e "Comparing ${BLUE}${PR_BRANCH}${NC} against ${BLUE}${BASE_BRANCH}${NC}"
echo ""

if [ -n "$(git status --porcelain)" ]; then
  err "Working tree is dirty. Commit or stash your changes first."
  exit 1
fi

# Verify both branches exist
if ! git rev-parse --verify "$PR_BRANCH" >/dev/null 2>&1; then
  err "Branch not found: $PR_BRANCH"
  exit 1
fi
if ! git rev-parse --verify "$BASE_BRANCH" >/dev/null 2>&1; then
  err "Branch not found: $BASE_BRANCH"
  exit 1
fi

# Check Playwright browsers
if ! pnpm exec playwright install --dry-run chromium 2>/dev/null | grep -q "already"; then
  info "Installing Playwright browsers..."
  pnpm exec playwright install chromium
fi

# Kill anything on port 3000
if lsof -ti:3000 >/dev/null 2>&1; then
  warn "Killing existing process on port 3000"
  lsof -ti:3000 | xargs kill -9 2>/dev/null || true
  sleep 1
fi

# ── Stash test files + report script to temp ──────────────────────

info "Saving test files to temp location..."
cp -r "$ROOT_DIR/tests/visual-compare" "$TEMP_DIR/visual-compare"
cp "$SCRIPT_DIR/visual-diff-report.mjs" "$TEMP_DIR/visual-diff-report.mjs"
# Remove screenshots from the temp copy (we only want the spec files)
rm -rf "$TEMP_DIR/visual-compare/screenshots"
ok "Test files stashed in $TEMP_DIR"

# Create temp screenshot dirs
mkdir -p "$TEMP_DIR/screenshots/baseline"
mkdir -p "$TEMP_DIR/screenshots/current"

# ── Helper: inject test files, capture, clean up ──────────────────

capture() {
  local label="$1"

  # Inject the test spec files onto this branch
  mkdir -p "$ROOT_DIR/tests/visual-compare"
  cp "$TEMP_DIR/visual-compare/capture.spec.ts" "$ROOT_DIR/tests/visual-compare/"
  cp "$TEMP_DIR/visual-compare/discover-pages.ts" "$ROOT_DIR/tests/visual-compare/"

  info "Starting dev server..."
  cd "$ROOT_DIR"
  pnpm dev > /dev/null 2>&1 &
  DEV_PID=$!

  # Wait for server to be ready (poll every 2s, max 120s)
  local elapsed=0
  while ! curl -s -o /dev/null -w '' http://localhost:3000 2>/dev/null; do
    sleep 2
    elapsed=$((elapsed + 2))
    if [ $elapsed -ge 120 ]; then
      err "Dev server failed to start within 120s"
      exit 1
    fi
  done
  ok "Dev server ready (${elapsed}s)"

  info "Capturing screenshots (label=$label)..."
  VISUAL_LABEL="$label" pnpm exec playwright test tests/visual-compare/capture.spec.ts \
    --project=chromium \
    --reporter=list \
    --retries=1 || true

  # Move screenshots to temp (safe from branch switches)
  if [ -d "$SCREENSHOT_DIR/$label" ]; then
    cp -r "$SCREENSHOT_DIR/$label"/* "$TEMP_DIR/screenshots/$label/" 2>/dev/null || true
    local count
    count=$(ls "$TEMP_DIR/screenshots/$label"/*.png 2>/dev/null | wc -l | tr -d ' ')
    ok "Captured $count screenshots"
  else
    warn "No screenshots captured for $label"
  fi

  # Stop dev server
  kill "$DEV_PID" 2>/dev/null || true
  wait "$DEV_PID" 2>/dev/null || true
  unset DEV_PID
  sleep 2

  # Remove injected files so git checkout to next branch works cleanly
  remove_injected_files
}

# ── 1. Capture baseline (base branch) ─────────────────────────────

echo ""
echo -e "${BLUE}━━━ Step 1/3: Capturing baseline (${BASE_BRANCH}) ━━━${NC}"
git checkout "$BASE_BRANCH" --quiet
ok "Checked out $BASE_BRANCH"
capture "baseline"

# ── 2. Capture current (PR branch) ────────────────────────────────

echo ""
echo -e "${BLUE}━━━ Step 2/3: Capturing current (${PR_BRANCH}) ━━━${NC}"
git checkout "$PR_BRANCH" --quiet
ok "Checked out $PR_BRANCH"
capture "current"

# ── 3. Return to original branch and generate report ──────────────

git checkout "$ORIGINAL_BRANCH" --quiet
ok "Back on $ORIGINAL_BRANCH"

# Copy screenshots from temp back to the project
rm -rf "$SCREENSHOT_DIR"
mkdir -p "$SCREENSHOT_DIR/baseline" "$SCREENSHOT_DIR/current"
cp -r "$TEMP_DIR/screenshots/baseline"/* "$SCREENSHOT_DIR/baseline/" 2>/dev/null || true
cp -r "$TEMP_DIR/screenshots/current"/* "$SCREENSHOT_DIR/current/" 2>/dev/null || true

echo ""
echo -e "${BLUE}━━━ Step 3/3: Generating diff report ━━━${NC}"
VISUAL_BASE_BRANCH="$BASE_BRANCH" VISUAL_PR_BRANCH="$PR_BRANCH" node "$TEMP_DIR/visual-diff-report.mjs"

# Open report
REPORT="$ROOT_DIR/tests/visual-compare/report.html"
if [ -f "$REPORT" ]; then
  echo ""
  ok "Done! Opening report..."
  open "$REPORT" 2>/dev/null || xdg-open "$REPORT" 2>/dev/null || echo "Open: $REPORT"
fi
