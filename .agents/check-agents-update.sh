#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-.}"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"
META_FILE="$TARGET_DIR/.agents/agents-creator.env"

if [ ! -f "$META_FILE" ]; then
  echo "agents-creator metadata not found: $META_FILE" >&2
  exit 2
fi

# shellcheck disable=SC1090
source "$META_FILE"

SOURCE_DIR=""
TEMP_DIR=""

cleanup() {
  if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
  fi
}
trap cleanup EXIT

if [ -n "${SOURCE_PATH:-}" ] && [ -d "$SOURCE_PATH" ]; then
  SOURCE_DIR="$SOURCE_PATH"
elif [ -n "${SOURCE_URL:-}" ]; then
  if ! command -v git >/dev/null 2>&1; then
    echo "git is required to check updates from SOURCE_URL" >&2
    exit 2
  fi

  TEMP_DIR="$(mktemp -d)"
  git clone --depth 1 "$SOURCE_URL" "$TEMP_DIR/agents-creator" >/dev/null 2>&1
  SOURCE_DIR="$TEMP_DIR/agents-creator"
else
  echo "No usable SOURCE_PATH or SOURCE_URL in $META_FILE" >&2
  exit 2
fi

STATUS=0

for path in .claude/agents .codex/agents .cursor/agents skills docs; do
  if [ ! -e "$SOURCE_DIR/$path" ]; then
    echo "Missing source path: $path" >&2
    STATUS=2
    continue
  fi

  if [ ! -e "$TARGET_DIR/$path" ]; then
    echo "Update available: missing target path $path"
    STATUS=10
    continue
  fi

  if ! diff -qr "$SOURCE_DIR/$path" "$TARGET_DIR/$path" >/dev/null; then
    echo "Update available: $path differs from agents-creator"
    STATUS=10
  fi
done

if [ "$STATUS" -eq 0 ]; then
  echo "Agents are up to date."
fi

exit "$STATUS"
