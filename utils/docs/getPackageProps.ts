import { getJsonPreviewProps, readJsonFile } from '../getJsonPreviewProps'
import axios from 'axios'
import toc from 'markdown-toc'

const atob = require('atob')
import { slugifyTocHeading } from './slugifyToc'

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

  const packagePages = file.packages.filter( (p: { readme?: any }) => p.readme )

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

  const currentDoc = await axios.get(currentPackage.readme)

  const content = b64DecodeUnicode(currentDoc.data.content)

  return {
    revalidate: 24 * HOURS,
    props: {
      ...defaultProps,
      name: currentPackage.name,
      readme: currentPackage.readme,
      link: currentPackage.link,
      content,
      tocItems: toc(content, {
        slugify: slugifyTocHeading,
      }).content,
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
