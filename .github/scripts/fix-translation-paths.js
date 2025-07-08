#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixPathsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    const originalContent = content;
    content = content
      .replace(
        /(\s*(?:next|prev|previous):\s*['"]*)(\/docs\/)([^'"\s]*)/g,
        '$1/docs-zh/$3'
      )
      .replace(
        /(\s*(?:next|prev|previous):\s*['"]*)(\/blog\/)([^'"\s]*)/g,
        '$1/blog-zh/$3'
      )
      .replace(
        /(\s*(?:next|prev|previous):\s*['"]*)(content\/docs\/)([^'"\s]*)/g,
        '$1content/docs-zh/$3'
      )
      .replace(
        /(\s*(?:next|prev|previous):\s*['"]*)(content\/blog\/)([^'"\s]*)/g,
        '$1content/blog-zh/$3'
      );

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed paths in: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return false;
  }
}

function fixAllTranslationPaths() {
  console.log('Starting path fixes for translated files...');

  const files = [
    ...glob.sync('content/docs-zh/**/*.mdx'),
    ...glob.sync('content/blog-zh/**/*.mdx'),
  ];
  const fixedCount = files.filter(fixPathsInFile).length;

  console.log(
    `\n✅ Path fixing completed. Fixed ${fixedCount} of ${files.length} files.`
  );
}

if (require.main === module) {
  fixAllTranslationPaths();
}

module.exports = {
  fixPathsInFile,
  fixAllTranslationPaths,
};
