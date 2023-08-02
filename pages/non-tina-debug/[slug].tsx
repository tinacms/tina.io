import { client } from '../../tina/__generated__/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { fileToUrl } from 'utils/urls'
import { BlocksPage } from 'components/blocks/BlocksPage'
import { useTina } from 'tinacms/dist/react'

const fg = require('fast-glob')

const Page = (props) => {
  return (
    <BlocksPage data={props.data.page} recentPosts={props.data.recentPosts} />
  )
}

// Data Fetching
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  ...ctx
}) {
  const slug = ctx.params?.slug || 'home'
  const vars = { relativePath: slug + '.json' }

  const res = await client.queries.pageWithRecentPosts({
    relativePath: slug + '.json',
  })

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function () {
  const pages = await fg(`./content/blocksPages/*.json`)
  const paths = pages.map((file) => {
    const slug = fileToUrl(file, 'blocksPages')
    return { params: { slug } }
  })
  return {
    paths: paths,
    fallback: false,
  }
}

export default Page
