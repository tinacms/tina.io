#! /bin/sh

# This script uses 4 environment variables:
# - PROJECT_NAME: the name of the project
# - VERSION_NUMBER: the version of the release
# - DATE_RELEASED: the date of the release
# - RELEASE_NOTES: the content of the release notes in markdown format

# Check if the environment variables are set
if [ -z "$PROJECT_NAME" ]; then
  echo "PROJECT_NAME is not set"
  exit 1
fi
if [ -z "$VERSION_NUMBER" ]; then
  echo "VERSION_NUMBER is not set"
  exit 1
fi
if [ -z "$DATE_RELEASED" ]; then
  echo "DATE_RELEASED is not set"
  exit 1
fi
if [ -z "$RELEASE_NOTES" ]; then
  echo "RELEASE_NOTES is not set"
  exit 1
fi
create_json_structure() {
  local version="$1"
  local date="$2"
  local changes_json="$3"
  
  # Create the final JSON structure with metadata
  jq -n --arg version "$version" --arg date "$date" --argjson changes "$changes_json" '{
    versionNumber: $version,
    dateReleased: $date,
    changesObject: $changes.changesObject
  }'
}

# Create the release notes file
pathToReleaseNotesRoot="content/whats-new-$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]')"
releaseNotesFile="$pathToReleaseNotesRoot/$(echo "$VERSION_NUMBER" | tr '[:upper:]' '[:lower:]').json"

echo "Creating release notes file: $releaseNotesFile"

# Trim the 'v' prefix if it exists in VERSION_NUMBER
trimmedVersionNumber=$(echo "$VERSION_NUMBER" | sed 's/^v//')

# Check if RELEASE_NOTES is JSON or markdown
if echo "$RELEASE_NOTES" | jq empty 2>/dev/null; then
  # It's JSON - create structured JSON output
  create_json_structure "$trimmedVersionNumber" "$DATE_RELEASED" "$RELEASE_NOTES" > "$releaseNotesFile"
