import React from 'react'
import { Layout } from 'components/layout'
import { NextSeo } from 'next-seo'
import client from 'tina/__generated__/client'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { Examples, ExamplesExamples } from 'tina/__generated__/types'

function ExamplesPage(
  props: Awaited<ReturnType<typeof getStaticProps>>['props']
) {
  const { data } = useTina(props.examples)
  return (
    <Layout>
      <NextSeo
        title={'Examples'}
        description={'TinaCMS Examples'}
        openGraph={{
          title: 'Examples',
          description: 'TinaCMS Examples',
        }}
      />
      <ExampleGrid examples={data.examples?.examples} />
    </Layout>
  )
}

export default ExamplesPage

/*
 ** DATA FETCHING -----------------------------------------------
 */

export const getStaticProps = async function () {
  const examples = await client.queries.examples({ relativePath: 'index.json' })

  const { default: metadata } = await import('../content/siteConfig.json')

  return { props: { metadata, examples } }
}

export function ExampleGrid({ examples }: { examples: Examples['examples'] }) {
  return (
    <>
      <h1
        className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center mt-20`}
      >
        Examples
      </h1>
      <section
        className={`relative px-8 py-12 lg:py-16 columns-xs gap-6`}
        style={{
          columnFill: 'balance-all',
        }}
      >
        {examples?.map((example, index) => {
          return <Example example={example} key={index} />
        })}
      </section>
    </>
  )
}

const Example = ({ example }: { example: ExamplesExamples }) => {
  return (
    <a
      target={'_blank'}
      className={`group mb-6 break-inside-avoid rounded-md bg-gradient-to-b from-white to-white/30 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),_0_0_1px_1px_rgba(223,219,252,0.5)] flex flex-col gap-5 text-gray-700 cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out`}
      href={example.link}
    >
      {/* Image container */}
      <div className="w-full">
        <img
          src={example.image}
          alt="Example Image"
          className="w-full rounded-t-md object-cover" // Tailwind classes for full width, rounded top corners, and cover object fit
          style={{ height: '150px' }} // Inline style for fixed height, you can also use Tailwind h-xx class
        />
      </div>
      <div className="px-7 lg:px-8 py-6 lg:py-7">
        <div className="flex gap-4 items-center ">
          <div className="flex flex-col">
            <h4 className="text-lg lg:text-xl font-tuner text-blue-800 font-medium">
              {example.label}
            </h4>
          </div>
        </div>
        <div className="text-base lg:text-md">
          <TinaMarkdown content={example.description} />
        </div>
      </div>
    </a>
  )
}
