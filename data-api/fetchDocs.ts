import matter from 'gray-matter';

const fg = require('fast-glob');
var fs = require('node:fs');
var path = require('node:path');

export default async function fetchSearchableDocs() {
  const directory = path.resolve('./content/docs');
  const files = await fg(
    `${directory}(?!/reference/toolkit)(?!/releases/)/**/*.mdx`,
  );

  return files.map((fileName) => {
    const fullPath = path.resolve(directory, fileName);

    const slug = fullPath
      .match(/.+?\/docs\/(.+?)$/)[1]
      .split('.')
      .slice(0, -1)
      .join('.');

    const file = fs.readFileSync(fullPath);
    const doc = matter(file);
    return {
      data: { ...doc.data, slug },
      content: doc.content,
    };
  });
}
