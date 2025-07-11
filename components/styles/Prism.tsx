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
  return (
    <Highlight
      theme={themes[props.theme || 'github']}
      code={props.value}
      language={props.lang || ''}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            fontFamily:
              'SourceCodePro-Regular, Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
            width: '100%',
            border: 'none',
            marginBottom: 0,
            borderRadius: '12px',
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const tokenProps = getTokenProps({ token, key });
                return (
                  <span
                    {...tokenProps}
                    style={{
                      ...tokenProps.style,
                      fontFamily:
                        'SourceCodePro-Regular, Monaco, Menlo, "Ubuntu Mono", Consolas, "source-code-pro", monospace',
                      paddingRight: key === line.length - 1 ? '3em' : '0px',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
