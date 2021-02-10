import React from 'react'
import {
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'
import { Container } from './Container'
import { HeroFeature } from './Hero'
import { IconRight } from './Icons'

export const feature_template: BlockTemplate = {
  label: 'Feature',
  defaultItem: {
    headline: 'New Feature',
    subline:
      'Pick from your custom predefined components to build web experiences, blazing fast',
    media: { src: '/img/io-placeholder.jpg' },
  },
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'text',
    },
    {
      label: 'Subline',
      name: 'subline',
      component: 'text',
    },
    ...ActionFields,
    {
      label: 'Media',
      name: 'media',
      component: 'group',
      fields: [
        {
          label: 'Media Source',
          name: 'src',
          component: 'text',
        },
      ],
    },
  ],
  itemProps: (item: any) => ({
    label: item.headline,
  }),
}

export function FeatureBlock({ data, index }) {
  const isReversed = index % 2 === 1

  return (
    <>
      {index !== 0 && <div className="spacer spacerBig"></div>}
      <BlocksControls index={index}>
        <div className={`feature ${isReversed ? 'featureReverse' : ''}`}>
          <div className="featureText">
            <h3 className="headingLarge">
              <InlineTextarea name="headline" />
            </h3>
            <hr className="dottedBorder" />
            <p className="textLarge">
              <InlineTextarea name="subline" />
            </p>
            {data.actions && <Actions items={data.actions} />}
          </div>
          <div className={`featureImage`}>
            <img src={data.media.src} alt="" />
          </div>
        </div>
      </BlocksControls>
      <style jsx>{`
        .feature {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: calc(var(--spacer-size) / 2);
          align-items: center;

          @media (min-width: 900px) {
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--spacer-size);
          }
        }

        .featureReverse {
          direction: rtl;
          > * {
            direction: ltr;
          }
        }

        .featureText {
          :global(p) {
            max-width: 400px;
          }
        }

        .featureImage {
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          margin: 0;
          overflow: hidden;
          border-radius: 0.5rem;
          border: 1px solid rgba(0, 0, 0, 0.1);

          :global(img) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}

export const features_template: BlockTemplate = {
  label: 'Features',
  defaultItem: {
    headline: 'Explore the *Tina ecosystem*',
    subline:
      'More than just a headless CMS, Tina has all the tools for building web experiences for interdisciplinary teams.',
    color: 'white',
    items: [
      {
        _template: 'feature',
        headline: 'Data Source Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party APIs',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Screen UI Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party AP',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Custom Fields',
        subline:
          'Extend primary fields with custom field plugins to completely control the editing experience and functionality.',
        actions: [
          {
            variant: 'link',
            label: 'Visit The Docs',
            icon: 'arrowRight',
            url: '#',
          },
        ],
        media: { src: '/img/io-placeholder.jpg' },
      },
    ],
  },
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'text',
    },
    {
      label: 'Subline',
      name: 'subline',
      component: 'text',
    },
    {
      label: 'Color',
      name: 'color',
      component: 'select',
      //@ts-ignore
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'lightGray' },
        { label: 'Orange', value: 'orange' },
        { label: 'Black', value: 'black' },
        { label: 'Blue', value: 'blue' },
      ],
    },
    {
      label: 'Items',
      name: 'items',
      component: 'blocks',
      //@ts-ignore
      templates: {
        feature: feature_template,
      },
    },
  ],
}

export function FeaturesBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section
        className={['section', data.color ? data.color : 'white'].join(' ')}
      >
        <Container width="narrow" center>
          <HeroFeature
            item={{ headline: data.headline, subline: data.subline }}
          />
        </Container>
        <div className="spacer"></div>
        <Container>
          <InlineBlocks name="items" blocks={FEATURE_BLOCKS} />
        </Container>
      </section>
    </BlocksControls>
  )
}

const FEATURE_BLOCKS = {
  feature: {
    Component: FeatureBlock,
    template: feature_template,
  },
}
