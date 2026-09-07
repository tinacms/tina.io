import React from 'react';

// tsconfig targets es5, which rejects the `u` flag on a regex literal. The
// constructor form is not checked, and the flag still applies at runtime.
const EMOJI_RUN = new RegExp(
  '(\\p{Extended_Pictographic}(?:\\uFE0F|\\u200D\\p{Extended_Pictographic}|[\\u{1F3FB}-\\u{1F3FF}])*)',
  'gu',
);

// Headings fill their text with a gradient clipped to the glyph shapes, which
// also masks colour emoji. Give emoji runs an opaque fill so they keep their
// own colours.
export function unclipEmoji(text: string) {
  return text.split(EMOJI_RUN).map((part, index) =>
    index % 2 === 1 ? (
      <span
        // biome-ignore lint/suspicious/noArrayIndexKey: split output is positional
        key={index}
        className="[-webkit-text-fill-color:#000]"
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
}
