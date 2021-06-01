import Link from 'next/link'
import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { Container } from './Container'
import { Divider } from './Divider'
import { HeroFeature } from './Hero'
import { IconRight } from './Icons'

export const browser_template: BlockTemplate = {
  label: 'Browser',
  defaultItem: {},
  fields: [],
}

export function BrowserBlock({ data, index }) {
  const { media, headline, subline } = data

  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className="section lightGray">
        <Container center width="narrow">
          <HeroFeature item={{ headline: headline, subline: subline }} />
        </Container>
        <div className="spacer"></div>
        <Container width="wide">
          <div className="browserContainer">
            <img className="browserImage" src={media.src} alt="" />
          </div>
        </Container>
      </section>
      <style jsx>{`
        .browserContainer {
          perspective: 300px;
        }

        .browserImageWrapper {
          margin-top: -1rem;
        }

        .browserImage {
          width: 100%;
          max-width: 640px;
          height: auto;
          position: relative;
          left: 50%;
          border-radius: 2rem;
          overflow: hidden;
          background: var(--color-card-background);
          background: linear-gradient(
            to bottom right,
            white 30%,
            var(--color-light-gray)
          );
          transform: rotate3d(1, 0, 0, 2deg) translate3d(-50%, 0, 0);
          background-position: top left;
          border-radius: 0.5rem;
          box-shadow: inset 0 0 0 1px rgba(36, 23, 72, 0.03),
            0 24px 32px rgba(36, 23, 72, 0.05), 0 6px 8px rgba(36, 23, 72, 0.03),
            0 48px 48px -64px rgba(36, 23, 72, 0.3);
          border: 1px solid rgba(36, 23, 72, 0.07);

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 2rem;
            left: 3rem;
            transform: translate3d(-0.875rem, 0, 0);
            width: 0.875rem;
            height: 0.875rem;
            border-radius: 1rem;
            overflow: visible;
            box-shadow: 0.875rem 0 0 var(--color-orange),
              2.375rem 0 0 var(--color-yellow), 3.875rem 0 0 var(--color-green);
          }
        }

        .cardGroup {
          display: grid;
          grid-template-rows: 1fr;
          gap: calc(var(--spacer-size) * 0.5);

          @media (min-width: 1000px) {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        .noSpacingMobile {
          @media (max-width: 999px) {
            gap: 0;
          }
        }

        .card {
          background: var(--color-card-background);
          padding: 2.25rem;
          border-radius: 0.25rem;
          box-shadow: inset 0 0 0 1px rgba(36, 23, 72, 0.03),
            0 6px 24px rgba(36, 23, 72, 0.05), 0 2px 4px rgba(36, 23, 72, 0.03);
        }

        .featured {
          background: linear-gradient(
            to bottom,
            var(--color-orange-light),
            var(--color-orange-light),
            var(--color-orange)
          );
          box-shadow: inset 0 0 0 1px var(--color-orange-light),
            0 6px 24px rgba(36, 23, 72, 0.07), 0 2px 4px rgba(36, 23, 72, 0.05);
          color: white;

          :global(img) {
            filter: drop-shadow(0 2px 0 white) drop-shadow(2px 0 0 white)
              drop-shadow(-2px 0 0 white) drop-shadow(0 -2px 0 white);
          }

          :global(p) {
            font-weight: bold;
            opacity: 1;
          }
        }

        .cardLinked {
          position: relative;
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 2.25rem;

          &:hover {
            :global(> * > *) {
              opacity: 1;
            }
            :global(svg) {
              color: var(--color-orange);
            }
          }
        }

        .linkedIcon {
          width: 2rem;
          margin-right: -0.5rem;
          height: 100%;
          display: flex;
          align-items: center;

          :global(svg) {
            width: 1.5rem;
            height: auto;
            opacity: 0.7;
          }
        }

        .cardLink {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          color: transparent;
          cursor: pointer;
          z-index: 10;
          opacity: 0;
          transition: opacity 150ms ease-out;
          border-radius: 0.25rem;

          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0.25rem;
            box-shadow: inset 0 0 0 1px rgba(36, 23, 72, 0.03),
              0 0 0 5px var(--color-orange), 0 24px 32px rgba(36, 23, 72, 0.05),
              0 6px 8px rgba(36, 23, 72, 0.03),
              0 48px 48px -64px rgba(36, 23, 72, 0.3);
          }
          &:focus,
          &:active {
            opacity: 1;
          }
        }

        .cardImage {
          display: block;
          width: auto;
          margin-bottom: 1.125rem;
        }
      `}</style>
    </BlocksControls>
  )
}
