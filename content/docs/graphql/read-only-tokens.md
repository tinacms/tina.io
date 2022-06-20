---
title: Read-only Tokens
last_edited: '2022-02-07T18:00:00.000Z'
---

{{ WarningCallout text="This is an experimental feature and may be slow as we work on performance improvements" }}

<br/>

{{ WarningCallout text="It is highly recommended to  [enable the data layer](/docs/tina-cloud/data-layer/#enabling-the-data-layer) to use this feature. Have any thoughts? Let us know in the chat, or through the [GitHub discussion](https://github.com/tinacms/tinacms/discussions/2811)!" }}

Read-only tokens provide read-only access to your project's content.

## How to use Read Only Tokens

### Generate tokens from the dashboard

Navigate to [Tina Cloud](https://app.tina.io) and click on the project you wish to add a token to, click on the "tokens" tab
![Tina cloud token tab](/img/graphql-docs/token-tab.png)

Next, click "New Token" and fill out fields. The token name is how you can identify the token and "Git branches" is the list of branches separated by commas that the token has assess too.

![Creating a new token in Tina Cloud](/img/graphql-docs/create-new-token.png)

Finally, click "Create Token".

![Successful creation of a token in Tina Cloud](/img/graphql-docs/final-token-page.png)

### Wild card matching

Wild card matching is supported in the branch names using '\*' to match anything. For example: `feat/*` will match `feat/foo` and `feat/bar`. If only `*` is entered it will match any branch.

Wild card matching is useful for matching branches that have not been created yet and can be used for editorial workflows.

### Making requests with the tina client

#### Setting up the Tina client

The Tina client can be used for data fetching with Tina. It can be used on the client and server to make graphQL requests.

Once your token has been generated through the [Tina dashboard](https://app.tina.io), it can added to the client

```diff
// .tina/client.ts
// ...

// Token generated on app.tina.io
export const client = createClient({
  // default values
  url: apiURL,
  + token: 'Your Read Only Token generated above',
})
```

#### Requesting data using Read only tokens

Now that the client is defined, we can use it to query our content.

```ts
import { client } from '../pathToTina/.tina/client'

const data = await client.request({ query: 'Your Graphql query' })
```

### Making requests with `curl` and `fetch`

> NOTE: for most cases the tina client can be used and it is not necessary to use fetch directly

If you do not want to use the Tina client, you can make a POST request directly to the content API.

The endpoint is `https://content.tinajs.io/content/<myClientId>/github/<myBranch>` and the token can be passed by including a `X-API-KEY` with the token as the value.

Here is an example curl request that will query the content API for the list of collections:

#### Curl

```bash
curl --location --request POST 'https://content.tinajs.io/content/<ClientId>/github/main' \
--header 'X-API-KEY: <Your API KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n        collections{\n            name\n        }\n}","variables":{}}'
```

#### Fetch

```js
var myHeaders = new Headers()
myHeaders.append('X-API-KEY', '5f47d1d1c89755aba3b54684dd25f580ec6bb0d3')
myHeaders.append('Content-Type', 'application/json')

var graphql = JSON.stringify({
  query: '{\n        collections{\n            name\n        }\n}',
  variables: {},
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow',
}

fetch(
  'https://content.tinajs.io/content/<ClientId>/github/main',
  requestOptions
)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error))
```

## Examples of using read-only tokens

### Fetch data client-side

> In most cases Static site generation is preferred and faster but in some cases you may still want to get data at runtime

```jsx
import { useState, useEffect } from 'react'
import { useTina } from 'tinacms/dist/edit-state'
import { client } from '../PathToTina/.tina/client'
// This query can be any query
const query = `
query ContentQuery($relativePath: String!) {
  <collection.name>(relativePath: $relativePath) {
    body
    title
  }
}
`

// Variables used in the GraphQL query;
const variables = {
  relativePath: 'HelloWorld.md',
}

export default function BlogPostPage() {
  const [initialData, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      const data = await client.request({ query, variables })
      setData(data?.data)
      setLoading(false)
    }
    fetchContent()
  }, [query, JSON.stringify(variables)])

  const { data } = useTina({ query, variables, data: initialData })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return <div>{JSON.stringify(data)}</div>
}
```

### Next.js `fallback: "blocking"`

In Next.js one can specify [`fallback: "blocking"`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking), this allows `getStaticProps` to run server-side at request time when a user goes to a page that was not specified in `getStaticPaths`.

With read-only tokens we can fetch the list of blog posts. This will allow us to visit pages that have been created but not statically generated.

#### Example page

```js
// pages/posts/[filename].{js,tsx}

import { client } from '../pathToTina/.tina/client'

const BlogPage = props => {
  // (Does not change)
  //...
}

export const getStaticProps = async ctx => {
  const query = `query Post($relativePath: String!) {
    post(relativePath: $relativePath) {
      title
      body
    }
  }
  `
  const variables = {
    relativePath: ctx.params.slug + '.md',
  }
  let data
  try {
    // This will use the URL that was passed to the client
    const res = await client.request({
      query,
      variables,
    })
    data = res?.data
  } catch (error) {
    // swallow errors related to document creation
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
      query,
      variables,
    },
  }
}

export const getStaticPaths = async () => {
  //... Same as before
  return {
    paths,
    fallback: 'blocking',
  }
}

export default BlogPage
```
