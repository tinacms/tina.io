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

# Create the release notes file
pathToReleaseNotesRoot="content/whats-new-$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]')"
releaseNotesFile="$pathToReleaseNotesRoot/$(echo "$VERSION_NUMBER" | tr '[:upper:]' '[:lower:]').mdx"

echo "Creating release notes file: $releaseNotesFile"

{
  echo "---"
  # Trim the 'v' prefix if it exists in VERSION_NUMBER
  trimmedVersionNumber=$(echo "$VERSION_NUMBER" | sed 's/^v//')
  echo "versionNumber: $trimmedVersionNumber"
  echo "dateReleased: $DATE_RELEASED"
  echo "---"
  echo ""
  # Use printf to correctly interpret \n as new lines
  printf "%b\n" "$RELEASE_NOTES"
} > "$releaseNotesFile"


echo "✅ File created"
cat $releaseNotesFile
