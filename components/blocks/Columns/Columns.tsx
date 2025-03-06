import { contentComponents } from 'components/tinaMarkdownComponents/contentComponents';
import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { Section } from '../../layout/Section';
import { Container } from '../Container';

import { DocsTextWrapper } from '../../layout/DocsTextWrapper';

export const ColumnsBlock = ({ data, index }) => {
  return (
    <>
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
              <div className="columns">
                <div className="column">
                  {data.columnOne && (
                    <TinaMarkdown
                      components={contentComponents}
                      content={data.columnOne}
                    />
                  )}
                </div>
                <div className="column">
                  {data.columnTwo && (
                    <TinaMarkdown
                      components={contentComponents}
                      content={data.columnTwo}
                    />
                  )}
                </div>
              </div>
            </Container>
          </div>
        </DocsTextWrapper>
      </Section>
      <style jsx>{`
        .columns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          grid-gap: 2rem;
        }

        .column {
          width: 100%;
        }
      `}</style>
    </>
  );
};
