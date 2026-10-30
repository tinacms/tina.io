/** True for links that leave tina.io (http or https), which open in a new tab. */
export const isExternalLink = (href?: string | null): boolean =>
  /^https?:\/\//.test(href ?? '');
