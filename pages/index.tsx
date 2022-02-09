import { ExperimentalGetTinaClient } from '../.tina/__generated__/types'
import { Layout } from 'components/layout'
import { NextSeo } from 'next-seo'
import { Blocks, GlobalStyles } from 'components/blocks'
import { useTina } from 'tinacms/dist/edit-state'

const HomePage = (props: AsyncReturnType<typeof getStaticProps>['props']) => {
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
export const getStaticProps = async function() {
  const client = ExperimentalGetTinaClient()
  const vars = { relativePath: 'home.json' }
  const res = await client.getPageDocument(vars)
  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  }
}

export type AsyncReturnType<
  T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any
export default HomePage
