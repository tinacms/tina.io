// utils/og/authorImages.test.ts
import {
  authorImagePath,
  FALLBACK_LLAMAS,
  normaliseAuthorKey,
  pickLlama,
} from './authorImages';

describe('normaliseAuthorKey', () => {
  it('lowercases and trims a single author', () => {
    expect(normaliseAuthorKey('  James Perkins ')).toBe('james perkins');
  });

  it('keeps only the first author for "&" credits', () => {
    expect(normaliseAuthorKey("James Perkins & James O'Halloran")).toBe(
      'james perkins',
    );
  });

  it('keeps only the first author for "and" / comma credits', () => {
    expect(normaliseAuthorKey('Nolan Phillips and Kendall Strautman')).toBe(
      'nolan phillips',
    );
    expect(normaliseAuthorKey('Scott Gallant, Scott Byrne')).toBe(
      'scott gallant',
    );
  });

  it('collapses internal whitespace', () => {
    expect(normaliseAuthorKey('Matt   Wicks')).toBe('matt wicks');
  });

  it('returns an empty string for null/undefined/empty', () => {
    expect(normaliseAuthorKey(null)).toBe('');
    expect(normaliseAuthorKey(undefined)).toBe('');
    expect(normaliseAuthorKey('')).toBe('');
  });
});

describe('authorImagePath', () => {
  it('resolves a mapped author to their image path', () => {
    expect(authorImagePath('Matt Wicks')).toBe(
      '/img/blog/authors/matt-wicks.png',
    );
  });

  it('resolves via the first author for multi-author credits', () => {
    expect(authorImagePath('Matt Wicks & Someone Else')).toBe(
      '/img/blog/authors/matt-wicks.png',
    );
  });

  it('returns null for an unmapped author', () => {
    expect(authorImagePath('Nobody In Particular')).toBeNull();
    expect(authorImagePath(null)).toBeNull();
  });
});

describe('pickLlama', () => {
  it('always returns one of the fallback llamas', () => {
    for (const seed of ['a', 'some-post-slug', 'another', '']) {
      expect(FALLBACK_LLAMAS).toContain(pickLlama(seed));
    }
  });

  it('is deterministic for a given seed', () => {
    expect(pickLlama('my-post')).toBe(pickLlama('my-post'));
  });
});
