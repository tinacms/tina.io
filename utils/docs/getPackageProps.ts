import { getJsonPreviewProps } from '../getJsonPreviewProps'
import { readMarkdownFile } from '../getMarkdownFile'
import path from 'path';
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import { formatExcerpt } from '..';
import fs from "fs"

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

export async function getPackageProps({ preview, previewData }: any, slug: string) {

    console.log("GETTING PACKAGE PROPS");
    

//   const currentDoc = (
//     await getMarkdownPreviewProps(
//       `content/docs/${slug}.md`,
//       preview,
//       previewData
//     )
//   ).props

    const filePath = path.join(process.cwd(), 'content/packages.json')
    const file = JSON.parse(fs.readFileSync(filePath, 'utf8'))

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
            nextPackage = index < file.packages.length - 1 ? file.packages[index + 1] : null
        }
    });

    const currentDoc = (
        await (await fetch(currentPackage.link)).json()
    )


    console.log(currentDoc);
    

    const content = b64DecodeUnicode(currentDoc.content)

    console.log(content);
    

  const previewProps = await getJsonPreviewProps(
    'content/toc-doc.json',
    preview,
    previewData
  )
  const docsNavData = previewProps.props.file.data

  return {
    props: {
      content,
      docsNav: docsNavData,
      nextPage: {
        slug: nextPackage.name || null,
        title: nextPackage.name|| null,
      },
      prevPage: {
        slug: previousPackage.name || null,
        title: previousPackage.name || null,
      },
    },
  }
}
