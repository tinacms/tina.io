import DocTemplate from '../docs/[...slug]'
import { getDocProps } from '../../utils/docs/getDocProps'
import { GetStaticProps } from 'next'
import { GithubError } from 'next-tinacms-github'

export const getStaticProps: GetStaticProps = async function(props) {
  try {
    return await getDocProps(props, 'index')
  } catch (e) {
    if (e instanceof GithubError) {
      return {
        props: {
          previewError: { ...e }, //workaround since we cant return error as JSON
        },
      }
    } else {
      throw e
    }
  }
}

export default DocTemplate