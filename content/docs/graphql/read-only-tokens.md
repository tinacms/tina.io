---
title: Read Only Tokens
last_edited: '2021-11-06T18:00:00.000Z'
---
{{ WarningCallout text="This is an experimental feature and may be slow as we work on performance improvements" }}

Read only tokens allow data fetching at runtime without the need for the local graphQL server. Some use cases might include the following.


- Runtime server side logic in `getServerSideProps`, `getStaticProps` (when fallback is not `false`), etc.
- [Incremental Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Server components](https://nextjs.org/docs/advanced-features/react-18#react-server-components)
- [Nextjs middleware](https://nextjs.org/docs/middleware)
- Client side data fetching
- Future support for server side frameworks like [remix](https://remix.run/)

In all of these use cases we can no longer rely static content but need a way to fetch data in real-time without being authenticated.

## How to use Read Only Tokens

### Generate them from the dashboard

Navigate to [Tina Cloud](https:app.tina.io) and click on the project you wish to add a token to, click on the "tokens" tab
![](/img/graphql-docs/token-tab.png)

Next, click "New Token" and fill out fields. The token name is how you can identify the token and "Git branches" is the list of branches separated by commas that the token has assess too. 

![](/img/graphql-docs/create-new-token.png)


Finally, click "Create Token".

![](/img/graphql-docs/final-token-page.png)


### Make a fetch request using the API key 

Now you can make a POST request to the content API with the desired GraphQL request.

The endpoint is `https://content.tinajs.io/content/<myClientId>/github/<myBranch>` and the token can be passed by including a `X-API-KEY` with the token as the value.

Here is an example curl command that will query the content API for the list of collections.

#### Curl
```bash
curl --location --request POST 'https://content.tinajs.io/content/<ClientId>/github/main' \
--header 'X-API-KEY: 5f47d1d1c89755aba3b54684dd25f580ec6bb0d3' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"{\n        getCollections{\n            name\n        }\n}","variables":{}}'
```
#### Fetch
```js
var myHeaders = new Headers();
myHeaders.append("X-API-KEY", "5f47d1d1c89755aba3b54684dd25f580ec6bb0d3");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "{\n        getCollections{\n            name\n        }\n}",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://content.tinajs.io/content/<ClientId>/github/main", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

