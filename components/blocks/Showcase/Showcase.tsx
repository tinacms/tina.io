import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {
  BLOCK_HEADINGS_SIZE,
  H1_HEADINGS_SIZE,
} from '@/component/styles/typography';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';
import { LiteYouTube } from '../VideoEmbed/LiteYouTube';
import { extractYouTubeId } from '../VideoEmbed/utils';

export function ShowcaseBlock({ data, index }) {
  const isReversed = index % 2 === 1;
  const id = data.headline
    ? data.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : `showcase-${index}`;

  return (
    <div
      id={id}
      className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-18 items-center py-8"
    >
      <div
        className={`relative max-w-md min-w-32 justify-self-center mt-4 [&_p]:max-w-sm [&_a]:underline [&_a]:text-brand-secondary-text [&_a]:decoration-brand-tertiary [&_a]:transition-all [&_a]:duration-150 [&_a]:ease-out [&_a:hover]:text-brand-secondary [&_a:hover]:decoration-brand-secondary ${isReversed ? 'lg:order-2' : ''}`}
      >
        {data.headline && (
          <h2 className="text-3xl lg:text-4xl font-ibm-plex lg:leading-tight text-blue-800 mb-2">
            {data.headline}
          </h2>
        )}
        {(data.text || data.actions) && (
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-[length:auto_100%] bg-no-repeat h-2 w-full my-8" />
        )}
        {data.text && (
          <div className="textLarge">
            <ReactMarkdown>{data.text}</ReactMarkdown>
          </div>
        )}
        {data.actions && <Actions items={data.actions} />}
      </div>
      {(data.media?.youtubeUrl || data.media?.src) && (
        <div
          className={`overflow-hidden rounded-lg shadow border border-neutral-border-subtle group ${isReversed ? 'lg:order-1' : ''}`}
        >
          {data.media.youtubeUrl ? (
            <LiteYouTube
              id={extractYouTubeId(data.media.youtubeUrl)}
              title={data.headline || 'YouTube video'}
              className="rounded-lg"
            />
          ) : (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${data.headline}`}
            >
              {data.media.src.endsWith('.webm') ? (
                <video
                  className="block w-full h-auto motion-safe:group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  src={data.media.src}
                  autoPlay
                  muted
                  loop
                  controls
                  width={1120}
                  height={800}
                />
              ) : (
                <Image
                  className="block w-full h-auto motion-safe:group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  src={data.media.src}
                  alt={data.headline}
                  width={1120}
                  height={800}
                />
              )}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function ShowcaseItemsBlock({ data, index }) {
  return (
    <section key={`features-${index}`} className="w-full">
      <Container>
        {data.title &&
          (data.blockSettings.isHeadingOne ? (
            <h1
              className={`${H1_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-neutral-text`}
            >
              {data.title}
            </h1>
          ) : (
            <h2
              className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-neutral-text`}
            >
              {data.title}
            </h2>
          ))}
        {data.subText && (
          <p className="text-lg lg:text-xl lg:leading-normal text-neutral-text-secondary max-w-60ch text-balance text-center py-4">
            {data.subText}
          </p>
        )}
        {data.items?.map((data, index) => {
          return <ShowcaseBlock data={data} key={data.id} index={index} />;
        })}
      </Container>
    </section>
  );
}
