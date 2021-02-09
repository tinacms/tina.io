import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { Footer } from 'components/layout'
import Link from 'next/link'
import { BlockTemplate, useCMS, usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineGithubForm } from '../components/layout/InlineGithubForm'
import ReactMarkdown from 'react-markdown'
import { NextSeo } from 'next-seo'
import {
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { Container, Divider } from 'components/home'

const HomePage = (props: any) => {
  //@ts-ignore
  const [formData, form] = useGithubJsonForm(props.file, HomePageTemplate)

  usePlugin(form)

  const { seo, banner, navItems } = formData

  return (
    <InlineGithubForm form={form}>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          title: seo.title,
          description: seo.description,
        }}
      />
      <div className="banner orange">
        <Container>
          <Link href={banner.link}>
            <a>
              <span>
                <ReactMarkdown source={banner.text} />
              </span>
              <IconRight />
            </a>
          </Link>
        </Container>
      </div>
      <div className="navbar black">
        <Container>
          <div className="navGrid">
            <Link href="/">
              <a className="logomark navLogo">
                <TinaIcon />
                <h1 className="wordmark">
                  Tina<span>.io</span>
                </h1>
              </a>
            </Link>
            <nav className="navWrapper navNav">
              <ul className="navUl">
                {navItems.map(item => {
                  const { link, label } = item

                  return (
                    <li className="navLi">
                      <Link href={link}>{label}</Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="githubStar navGithub">
              <iframe
                className="starButton"
                src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
                frameBorder="0"
                scrolling="0"
                width="150px"
                height="30px"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
      <InlineBlocks name="blocks" blocks={HOMEPAGE_BLOCKS} />
      <Footer />
      <style global jsx>{`
        :root {
          --color-orange: #ec4815;
          --color-orange-light: #eb6337;
          --color-orange-dark: #dc4419;
          --color-yellow: #f2c94c;
          --color-green: #6fcf97;
          --color-black: #1c1b2e;
          --color-blue: #241748;
          --color-white: #ffffff;
          --color-gray: #f3f3f3;
          --color-light-gray: #fafafa;
          --color-seafoam: #e6faf8;
          --color-seafoam-dark: #b4f4e0;

          --color-emphasis: var(--color-orange);
          --color-card-background: var(--color-light-gray);

          --spacer-size: 4.5rem;
          --section-padding: calc(var(--spacer-size) * 2);
          --container-padding: 1.5rem;
        }

        html {
          min-width: 400px;
        }

        .section {
          padding: var(--section-padding) 0;
        }

        .headingHuge {
          font-family: var(--font-tuner);
          font-weight: bold;
          font-size: 2.75rem;
          line-height: 1.4;
          margin-bottom: 2rem;

          :global(em),
          :global(strong) {
            font-weight: inherit;
            color: var(--color-emphasis);
            font-style: inherit;

            @media (min-width: 600px) {
              white-space: nowrap;
            }
          }
        }

        .headingLarge {
          font-family: var(--font-tuner);
          margin-bottom: 1rem;
          font-size: 2.25rem;
          font-weight: bold;
        }

        .headingMedium {
          font-size: 1.675rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .textHuge {
          display: block;
          width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.375rem;

          &:not(:last-child) {
            margin-bottom: 2rem;
          }
        }

        .textLarge {
          font-size: 1.125rem;
          opacity: 0.7;

          &:not(:last-child) {
            margin-bottom: 1.25rem;
          }
        }

        .buttonGroup {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding-top: 0.5rem;
          margin: 0 -0.75rem;

          :global(a),
          :global(button) {
            margin: 0 0.75rem;
          }
        }

        .buttonGroupCenter {
          justify-content: center;
        }

        .button {
          position: relative;
          font-family: var(--font-tuner);
          text-decoration: none;
          color: inherit;
          font-size: 1.25rem;
          line-height: 1;
          font-weight: bold;
          padding: 1rem 1.75rem;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          white-space: nowrap;
          outline: none;

          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 150ms ease-out;
            border-radius: 0.25rem;
            box-shadow: 0 0 0 4px currentColor;
          }
          &:focus,
          &:active {
            &:after {
              opacity: 0.3;
            }
          }
          :global(svg) {
            display: inline-block;
            width: auto;
            height: 1.125em;
            margin-left: 0.75rem;
          }
        }

        .buttonLink {
          font-size: 1rem;
          color: var(--color-orange);
          padding: 0;

          &:after {
            width: calc(100% + 1.5rem);
            height: calc(100% + 1rem);
            top: -0.5rem;
            left: -0.75rem;
          }
        }

        .buttonOrange {
          background: var(--color-orange);
          transition: background 150ms ease-out;
          color: white;

          :hover {
            background: var(--color-orange-light);
          }
        }

        .buttonGhost {
          opacity: 0.7;
          transition: opacity 150ms ease-out;

          :hover {
            opacity: 1;
          }
        }

        .spacer {
          display: block;
          width: 100%;
          height: var(--spacer-size);
        }

        .spacerBig {
          height: calc(var(--spacer-size) * 1.5);
        }

        .dottedBorder {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 4px dotted var(--color-orange);
          width: 6rem;
          max-width: 100%;
          display: block;
          height: 0px;
          margin: 1.5rem 0px;
        }

        .orange {
          background: linear-gradient(
            to top right,
            var(--color-orange),
            var(--color-orange-light)
          );
          color: var(--color-white);
        }

        .black {
          background: var(--color-black);
          color: var(--color-white);
        }

        .blue {
          background: var(--color-blue);
          background: linear-gradient(
            to bottom,
            var(--color-blue) 30%,
            var(--color-black) 100%
          );
          color: var(--color-white);
          --color-emphasis: var(--color-orange-light);
        }

        .lightGray {
          background: var(--color-light-gray);
          color: var(--color-black);
          --color-card-background: var(--color-white);
        }

        .white {
          background: var(--color-white);
          color: var(--color-black);
        }
      `}</style>
      <style jsx>{`
        .banner {
          :global(a) {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.75rem 0;
            font-size: 1.25rem;
            line-height: 1.4;
            text-decoration: none;
            color: inherit;
            transition: opacity 150ms ease-out;
            &:hover {
              opacity: 0.8;
            }
          }
          :global(em) {
            font-style: normal;
            font-weight: bold;
            text-decoration: underline;
          }
          :global(svg) {
            margin-left: 1rem;
            height: 1em;
          }
        }

        .tinaCloud {
          display: inline-block;
          white-space: nowrap;
        }

        .navbar {
          padding: 2rem 0 2rem 0;
          margin-bottom: -1px;
        }

        .navGrid {
          width: 100%;
          display: grid;
          grid-gap: 2rem 1rem;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;

          @media (min-width: 800px) {
            grid-gap: 1rem;
            align-items: center;
            grid-template-columns: auto 1fr auto;
            grid-template-rows: 1fr;
          }
        }

        .navLogo {
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 1;
          grid-row-end: 2;
          text-decoration: none;

          @media (min-width: 800px) {
            grid-column-start: 1;
            grid-column-end: 2;
          }
        }

        .navNav {
          grid-column-start: 1;
          grid-column-end: 3;
          grid-row-start: 2;
          grid-row-end: 3;
          justify-self: center;

          @media (min-width: 800px) {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
          }
        }

        .navGithub {
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
          grid-row-end: 2;
          justify-self: end;

          @media (min-width: 800px) {
            grid-column-start: 3;
            grid-column-end: 4;
          }
        }

        .navUl {
          display: flex;
          margin: 0 -1.5rem;
        }

        .navLi {
          margin: 0 1.5rem;

          :global(a) {
            color: white;
            opacity: 0.7;
            transition: opacity 150ms ease-out;
            text-decoration: none;
            font-size: 1.25rem;
            &:hover {
              opacity: 1;
            }
          }
        }

        .logomark {
          color: var(--color-orange);
          fill: var(--color-orange);
          display: flex;
          align-items: center;

          :global(svg) {
            margin-top: -5px;
            height: 40px;
            width: auto;
            margin-right: 12px;
          }
        }

        .wordmark {
          font-size: 26px;
          font-weight: bold;
          font-family: var(--font-tuner);

          :global(span) {
            margin-left: 1px;
          }
        }
      `}</style>
    </InlineGithubForm>
  )
}

export default HomePage

const CallToActionFields = [
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
  {
    label: 'Action Items',
    name: 'actionItems',
    component: 'group-list',
    fields: [
      {
        label: 'Action Label',
        name: 'label',
        component: 'text',
      },
      {
        label: 'Action Variant',
        name: 'variant',
        component: 'select',
        options: ['button', 'link'],
      },
      {
        label: 'Action URL',
        name: 'url',
        component: 'text',
      },
      {
        label: 'Action Icon',
        name: 'icon',
        component: 'select',
        options: ['', 'arrowRight'],
      },
    ],
    itemProps: (item: any) => ({
      key: item.name,
      label: `Action: ${item.label || 'New Action'}`,
    }),
  },
]

const browser_template: BlockTemplate = {
  label: 'Browser',
  defaultItem: {},
  fields: [],
}

function BrowserBlock({ data, index }) {
  const { browser, headline, subline, items } = data

  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className="section white">
        <Container center width="narrow">
          <HeroFeature item={{ headline: headline, subline: subline }} />
        </Container>
        <div className="spacer"></div>
        <Container width="wide">
          <div className="browserContainer">
            <div className="browser browserGrid">
              <div className="browserContent">
                <span className="contentTitle">
                  <InlineTextarea name="browser.headline" />
                </span>
                <span className="contentText">
                  <InlineTextarea name="browser.subline" />
                </span>
                <span className="contentFootnote">
                  <InlineTextarea name="browser.text" />
                </span>
              </div>
              <div className="browserImageWrapper">
                <img className="browserImage" src={browser.media.src} alt="" />
              </div>
            </div>
          </div>
          <Divider type="desktop" />
          <div className="cardGroup noSpacingMobile">
            {items.map(item => {
              return (
                <>
                  <Divider type="mobile" />
                  <div className="card cardLinked">
                    <div className="linkedContent">
                      <img src={item.media.src} alt="" className="cardImage" />
                      <h3 className="headingMedium">{item.headline}</h3>
                      <Link href="/docs">
                        <a className="cardLink"></a>
                      </Link>
                      <p className="textLarge">{item.subline}</p>
                    </div>
                    <div className="linkedIcon">
                      {item.icon === 'arrowRight' && <IconRight />}
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </Container>
      </section>
      <style jsx>{`
        .browser {
          position: relative;
          padding: 4rem 3rem 3rem 3rem;
          border-radius: 2rem;
          overflow: visible;
          background: var(--color-card-background);
          background: linear-gradient(
            to bottom right,
            var(--color-light-gray) 30%,
            var(--color-gray)
          );
          transform: rotate3d(1, 0, 0, 2deg);
          background-position: top left;
          border-radius: 0.25rem;
          box-shadow: inset 0 0 0 1px rgba(36, 23, 72, 0.03),
            0 24px 32px rgba(36, 23, 72, 0.05), 0 6px 8px rgba(36, 23, 72, 0.03),
            0 48px 48px -64px rgba(36, 23, 72, 0.3);

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

        .browserContainer {
          perspective: 300px;
        }

        .browserGrid {
          display: grid;
          grid-gap: 3rem 2rem;

          @media (min-width: 1000px) {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }

        .contentTitle {
          font-family: var(--font-tuner);
          color: var(--color-orange);
          display: block;
          font-size: 2.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .contentText {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
        }

        .contentFootnote {
          display: block;
          font-size: 1.125rem;
          opacity: 0.5;
        }

        .browserImageWrapper {
          margin-top: -1rem;
        }

        .browserImage {
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          filter: drop-shadow(0 3px 8px rgba(0, 37, 91, 0.07));
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

const learn_template: BlockTemplate = {
  label: 'Flying Tina',
  defaultItem: {
    headline: 'Learn Tina',
    subline: 'Learn Tina through Interactive & Fun Tutorials.',
    actionItems: [
      {
        variant: 'button',
        label: 'Get Started',
        icon: 'arrowRight',
        url: '#',
      },
    ],
  },
  fields: [...CallToActionFields],
}

function LearnBlock({ data, index }) {
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
            <div className="buttonGroup">
              {data.actionItems.map(item => {
                const { variant, label, icon, url } = item
                return (
                  <a
                    href={url}
                    className={`button ${
                      variant === 'button' ? 'buttonOrange' : 'buttonGhost'
                    }`}
                  >
                    {label} {icon === 'arrowRight' && <IconRight />}
                  </a>
                )
              })}
            </div>
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

const hero_template: BlockTemplate = {
  label: 'Hero',
  defaultItem: {
    headline: 'Content editing for modern teams',
    subline: 'Tina is an open-source CMS admin that talks to any API',
    actionItems: [
      {
        variant: 'button',
        label: 'Try Demo',
        icon: 'arrowRight',
        url: '#',
      },
      {
        variant: 'link',
        label: 'Learn More',
        icon: '',
        url: '#',
      },
    ],
    videoSrc: 'v1571425758/tina-hero-demo-v2',
  },
  fields: [
    ...CallToActionFields,
    {
      label: 'Video Cloudinary Source',
      name: 'videoSrc',
      component: 'text',
    },
  ],
}

function HeroBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className="section black">
        <Container width="narrow" center>
          <HeroFeature item={data} />
        </Container>
        <div className="splitBackgroundBlackWhite">
          <Container>
            <Video src={data.videoSrc} />
          </Container>
        </div>
      </section>
      <style jsx>{`
        .splitBackgroundBlackWhite {
          background: linear-gradient(
            to bottom,
            var(--color-black) 0%,
            var(--color-blue) 50%,
            var(--color-light-gray) 50%,
            var(--color-white) 100%
          );
        }
      `}</style>
    </BlocksControls>
  )
}

const demo_teamplate: BlockTemplate = {
  label: 'Demo',
  defaultItem: {
    headline: 'Build with *your components*',
    subline:
      'Let your team build great layouts with your own React components.',
    codeSandbox:
      'https://codesandbox.io/embed/vigilant-cohen-73its?fontsize=147hidenavigation=17theme=dark',
  },
  fields: [
    ...CallToActionFields,
    {
      label: 'Codesandbox Link',
      name: 'codeSandbox',
      component: 'text',
    },
  ],
}

function DemoBlock({ data, index }) {
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

const feature_template: BlockTemplate = {
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
    {
      label: 'Link URL',
      name: 'url',
      component: 'text',
    },
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

function FeatureBlock({ data, index }) {
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
            {data.url && (
              <div className="buttonGroup">
                <a href={data.url} className="button buttonLink">
                  Read The Docs <IconRight />
                </a>
              </div>
            )}
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
          :global(img) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
            border-radius: 0.5rem;
            box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
              0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);
          }
        }
      `}</style>
    </>
  )
}

const features_template: BlockTemplate = {
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
        url: '#',
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Screen UI Plugins',
        subline:
          'Data Source plugins allow you to extend Tina to connect to different databases and 3rd Party AP',
        url: '#',
        media: { src: '/img/io-placeholder.jpg' },
      },
      {
        _template: 'feature',
        headline: 'Custom Fields',
        subline:
          'Extend primary fields with custom field plugins to completely control the editing experience and functionality.',
        url: '#',
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
        { label: 'Orange', value: 'orage' },
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

function FeaturesBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className={['section', data.color].join(' ')}>
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

const HOMEPAGE_BLOCKS = {
  hero: {
    Component: HeroBlock,
    template: hero_template,
  },
  features: {
    Component: FeaturesBlock,
    template: features_template,
  },
  demo: {
    Component: DemoBlock,
    template: demo_teamplate,
  },
  browser: {
    Component: BrowserBlock,
    template: browser_template,
  },
  learn: {
    Component: LearnBlock,
    template: learn_template,
  },
}

const HomePageTemplate = {
  label: 'Home Page',
  defaultItem: {},
  fields: [
    {
      label: 'Nav',
      name: 'navItems',
      component: 'group-list',
      fields: [
        {
          label: 'Label',
          name: 'label',
          component: 'text',
        },
        {
          label: 'Link',
          name: 'link',
          component: 'text',
        },
      ],
      itemProps: (item: any) => ({
        key: item.link,
        label: item.label,
      }),
    },
    {
      label: 'Page Sections',
      name: 'blocks',
      component: 'blocks',
      templates: {
        hero: hero_template,
        features: features_template,
        demo: demo_teamplate,
        browser: browser_template,
        learn: learn_template,
      },
    },
    {
      label: 'SEO',
      name: 'seo',
      component: 'group',
      fields: [
        { name: 'title', label: 'Page Title', component: 'text' },
        {
          name: 'description',
          label: 'Page Description',
          component: 'textarea',
        },
      ],
    },
  ],
}

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps('content/pages/home.json', preview, previewData)
}

const IconRight = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
    </svg>
  )
}

const TinaIcon = () => {
  return (
    <svg
      viewBox="0 0 49 68"
      fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
    >
      <title>Tina</title>
      <desc>A proud llama</desc>
      <path d="M31.4615 30.1782C34.763 27.4475 36.2259 11.3098 37.6551 5.50906C39.0843 -0.291715 44.995 0.00249541 44.995 0.00249541C44.995 0.00249541 43.4605 2.67299 44.0864 4.66584C44.7123 6.65869 49 8.44005 49 8.44005L48.0752 10.8781C48.0752 10.8781 46.1441 10.631 44.995 12.9297C43.8459 15.2283 45.7336 37.9882 45.7336 37.9882C45.7336 37.9882 38.8271 51.6106 38.8271 57.3621C38.8271 63.1136 41.5495 67.9338 41.5495 67.9338H37.7293C37.7293 67.9338 32.1252 61.2648 30.9759 57.9318C29.8266 54.5988 30.2861 51.2658 30.2861 51.2658C30.2861 51.2658 24.1946 50.921 18.7931 51.2658C13.3915 51.6106 9.78922 56.2539 9.13908 58.8512C8.48894 61.4486 8.21963 67.9338 8.21963 67.9338H5.19906C3.36057 62.2603 1.90043 60.2269 2.69255 57.3621C4.88665 49.4269 4.45567 44.9263 3.94765 42.9217C3.43964 40.9172 0 39.1676 0 39.1676C1.68492 35.7349 3.4048 34.0854 10.8029 33.9133C18.201 33.7413 28.1599 32.9088 31.4615 30.1782Z" />
      <path d="M12.25 57.03C12.25 57.03 13.0305 64.2533 17.1773 67.9342H20.7309C17.1773 63.9085 16.7897 53.415 16.7897 53.415C14.9822 54.0035 12.4799 56.1106 12.25 57.03Z" />
    </svg>
  )
}

const HeroFeature = ({ item }) => {
  return (
    <>
      {item.headline && (
        <h2 className="headingHuge">
          <InlineWysiwyg name="headline">
            <ReactMarkdown source={item.headline} />
          </InlineWysiwyg>
        </h2>
      )}
      {item.subline && (
        <p className="textHuge">
          <InlineTextarea name="subline" />
        </p>
      )}
      {item.actionItems && (
        <div className="buttonGroup buttonGroupCenter">
          {item.actionItems.map(item => {
            const { variant, label, icon, url } = item
            return (
              <a
                href={url}
                className={`button ${
                  variant === 'button' ? 'buttonOrange' : 'buttonGhost'
                }`}
              >
                {label} {icon === 'arrowRight' && <IconRight />}
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}

const Video = ({ src }) => {
  return (
    <>
      <video
        className="video"
        autoPlay={true}
        loop
        muted
        playsInline
        poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
      >
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/${src}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
            0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);
          display: flex;
          justify-content: center;
          margin-top: calc(var(--spacer-size) * 1.5);
          margin-bottom: -9rem;
        }
      `}</style>
    </>
  )
}
