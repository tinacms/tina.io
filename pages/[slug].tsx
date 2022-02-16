import { ExperimentalGetTinaClient } from '../.tina/__generated__/types'
import { Layout } from 'components/layout'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { fileToUrl } from 'utils/urls'
import { GlobalStyles } from 'components/blocks/GlobalStyles'
import { Blocks } from 'components/blocks'
import { useTina } from 'tinacms/dist/edit-state'

const fg = require('fast-glob')

const Page = props => {
  const tinaData = useTina({
    query: props.query,
    data: props.data,
    variables: props.vars,
  })
  const data = tinaData.data.getPageDocument.data

  return (
    <>
      <NextSeo
        title={data.seo.title}
        description={data.seo.description}
        openGraph={{
          title: data.seo.title,
          description: data.seo.description,
        }}
      />
      <Layout>
        {/* TODO: why is there a type error here */}
        {/* @ts-ignore */}
        <Blocks blocks={data.blocks} />
      </Layout>
      <style global jsx>
        {GlobalStyles}
      </style>
    </>
  )
}

// Data Fetching
export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params
  const client = ExperimentalGetTinaClient()
  const vars = { relativePath: slug + '.json' }
  const res = await client.getPageDocument(vars)

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function() {
  console.log('shit')
  const pages = await fg(`./content/blocksPages/*.json`)
  const paths = pages.map(file => {
    const slug = fileToUrl(file, 'blocksPages')
    return { params: { slug } }
  })
  const updatedPaths = paths.filter(path => {
    return path.params.slug !== 'home'
  })
  console.log(updatedPaths)
  return {
    paths: updatedPaths,
    fallback: false,
  }
}

export default Page
