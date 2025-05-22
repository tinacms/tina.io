# CMS Reference Check Scripts

This directory contains scripts to find and validate documentation references throughout the TinaCMS codebase.

## Overview

The scripts in this directory help you:

1. Find references to `tina.io/docs` URLs in the TinaCMS codebase
2. Check if these referenced documentation pages actually exist
3. Validate if redirects in `next.config.js` are properly set up
4. Apply CMS usage warnings to document frontmatter

## Scripts

### 1. `find-docs-references.sh`

This script searches a TinaCMS codebase for references to `tina.io/docs` URLs and outputs the results to a file.

#### Usage

```bash
./find-docs-references.sh <path-to-tinacms-repo> [github-repo-url]
```

#### Parameters

- `<path-to-tinacms-repo>`: Required. Path to the TinaCMS repository to search in.
- `[github-repo-url]`: Optional. The GitHub URL for the repository (defaults to https://github.com/tinacms/tinacms).

#### Example

```bash
./find-docs-references.sh ~/Projects/tinacms https://github.com/tinacms/tinacms
```

The script will:

- Search for `tina.io/docs` references in the specified repository
- Exclude distribution directories (dist, build, .next, node_modules) and changelog files
- Strip URL fragments (#section-name)
- Output the results to a file named `docs-references-YYYYMMDD-HHMMSS.txt`

### 2. `find-missing-docs.sh`

This script checks which documentation URLs found by `find-docs-references.sh` are:

- Actually present in your docs repository
- Redirected by `next.config.js`
- Missing entirely

#### Usage

```bash
./scripts/cms-reference-check/find-missing-docs.sh
```

#### How it works

The script:

1. Takes the most recent output file from `find-docs-references.sh`
2. Checks if each referenced URL exists in your docs directory
3. For URLs that don't exist directly, checks if they're redirected in `next.config.js`
4. Validates if redirect destinations actually exist
5. Outputs a comprehensive report

#### Output

The script generates a file named `missing-docs-YYYYMMDD-HHMMSS.txt` containing:

- URLs found directly in the docs
- URLs redirected by `next.config.js` (with ✅ or ❌ indicating if the redirect target exists)
- URLs that are completely missing
- Details about broken redirects (if any)
- A summary of statistics

### 3. `apply-cms-usage-warnings.sh`

This script adds `cmsUsageWarning` fields to document frontmatter for pages that are referenced in the TinaCMS codebase.

#### Usage

```bash
./scripts/cms-reference-check/apply-cms-usage-warnings.sh
```

#### How it works

The script:

1. Takes the most recent output file from `find-docs-references.sh`
2. For each URL reference, finds the corresponding document file
3. Updates the document's frontmatter to include a `cmsUsageWarning` field
4. Logs all changes and skipped files

#### Output

The script generates a file named `cms-warnings-applied-YYYYMMDD-HHMMSS.txt` containing:

- Documents that were updated
- Documents that were skipped (with reasons)
- A summary of total changes made

#### What is the cmsUsageWarning field?

The `cmsUsageWarning` field is used in the TinaCMS schema to display a warning message to content editors when they are editing a page that is directly referenced in the CMS codebase. It contains the GitHub link to the code reference, making it easy to view exactly where the documentation is being referenced. This helps prevent accidental changes to important documentation pages.

## Common Workflow

1. First, run `find-docs-references.sh` to identify all documentation URLs referenced in the TinaCMS codebase:

   ```bash
   ./find-docs-references.sh ~/path/to/tinacms
   ```

2. Then, run `find-missing-docs.sh` to check which of these URLs need attention:

   ```bash
   ./find-missing-docs.sh
   ```

3. Review the output file to:

   - Add missing documentation pages
   - Fix broken redirects
   - Update URL references in the codebase if needed

4. Finally, run `apply-cms-usage-warnings.sh` to add warnings to document frontmatter:

   ```bash
   ./apply-cms-usage-warnings.sh
   ```

## Tips

- Run these scripts regularly to ensure documentation references stay valid
- When adding redirects to `next.config.js`, verify that the destination page exists
- For wildcard redirects like `/docs/section/:path*`, ensure all referenced sub-pages properly redirect
- The `cmsUsageWarning` field helps prevent accidental changes to important documentation pages

## Requirements

- Bash
- Common Unix tools (grep, sed, awk, etc.)
- Access to both the TinaCMS codebase and documentation repository
