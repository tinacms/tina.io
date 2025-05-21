#!/bin/bash

# Script to check which tina.io/docs URLs referenced in the CMS code
# are missing in the actual docs repository

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="${SCRIPT_DIR}/../../content/docs"
NEXT_CONFIG="${SCRIPT_DIR}/../../next.config.js"

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
  echo "Error: Docs directory at $DOCS_DIR does not exist."
  exit 1
fi

# Check if next.config.js exists
if [ ! -f "$NEXT_CONFIG" ]; then
  echo "Warning: next.config.js not found at $NEXT_CONFIG. Redirect checking will be skipped."
  HAS_NEXT_CONFIG=false
else
  HAS_NEXT_CONFIG=true
fi

# Find the latest generated docs-references file
LATEST_REF_FILE=$(ls -t "${SCRIPT_DIR}"/docs-references-*.txt 2>/dev/null | head -n 1)

if [ -z "$LATEST_REF_FILE" ]; then
  echo "Error: No docs-references file found. Please run find-docs-references.sh first."
  exit 1
fi

echo "Using references from: $(basename "$LATEST_REF_FILE")"
echo "Checking for missing docs in: $DOCS_DIR"
if [ "$HAS_NEXT_CONFIG" = true ]; then
  echo "Will check redirects in: $NEXT_CONFIG"
fi
echo ""

OUTPUT_FILE="${SCRIPT_DIR}/missing-docs-$(date +%Y%m%d-%H%M%S).txt"

# Create output file header
{
  echo "# Missing Documentation Pages"
  echo "# Generated on: $(date)"
  echo "# Based on references from: $(basename "$LATEST_REF_FILE")"
  echo ""
  echo "The following URLs are referenced in the CMS codebase but don't exist in the docs:"
  echo "-----------------------------------------"
  echo ""
} > "$OUTPUT_FILE"

# Extract unique URLs from the references file, skipping homepage references
grep -o "tina\.io/docs[^\"' )]*" "$LATEST_REF_FILE" | \
  grep -v -e "tina\.io/docs$" -e "tina\.io/docs/$" | \
  sed 's/#.*$//' | sort | uniq > /tmp/unique_urls.txt

MISSING_COUNT=0
FOUND_COUNT=0
REDIRECTED_COUNT=0
BROKEN_REDIRECT_COUNT=0
TOTAL_URLS=$(wc -l < /tmp/unique_urls.txt | tr -d ' ')

echo "Found $TOTAL_URLS unique URLs to check..."

# Extract all redirects from next.config.js if it exists
if [ "$HAS_NEXT_CONFIG" = true ]; then
  # Get the entire redirects section
  sed -n '/async redirects/,/return \[/p' "$NEXT_CONFIG" > /tmp/redirects_section.txt
  
  # Extract all source and destination pairs for docs paths
  grep -A 3 "source: '/docs/" "$NEXT_CONFIG" > /tmp/redirects.txt
fi

