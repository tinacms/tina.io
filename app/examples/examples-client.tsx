'use client';

import { Container, IconTopRightOnSquare } from 'components/blocks';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { ExamplesExamples } from './examples-types';

export function ExamplesPageClient({ tinaProps }: { tinaProps: { data } }) {
  const examples = tinaProps?.data?.examples?.examples;

  return (
    <Container width="medium">
      <h1 className="font-ibm-plex inline-block text-3xl lg:text-3xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center mt-20">
        Examples
      </h1>
      <section
        className="relative px-8 py-12 lg:py-16 columns-xs gap-6"
        style={{ columnFill: 'balance-all' }}
      >
        {examples.map((example, index) => (
          <Example key={index} example={example} />
        ))}
      </section>
    </Container>
  );
}

function Example({ example }: { example: ExamplesExamples }) {
  return (
    <a
      target="_blank"
      className="relative group mb-6 break-inside-avoid rounded-md bg-linear-to-b from-white to-white/30 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),0_0_1px_1px_rgba(223,219,252,0.5)] flex flex-col gap-5 text-gray-700 cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out"
      href={example.link}
    >
      <div className="absolute bottom-3 right-3 z-20">
        <IconTopRightOnSquare />
      </div>
      {example.image && (
        <div className="w-full">
          <img
            src={example.image}
            alt="Example Image"
            className="w-full rounded-t-md object-cover object-top"
          />
        </div>
      )}
      <div className="px-7 lg:px-8 py-6 lg:py-7">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <h4 className="text-lg lg:text-xl font-ibm-plex text-blue-800 font-medium">
              {example.label}
            </h4>
          </div>
        </div>
        <div className="text-base lg:text-md">
          <TinaMarkdown content={example.description} />
        </div>
      </div>
    </a>
  );
}
