#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixPathsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const frontmatterMatch = content.match(frontmatterRegex);

    if (frontmatterMatch) {
      let frontmatter = frontmatterMatch[1];

      const pathReplacements = [
        {
          from: /(\s*(?:next|prev|previous):\s*['"]*)(\/docs\/[^'"]*)/g,
          to: '$1/docs-zh$2'.replace('/docs/', '/'),
        },
        {
          from: /(\s*(?:next|prev|previous):\s*['"]*)(\/blog\/[^'"]*)/g,
          to: '$1/blog-zh$2'.replace('/blog/', '/'),
        },
        {
          from: /(\s*(?:next|prev|previous):\s*['"]*)(content\/docs\/[^'"]*)/g,
          to: '$1content/docs-zh/$2'.replace('content/docs/', ''),
        },
        {
          from: /(\s*(?:next|prev|previous):\s*['"]*)(content\/blog\/[^'"]*)/g,
          to: '$1content/blog-zh/$2'.replace('content/blog/', ''),
        },
      ];

      pathReplacements.forEach(({ from, to }) => {
        const newFrontmatter = frontmatter.replace(from, to);
        if (newFrontmatter !== frontmatter) {
          frontmatter = newFrontmatter;
          modified = true;
        }
      });

      if (modified) {
        content = content.replace(frontmatterRegex, `---\n${frontmatter}\n---`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed paths in: ${filePath}`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return false;
  }
}

function fixAllTranslationPaths() {
  console.log('Starting path fixes for translated files...');

  const patterns = ['content/docs-zh/**/*.mdx', 'content/blog-zh/**/*.mdx'];

  let totalFixed = 0;

  patterns.forEach((pattern) => {
    const files = glob.sync(pattern);
    console.log(`Found ${files.length} files matching pattern: ${pattern}`);

    files.forEach((file) => {
      if (fixPathsInFile(file)) {
        totalFixed++;
      }
    });
  });

  console.log(`\n✅ Path fixing completed. Fixed ${totalFixed} files.`);

  if (totalFixed === 0) {
    console.log('No files needed path fixes.');
  }
}

if (require.main === module) {
  fixAllTranslationPaths();
}

module.exports = {
  fixPathsInFile,
  fixAllTranslationPaths,
};
