import { matchActualTarget } from './urls';

export function enhancedPathMatching(url1: string, url2: string) {
  if (matchActualTarget(url1, url2)) {
    return true;
  }

  if (!url1 || !url2) {
    return false;
  }
  const normalizeUrl = (url: string) => {
    let normalized = url.replace(/^\/|\/$/g, '');

    normalized = normalized.split('#')[0].split('?')[0];

    normalized = normalized.replace(/\/index\/?$/, '');

    return normalized;
  };

  const normalizedUrl1 = normalizeUrl(url1);
  const normalizedUrl2 = normalizeUrl(url2);

  if (normalizedUrl1.startsWith('zh/') && !normalizedUrl2.startsWith('zh/')) {
    return normalizedUrl1.substring(3) === normalizedUrl2;
  } else if (
    !normalizedUrl1.startsWith('zh/') &&
    normalizedUrl2.startsWith('zh/')
  ) {
    return normalizedUrl1 === normalizedUrl2.substring(3);
  }

  if (
    (normalizedUrl1 === 'docs' && normalizedUrl2 === 'zh/docs') ||
    (normalizedUrl1 === 'zh/docs' && normalizedUrl2 === 'docs')
  ) {
    return true;
  }

  if (
    (normalizedUrl1 === 'docs' && normalizedUrl2 === 'docs/index') ||
    (normalizedUrl1 === 'docs/index' && normalizedUrl2 === 'docs') ||
    (normalizedUrl1 === 'zh/docs' && normalizedUrl2 === 'zh/docs/index') ||
    (normalizedUrl1 === 'zh/docs/index' && normalizedUrl2 === 'zh/docs')
  ) {
    return true;
  }

  if (
    (normalizedUrl1 === 'zh/docs/index' && normalizedUrl2 === 'docs/index') ||
    (normalizedUrl1 === 'docs/index' && normalizedUrl2 === 'zh/docs/index')
  ) {
    return true;
  }

  return false;
}
