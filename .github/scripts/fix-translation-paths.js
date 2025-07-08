#!/usr/bin/env node

const fs = require('fs');

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

module.exports = {
  fixPathsInFile,
};
