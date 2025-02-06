import { contentComponents } from 'components/tinaMarkdownComponents/contentComponents';
import React from 'react';
import { DocsTextWrapper } from '../../layout/DocsTextWrapper';
import { Section } from '../../layout/Section';
import { Container } from '../Container';

import { TinaMarkdown } from 'tinacms/dist/rich-text';

export function ContentBlock({ data, index }) {
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
