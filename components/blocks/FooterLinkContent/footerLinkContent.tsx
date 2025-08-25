import { contentComponents } from 'components/tinaMarkdownComponents/contentComponents';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { DocsTextWrapper } from '../../layout/DocsTextWrapper';
import { Section } from '../../layout/Section';
import { Container } from '../Container';

export function FooterLinkContentBlock({ data }) {
  return (
    <section>
      {/* Title Section */}
      {data.title && (
        <div className="py-16 text-center">
          <Container width="narrow">
            <h1
              className="text-4xl md:text-5xl font-bold text-orange-500 leading-tight"
              data-tina-field={tinaField(data, 'title')}
            >
              {data.title}
            </h1>
          </Container>
        </div>
      )}

      {/* Content Section - Using exact same styling as ContentBlock */}
      {data.byLine && (
        <Section color={data.options?.color || 'white'}>
          <DocsTextWrapper>
            <div className="text-left">
              <div
                className="max-w-4xl mx-auto px-5 sm:w-3/5 lg:w-3/5"
                data-tina-field={tinaField(data, 'byLine')}
              >
                <TinaMarkdown
                  components={contentComponents}
                  content={data.byLine}
                />
              </div>
            </div>
          </DocsTextWrapper>
        </Section>
      )}
    </section>
  );
}
