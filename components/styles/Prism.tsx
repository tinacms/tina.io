import { Highlight, Prism as rootPrism, themes } from 'prism-react-renderer';
import React from 'react';
(typeof global !== 'undefined' ? global : window).Prism = rootPrism;
require('prismjs/components/prism-bash');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-css');
require('prismjs/components/prism-json');

export const Prism = (props: {
  value: string;
  lang?: string;
  theme?: keyof typeof themes;
}) => {
  //lets user use // highlight-line to highlight lines
  const lines = props.value.split('\n');
  const highlightedLines = lines.map((line) =>
    line.includes('// highlight-line')
  );

  return (
    <Highlight
      theme={themes[props.theme || 'github']}
      code={props.value}
      language={props.lang || ''}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} w-full border-none mb-0 rounded-xl relative`}
        >
          {tokens.map((line, i) => {
            // Remove the highlight comment from the line
            const lineContent = line.map((token) => {
              if (token.content.includes('// highlight-line')) {
                return {
                  ...token,
                  content: token.content.replace('// highlight-line', ''),
                };
              }
              return token;
            });

            return (
              <div
                {...getLineProps({ line: lineContent, key: i })}
                className={`relative ${
                  highlightedLines[i] ? '-mx-4 px-4 bg-yellow-100/10' : ''
                }`}
              >
                {lineContent.map((token, key) => (
                  <span
                    {...getTokenProps({ token, key })}
                    className={key === lineContent.length - 1 ? 'pr-12' : ''}
                  />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
