require('dotenv').config()

import algoliasearch from 'algoliasearch'
import fetchDocs from '../api/fetchDocs'
import fetchBlogs from '../api/fetchBlogs'

const MAX_BODY_LENGTH = 3000

const mapContentToIndex = (
  obj: Partial<{ data: { slug: string }; content: string }>
) => {
  return {
    ...obj,
    content: (obj.content || '').substring(0, MAX_BODY_LENGTH),
    objectID: obj.data.slug,
  }
}

const saveIndex = async (client: any, indexName: string, data: any) => {
  const index = client.initIndex(indexName)
  const result = await index.saveObjects(index)
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
}

createIndices()
  .then(() => {
    console.log('indices created')
  })
  .catch(e => {
    console.error(e)
    process.kill(1)
  })
