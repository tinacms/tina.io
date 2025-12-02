import Link from 'next/link';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';

const FeatureWrapper = ({ url, id, children }) => {
  const formattedUrl =
    url && !url.match(/^https?:\/\//) && !url.startsWith('/')
      ? `http://${url}`
      : url;
  const isInternalLink = formattedUrl?.startsWith('/');

  const className = "h-full w-full group block py-6 px-8 md:py-9 md:px-11 lg:py-12 lg:px-14 rounded-lg bg-linear-to-br from-white via-white to-white/50 shadow-lg";

  if (!formattedUrl) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  if (isInternalLink) {
    return (
      <Link href={formattedUrl} className={className} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={formattedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      id={id}
    >
      {children}
    </a>
  );
};

const Feature = ({ data, id }) => {
  const { headline, text, actions, url } = data;

  const content = (
    <div
      data-tina-field={tinaField(data, 'headline')}
      className="flex flex-col gap-4"
    >
      {headline && (
        <h3 className="text-2xl md:text-xl lg:text-2xl font-ibm-plex leading-tight text-transparent bg-linear-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text mb-2 break-words">
          {headline}
        </h3>
      )}
      {text && <p>{text}</p>}
      {actions && <Actions items={actions} />}
    </div>
  );

  return (
    <FeatureWrapper url={url} id={id}>
      {content}
    </FeatureWrapper>
  );
};

export default Feature;

export function FeatureGridBlock({ data, index }) {
  const isMoreThanSix = data.items && data.items.length > 6;
  return (
    <section
      key={`feature-grid-${index}`}
      className={'relative z-0 w-full pb-20'}
    >
      <Container width="wide">
        <div
          className={`grid ${
            isMoreThanSix
              ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
              : 'grid-flow-row grid-cols-auto-sm md:grid-cols-auto-lg'
          } auto-rows-auto w-full gap-10`}
        >
          {data.items?.map((data) => {
            return (
              <Feature
                key={Object.values(data).join('')}
                data={data}
                id={sanitizeLabel(data.headline)}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
