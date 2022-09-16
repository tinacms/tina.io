import DocTemplate, { getStaticProps as _getStaticProps } from './[...slug]'

export const getStaticProps = async function() {
  return await _getStaticProps({ params: { slug: ['index'] } })
}

export default DocTemplate
