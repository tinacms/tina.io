require('dotenv').config()

import algoliasearch from 'algoliasearch'
import fetchDocs from '../api/fetchDocs'
import fetchBlogs from '../api/fetchBlogs'

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)
const index = client.initIndex('Tina-Docs-test')

fetchDocs().then(data => {
  index
    .saveObjects(data)
    .then(({ objectIDs }) => {
      console.log(`created docs index: ${objectIDs}`)
    })
    .catch(err => {
      console.log(`failed creating docs index: ${err}`)
    })
})

fetchBlogs().then(data => {
  index
    .saveObjects(data)
    .then(({ objectIDs }) => {
      console.log(`created blogs index: ${objectIDs}`)
    })
    .catch(err => {
      console.log(`failed creating blogs index: ${err}`)
    })
})
