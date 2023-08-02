---
title: Hosting the GraphQL Endpoint
id: '/docs/self-hosted/graphql-endpoint/overview'
---

The graphQL endpoint it was it used when a Edior goes into admin mode and starts to edit the content of the site. It is responsible passing graphQL queries to the backend, returning the results and ensuring that the user is authenticated.


## Configuration

You need to create a endpoint that can handle post requests. In this example we will use next.js api routes but you can use any framework you want.

```js
// pages/api/graphql.js
import { NextApiHandler } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export defualt nextApiHandler
```

## Authentication

We need to add authentication to the endpoint so that only editors can access it. For more info on authentication see [Authentication Provider docs](/docs/self-hosted/authentication-provider/overview)


Depending on the authentication provider the code will look a bit differnt but in general it will look something like this.

```js
// pages/api/graphql.js
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
