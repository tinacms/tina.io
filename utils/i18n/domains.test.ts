import {
  hasZhPrefix,
  isZhHost,
  localeForHost,
  normaliseHost,
  originForLocale,
  stripZhPrefix,
} from './domains';

describe('normaliseHost', () => {
  it('drops the port and lowercases', () => {
    expect(normaliseHost('TINAIO.CN:3000')).toBe('tinaio.cn');
  });

  it('treats a missing header as empty', () => {
    expect(normaliseHost(null)).toBe('');
    expect(normaliseHost(undefined)).toBe('');
  });
});

describe('isZhHost', () => {
  it.each(['tinaio.cn', 'www.tinaio.cn', 'TINAIO.CN', 'tinaio.cn:3000'])(
    'recognises %s as the Chinese site',
    (host) => {
      expect(isZhHost(host)).toBe(true);
    },
  );

  // Anything unrecognised must fall back to English — that is the safe default
  // and keeps preview deployments and localhost on the untouched English path.
  it.each([
    'tina.io',
    'www.tina.io',
    'localhost',
    'tina-io-git-main.vercel.app',
    'tinacms.com.cn',
    '',
  ])('treats %s as not the Chinese site', (host) => {
    expect(isZhHost(host)).toBe(false);
  });

  it('treats a missing host as not Chinese', () => {
    expect(isZhHost(null)).toBe(false);
  });
});

describe('localeForHost', () => {
  it('maps hostnames to locales', () => {
    expect(localeForHost('tinaio.cn')).toBe('zh');
    expect(localeForHost('tina.io')).toBe('en');
    expect(localeForHost(null)).toBe('en');
  });
});

describe('originForLocale', () => {
  it('returns the site origin for each locale', () => {
    expect(originForLocale('zh')).toBe('https://tinaio.cn');
    expect(originForLocale('en')).toBe('https://tina.io');
  });
});

describe('hasZhPrefix', () => {
  it('matches the /zh segment', () => {
    expect(hasZhPrefix('/zh')).toBe(true);
    expect(hasZhPrefix('/zh/')).toBe(true);
    expect(hasZhPrefix('/zh/pricing')).toBe(true);
  });

  // A path that merely starts with those characters is a different page.
  it('does not match paths that only start with "zh"', () => {
    expect(hasZhPrefix('/zhuanti')).toBe(false);
    expect(hasZhPrefix('/zhang/wei')).toBe(false);
  });

  it('does not match unrelated paths', () => {
    expect(hasZhPrefix('/')).toBe(false);
    expect(hasZhPrefix('/pricing')).toBe(false);
    expect(hasZhPrefix('/docs/zh')).toBe(false);
  });
});

describe('stripZhPrefix', () => {
  it('removes the prefix and stays rooted at /', () => {
    expect(stripZhPrefix('/zh')).toBe('/');
    expect(stripZhPrefix('/zh/')).toBe('/');
    expect(stripZhPrefix('/zh/pricing')).toBe('/pricing');
    expect(stripZhPrefix('/zh/docs/intro')).toBe('/docs/intro');
  });

  it('leaves other paths untouched', () => {
    expect(stripZhPrefix('/pricing')).toBe('/pricing');
    expect(stripZhPrefix('/zhuanti')).toBe('/zhuanti');
  });
});
