import { getJsonPreviewProps, readJsonFile } from '../getJsonPreviewProps'
import axios from 'axios'
const atob = require('atob')
import { slugifyTocHeading } from './slugifyToc'
import algoliasearch from 'algoliasearch'
import { stripMarkdown } from '../../utils/blog_helpers'
import getTocContent from 'utils/getTocContent'

const MAX_BODY_LENGTH = 200

// @ts-ignore
const path = __non_webpack_require__('path')

const b64DecodeUnicode = (str: string) => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c: string) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

export async function getPackageProps(
  { preview, previewData }: any,
  slug: string
) {
  const navPreviewProps = await getJsonPreviewProps(
    'content/toc-doc.json',
    preview,
    previewData
  )
  const docsNavData = navPreviewProps.props.file.data

  let defaultProps = {
    docsNav: docsNavData,
  }

  const file = await readJsonFile(
    path.resolve(process.cwd(), './content/packages.json')
  )

  interface GithubPackage {
    name: string
    readme: string
    link: string
  }

  var currentPackage: GithubPackage
  var previousPackage, nextPackage: GithubPackage | null

  const packagePages = file.packages.filter((p: { readme?: any }) => p.readme)

  packagePages.forEach((element, index: number) => {
    if (element.name === slug) {
      currentPackage = element
      previousPackage = index > 0 ? packagePages[index - 1] : null
      nextPackage =
        index < packagePages.length - 1 ? packagePages[index + 1] : null
    }
  })

  if (!currentPackage) {
    return {
      props: {
        ...defaultProps,
        hasError: true,
        errorCode: 404,
      },
    }
  }

  const latestTag = await axios
    .get('https://api.github.com/repos/tinacms/tinacms/releases/latest')
    .then((res: any) => res.data.tag_name)
  const currentDoc = await axios.get(
    `${currentPackage.readme}?ref=${latestTag}`
  )

  const content = b64DecodeUnicode(currentDoc.data.content)

  if (process.env.VERCEL_GITHUB_COMMIT_REF === 'master' && !preview) {
    // this should only run when performing incremental SSG on prod

    updateSearchIndex({
      name: currentPackage.name,
      content: content,
    }).catch(e => {
      console.error(e)
    })
  }

  return {
    revalidate: 1 * HOURS,
    props: {
      ...defaultProps,
      name: currentPackage.name,
      readme: currentPackage.readme,
      link: currentPackage.link,
      content,
      tocItems: getTocContent(content, {
        slugify: slugifyTocHeading,
      }),
      nextPage: {
        slug: nextPackage?.name || null,
        title: nextPackage?.name || null,
      },
      prevPage: {
        slug: previousPackage?.name || null,
        title: previousPackage?.name || null,
      },
    },
  }
}

const MINUTES = 60 // seconds
const HOURS = 60 * MINUTES

const updateSearchIndex = async ({ name, content }) => {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )
  const index = client.initIndex('Tina-Package-Docs')
  let oldObject
  try {
    const objectResult = await index.findObject(hit => hit.objectID === name)
    oldObject = objectResult.object
  } catch (e) {
    oldObject = null
  }
  const strippedContent = stripH1(content || '')

  const newObject = {
    objectID: name,
    package: name,
    lastUpdated: Date.now(),
    excerpt: (await stripMarkdown(strippedContent)).substring(
      0,
      MAX_BODY_LENGTH
    ),
    content: await stripMarkdown(strippedContent),
  }

  if (shouldUpdate(oldObject, newObject)) {
    await index.saveObject(newObject)
  }
}

const stripH1 = content => {
  const captureH1 = /^#\s+.*\s*$/gm
  const result = captureH1.exec(content)
  if (!result) return content
  return content.substring(result[0].length)
}

const shouldUpdate = (oldObject, newObject) => {
  if (!oldObject) return true
  if (oldObject.content != newObject.content) return true
  if (oldObject.excerpt != newObject.excerpt) return true
}
