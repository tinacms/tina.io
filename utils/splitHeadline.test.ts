import { splitHeadline } from './splitHeadline';

describe('splitHeadline', () => {
  it('splits an English headline at the last space', () => {
    expect(splitHeadline('Meet TinaCMS')).toEqual(['Meet', 'TinaCMS']);
  });

  it('keeps every word but the last in the lead', () => {
    expect(splitHeadline('Say hello to TinaCMS')).toEqual([
      'Say hello to',
      'TinaCMS',
    ]);
  });

  it('splits a Chinese headline before its trailing Latin word', () => {
    expect(splitHeadline('遇见TinaCMS')).toEqual(['遇见', 'TinaCMS']);
  });

  it('treats a single word as all accent', () => {
    expect(splitHeadline('TinaCMS')).toEqual(['', 'TinaCMS']);
  });

  it('treats an all-Chinese headline as all accent', () => {
    expect(splitHeadline('认识我们')).toEqual(['', '认识我们']);
  });

  it('ignores surrounding whitespace and handles undefined', () => {
    expect(splitHeadline('  Meet TinaCMS  ')).toEqual(['Meet', 'TinaCMS']);
    expect(splitHeadline(undefined)).toEqual(['', '']);
  });
});
