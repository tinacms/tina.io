require('dotenv').config()

import algoliasearch from 'algoliasearch'
import { stripMarkdown } from '../utils/blog_helpers'
import fetchDocs from '../data-api/fetchDocs'
import fetchBlogs from '../data-api/fetchBlogs'
import fetchGuides from '../data-api/fetchGuides'

const MAX_BODY_LENGTH = 200

const mapContentToIndex = async ({
  content,
  ...obj
}: Partial<{ data: { slug: string }; content: string }>) => {
  return {
    ...obj.data,
    excerpt: await stripMarkdown((content || '').substring(0, MAX_BODY_LENGTH)),
    objectID: obj.data.slug,
  }
}

const saveIndex = async (client: any, indexName: string, data: any) => {
  const index = client.initIndex(indexName)
  const result = await index.saveObjects(data)
  console.log(`updated ${indexName}: ${result.objectIDs}`)
}

const createIndices = async () => {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )
  const docs = await fetchDocs()
  await saveIndex(client, 'Tina-Docs-Next', docs.map(mapContentToIndex))

  const blogs = await fetchBlogs()
  await saveIndex(client, 'Tina-Blogs-Next', blogs.map(mapContentToIndex))

  const guides = await fetchGuides()
  await saveIndex(client, 'Tina-Guides-Next', guides.map(mapContentToIndex))
}

createIndices()
  .then(() => {
    console.log('indices created')
  })
  .catch(e => {
    console.error(e)
    process.kill(1)
  })
