import React from 'react'
import { BlockTemplate } from 'tinacms'
import { BlocksControls } from 'react-tinacms-inline'
import { Container } from './Container'
import { HeroFeature } from './Hero'
import { ActionFields } from './Actions'
export const demo_teamplate: BlockTemplate = {
  label: 'Demo',
  defaultItem: {
    headline: 'Build with *your components*',
    subline:
      'Let your team build great layouts with your own React components.',
    codeSandbox:
      'https://codesandbox.io/embed/vigilant-cohen-73its?fontsize=147hidenavigation=17theme=dark',
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
    {
      label: 'Codesandbox Link',
      name: 'codeSandbox',
      component: 'text',
    },
  ],
}

export function DemoBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className="section blue">
        <Container center width="narrow">
          <HeroFeature item={data} />
        </Container>
        <div className="spacer"></div>
        <Container width="wide">
          <div className="demoWrapper">
            <iframe
              src={data.codeSandbox}
              width="800"
              height="800"
              title="CodeSandbox example of TinaCMS with Next.js"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            ></iframe>
          </div>
        </Container>
      </section>
      <style jsx>{`
        .demoWrapper {
          margin-bottom: calc(-1 * var(--section-padding));

          :global(iframe) {
            width: 100%;
            border: none !important;
            display: block;
            margin: 0;
          }
        }
      `}</style>
    </BlocksControls>
  )
}
