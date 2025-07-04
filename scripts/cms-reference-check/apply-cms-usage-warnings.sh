#!/bin/bash

# Script to add cmsUsageWarning fields to document frontmatter
# Uses the output of find-docs-references.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="${SCRIPT_DIR}/../../content/docs"

# Check if docs directory exists
if [ ! -d "$DOCS_DIR" ]; then
  echo "Error: Docs directory at $DOCS_DIR does not exist."
  exit 1
fi

# Find the latest generated docs-references file
LATEST_REF_FILE=$(ls -t "${SCRIPT_DIR}"/docs-references-*.txt 2>/dev/null | head -n 1)

if [ -z "$LATEST_REF_FILE" ]; then
  echo "Error: No docs-references file found. Please run find-docs-references.sh first."
  exit 1
fi

echo "Using references from: $(basename "$LATEST_REF_FILE")"
echo "Will update documents in: $DOCS_DIR"
echo ""

# Create a log file for the warnings application
LOG_FILE="${SCRIPT_DIR}/cms-warnings-applied-$(date +%Y%m%d-%H%M%S).txt"

# Create log file header
{
  echo "# CMS Usage Warnings Applied"
  echo "# Generated on: $(date)"
  echo "# Based on references from: $(basename "$LATEST_REF_FILE")"
  echo ""
} > "$LOG_FILE"

# Function to check if a doc path exists and return the full file path
find_doc_file() {
  local doc_path="$1"
  
  # Remove /docs/ prefix if present
  doc_path=${doc_path#/docs/}
  doc_path=${doc_path#tina.io/docs/}
  
  # Remove trailing slash if present
  doc_path=${doc_path%/}
  
  # Remove fragments (anything after #)
  doc_path=${doc_path%%#*}
  
  # Check for .md, .mdx, index.md, or index.mdx
  for ext in ".md" ".mdx"; do
    for format in "$doc_path$ext" "$doc_path/index$ext"; do
      if [ -f "$DOCS_DIR/$format" ]; then
        echo "$DOCS_DIR/$format"
        return 0
      fi
    done
  done
  
  return 1
}

# Function to update frontmatter with cmsUsageWarning
update_frontmatter() {
  local file_path="$1"
  local github_link="$2"
  local url_path="$3"
  
  # Check if file exists
  if [ ! -f "$file_path" ]; then
    echo "Error: File $file_path not found."
    return 1
  fi
  
  # Create a temporary file
  local temp_file=$(mktemp)
  
  # Check if file already has frontmatter (starts with ---)
  if grep -q "^---" "$file_path"; then
    # Check if cmsUsageWarning already exists
    if grep -q "cmsUsageWarning:" "$file_path"; then
      # If warning exists, update it with the new GitHub link
      awk -v github="$github_link" -v url="$url_path" '
        /cmsUsageWarning:/ {
          # Replace any existing cmsUsageWarning value with the GitHub link
          print "cmsUsageWarning: \"" github "\"";
          next;
        }
        { print $0 }
      ' "$file_path" > "$temp_file"
      
      # Inform about the update
      echo "Updated cmsUsageWarning in $file_path"
      echo "  Set to: $github_link"
    else
      # If no warning exists, add it after the first frontmatter marker
      awk -v github="$github_link" -v url="$url_path" '
        BEGIN { done = 0 }
        /^---/ && !done {
          print $0;
          print "cmsUsageWarning: \"" github "\"";
          done = 1;
          next;
        }
        { print $0 }
      ' "$file_path" > "$temp_file"
      
      # Inform about the update
      echo "Added cmsUsageWarning to $file_path"
      echo "  Added: $github_link"
    fi
  else
    # If no frontmatter exists, add it
    {
      echo "---"
      echo "cmsUsageWarning: \"$github_link\""
      echo "---"
      cat "$file_path"
    } > "$temp_file"
    
    # Inform about the update
    echo "Added frontmatter with cmsUsageWarning to $file_path"
    echo "  Added: $github_link"
  fi
  
  # Replace the original file
  mv "$temp_file" "$file_path"
  return 0
}

# Counter for updates
UPDATED_COUNT=0
SKIPPED_COUNT=0
TOTAL_COUNT=0

# Process the docs references file
while read -r line; do
  # Only process lines that start with tina.io/docs
  if [[ "$line" =~ ^tina\.io/docs ]]; then
    url_path="$line"
    
    # Read the next lines for File and GitHub link
    read -r file_info_line
    read -r github_link_line
    read -r empty_line
    
    # Extract the GitHub link
    github_link=$(echo "$github_link_line" | sed -n 's/GitHub: //p')
    
    # Find the corresponding document file
    doc_file=$(find_doc_file "$url_path")
    
    if [ -n "$doc_file" ]; then
      TOTAL_COUNT=$((TOTAL_COUNT + 1))
      
      # Update the frontmatter
      if update_frontmatter "$doc_file" "$github_link" "$url_path"; then
        {
          echo "Updated: $url_path"
          echo "File: $doc_file"
          echo "GitHub: $github_link"
          echo ""
        } >> "$LOG_FILE"
        UPDATED_COUNT=$((UPDATED_COUNT + 1))
      else
        {
          echo "Failed to update: $url_path"
          echo "File: $doc_file"
          echo "GitHub: $github_link"
          echo "Reason: Error updating frontmatter"
          echo ""
        } >> "$LOG_FILE"
        SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
      fi
    else
      echo "No document file found for $url_path"
      {
        echo "Skipped: $url_path"
        echo "Reason: No document file found"
        echo "GitHub: $github_link"
        echo ""
      } >> "$LOG_FILE"
      SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
    fi
  fi
done < "$LATEST_REF_FILE"

# Add summary to log
{
  echo "-----------------------------------------"
  echo "Summary:"
  echo "  - Total references processed: $TOTAL_COUNT"
  echo "  - Documents updated: $UPDATED_COUNT"
  echo "  - Documents skipped: $SKIPPED_COUNT"
} >> "$LOG_FILE"

echo "Completed applying CMS usage warnings!"
echo "  - Total references processed: $TOTAL_COUNT"
echo "  - Documents updated: $UPDATED_COUNT"
echo "  - Documents skipped: $SKIPPED_COUNT"
echo "Log saved to: $LOG_FILE" 