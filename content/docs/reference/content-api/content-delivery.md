---
title: Content Delivery
id: /docs/reference/content-api/content-delivery
last_edited: '2022-06-15T15:51:56.737Z'
---

Requests can be made to Tina Content API with Read Only Tokens. In the majority of cases, these requests are made using the [Tina client](/docs/features/data-fetching/#making-requests-with-the-tina-client), however you can also hit the API directly.

## Making requests with `curl` and `fetch`

> NOTE: for most cases the tina client can be used and it is not necessary to use fetch directly

The endpoint is `https://content.tinajs.io/content/<myClientId>/github/<myBranch>` and the token can be passed by including a `X-API-KEY` with the token as the value.

Here is an example curl request that will query the content API for the list of collections:

### Curl

```bash
curl --location --request POST 'https://content.tinajs.io/content/<ClientId>/github/main' \
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
  'https://content.tinajs.io/content/<ClientId>/github/main',
  requestOptions
)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error))
```
