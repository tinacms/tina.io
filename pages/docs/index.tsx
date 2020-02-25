import DocTemplate, { getDocProps } from './[...slug]'
import matter from 'gray-matter'
import { readFile } from '../../utils/readFile'

export async function unstable_getStaticProps(props) {
  return getDocProps(props, 'index')
}

export default DocTemplate
