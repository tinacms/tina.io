import DocTemplate from './[...slug]'
import matter from 'gray-matter'
import { readFile } from '../../utils/readFile'
import { getDocProps } from '../../utils/docs/getDocProps'

export async function unstable_getStaticProps(props) {
  return getDocProps(props, 'index')
}

export default DocTemplate
