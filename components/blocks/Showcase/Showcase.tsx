import Image from 'next/image';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';
import { BLOCK_HEADINGS_SIZE, H1_HEADINGS_SIZE } from '@/component/styles/typography';

export function ShowcaseBlock({ data, index }) {
  const isReversed = index % 2 === 1;
  const id = data.headline
    ? data.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : `showcase-${index}`;

  return (
    <>
      <div
        id={id}
        key={`showcase-${index}`}
        className={`feature ${isReversed ? 'featureReverse' : ''}`}
      >
        <div className="featureText">
          {data.headline && (
            <h3 className="text-3xl lg:text-4xl font-ibm-plex lg:leading-tight bg-linear-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text text-transparent mb-2">
              {data.headline}
            </h3>
          )}
          {(data.text || data.actions) && <hr className="dottedBorder" />}
          {data.text && (
            <div className="textLarge">
              <ReactMarkdown>{data.text}</ReactMarkdown>
            </div>
          )}
          {data.actions && <Actions items={data.actions} />}
        </div>
        {data.media?.src && (
          <div className="featureImage">
            <a href={data.url} target="_blank">
              {data.media.src.endsWith('.webm') ? (
                <video
                  className="showcaseVideo"
                  src={data.media.src}
                  autoPlay
                  muted
                  loop
                  width={1120}
                  height={800}
                />
              ) : (
                <Image
                  className="showcaseImage"
                  src={data.media.src}
                  alt={data.headline}
                  width={1120}
                  height={800}
                />
              )}
            </a>
          </div>
        )}
      </div>
      <style jsx>{`
        .feature {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--spacer-size);
          align-items: center;
          z-index: 2;
          @media (min-width: 900px) {
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--spacer-size);
          }
          padding: 2rem 0;
        }
        .featureReverse {
          direction: rtl;
          > * {
            direction: ltr;
          }
        }
        .featureText {
          position: relative;
          max-width: 28rem;
          min-width: 8rem;
          justify-self: center;
          margin-top: 1rem;
          :global(p > a) {
            text-decoration: underline;
            transition: all ease-out 150ms;
            color: var(--color-tina-blue-dark);
            text-decoration-color: var(--color-seafoam-dark);
            &:hover {
              color: var(--color-tina-blue);
              text-decoration-color: var(--color-tina-blue);
            }
          }
          :global(p) {
            max-width: 400px;
          }
        }
        .featureImage {
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.07);
          margin: 0;
          overflow: hidden;
          border-radius: 0.5rem;
          transition: 0.5s ease;
          backface-visibility: hidden;
          :global(img),
          :global(video) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
          }
        }
        .featureImage:hover .showcaseImage,
        .featureImage:hover .showcaseVideo {
          opacity: 0.3;
          transition: 0.5s ease;
        }
        .dottedBorder {
          display: block;
          border: none;
          border-image: initial;
          background: url('/svg/hr.svg');
          background-size: auto 100%;
          background-repeat: no-repeat;
          height: 7px;
          width: 100%;
          margin: 2rem 0px;
        }
      `}</style>
    </>
  );
}

export function ShowcaseItemsBlock({ data, index }) {
  return (
    <section key={`features-${index}`} className="w-full">
      <Container>
        {data.title && (
          data.blockSettings.isHeadingOne ? (
            <h1 className={`${H1_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-black`}>
              {data.title}
            </h1>
          ) : (
            <h2 className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-black`}>
              {data.title}
            </h2>
          )
        )}
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
