export function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateB - dateA
  }
  return posts.slice().sort(sortByDate)
}

export function stripMarkdown(content: string): string {
  content = content.replace(/\{\{(.*?)\}\}/gm, '');

  try {
    content = content.replace(/<[^>]*>/g, ''); // Remove all elements that look like <tags>
    content = content.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, ''); // Strip out bullet points or numbered lists

    content = content
      .replace(/~~/g, '')
      .replace(/`{3}.*\n([\s\S]*?)\n`{3}/g, '$1')
      .replace(/~{3}.*\n/g, '');

    content = content
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')
      .replace(/#{1,6}\s*(.*)/g, '$1')
      .replace(/>\s*(.*)/g, '$1')
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/^(\n)?\s{0,}#{1,6}\s*( (.+))? +#+$|^(\n)?\s{0,}#{1,6}\s*( (.+))?$/gm, '$1$3$4$6')
      .replace(/~(.*?)~/g, '$1');

    content = content.replace(/<[^>]*>/g, '');

    // Trim any extra whitespace
    content = content.trim();

  } catch (e) {
    console.error("Error during markdown stripping: %s", e);
    return content;
  }

  return content;
}



function removeEndingPunctuation(content: string): string {
  return content.replace(/[^A-Za-z0-9]$/, '')
}

function truncateAtWordBoundary(content: string, length: Number): string {
  let truncatedLength = 0
  let truncatedContent = ''
  for (let word of content.split(/\s+/)) {
    if (truncatedContent.length + word.length < length) {
      truncatedContent += ` ${word}`
    } else {
      return truncatedContent
    }
  }
  return truncatedContent
}

const whitespace = /\s+/gm

export async function formatExcerpt(
  content,
  length = 200,
  ellipsis = '&hellip;'
) {
  const plain = stripMarkdown(content).replace(whitespace, ' ');
  const plainTextExcerpt = truncateAtWordBoundary(plain, length);

  if (plain.length > plainTextExcerpt.length) {
    return removeEndingPunctuation(plainTextExcerpt) + ellipsis;
  }

  return plainTextExcerpt;
}

export function formatDate(fullDate) {
  let date = new Date(fullDate)
  // normalizes UTC with local timezone
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
  const dateOptions: Intl.DateTimeFormatOptions = {
    formatMatcher: 'best fit',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', dateOptions)
}

export const isRelevantPost = (post: { date: string, last_edited: string }) => {
  if(post.last_edited){
    return new Date(post.last_edited).getTime() >= new Date('2021-04-01').getTime()
  }
  return new Date(post.date).getTime() >= new Date('2021-04-01').getTime()
}
