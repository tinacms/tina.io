require('dotenv').config()

import algoliasearch from 'algoliasearch'
import fetchDocs from '../api/fetchDocs'
import fetchBlogs from '../api/fetchBlogs'

const MAX_BODY_LENGTH = 3000

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

fetchDocs().then(docs => {
  client
    .initIndex('Tina-Docs-test')
    .saveObjects(docs.map(mapContentToIndex))
    .then(() => {
      console.log(`created docs index`)
    })
    .catch(err => {
      console.log(`failed creating docs index: ${err}`)
    })
})

fetchBlogs().then(blogs => {
  client
    .initIndex('Tina-Blogs-test')
    .saveObjects(blogs.map(mapContentToIndex))
    .then(() => {
      console.log(`created blogs index`)
    })
    .catch(err => {
      console.log(`failed creating blogs index: ${err}`)
    })
})

const mapContentToIndex = ({
  content,
  ...obj
}: Partial<{ data: { slug: string }; content: string }>) => {
  return {
    ...obj.data,
    excerpt: (content || '').substring(0, MAX_BODY_LENGTH),
    objectID: obj.data.slug,
  }
}
