---
title: Tina Cloud Authentication Provider
id: '/docs/self-hosted/authentication-provider/tina-cloud'
prev: '/docs/self-hosted/authentication-provider/next-auth'
next: '/docs/self-hosted/authentication-provider/bring-your-own'
---

You can use Tina Cloud for your authenticaion. This is the easiet way to get up and running quickly.

If you have not alreay you can [create a tina cloud account](app.tina.io) and create a new project.

Once you have created a project you will need to add the following environment variables to your project:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=***
```

## Configure the authentication provider

Since we are using Tina Cloud no extra setup is required.

`tina/config.{ts,js}`
```ts
//...
export defualt defineConfig({
  // Make sure this is set to point to your graphql endpoint
  contentApiUrlOverride: "/api/gql",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  //...
  admin: {
    auth: {
      useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === "true",
    },
  },
})
```

## Protecting routes

Update your graphql endpoint to look like the following

`/pages/api/gql.{ts,js}`
```ts
import { NextApiHandler } from "next";
import { isUserAuthorized } from "@tinacms/auth";
import databaseClient from "../../tina/__generated__/databaseClient";

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Example if using TinaCloud for auth
  const tinaCloudUser = await isUserAuthorized({
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: req.headers.authorization,
  });

  const isAuthorized =
    process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
    tinaCloudUser?.verified ||
    false;

  if (isAuthorized) {
    const { query, variables } = req.body;
    const result = await databaseClient.request({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default nextApiHandler;
```
