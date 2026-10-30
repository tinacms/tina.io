/** True for links that leave tina.io (http or https), which open in a new tab. */
export const isExternalLink = (href?: string | null): boolean =>
  /^https?:\/\//.test(href ?? '');

/** `target` and `rel` for a link: a new tab for external links, nothing otherwise. */
export const externalLinkProps = (href?: string | null) =>
  isExternalLink(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
