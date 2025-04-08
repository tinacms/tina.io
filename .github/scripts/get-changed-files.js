// .github/scripts/get-changed-files.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 从环境变量获取配置
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.PR_NUMBER;
const REPO = process.env.GITHUB_REPOSITORY;
const [OWNER, REPO_NAME] = REPO.split('/');

/**
 * 从GitHub API获取PR中变更的文件
 */
async function getChangedFilesFromApi() {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${OWNER}/${REPO_NAME}/pulls/${PR_NUMBER}/files`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const mdxFiles = response.data
      .filter(
        (file) =>
          file.filename.startsWith('content/docs/') &&
          file.filename.endsWith('.mdx')
      )
      .map((file) => file.filename);

    return mdxFiles;
  } catch (error) {
    console.error('Error fetching changed files from API:', error.message);
    return [];
  }
}
// TODO: Remove after testing
// function getChangedFilesFromGit() {
//   try {
//     // For push events, get the latest commit files
//     const command = 'git diff-tree --no-commit-id --name-only -r HEAD';
//     const output = execSync(command).toString();

//     const changedFiles = output
//       .split('\n')
//       .filter(
//         (file) => file.startsWith('content/docs/') && file.endsWith('.mdx')
//       );

//     return changedFiles;
//   } catch (error) {
//     console.error('Error getting changed files from Git:', error);
//     return [];
//   }
// }

async function main() {
  const changedFiles = await getChangedFilesFromApi();
  // const changedFiles = getChangedFilesFromGit();

  console.log(`Found ${changedFiles.length} changed MDX files`);

  if (changedFiles.length > 0) {
    fs.appendFileSync(process.env.GITHUB_ENV, `HAS_CHANGED_FILES=true\n`);
    fs.appendFileSync(
      process.env.GITHUB_ENV,
      `CHANGED_FILES<<EOF\n${changedFiles.join('\n')}\nEOF\n`
    );
  } else {
    fs.appendFileSync(process.env.GITHUB_ENV, `HAS_CHANGED_FILES=false\n`);
  }
}

main().catch((error) => {
  console.error('Error getting changed files:', error);
  process.exit(1);
});
