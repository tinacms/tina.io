import DocTemplate from './[...slug]'
import { getDocProps } from '../../utils/docs/getDocProps'
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
