#!/bin/bash

# Script to find references to tina.io/docs in a TinaCMS codebase
# and save the URLs along with the file they were found in to an output file

# Check if a directory path was provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path-to-tinacms-repo> [github-repo-url]"
  echo "Example: $0 ~/Projects/tinacms https://github.com/tinacms/tinacms"
  exit 1
fi

# Set variables
TINACMS_REPO_PATH="$1"
GITHUB_REPO_URL="${2:-https://github.com/tinacms/tinacms}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FILE="${SCRIPT_DIR}/docs-references-$(date +%Y%m%d-%H%M%S).txt"

# Check if the directory exists
if [ ! -d "$TINACMS_REPO_PATH" ]; then
  echo "Error: Directory '$TINACMS_REPO_PATH' does not exist or is not accessible."
  exit 1
fi

echo "Searching for tina.io/docs references in $TINACMS_REPO_PATH..."
echo "Results will be saved to: $OUTPUT_FILE"

# Create the output file with a header
{
  echo "# TinaCMS Documentation References"
  echo "# Generated on: $(date)"
  echo "# Source: $TINACMS_REPO_PATH"
  echo "# GitHub: $GITHUB_REPO_URL"
  echo "# Note: Excludes distribution directories (dist, build, .next) and changelog files to avoid duplicates"
  echo "# Note: URL fragments (#section-name) are stripped from URLs"
  echo ""
} > "$OUTPUT_FILE"

# Use temporary file with absolute path
docs_results="/tmp/tina_docs_references_$$.txt"

# macOS-friendly grep options with exclusions for distribution directories and changelog files
grep -r "tina\.io/docs" \
  --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.md" --include="*.mdx" \
  --exclude="CHANGELOG.md" --exclude="changelog.md" \
  --exclude-dir="dist" --exclude-dir="build" --exclude-dir=".next" --exclude-dir="node_modules" \
  "$TINACMS_REPO_PATH" > "$docs_results" 2>/dev/null || true

# Check if any files were found
if [ ! -s "$docs_results" ]; then
  echo "No files containing 'tina.io/docs' references were found." | tee -a "$OUTPUT_FILE"
  DOCS_REF_COUNT=0
else
  # Process the results
  DOCS_REF_COUNT=$(wc -l < "$docs_results" | tr -d ' ')
  
  echo "Found references in $DOCS_REF_COUNT file(s):" >> "$OUTPUT_FILE"
  echo "-----------------------------------------" >> "$OUTPUT_FILE"
  
  while read -r line; do
    # Extract filename and line number
    file_info=$(echo "$line" | cut -d: -f1)
    file_path=$(echo "$file_info" | sed "s|^$TINACMS_REPO_PATH/||")
    
    # Extract the actual URL and strip fragments (#section-name)
    url_match=$(echo "$line" | grep -o "tina\.io/docs[^\"' )]*" | sed 's/#.*$//' || echo "")
    
    # Create GitHub link
    github_link="$GITHUB_REPO_URL/blob/main/$file_path"
    
    if [ -n "$url_match" ]; then
      {
      echo "$url_match"
      echo "File: $file_path"
        echo "GitHub: $github_link"
      echo ""
      } >> "$OUTPUT_FILE"
    fi
  done < "$docs_results"
  
  echo "-----------------------------------------" >> "$OUTPUT_FILE"
fi

echo "Search complete! Found $DOCS_REF_COUNT file(s) with tina.io/docs references." | tee -a "$OUTPUT_FILE"
echo "Results saved to: $OUTPUT_FILE"

# Clean up temp file
rm -f "$docs_results"
