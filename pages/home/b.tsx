import { ExperimentalGetTinaClient } from '../../.tina/__generated__/types'

// 👇️ re-export DEFAULT export
export { default } from '../index'

export const getStaticProps = async function() {
  const client = ExperimentalGetTinaClient()
  const vars = { relativePath: 'home-b.json' }
  const res = await client.page(vars)
  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  }
}
