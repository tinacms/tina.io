import React from 'react'
import { Wrapper } from '../layout/Wrapper'
import { Section } from '../layout/Section'
import { contentComponents } from './Content'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { DocsTextWrapper } from '../layout/DocsTextWrapper'

export const ColumnsBlock = ({ data, index }) => {
  return (
    <>
      <Section color={data.options?.color || 'white'}>
        <DocsTextWrapper>
          <Wrapper
            align={data.options?.align || 'left'}
            narrow={data.options?.narrow || false}
          >
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
          </Wrapper>
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
  )
}
