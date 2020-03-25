import DocTemplate from './[...slug]'
import { getDocProps } from '../../utils/docs/getDocProps'
import { GetStaticProps } from 'next'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'

export const getStaticProps: GetStaticProps = async function(props) {
  try {
    return await getDocProps(props, 'index')
  } catch (e) {
    if (e instanceof OpenAuthoringError) {
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
