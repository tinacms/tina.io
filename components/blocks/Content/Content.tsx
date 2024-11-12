import { contentComponents } from 'components/tinaMarkdownComponents/contentComponents';
import React from 'react';
import { DocsTextWrapper } from '../../layout/DocsTextWrapper';
import { Section } from '../../layout/Section';
import { Wrapper } from '../../layout/Wrapper';

import { TinaMarkdown } from 'tinacms/dist/rich-text';

export function ContentBlock({ data, index }) {
  return (
    <Section color={data.options?.color || 'white'}>
      <DocsTextWrapper>
        <Wrapper
          align={data.options?.align || 'left'}
          narrow={data.options?.narrow || false}
        >
          {data.content && (
            <TinaMarkdown
              components={contentComponents}
              content={data.content}
            />
          )}
        </Wrapper>
      </DocsTextWrapper>
    </Section>
  );
}
