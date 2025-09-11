export const curlyBracketFormatter = (byLine: string) => {
  if (!byLine) return null;

  return byLine.split(/({.*?})/).map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const content = part.slice(1, -1);
      return (
        <span
          key={index}
          className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
        >
          {content}
        </span>
      );
    }
    return part;
  });
};
