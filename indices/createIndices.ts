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

const createIndices = async () => {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )
  const index = client.initIndex('Tina-Docs-test')

  const docs = await fetchDocs()
  index.saveObjects(docs.map(mapContentToIndex)).then(({ objectIDs }) => {
    console.log(`created docs index: ${objectIDs}`)
  })

  const blogs = await fetchBlogs()
  index.saveObjects(blogs.map(mapContentToIndex)).then(({ objectIDs }) => {
    console.log(`created blogs index: ${objectIDs}`)
  })
}

createIndices()
