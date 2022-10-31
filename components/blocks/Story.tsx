import React from 'react'
import { useInView } from 'react-intersection-observer'
import type { TinaTemplate } from '@tinacms/cli'
import { Container } from './Container'
import { Button } from 'components/ui'
import { Actions } from './Actions'

export const storyTemplate: TinaTemplate = {
  label: 'Story',
  name: 'story',
  ui: {
    previewSrc: '/img/blocks/hero.png',
  },
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
    title: 'Tina is a dev-first CMS that your editors will love',
    description:
      'Phasellus quis nibh scelerisque, cursus magna a, semper mauris. Pellentesque dui eros, lobortis quis dui eu, finibus pellentesque dui.',
    actions: [
      {
        variant: 'blue',
        label: 'Sign Up',
        url: '/',
      },
      {
        variant: 'command',
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
  },
  {
    id: 'git',
    title: 'Powered by Git',
    description:
      'Let your editoral team focus on writing content, while Tina commits to your repository.',
  },
]



const Feature = ({ activeId, setActiveId, item }) => {
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
    <div
      key={item.id}
      className={`py-8 min-h-[75vh] lg:min-h-screen flex flex-col justify-center transition ease-out duration-300 ${inView && activeId === item.id ? '' : 'opacity-0'}`}
    >
      <div className="drop-shadow-sm flex flex-col gap-8" ref={ref}>
        <div className="title-wrapper">
          <h2 className="font-tuner inline-block text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">{item.title}</h2>
        </div>
        <hr className='!my-0' />
        <p className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent">{item.description}</p>
        {item.actions && <Actions items={item.actions} />}
      </div>
    </div>
  )
}

export function StoryBlock({ data, index }) {
  const [activeId, setActiveId] = React.useState(features[0].id)

  return (
      <section key={index} className={``}>
       <Container width="wide">
        <div className="relative w-full flex flex-col-reverse lg:flex-row gap-x-8 gap-y-4">
          <div className="w-full lg:w-2/5 max-w-prose">
            {features.map(item => (
              <Feature
                activeId={activeId}
                setActiveId={setActiveId}
                item={item}
              />
            ))}
          </div>
          <div className="w-full lg:w-3/5 lg:h-screen sticky top-4 lg:top-8">
           
          </div>
        </div>
       </Container>
      </section>
  )
}
