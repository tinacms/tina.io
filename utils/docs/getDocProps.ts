import { getJsonFile } from '../getJsonPreviewProps'

export async function getDocsNav(preview?: boolean, previewData?: any) {
  return getJsonFile('content/toc-doc.json', preview, previewData)
}