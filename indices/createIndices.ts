require('dotenv').config()

import algoliasearch from 'algoliasearch'
import fetchDocs from '../api/fetchDocs'
import fetchBlogs from '../api/fetchBlogs'

const MAX_BODY_LENGTH = 3000

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)
const index = client.initIndex('Tina-Docs-test')

fetchDocs().then(docs => {
  index
    .saveObjects(docs.map(mapContentToIndex))
    .then(({ objectIDs }) => {
      console.log(`created docs index: ${objectIDs}`)
    })
    .catch(err => {
      console.log(`failed creating docs index: ${err}`)
      throw err
    })
})

fetchBlogs().then(blogs => {
  index
    .saveObjects(blogs.map(mapContentToIndex))
    .then(({ objectIDs }) => {
      console.log(`created blogs index: ${objectIDs}`)
    })
    .catch(err => {
      console.error(`failed creating blogs index: ${err}`)
      throw err
    })
})

const mapContentToIndex = (
  obj: Partial<{ data: { slug: string }; content: string }>
) => {
  return {
    ...obj,
    content: (obj.content || '').substring(0, MAX_BODY_LENGTH),
    objectID: obj.data.slug,
  }
}
