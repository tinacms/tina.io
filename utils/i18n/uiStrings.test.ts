// utils/i18n/uiStrings.test.ts
import { getUiStrings } from './uiStrings';

describe('getUiStrings', () => {
  it('returns English strings', () => {
    const s = getUiStrings('en');
    expect(s.docs.lastEdited).toBe('Last Edited');
    expect(s.blogIndex.heading).toBe('Blog');
    expect(s.blogIndex.pageSuffix(2)).toBe(' - Page 2');
    expect(s.blogIndex.metaTitle(2)).toBe('TinaCMS Blog - Page 2');
  });

  it('includes the page number even on page 1 (intentional — no special-casing)', () => {
    const s = getUiStrings('en');
    expect(s.blogIndex.metaTitle(1)).toBe('TinaCMS Blog - Page 1');
  });

  it('returns Chinese strings', () => {
    const s = getUiStrings('zh');
    expect(s.docs.lastEdited).toBe('上次编辑');
    expect(s.blogIndex.heading).toBe('博客');
    expect(s.blogIndex.pageSuffix(2)).toBe(' - 第2页');
    expect(s.blogIndex.metaTitle(2)).toBe('TinaCMS 博客 - 第 2 页');
  });
});
