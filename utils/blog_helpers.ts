import { unified } from 'unified';
import remarkParse from 'remark-parse';
import strip from 'strip-markdown';

export function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  }
  return posts.slice().sort(sortByDate);
}

const detectShortcodes = /\{\{(.*?)\}\}/gm;
const preStrip = (content) => {
  return content.replace(detectShortcodes, '');
};

export async function stripMarkdown(content: string): Promise<string> {
  const preprocessedContent = preStrip(content);

  try {
    const result = await unified()
      .use(remarkParse)  // Use remark for parsing markdown
      .use(strip)        // Use strip-markdown to remove markdown syntax
      .process(preprocessedContent);

    return String(result);
  } catch (err) {
    throw new Error(`Failed to process markdown: ${err.message}`);
  }
}

function removeEndingPunctuation(content: string): string {
  return content.replace(/[^A-Za-z0-9]$/, '');
}

function truncateAtWordBoundary(content: string, length: number): string {
  let truncatedContent = '';
  for (let word of content.split(/\s+/)) {
    if (truncatedContent.length + word.length < length) {
      truncatedContent += ` ${word}`;
    } else {
      return truncatedContent;
    }
  }
  return truncatedContent;
}

const whitespace = /\s+/gm;

export async function formatExcerpt(
  content: string,
  length = 200,
  ellipsis = '&hellip;'
): Promise<string> {
  const plain = (await stripMarkdown(content)).replace(whitespace, ' ');
  const plainTextExcerpt = truncateAtWordBoundary(plain, length);

  if (plain.length > plainTextExcerpt.length) {
    return removeEndingPunctuation(plainTextExcerpt) + ellipsis;
  }

  return plainTextExcerpt;
}

export function formatDate(fullDate: string): string {
  let date = new Date(fullDate);
  
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const dateOptions: Intl.DateTimeFormatOptions = {
    formatMatcher: 'best fit',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', dateOptions);
}

export const isRelevantPost = (post: { date: string, last_edited: string }) => {
  if (post.last_edited) {
    return new Date(post.last_edited).getTime() >= new Date('2021-04-01').getTime();
  }
  return new Date(post.date).getTime() >= new Date('2021-04-01').getTime();
};
