require('dotenv').config()

import algoliasearch, { SearchIndex } from 'algoliasearch'
import { stripMarkdown } from '../utils/blog_helpers'
import fetchDocs from '../data-api/fetchDocs'
import { fetchRelevantBlogs as fetchBlogs } from '../data-api/fetchBlogs'
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
  try {
    const index = client.initIndex(indexName)
    const result = await index.saveObjects(data)
    console.log(
      `${indexName}: added/updated ${result.objectIDs.length} entries`
    )
    const numRemoved = await cleanupIndex(index, data)
    if (numRemoved > 0) {
      console.log(`${indexName}: removed ${numRemoved} entries`)
    }
  } catch (error) {
    console.log(error)
  }
}

const cleanupIndex = async (index: SearchIndex, currentData: any) => {
  let currentObjects: Set<string> = new Set()
  let objectsToDelete: Set<string> = new Set()
  let numRemoved = 0
  currentData.map(item => {
    currentObjects.add(item.objectID)
  })
  await index.browseObjects({
    batch: hits => {
      hits.forEach(hit => {
        if (!currentObjects.has(hit.objectID)) {
          objectsToDelete.add(hit.objectID)
        }
      })
    },
  })
  await Promise.all(
    Array.from(objectsToDelete).map(async objectID => {
      await index.deleteObject(objectID)
      numRemoved++
    })
  )
  return numRemoved
}

const createIndices = async () => {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  )
  const docs = await fetchDocs()
  await saveIndex(
    client,
    'Tina-Docs-Next',
    await Promise.all(docs.map(mapContentToIndex))
  )

  const blogs = await fetchBlogs()
  await saveIndex(
    client,
    'Tina-Blogs-Next',
    await Promise.all(blogs.map(mapContentToIndex))
  )

  const guides = await fetchGuides()
  await saveIndex(
    client,
    'Tina-Guides-Next',
    await Promise.all(guides.map(mapContentToIndex))
  )
}

createIndices()
  .then(() => {
    console.log('indices created')
  })
  .catch(e => {
    console.error(e)
    process.kill(1)
  })
