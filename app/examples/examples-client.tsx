'use client';

import { Container, IconTopRightOnSquare } from 'components/blocks';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import {
  BODY_SMALL,
  PAGE_TITLE,
  SUB_HEADING,
} from '@/component/styles/typography';
import type { ExamplesExamples } from './examples-types';

export function ExamplesPageClient({ tinaProps }: { tinaProps: { data } }) {
  const examples = tinaProps?.data?.examples?.examples;

  return (
    <Container width="medium">
      <h1 className={`${PAGE_TITLE} inline-block text-center mt-20`}>
        Examples
      </h1>
      <section className="relative px-8 py-12 lg:py-16 columns-xs gap-6">
        {examples.map((example) => (
          <Example key={example.label} example={example} />
        ))}
      </section>
    </Container>
  );
}

// Markdown paragraphs would otherwise take the BODY size from the base layer.
const descriptionComponents = {
  p: (props) => <p className={BODY_SMALL}>{props.children}</p>,
};

function Example({ example }: { example: ExamplesExamples }) {
  return (
    <a
      target="_blank"
      className="relative group mb-6 break-inside-avoid rounded-md bg-linear-to-b from-white to-white/30 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),0_0_1px_1px_rgba(223,219,252,0.5)] flex flex-col gap-5 cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out"
      href={example.link}
    >
      <div className="absolute bottom-3 right-3 z-20">
        <IconTopRightOnSquare />
      </div>
      {example.image && (
        <div className="w-full">
          {/** biome-ignore lint/performance/noImgElement: <TODO> */}
          <img
            src={example.image}
            alt={example.label}
            className="w-full rounded-t-md object-cover object-top"
          />
        </div>
      )}
      <div className="px-7 lg:px-8 py-6 lg:py-7">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <h4 className={SUB_HEADING}>{example.label}</h4>
          </div>
        </div>
        <div className={BODY_SMALL}>
          <TinaMarkdown
            content={example.description}
            components={descriptionComponents}
          />
        </div>
      </div>
    </a>
  );
}
