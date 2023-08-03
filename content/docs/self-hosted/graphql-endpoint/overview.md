---
title: Hosting the GraphQL Endpoint
id: '/docs/self-hosted/graphql-endpoint/overview'
---

The GraphQL endpoint is used when an Editor switches to edit mode to edit the content of the site. It is responsible for passing GraphQL queries to the backend and returning the results. The endpoint should also ensure that the user is authenticated.


## Configuration

You need to create an endpoint that can handle post requests. In this example we will use Next.js api routes, but you can use any framework you want.

```js
// pages/api/graphql.js
import { NextApiHandler } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export default nextApiHandler
```

## Authentication

We need to add authentication to the endpoint so that only editors can access it. For more information on authentication see the [Authentication Provider docs](/docs/self-hosted/authentication-provider/overview)


Depending on the authentication provider, the code may look a bit different, but in general it will look something like this:

```js
// pages/api/graphql.js
import { NextApiHandler } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Your custom authentication function
  const isAuthenticated = await authenticate({token: req.headers.authorization});
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export defualt nextApiHandler
```

Next Make sure to update your TinaCMS config to use the new endpoint.

```js
// tina/config.{js,ts}

export default defineConfig({
  // This is the url to your graphql endpoint
  contentApiUrlOverride: '/api/gql',
  //...
})
```
