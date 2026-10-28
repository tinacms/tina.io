export const curlyBracketFormatter = (byLine: string) => {
  if (!byLine) {
    return null;
  }

  return byLine.split(/({.*?})/).map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const content = part.slice(1, -1);
      return (
        <span key={`${index}-${part}`} className="text-heading">
          {content}
        </span>
      );
    }
    return part;
  });
};
