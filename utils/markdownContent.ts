import TurndownService from 'turndown';

export function htmlToMarkdown(html: string) {
  const mainStart = html.search(/<main(?:\s|>)/i);
  const mainEnd = html.lastIndexOf('</main>');
  const content =
    mainStart >= 0 && mainEnd > mainStart
      ? html.slice(mainStart, mainEnd + '</main>'.length)
      : html;

  const turndown = new TurndownService({
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    headingStyle: 'atx',
  });
  turndown.remove(['script', 'style', 'noscript']);

  return `${turndown.turndown(content).trim()}\n`;
}
