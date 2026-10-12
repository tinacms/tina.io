import { contentComponents } from 'components/tinaMarkdownComponents/contentComponents';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { DocsTextWrapper } from '../../layout/DocsTextWrapper';
import { Section } from '../../layout/Section';
import { Container } from '../Container';

export function ContentBlock({ data }) {
  return (
    <Section color={data.options?.color || 'white'}>
      <DocsTextWrapper>
        <div
          className={
            data.options?.align === 'center'
              ? 'text-center'
              : data.options?.align === 'right'
                ? 'text-right'
                : 'text-left'
          }
        >
          <Container width={data.options?.narrow ? 'narrow' : 'medium'}>
            {data.content && (
              <TinaMarkdown
                components={contentComponents}
                content={data.content}
              />
            )}
          </Container>
        </div>
      </DocsTextWrapper>
    </Section>
  );
}
