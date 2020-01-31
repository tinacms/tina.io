require('dotenv').config()

import algoliasearch from 'algoliasearch'
import fetchDocs from './api/fetchDocs'

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)
const index = client.initIndex('Tina-Docs-test')

fetchDocs().then(data => {
  index
    .saveObjects(data)
    .then(({ objectIDs }) => {
      console.log(objectIDs)
    })
    .catch(err => {
      console.log(err)
    })
})
