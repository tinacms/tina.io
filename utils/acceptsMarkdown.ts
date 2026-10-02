export function acceptsMarkdown(accept: string | null) {
  return Boolean(
    accept?.split(',').some((entry) => {
      const [mediaType, ...parameters] = entry.split(';');
      const quality = parameters
        .map((parameter) => parameter.trim().toLowerCase())
        .find((parameter) => parameter.startsWith('q='));
      const qualityValue = quality ? Number.parseFloat(quality.slice(2)) : 1;

      return (
        mediaType.trim().toLowerCase() === 'text/markdown' && qualityValue > 0
      );
    }),
  );
}

export function getBlogMarkdownRoute(
  pathname: string,
  isChineseDomain: boolean,
) {
  const match = pathname.match(/^\/(?:(zh)\/)?blog\/(.+)$/);
  if (!match) {
    return null;
  }

  const locale = isChineseDomain || match[1] ? 'zh' : 'en';
  return `/api/markdown/blog/${locale}/${match[2]}`;
}
