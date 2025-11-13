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
  # It's markdown - convert to simple JSON structure for backward compatibility
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
fi


echo "✅ File created"
cat $releaseNotesFile
