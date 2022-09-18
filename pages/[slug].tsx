import { client } from '../.tina/__generated__/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useTina } from 'tinacms/dist/edit-state'
import { BlocksPage } from 'components/blocks/BlocksPage'

const Page = props => {
  const tinaData = useTina({
    query: props.query,
    data: props.data,
    variables: props.vars,
  })
  const data = tinaData.data.page

  return <BlocksPage data={data} />
}

// Data Fetching
export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
  ...ctx
}) {
  const slug = ctx.params?.slug || 'home'
  const vars = { relativePath: slug + '.json' }

  const res = await client.queries.page({ relativePath: slug + '.json' })

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function() {
  const postListData = await client.queries.pageConnection({ first: -1 })

  return {
    paths: postListData.data.pageConnection.edges.map(post => ({
      params: { slug: post.node._sys.filename },
    })),
    fallback: false,
  }
}

export default Page
