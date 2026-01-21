'use client';

import { CodeBlock } from './code-block/code-block';

export const codeBlockComponents = {
  code_block: ({
    value,
    lang,
    children,
  }: {
    value?: string;
    lang?: string;
    children?: React.ReactNode;
  }) => {
    const codeContent =
      typeof children === 'string' ? children : value || String(children || '');

    return <CodeBlock value={codeContent} lang={lang || 'jsx'} />;
  },
};
