import GuideTemplate from './[category]/[guide]/[step]'
import { getGuideNavProps } from '../../utils/guide_helpers'
import { readMarkdownFile } from '../../utils/getMarkdownFile'

export default GuideTemplate

export const getStaticProps = async () => {
  const path = require('path')
  return {
    props: {
      slug: '/guides',
      currentGuide: null,
      markdownFile: await readMarkdownFile(
        path.resolve('./content/guides/index.md')
      ),
      allGuides: await getGuideNavProps(),
    },
  }
}