# Function to check if a doc path exists
check_doc_exists() {
  local doc_path="$1"
  local found=false
  
  # Remove /docs/ prefix if present
  doc_path=${doc_path#/docs/}
  
  # Remove trailing slash if present
  doc_path=${doc_path%/}
  
  # Remove fragments (anything after #)
  doc_path=${doc_path%%#*}
  
  # Check for .md, .mdx, index.md, or index.mdx
  for ext in ".md" ".mdx"; do
    for format in "$doc_path$ext" "$doc_path/index$ext"; do
      if [ -f "$DOCS_DIR/$format" ]; then
        return 0  # Found
      fi
    done
  done
  
  return 1  # Not found
}

# Function to extract the redirect destination cleanly
extract_destination() {
  local redirect_info="$1"
  # Extract just the destination path within quotes
  local dest=$(echo "$redirect_info" | grep "destination:" | sed -n "s/.*destination: ['\"]\([^'\"]*\)['\"].*/\1/p" | head -n 1)
  echo "$dest"
}

while read -r url; do
  # Convert URL to potential file paths
  # Remove tina.io/docs/ prefix
  path=${url#tina.io/docs/}
  
  # Remove trailing slash if present
  path=${path%/}
  
  # Check for .md, .mdx, index.md, or index.mdx directly
  found=false
  
  if check_doc_exists "$path"; then
    found=true
    FOUND_COUNT=$((FOUND_COUNT + 1))
  fi
  
  # If not found in the docs directory, check if it's redirected
  if [ "$found" = false ] && [ "$HAS_NEXT_CONFIG" = true ]; then
    # Check for exact path match in redirects
    redirect_path="/docs/$path"
    redirect_found=false
    redirect_destination=""
    
    # First, check for exact match
    if grep -q "source: '${redirect_path}'," /tmp/redirects.txt; then
      redirect_found=true
      redirect_info=$(grep -A 2 "source: '${redirect_path}'," /tmp/redirects.txt)
      redirect_destination=$(extract_destination "$redirect_info")
    fi
    
    # If no exact match, check for wildcard patterns
    if [ "$redirect_found" = false ]; then
      # Try different segments of the path with wildcards
      path_parts=("$path")
      original_path="$path"
      while [[ "$path" == */* ]]; do
        path=${path%/*}
        path_parts+=("$path")
      done
      path="$original_path"  # Restore original path
      
      # Check patterns from most specific to least specific
      for part in "${path_parts[@]}"; do
        # Try both formats: with and without trailing comma
        if grep -q "source: '/docs/${part}/:path\*'," /tmp/redirects.txt || \
           grep -q "source: '/docs/${part}/:path\*'" /tmp/redirects.txt; then
          redirect_found=true
          redirect_info=$(grep -A 2 -E "source: '/docs/${part}/:path\*'[,]?" /tmp/redirects.txt)
          redirect_destination=$(extract_destination "$redirect_info")
          break
        fi
      done
    fi
    
    if [ "$redirect_found" = true ]; then
      # Remove any fragments from the redirect destination
      redirect_destination=${redirect_destination%%#*}
      
      # Check if the redirect destination exists
      redirect_target_exists=false
      if check_doc_exists "$redirect_destination"; then
        redirect_target_exists=true
      fi
      
      {
        echo "tina.io/docs/$path"
        echo "REDIRECTED → $redirect_destination"
        if [[ $redirect_info == *":path*"* ]]; then
          echo "(Matched by wildcard pattern)"
        fi
        
        if [ "$redirect_target_exists" = true ]; then
          echo "✅ Redirect target exists"
        else
          echo "❌ Redirect target does not exist"
          BROKEN_REDIRECT_COUNT=$((BROKEN_REDIRECT_COUNT + 1))
        fi
        
        echo ""
      } >> "$OUTPUT_FILE"
      
      found=true
      REDIRECTED_COUNT=$((REDIRECTED_COUNT + 1))
    fi
  fi
  
  # If still not found, it's truly missing
  if [ "$found" = false ]; then
    {
      echo "tina.io/docs/$path"
      echo "Potential paths checked:"
      echo "  - $DOCS_DIR/$path.md"
      echo "  - $DOCS_DIR/$path.mdx"
      echo "  - $DOCS_DIR/$path/index.md"
      echo "  - $DOCS_DIR/$path/index.mdx"
      echo "  - No redirect found in next.config.js"
      echo ""
    } >> "$OUTPUT_FILE"
    MISSING_COUNT=$((MISSING_COUNT + 1))
  fi
done < /tmp/unique_urls.txt

# Add a section to show the redirects configuration for broken redirects
if [ "$BROKEN_REDIRECT_COUNT" -gt 0 ]; then
  {
    echo "-----------------------------------------"
    echo "Broken Redirect Details:"
    echo ""
  } >> "$OUTPUT_FILE"
  
  # Extract the redirect information for these targets
  while read -r line; do
    if [[ "$line" == *"REDIRECTED → "* ]] && [[ "$line" == *"❌ Redirect target does not exist"* ]]; then
      url=$(echo "$line" | grep -o "tina\.io/docs/[^ ]*")
      path=${url#tina.io/docs/}
      
      {
        echo "For: $url"
        echo "Redirect config from next.config.js:"
        grep -A 3 -B 1 "/docs/$path" /tmp/redirects.txt >> "$OUTPUT_FILE" 2>/dev/null || \
        grep -A 3 -B 1 "${path}/:path" /tmp/redirects.txt >> "$OUTPUT_FILE" 2>/dev/null || \
        echo "  (Could not find exact redirect configuration)"
        echo ""
      } >> "$OUTPUT_FILE"
    fi
  done < "$OUTPUT_FILE"
fi

{
  echo "-----------------------------------------"
  echo "Summary:"
  echo "  - Total unique URLs: $TOTAL_URLS"
  echo "  - Found in docs: $FOUND_COUNT"
  echo "  - Redirected in next.config.js: $REDIRECTED_COUNT"
  echo "    - With broken targets: $BROKEN_REDIRECT_COUNT"
  echo "  - Missing and not redirected: $MISSING_COUNT"
} >> "$OUTPUT_FILE"

echo "Analysis complete!"
echo "  - Total unique URLs: $TOTAL_URLS"
echo "  - Found in docs: $FOUND_COUNT"
echo "  - Redirected in next.config.js: $REDIRECTED_COUNT" 
echo "    - With broken targets: $BROKEN_REDIRECT_COUNT"
echo "  - Missing and not redirected: $MISSING_COUNT"
echo "Results saved to: $OUTPUT_FILE"

# Clean up
rm -f /tmp/unique_urls.txt /tmp/redirects.txt /tmp/redirects_section.txt /tmp/debug.log 