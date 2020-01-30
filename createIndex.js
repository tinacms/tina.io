require('dotenv').config()

const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)
const index = client.initIndex('Tina-Docs-test')

const objects = [
  {
    objectID: 1,
    name: 'Foo',
  },
]

index
  .saveObjects(objects)
  .then(({ objectIDs }) => {
    console.log(objectIDs)
  })
  .catch(err => {
    console.log(err)
  })
