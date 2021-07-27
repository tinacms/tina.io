import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'
import NightSkySvg from '../../public/svg/night-sky.svg'
import NightSkyTopSvg from '../../public/svg/night-sky-top.svg'

export const flying_template: BlockTemplate = {
  label: 'Flying Tina',
  defaultItem: {
    headline: 'Learn Tina',
    subline: 'Learn Tina through Interactive & Fun Tutorials.',
    actions: [
      {
        variant: 'button',
        label: 'Get Started',
        icon: 'arrowRight',
        url: '#',
      },
    ],
  },
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'markdown',
    },
    {
      label: 'Subline',
      name: 'subline',
      component: 'text',
    },
    ...ActionFields,
  ],
}

export function FlyingBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <div className="learnTina">
        <div className="learnContainer">
          <div>
            <h3 className="title">
              <InlineTextarea name="headline" />
            </h3>
            <p className="text">
              <InlineTextarea name="subline" />
            </p>
            <Actions items={data.actions} />
          </div>
          <div className="learnImageWrapper">
            <img className="learnImage" src="img/flyingTina.png" alt="" />
          </div>
        </div>
        <div className="background">
          <NightSkySvg />
          <NightSkySvg />
        </div>
        <div className="foreground">
          <NightSkyTopSvg />
          <NightSkyTopSvg />
        </div>
      </div>
      <style jsx>{`
        .learnTina {
          padding: 5rem 0;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        @keyframes movingBackground {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(100%, 0, 0);
          }
        }

        .background,
        .foreground {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;

          :global(svg) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation-duration: 50s;
            animation-name: movingBackground;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }

          :global(svg:nth-child(2)) {
            left: -100%;
            margin-left: 1px;
          }
        }

        .foreground {
          z-index: 10;

          :global(svg) {
            animation-duration: 30s;
          }

          :global(svg:nth-child(2)) {
            margin-left: 0px;
          }
        }

        .title {
          font-family: var(--font-tuner);
          font-weight: bold;
          line-height: 1.4;
          margin-bottom: 1.25rem;
          font-size: 2.5rem;
          color: var(--color-seafoam-dark);
        }

        .text {
          color: white;
          font-size: 1.125rem;
          opacity: 0.85;

          &:not(:last-child) {
            margin-bottom: 1.375rem;
          }
        }

        .learnContainer {
          display: grid;
          grid-gap: 2rem;
          padding: 0 var(--container-padding);
          align-content: center;
          align-items: center;
          margin: 0 auto;
          max-width: 820px;
          grid-gap: 2rem;
          grid-template-columns: 3fr 2fr;
        }

        @keyframes learnImage {
          0% {
            transform: translate3d(0, -0.5rem, 0);
          }
          100% {
            transform: translate3d(0, 0.75rem, 0);
          }
        }

        .learnImage {
          margin: 0;
          position: relative;
          animation: learnImage 3s ease-in-out infinite alternate;

          @media (prefers-reduced-motion) {
            animation: none;
          }
        }
      `}</style>
    </BlocksControls>
  )
}
