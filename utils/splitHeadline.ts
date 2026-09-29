// Splits a headline into its lead and final word so the final word can be
// styled on its own line, e.g. "Meet TinaCMS" -> ["Meet", "TinaCMS"].
// Headlines without spaces (common in Chinese) split before a trailing Latin
// word: "遇见TinaCMS" -> ["遇见", "TinaCMS"]. Anything else is all accent.
export const splitHeadline = (headline = ''): [string, string] => {
  const text = headline.trim();
  const lastSpace = text.lastIndexOf(' ');
  if (lastSpace !== -1) {
    return [text.slice(0, lastSpace).trim(), text.slice(lastSpace + 1)];
  }

  const trailingLatin = text.match(/^(.*?)([A-Za-z0-9][\w.-]*)$/);
  if (trailingLatin) {
    return [trailingLatin[1], trailingLatin[2]];
  }

  return ['', text];
};
