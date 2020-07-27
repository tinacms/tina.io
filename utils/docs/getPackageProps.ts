import { getJsonPreviewProps, readJsonFile } from '../getJsonPreviewProps'
import axios from 'axios'
import toc from 'markdown-toc'

const atob = require('atob')

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
  const file = await readJsonFile('content/packages.json')

  interface GithubPackage {
    name: string
    link: string
  }

  var currentPackage: GithubPackage
  var previousPackage, nextPackage: GithubPackage | null

  file.packages.forEach((element, index) => {
    if (element.name === slug) {
      currentPackage = element
      previousPackage = index > 0 ? file.packages[index - 1] : null
      nextPackage =
        index < file.packages.length - 1 ? file.packages[index + 1] : null
    }
  })

  const currentDoc = await axios.get(currentPackage.link)
  const content = b64DecodeUnicode(currentDoc.data.content)

  const previewProps = await getJsonPreviewProps(
    'content/toc-doc.json',
    preview,
    previewData
  )
  const docsNavData = previewProps.props.file.data

  return {
    revalidate: 24 * HOURS,
    props: {
      name: currentPackage.name,
      link: currentPackage.link,
      content,
      docsNav: docsNavData,
      tocItems: toc(content).content,
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
