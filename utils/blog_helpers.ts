export function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateB - dateA
  }
  return posts.slice().sort(sortByDate)
}

export function stripMarkdown(content: string): string {
  // Remove Handlebars-like template placeholders {{...}}
  content = content.replace(/\{\{(.*?)\}\}/gm, '');

  try {
    // Remove HTML tags like <div>, <p>, etc.
    content = content.replace(/<[^>]*>/g, ''); 

    // Remove markdown bullet points (-, *, +) or numbered lists (1., 2., etc.)
    content = content.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, '');

    content = content
      // Remove strikethrough markers (~~)
      .replace(/~~/g, '')

      // Remove fenced code blocks ```...``` but keep the content inside
      .replace(/`{3}.*\n([\s\S]*?)\n`{3}/g, '$1')

      // Remove tilde code blocks ~~~...~~~ and their content
      .replace(/~{3}.*\n/g, '');

    content = content
      // Convert markdown links [text](url) to just text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')

      // Convert markdown image syntax ![alt](url) to just alt text
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')

      // Strip out headers, leaving the header text (e.g., # Header)
      .replace(/#{1,6}\s*(.*)/g, '$1')

      // Remove blockquotes (>) and leave the quoted text
      .replace(/>\s*(.*)/g, '$1')

      // Remove bold formatting (**text** or __text__) and keep the text
      .replace(/(\*\*|__)(.*?)\1/g, '$2')

      // Remove italic formatting (*text* or _text_) and keep the text
      .replace(/(\*|_)(.*?)\1/g, '$2')

      // Remove inline code backticks and keep the code (e.g., `code`)
      .replace(/`([^`]+)`/g, '$1')

      // Handle cases of headings with multiple trailing hashes (e.g., ## Header ##)
      .replace(/^(\n)?\s{0,}#{1,6}\s*( (.+))? +#+$|^(\n)?\s{0,}#{1,6}\s*( (.+))?$/gm, '$1$3$4$6')

      // Remove single tildes used for custom emphasis (~text~)
      .replace(/~(.*?)~/g, '$1');

    // Remove any remaining HTML tags (again, for safety)
    content = content.replace(/<[^>]*>/g, '');

    // Trim any extra whitespace from the final string
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
