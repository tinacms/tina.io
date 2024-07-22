---
id: /docs/reference/content-api/content-delivery
title: Content Delivery
last_edited: '2022-06-15T15:51:56.737Z'
prev: /docs/graphql/queries/add-document
next: /docs/reference/content-api/data-layer
---

Requests can be made to the Tina Content API with Read Only Tokens. In the majority of cases, these requests are made using the [Tina client](/docs/features/data-fetching/#making-requests-with-the-tina-client), however you can also hit the API directly.

## Making requests with `curl` and `fetch`

> NOTE: for most cases the tina client can be used and it is not necessary to use fetch directly

The Content API endpoint is `https://content.tinajs.io/<TinaGraphQLVersion>/content/<myClientId>/github/<myBranch>`. The token can be passed by including a `X-API-KEY` custom HTTP header with the token as the value.

Where `myClientId` is the client id of your project and `myBranch` is the branch you want to query.

`TinaGraphQLVersion` is the version of `@tinacms/graphql` you are using. You can find this by running `yarn list @tinacms/graphql` in your project. Use only the "major"."minor" values for the `TinaGraphQLVersion`. So, if using version `1.4.17`, the `TinaGraphQLVersion` would be `1.4`.

Here is an example curl request that will query the Content API for the list of collections:

### Curl

```bash
curl --location --request POST 'https://content.tinajs.io/<TinaGraphQLVersion>/content/<ClientId>/github/main' \
--header 'X-API-KEY: <Your API KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n        collections{\n            name\n        }\n}","variables":{}}'
```

### Fetch

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
  'https://content.tinajs.io/<TinaGraphQLVersion>/content/<ClientId>/github/main',
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error))
```
