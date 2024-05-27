export const getExcerpt = (
  body: { children: any[] },
  excerptLength: number
) => {
  return body.children
    .filter((c) => c.type == 'p')
    .reduce(function (excerpt, child) {
      // combine all of child's text and link nodes into a single string
      excerpt +=
        (excerpt ? ' ' : '') +
        child.children
          .filter((c) => c.type == 'text' || c.type == 'a')
          .reduce(function (text, child) {
            if (child.type == 'text') {
              return text + (text ? ' ' : '') + child.text;
            } else if (child.type == 'a') {
              return text + (text ? ' ' : '') + child.children.map((c: any) => c.text).join(' ');
            }
            return text;
          }, '');
      // if the combined text is too long, truncate it
      if (excerpt.length > excerptLength) {
        excerpt = excerpt.substring(0, excerptLength) + '...';
      }

      return excerpt;
    }, '');
};