else
  # It's markdown - parse and convert to JSON structure
  # Create a temporary file for processing
  temp_md=$(mktemp)
  echo "$RELEASE_NOTES" > "$temp_md"
  
  # Check if markdown contains "Updated dependencies" pattern
  if grep -qE "^[-*]   Updated dependencies" "$temp_md"; then
    # Use awk to parse markdown and build JSON structure
    # This handles sections (## and ### headers) and converts "Updated dependencies" into its own section
    awk -v version="$trimmedVersionNumber" -v date="$DATE_RELEASED" '
    BEGIN {
      section = ""
      in_updated_deps = 0
      updated_deps_commits = ""
      items = ""
      sections = ""
      first_section = 1
    }
    
    /^##+ / {
      # Extract section name (remove 2+ hashes and space)
      section_name = $0
      gsub(/^#+\s+/, "", section_name)
      
      # Skip "What'\''s Changed" as it'\''s just a container
      if (section_name == "What'\''s Changed") {
        next
      }
      
      # Save previous section
      if (section != "" && items != "") {
        if (!first_section) sections = sections ","
        first_section = 0
        sections = sections "\n      {\n        \"changesTitle\": \"" section "\",\n        \"changesList\": [" items "]\n      }"
        items = ""
      }
      section = section_name
      in_updated_deps = 0
      items = ""
      next
    }
    
    /^[-*]   Updated dependencies/ {
      # Save previous section
      if (section != "" && items != "") {
        if (!first_section) sections = sections ","
        first_section = 0
        sections = sections "\n      {\n        \"changesTitle\": \"" section "\",\n        \"changesList\": [" items "]\n      }"
        items = ""
      }
      # Extract first commit hash from markdown links like [`e27c017`](url)
      # Find pattern [`hash`] and extract the hash
      if (match($0, /\[`[a-f0-9]+`\]/)) {
        # Extract the substring starting after [` and ending before `]
        hash_start = RSTART + 2
        hash_end = RSTART + RLENGTH - 3
        updated_deps_commits = substr($0, hash_start, hash_end - hash_start + 1)
      }
      section = "Updated Dependencies"
      in_updated_deps = 1
      items = ""
      next
    }
    
    in_updated_deps && /^    -/ {
      dep_name = substr($0, 6)
      gsub(/^[[:space:]]+/, "", dep_name)
      gsub(/"/, "\\\"", dep_name)
      if (items != "") items = items ","
      item_json = "\n          {\n            \"changesDescription\": \"" dep_name "\""
      if (updated_deps_commits != "") {
        commit_hash = substr(updated_deps_commits, 1, 7)
        item_json = item_json ",\n            \"commit_hash\": \"" commit_hash "\",\n            \"commit_link\": \"https://github.com/tinacms/tinacms/commit/" updated_deps_commits "\""
      }
      item_json = item_json "\n          }"
      items = items item_json
      next
    }
    
    /^[-*]   / && !in_updated_deps {
      item_text = substr($0, 5)
      gsub(/^[[:space:]]+/, "", item_text)
      
      # Parse the markdown line to extract PR, commit, GitHub info, and description
      pr_number = ""
      pr_link = ""
      commit_hash = ""
      commit_link = ""
      gitHub_name = ""
      gitHub_link = ""
      description = item_text
      
      # Extract PR number and link: [#5734](https://github.com/.../pull/5734)
      if (match(item_text, /\[#[0-9]+\]\([^)]+\)/)) {
        pr_match = substr(item_text, RSTART, RLENGTH)
        pr_start = index(pr_match, "#") + 1
        pr_end = index(pr_match, "]") - 1
        pr_number = substr(pr_match, pr_start, pr_end - pr_start + 1)
        link_start = index(pr_match, "(") + 1
        link_end = index(pr_match, ")") - 1
        pr_link = substr(pr_match, link_start, link_end - link_start + 1)
      }
      
      # Extract commit hash and link: [`2a3ed6c`](https://github.com/.../commit/...)
      if (match(item_text, /\[`[a-f0-9]+`\]\([^)]+\)/)) {
        commit_match = substr(item_text, RSTART, RLENGTH)
        hash_start = index(commit_match, "`") + 1
        hash_end = index(substr(commit_match, hash_start), "`") - 1
        commit_hash = substr(commit_match, hash_start, hash_end)
        link_start = index(commit_match, "(") + 1
        link_end = index(commit_match, ")") - 1
        commit_link = substr(commit_match, link_start, link_end - link_start + 1)
      }
      
      # Extract GitHub name and link: [@wicksipedia](https://github.com/wicksipedia)
      # First try full markdown link format
      if (match(item_text, /\[@[^]]+\]\(https:\/\/github\.com\/[^)]+\)/)) {
        gh_match = substr(item_text, RSTART, RLENGTH)
        name_start = index(gh_match, "@") + 1
        name_end = index(gh_match, "]") - 1
        gitHub_name = substr(gh_match, name_start, name_end - name_start + 1)
        link_start = index(gh_match, "(") + 1
        link_end = index(gh_match, ")") - 1
        gitHub_link = substr(gh_match, link_start, link_end - link_start + 1)
      } else {
        # Try simple @name format (without markdown link)
        # Look for @username pattern (could be "by @username" or "@username made")
        if (match(item_text, /@[a-zA-Z0-9_-]+/)) {
          gitHub_name = substr(item_text, RSTART + 1, RLENGTH - 1)
          gitHub_link = "https://github.com/" gitHub_name
        }
      }
      
      # Extract description: everything after "! - " or "! "
      # Only do this if we found PR/commit info (TinaCMS format)
      if (pr_number != "" || commit_hash != "") {
        desc_pos = index(item_text, "! - ")
        if (desc_pos == 0) {
          desc_pos = index(item_text, "! ")
        }
        if (desc_pos > 0) {
          if (desc_pos == index(item_text, "! - ")) {
            description = substr(item_text, desc_pos + 4)
          } else {
            description = substr(item_text, desc_pos + 2)
          }
          gsub(/^[[:space:]]+/, "", description)
        }
      } else {
        # TinaCloud simple format - remove GitHub mention from description
        # Remove patterns like " by @username" or "@username made"
        if (gitHub_name != "") {
          # Remove " by @username" pattern
          gsub(/[[:space:]]+by[[:space:]]+@[a-zA-Z0-9_-]+/, "", item_text)
          # Remove "@username made" pattern (at start of line)
          gsub(/^@[a-zA-Z0-9_-]+[[:space:]]+made[[:space:]]+/, "", item_text)
          # Remove leading "@username " pattern
          gsub(/^@[a-zA-Z0-9_-]+[[:space:]]+/, "", item_text)
          # Remove trailing " @username" pattern
          gsub(/[[:space:]]+@[a-zA-Z0-9_-]+$/, "", item_text)
        }
        description = item_text
        gsub(/^[[:space:]]+/, "", description)
        gsub(/[[:space:]]+$/, "", description)
      }
      
      # Escape quotes
      gsub(/"/, "\\\"", description)
      
      # Build JSON object
      if (items != "") items = items ","
      item_json = "\n          {\n            \"changesDescription\": \"" description "\""
      
      if (pr_number != "") {
        gsub(/"/, "\\\"", pr_number)
        gsub(/"/, "\\\"", pr_link)
        item_json = item_json ",\n            \"pull_request_number\": \"" pr_number "\",\n            \"pull_request_link\": \"" pr_link "\""
      }
      
      if (commit_hash != "") {
        gsub(/"/, "\\\"", commit_hash)
        gsub(/"/, "\\\"", commit_link)
        item_json = item_json ",\n            \"commit_hash\": \"" commit_hash "\",\n            \"commit_link\": \"" commit_link "\""
      }
      
      if (gitHub_name != "") {
        gsub(/"/, "\\\"", gitHub_name)
        gsub(/"/, "\\\"", gitHub_link)
        item_json = item_json ",\n            \"gitHubName\": \"" gitHub_name "\",\n            \"gitHubLink\": \"" gitHub_link "\""
      }
      
      item_json = item_json "\n          }"
      items = items item_json
      next
    }
    
    END {
      # Save last section
      if (section != "" && items != "") {
        if (!first_section) sections = sections ","
        sections = sections "\n      {\n        \"changesTitle\": \"" section "\",\n        \"changesList\": [" items "]\n      }"
      }
      # Output JSON structure
      if (sections != "") {
        print "{\n  \"versionNumber\": \"" version "\",\n  \"dateReleased\": \"" date "\",\n  \"changesObject\": [" sections "\n  ]\n}"
      } else {
        # Fallback to simple structure
        print "{\n  \"versionNumber\": \"" version "\",\n  \"dateReleased\": \"" date "\",\n  \"changesObject\": [\n    {\n      \"changesTitle\": \"Release Notes\",\n      \"changesList\": [\n        {\n          \"changesDescription\": {\n            \"type\": \"root\",\n            \"children\": [\n              {\n                \"type\": \"p\",\n                \"children\": [\n                  {\n                    \"type\": \"text\",\n                    \"text\": \"\"\n                  }\n                ]\n              }\n            ]\n          }\n        }\n      ]\n    }\n  ]\n}"
      }
    }
    ' "$temp_md" | jq . > "$releaseNotesFile" 2>/dev/null || {
      # Fallback if parsing fails
      jq -n --arg version "$trimmedVersionNumber" --arg date "$DATE_RELEASED" --arg content "$RELEASE_NOTES" '{
        versionNumber: $version,
        dateReleased: $date,
        changesObject: [
          {
            changesTitle: "Release Notes",
            changesList: [
              {
                changesDescription: {
                  type: "root",
                  children: [
                    {
                      type: "p",
                      children: [
                        {
                          type: "text", 
                          text: $content
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        ]
      }' > "$releaseNotesFile"
    }
    rm -f "$temp_md"
  else
    # No "Updated dependencies" pattern - parse sections if they exist, otherwise use simple conversion
    # Check if markdown has sections (## or ### headers)
    if grep -qE "^##+ " "$temp_md"; then
      # Parse markdown with sections but no "Updated dependencies"
      awk -v version="$trimmedVersionNumber" -v date="$DATE_RELEASED" '
      BEGIN {
        section = ""
        items = ""
        sections = ""
        first_section = 1
      }
      
      /^##+ / {
        # Extract section name (remove 2+ hashes and space)
        section_name = $0
        # Remove leading hashes and spaces
        gsub(/^#+[[:space:]]+/, "", section_name)
        
        # Skip "What'\''s Changed" as it'\''s just a container
        if (section_name == "What'\''s Changed") {
          next
        }
        
        # Save previous section
        if (section != "" && items != "") {
          if (!first_section) sections = sections ","
          first_section = 0
          sections = sections "\n      {\n        \"changesTitle\": \"" section "\",\n        \"changesList\": [" items "]\n      }"
          items = ""
        }
        section = section_name
        items = ""
        next
      }
      
      /^[-*][[:space:]]/ {
        # Match both "-   " (dash + spaces) and "* " (asterisk + space) patterns
        if (/^-[[:space:]]{3}/) {
          item_text = substr($0, 5)
        } else if (/^\*[[:space:]]/) {
          item_text = substr($0, 3)
        } else {
          next
        }
        gsub(/^[[:space:]]+/, "", item_text)
        
        # Parse the markdown line to extract PR, commit, GitHub info, and description
        pr_number = ""
        pr_link = ""
        commit_hash = ""
        commit_link = ""
        gitHub_name = ""
        gitHub_link = ""
        description = item_text
        
        # Extract PR number and link: [#5734](https://github.com/.../pull/5734)
        if (match(item_text, /\[#[0-9]+\]\([^)]+\)/)) {
          pr_match = substr(item_text, RSTART, RLENGTH)
          pr_start = index(pr_match, "#") + 1
          pr_end = index(pr_match, "]") - 1
          pr_number = substr(pr_match, pr_start, pr_end - pr_start + 1)
          link_start = index(pr_match, "(") + 1
          link_end = index(pr_match, ")") - 1
          pr_link = substr(pr_match, link_start, link_end - link_start + 1)
        }
        
        # Extract commit hash and link: [`2a3ed6c`](https://github.com/.../commit/...)
        if (match(item_text, /\[`[a-f0-9]+`\]\([^)]+\)/)) {
          commit_match = substr(item_text, RSTART, RLENGTH)
          hash_start = index(commit_match, "`") + 1
          hash_end = index(substr(commit_match, hash_start), "`") - 1
          commit_hash = substr(commit_match, hash_start, hash_end)
          link_start = index(commit_match, "(") + 1
          link_end = index(commit_match, ")") - 1
          commit_link = substr(commit_match, link_start, link_end - link_start + 1)
        }
        
        # Extract GitHub name and link: [@wicksipedia](https://github.com/wicksipedia)
        # First try full markdown link format
        if (match(item_text, /\[@[^]]+\]\(https:\/\/github\.com\/[^)]+\)/)) {
          gh_match = substr(item_text, RSTART, RLENGTH)
          name_start = index(gh_match, "@") + 1
          name_end = index(gh_match, "]") - 1
          gitHub_name = substr(gh_match, name_start, name_end - name_start + 1)
          link_start = index(gh_match, "(") + 1
          link_end = index(gh_match, ")") - 1
          gitHub_link = substr(gh_match, link_start, link_end - link_start + 1)
        } else {
          # Try simple @name format (without markdown link)
          # Look for @username pattern (could be "by @username" or "@username made")
          if (match(item_text, /@[a-zA-Z0-9_-]+/)) {
            gitHub_name = substr(item_text, RSTART + 1, RLENGTH - 1)
            gitHub_link = "https://github.com/" gitHub_name
          }
        }
        
        # Extract description: everything after "! - " or "! "
        # Only do this if we found PR/commit info (TinaCMS format)
        if (pr_number != "" || commit_hash != "") {
          desc_pos = index(item_text, "! - ")
          if (desc_pos == 0) {
            desc_pos = index(item_text, "! ")
          }
          if (desc_pos > 0) {
            if (desc_pos == index(item_text, "! - ")) {
              description = substr(item_text, desc_pos + 4)
            } else {
              description = substr(item_text, desc_pos + 2)
            }
            gsub(/^[[:space:]]+/, "", description)
          }
        } else {
          # TinaCloud simple format - remove GitHub mention from description
          # Remove patterns like " by @username" or "@username made"
          if (gitHub_name != "") {
            # Remove " by @username" pattern
            gsub(/[[:space:]]+by[[:space:]]+@[a-zA-Z0-9_-]+/, "", item_text)
            # Remove "@username made" pattern (at start of line)
            gsub(/^@[a-zA-Z0-9_-]+[[:space:]]+made[[:space:]]+/, "", item_text)
            # Remove leading "@username " pattern
            gsub(/^@[a-zA-Z0-9_-]+[[:space:]]+/, "", item_text)
            # Remove trailing " @username" pattern
            gsub(/[[:space:]]+@[a-zA-Z0-9_-]+$/, "", item_text)
          }
          description = item_text
          gsub(/^[[:space:]]+/, "", description)
          gsub(/[[:space:]]+$/, "", description)
        }
        
        # Escape quotes
        gsub(/"/, "\\\"", description)
        
        # Build JSON object
        if (items != "") items = items ","
        item_json = "\n          {\n            \"changesDescription\": \"" description "\""
        
        if (pr_number != "") {
          gsub(/"/, "\\\"", pr_number)
          gsub(/"/, "\\\"", pr_link)
          item_json = item_json ",\n            \"pull_request_number\": \"" pr_number "\",\n            \"pull_request_link\": \"" pr_link "\""
        }
        
        if (commit_hash != "") {
          gsub(/"/, "\\\"", commit_hash)
          gsub(/"/, "\\\"", commit_link)
          item_json = item_json ",\n            \"commit_hash\": \"" commit_hash "\",\n            \"commit_link\": \"" commit_link "\""
        }
        
        if (gitHub_name != "") {
          gsub(/"/, "\\\"", gitHub_name)
          gsub(/"/, "\\\"", gitHub_link)
          item_json = item_json ",\n            \"gitHubName\": \"" gitHub_name "\",\n            \"gitHubLink\": \"" gitHub_link "\""
        }
        
        item_json = item_json "\n          }"
        items = items item_json
        next
      }
      
      END {
        # Save last section
        if (section != "" && items != "") {
          if (!first_section) sections = sections ","
          sections = sections "\n      {\n        \"changesTitle\": \"" section "\",\n        \"changesList\": [" items "]\n      }"
        }
        # Output JSON structure
        if (sections != "") {
          print "{\n  \"versionNumber\": \"" version "\",\n  \"dateReleased\": \"" date "\",\n  \"changesObject\": [" sections "\n  ]\n}"
        } else {
          # No sections found - use simple structure with string
          print "{\n  \"versionNumber\": \"" version "\",\n  \"dateReleased\": \"" date "\",\n  \"changesObject\": [\n    {\n      \"changesTitle\": \"Release Notes\",\n      \"changesList\": [\n        {\n          \"changesDescription\": \"\"\n        }\n      ]\n    }\n  ]\n}"
        }
      }
      ' "$temp_md" | jq . > "$releaseNotesFile" 2>/dev/null || {
        # Fallback if parsing fails
        jq -n --arg version "$trimmedVersionNumber" --arg date "$DATE_RELEASED" --arg content "$RELEASE_NOTES" '{
          versionNumber: $version,
          dateReleased: $date,
          changesObject: [
            {
              changesTitle: "Release Notes",
              changesList: [
                {
                  changesDescription: $content
                }
              ]
            }
          ]
        }' > "$releaseNotesFile"
      }
    else
      # No sections - use simple string format
      jq -n --arg version "$trimmedVersionNumber" --arg date "$DATE_RELEASED" --arg content "$RELEASE_NOTES" '{
        versionNumber: $version,
        dateReleased: $date,
        changesObject: [
          {
            changesTitle: "Release Notes",
            changesList: [
              {
                changesDescription: $content
              }
            ]
          }
        ]
      }' > "$releaseNotesFile"
    fi
    rm -f "$temp_md"
  fi
fi


echo "✅ File created"
cat $releaseNotesFile
