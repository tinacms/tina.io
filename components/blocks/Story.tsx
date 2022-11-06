import React from 'react'
import { useInView } from 'react-intersection-observer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { Container } from './Container'
import { Actions } from './Actions'
import type { TinaTemplate } from '@tinacms/cli'

export const storyTemplate: TinaTemplate = {
  label: 'Story',
  name: 'story',
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
}

const features = [
  {
    id: 'editing',
    title: 'Edit Markdown, Visually',
    description:
      'Tina is an open-source, headless CMS for Markdown, MDX, and JSON.',
    actions: [
      {
        variant: 'blue',
        size: 'large',
        label: 'Sign Up',
        url: '/',
      },
      {
        variant: 'command',
        size: 'large',
        label: 'npx create-tina-app@latest',
        url: '/',
      },
    ],
  },
  {
    id: 'file',
    title: 'Own Your Content',
    description:
      'Store content in your repo. Tina saves to MDX, Markdown, and JSON and provides a powerful data layer on top of your static files.',
  },
  {
    id: 'schema',
    title: 'Simple CMS Configuration',
    description:
      "Define your content's schema and Tina will provide you with a user friendly editing experience.",
    actions: [
      {
        variant: 'seafoam',
        size: 'large',
        label: 'Read The Docs',
        url: '/docs/schema/',
      },
    ],
  },
  {
    id: 'git',
    title: 'Powered by Git',
    description:
      'Let your editoral team focus on writing content, while Tina commits to your repository.',
  },
]

const panes = [
  {
    name: 'Contextual Editing',
    background: 'light',
    width: '100',
    height: 'auto',
    video: 'v1656009626/tina-io/new-homepage/editing-demo',
    positions: {
      editing: 'front',
      file: 'back',
      schema: 'front-bottom',
      git: 'back',
      default: 'out-bottom',
    },
  },
  {
    name: 'File System',
    background: 'dark',
    width: '100',
    height: '100',
    file: {
      name: 'about.mdx',
      language: 'mdx',
      textScale: 1.375,
      code: `---
title: Awesome Developer Experience
---

Tina empowers your team by giving you
more control over your components.

<CoolComponent
text="MDX Rocks"
/>`,
    },
    positions: {
      editing: 'back',
      file: 'front',
      schema: 'out-top',
      default: 'out-bottom',
    },
  },
  {
    name: 'Schema',
    background: 'dark',
    width: '60',
    height: '90',
    basePosition: 'absolute-right',
    file: {
      name: 'schema.tsx',
      language: 'json',
      textScale: 1,
      code: `{
  type: "string",
  label: "Title",
  name: "title"
},
{
  type: 'string',
  label: 'Description',
  name: 'body',
  isBody: true,
},`,
      newCode: `{
  type: "string",
  label: "Title",
  name: "title"
},
{
  type: "string",
  label: "Description",
  name: "description",
},`,
    },
    positions: {
      schema: 'foreground',
      git: 'out-right',
      default: 'out-bottom',
    },
  },
  {
    name: 'Git Commit',
    background: 'dark',
    width: '95',
    height: '40',
    file: {
      language: 'shell',
      textScale: 1.1,
      code: `commit 4ca9edc2ee64c1ab5127a1fd4519a83426731cd7
Author:  Scott Gallant <scottgallant@gmail.com>
Date:    Thu May 26 13:31:02 2022 -0300
Message: Update From Tina`,
    },
    positions: {
      schema: 'out-bottom',
      git: 'front',
      default: 'out-top',
    },
  },
]

const Video = ({ src }) => {
  return (
    <video
      className="w-full h-auto"
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
  )
}

