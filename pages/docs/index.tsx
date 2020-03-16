import DocTemplate from './[...slug]'
import matter from 'gray-matter'
import { readFile } from '../../utils/readFile'
import { getDocProps } from '../../utils/docs/getDocProps'
import ContentNotFoundError from '../../utils/github/ContentNotFoundError'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async function(props) {
  try {
    return await getDocProps(props, 'index')
  } catch (e) {
    return {
      props: {
        previewError: e.message,
      },
    }
  }
}

export default DocTemplate
