// .github/scripts/get-changed-files.js
const fs = require('node:fs');
const _path = require('node:path');
const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.GITHUB_REPOSITORY;
const [OWNER, REPO_NAME] = REPO.split('/');

async function getChangedFilesFromApi() {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}/files`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    const mdxFiles = response.data
      .filter(
        (file) =>
          (file.filename.startsWith('content/docs/') ||
            file.filename.startsWith('content/blog/')) &&
          file.filename.endsWith('.mdx'),
      )
      .map((file) => file.filename);

    return mdxFiles;
  } catch (error) {
    console.error('Error fetching changed files from API:', error.message);
    return [];
  }
}

async function main() {
  const changedFiles = await getChangedFilesFromApi();

  console.log(`Found ${changedFiles.length} changed MDX files`);

  if (changedFiles.length > 0) {
    fs.appendFileSync(process.env.GITHUB_ENV, `HAS_CHANGED_FILES=true\n`);
    fs.appendFileSync(
      process.env.GITHUB_ENV,
      `CHANGED_FILES<<EOF\n${changedFiles.join('\n')}\nEOF\n`,
    );
  } else {
    fs.appendFileSync(process.env.GITHUB_ENV, `HAS_CHANGED_FILES=false\n`);
  }
}

main().catch((error) => {
  console.error('Error getting changed files:', error);
  process.exit(1);
});
