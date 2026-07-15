#!/bin/sh
export PATH="$HOME/.local/bin:/opt/homebrew/bin:$PATH"
DIR="$(cd "$(dirname "$0")" && pwd)"
P="$(cat "$DIR/prompt.txt" 2>/dev/null)"
if [ -n "$P" ]; then
  claude "$P"
else
  claude 
fi
exec "${SHELL:-/bin/zsh}"
