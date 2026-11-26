import { HEADING_HIGHLIGHT } from '@/component/styles/typography';

export const curlyBracketFormatter = (byLine: string) => {
  if (!byLine) {
    return null;
  }

  return byLine.split(/({.*?})/).map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const content = part.slice(1, -1);
      return (
        <span key={`${index}-${part}`} className={HEADING_HIGHLIGHT}>
          {content}
        </span>
      );
    }
    return part;
  });
};