const Pane = ({ data, position }) => {
  return (
    <>
      <div
        className={`pane text-xs sm:text-sm lg:text-base ${
          data.basePosition ? data.basePosition : ''
        } ${position}`}
        style={{
          width: data.width + '%',
          height: data.height === 'auto' ? 'auto' : data.height + '%',
        }}
      >
        {data.video && (
          <div className="rounded-lg shadow-panel overflow-hidden">
            <Video src={data.video} />
          </div>
        )}
        {data.file && (
          <div className="flex flex-col justify-start items-start">
            {data.file.name && (
              <div className="inline-block rounded-t-lg overflow-hidden text-white border-2 border-b-0 border-blue-800 bg-gradient-to-tl from-blue-800 to-blue-900 px-7 py-3 font-tuner">
                {data.file.name}
              </div>
            )}
            <div
              className={`file relative ${
                data.file.name ? 'rounded-lg rounded-tl-none' : 'rounded-lg'
              } overflow-hidden w-full text-blue-50 border-2 border-blue-800 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-1000 shadow-panel`}
              style={{
                fontSize:
                  1.25 * (data.file.textScale ? data.file.textScale : 1) + 'em',
              }}
            >
              <SyntaxHighlighter
                language={
                  data.file.language ? data.file.language : 'javascript'
                }
                useInlineStyles={false}
                // wrapLines={true}
                // wrapLongLines={true}
              >
                {data.file.code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .file:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.07;
          background: repeating-linear-gradient(
            #2296fe,
            #85c5fe 40%,
            #0574e4 50%,
            #1d2c6c 90%
          );
          pointer-events: none;
          background-repeat: repeat-both;
          background-size: auto 6px;
          mix-blend-mode: overlay;
          border-radius: 8px;
        }

        .right {
          perspective: 1000px;
          perspective-origin: 50% 50%;
          transform: scale(0.85);
          --right-rotation: -5deg;
        }

        @media (min-width: 1200px) {
          .right {
            --right-rotation: -8deg;
          }
        }

        .pane {
          position: absolute;
          display: block;
          transition: all 750ms cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .absolute-right {
          right: 0;
        }

        .back {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(4%, 7%, -25px);
          z-index: -1;
        }

        .front {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, -7%, 25px);
        }

        .front-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 7%, 25px);
        }

        .foreground {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(4%, -7%, 100px);
        }

        .out-top {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, -50%, 75px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        .out-right {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(100%, -7%, 100px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        .out-bottom {
          transform: rotate3d(0, 1, 0, var(--right-rotation))
            translate3d(-4%, 50%, -25px);
          transition-duration: 400ms;
          transition-timing-function: cubic-bezier(0.225, 0.125, 0.44, 0.295);
          opacity: 0;
        }

        /* Code Styles */

        :global(.hljs) {
          font-size: unquote('clamp(0.75em,0.676em + 0.37vw, 1em)			');
          padding: 1.5em;
          color: var(--blue-250);
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(var(--blue-250-rgb), 0.15),
            0 0 12px rgba(var(--blue-250-rgb), 0.2),
            0 0 32px rgba(var(--blue-250-rgb), 0.3);
        }

        :global(.hljs-number) {
          color: var(--blue-400);
          text-shadow: 0 0 7px rgba(var(--blue-400-rgb), 0.15),
            0 0 12px rgba(var(--blue-400-rgb), 0.2),
            0 0 32px rgba(var(--blue-400-rgb), 0.3);
        }

        :global(.hljs-meta) {
          color: var(--blue-650);
          text-shadow: 0 0 7px rgba(var(--blue-650-rgb), 0.15),
            0 0 12px rgba(var(--blue-650-rgb), 0.2),
            0 0 32px rgba(var(--blue-650-rgb), 0.3);
        }

        :global(.hljs-attr),
        :global(.hljs-attribute) {
          color: #d07ea5;
          text-shadow: 0 0 7px rgba(208, 126, 165, 0.15),
            0 0 12px rgba(208, 126, 165, 0.2), 0 0 32px rgba(208, 126, 165, 0.5);
        }

        :global(.hljs-string) {
          color: var(--blue-400);
        }
      `}</style>
    </>
  )
}

const Feature = ({ activeId, setActiveId, item }) => {
  const featurePanes = panes.filter((pane) => {
    return item.id in pane.positions
  })

  const { ref, inView, entry } = useInView({
    rootMargin: '-100px 0px',
  })

  React.useEffect(() => {
    if (inView) {
      setActiveId(item.id)
    } else if (activeId === item.id) {
      setActiveId(null)
    }
  }, [inView])

  React.useEffect(() => {
    if (!activeId && inView) {
      setActiveId(item.id)
    }
  }, [activeId])

  return (
    <>
      <div
        key={item.id}
        className={`py-8 min-h-[75vh] lg:min-h-screen flex flex-col justify-center transition ease-out duration-500 ${
          activeId === item.id ? '' : 'lg:opacity-0'
        }`}
      >
        <div className="lg:hidden w-full aspect-w-9 aspect-h-6 relative mt-6 mb-24">
          <div className="absolute w-full h-full pane-container">
            {featurePanes &&
              featurePanes.map((pane) => (
                <Pane data={pane} position={pane.positions[item.id]} />
              ))}
          </div>
        </div>
        <div className="drop-shadow-sm flex flex-col gap-6 lg:gap-8" ref={ref}>
          <div className="title-wrapper">
            <h2 className="font-tuner inline-block text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              {item.title}
            </h2>
          </div>
          <hr className="!my-0" />
          <p className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-2">
            {item.description}
          </p>
          {item.actions && <Actions items={item.actions} />}
        </div>
      </div>
      <style jsx>{`
        .pane-container {
          perspective: 1000px;
          -moz-perspective: none;
          transform: scale(0.85);
          --right-rotation: -5deg;
        }
      `}</style>
    </>
  )
}

export function StoryBlock({ data, index }) {
  const [activeId, setActiveId] = React.useState(features[0].id)

  return (
    <>
      <section
        key={index}
        className={`w-full max-w-full overflow-hidden lg:overflow-visible`}
      >
        <Container width="wide">
          <div className="relative w-full flex flex-col-reverse items-center lg:items-start lg:flex-row gap-x-8 gap-y-4">
            <div className="w-full lg:w-2/5 max-w-prose">
              {features.map((item) => (
                <Feature
                  activeId={activeId}
                  setActiveId={setActiveId}
                  item={item}
                />
              ))}
            </div>
            <div className="hidden lg:flex w-full lg:w-3/5 lg:h-screen flex-col justify-center sticky top-32 lg:top-0">
              <div className="w-full aspect-w-9 aspect-h-6 relative">
                <div className="absolute w-full h-full right">
                  {panes.map((pane) => (
                    <Pane
                      data={pane}
                      position={
                        pane.positions[activeId]
                          ? pane.positions[activeId]
                          : pane.positions.default
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <style jsx>{`
        .right {
          perspective: 1000px;
          -moz-perspective: none;
          transform: scale(0.85);
          --right-rotation: -5deg;
        }

        @media (min-width: 1200px) {
          .right {
            --right-rotation: -8deg;
          }
        }
      `}</style>
    </>
  )
}
