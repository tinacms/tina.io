import Image from 'next/image';
// biome-ignore lint/correctness/noUnusedImports: React is required for JSX
import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import {
  BLOCK_HEADINGS_SIZE,
  H1_HEADINGS_SIZE,
} from '@/component/styles/typography';
import { Container } from '../Container';

const PartnerCard = ({ data }) => {
  const website =
    data.website && !data.website.match(/^https?:\/\//)
      ? `https://${data.website}`
      : data.website;
  // Show the bare domain (no protocol / trailing slash) as the link text.
  const websiteLabel = website?.replace(/^https?:\/\//, '').replace(/\/+$/, '');

  const isPremier = data.tier === 'Premier';

  return (
    <div
      className={`flex h-full flex-col gap-4 rounded-lg bg-white p-6 shadow-lg md:p-8 ${
        isPremier ? 'ring-2 ring-amber-300/70' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="relative h-12 w-40">
          {data.logo ? (
            <Image
              src={data.logo}
              alt={data.name}
              fill
              className="object-contain object-left"
              data-tina-field={tinaField(data, 'logo')}
            />
          ) : (
            <span
              className="text-xl font-ibm-plex text-blue-1000"
              data-tina-field={tinaField(data, 'name')}
            >
              {data.name}
            </span>
          )}
        </div>
        {data.tier && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
              isPremier
                ? 'bg-linear-to-r from-amber-200 via-yellow-300 to-amber-400 text-amber-900 shadow-sm ring-1 ring-amber-300/60'
                : 'bg-blue-50 text-blue-700'
            }`}
            data-tina-field={tinaField(data, 'tier')}
          >
            {data.tier}
          </span>
        )}
      </div>

      {data.location && (
        <p
          className="text-sm text-neutral-text-secondary"
          data-tina-field={tinaField(data, 'location')}
        >
          {data.location}
        </p>
      )}

      {data.description && (
        <p
          className="grow text-neutral-text-secondary"
          data-tina-field={tinaField(data, 'description')}
        >
          {data.description}
        </p>
      )}

      {data.services?.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {data.services.map((service) => (
            <li
              key={service}
              className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {service}
            </li>
          ))}
        </ul>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 font-medium text-blue-500 hover:text-blue-700"
          data-tina-field={tinaField(data, 'website')}
        >
          {websiteLabel}
          <span aria-hidden="true">&rarr;</span>
        </a>
      )}
    </div>
  );
};

// Shown alongside a lone partner so the row isn't a single card, and to give
// visitors a path when no listed partner fits — we match them ourselves.
const GetInContactCard = () => (
  <div className="flex h-full flex-col gap-4 rounded-lg border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 md:p-8">
    <h3 className="text-xl font-ibm-plex text-blue-1000">Not sure who fits?</h3>
    <p className="grow text-neutral-text-secondary">
      If you want to know about other certified partners, send us an email at{' '}
      <a
        href="mailto:info@tina.io"
        className="font-medium text-blue-500 hover:text-blue-700"
      >
        info@tina.io
      </a>{' '}
      and we'll send the full list.
    </p>
  </div>
);

export function PartnerGridBlock({ data, index }) {
  // A single partner under "Vetted agencies... reach out to them directly"
  // reads oddly — hide the heading/subtext so the lone card stands on its own.
  const isSingle = data.items?.length === 1;

  // Suffix with `-section` so the anchor can't collide with an Actions/Modal
  // button whose label slugifies to the same value (e.g. a "Find a partner"
  // CTA that links here) — a duplicate id would make the browser jump to the
  // button instead of this section.
  const id = data.title
    ? `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-section`
    : `partner-grid-${index}`;

  return (
    <section
      id={id}
      key={`partner-grid-${index}`}
      className="w-full scroll-mt-24"
    >
      <Container width="wide">
        {data.title &&
          !isSingle &&
          (data.blockSettings?.isHeadingOne ? (
            <h1
              className={`${H1_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-black`}
            >
              {data.title}
            </h1>
          ) : (
            <h2
              className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-black`}
            >
              {data.title}
            </h2>
          ))}
        {data.subText && !isSingle && (
          <p className="text-lg lg:text-xl lg:leading-normal text-neutral-text-secondary max-w-60ch text-balance text-center mx-auto py-4">
            {data.subText}
          </p>
        )}
        {isSingle ? (
          <div className="flex flex-col items-center pt-8">
            <div className="grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
              <PartnerCard data={data.items[0]} />
              <GetInContactCard />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.items?.map((item, i) => (
              <PartnerCard key={`${item.name}-${i}`} data={item} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
