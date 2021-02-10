import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'

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
          <div className="learnImageWrapper">
            <img className="learnImage" src="img/flyingTina.png" alt="" />
          </div>
          <div>
            <h3 className="headingLarge">
              <InlineTextarea name="headline" />
            </h3>
            <p className="textLarge">
              <InlineTextarea name="subline" />
            </p>
            <Actions items={data.actions} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .learnTina {
          padding: 5rem 0;
          background-image: url('/img/clouds.jpg');
          background-position: center top;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .learnContainer {
          display: grid;
          grid-gap: 2rem;
          padding: 0 var(--container-padding);
          align-content: center;
          align-items: center;
          margin: 0 auto;
          max-width: 820px;

          @media (min-width: 1000px) {
            grid-gap: 2rem;
            grid-template-columns: 2fr 3fr;
          }
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
