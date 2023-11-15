---
id: '/docs/reference/self-hosted/authentication-provider/authjs'
title: Auth.js Authentication Provider
prev: '/docs/reference/self-hosted/authentication-provider/overview'
next: '/docs/reference/self-hosted/authentication-provider/tina-cloud'
---

The Auth.js Auth Provider allows you to use [Auth.js](https://authjs.dev/) to authenticate users with your TinaCMS instance.

## Getting Started

> Note: If you have not set up self-hosting yet, we recommend using the `init backend` command. See the [Getting started doc](/docs/self-hosted/existing-site/) for more information.

To get started you will need to install the following dependencies:

```bash
yarn add next-auth tinacms-authjs
```

> Hint: Make sure you have a [database adapter](/docs/reference/self-hosted/database-adapter/overview/) setup before continuing.

### Update Your Tina Config

We need to add the Auth Provider and a user collection to the `tina/config.{ts,js}` file.

The `TinaUserCollection` is a special collection that is used to store user information. This collection will be seeded from the`content/users/index.json` file, but the file will not be updated when the users collection is updated. This prevents sensitive information such as passwords from being written to the Git repository.

```ts
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

// ...

export default defineConfig({
  // When isLocal is true, the CMS will not require authentication
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  schema: {
    collections: [
      TinaUserCollection,
      // ...
    ],
  },
})
```

### Add Seed Data

Create a file called `content/users/index.json` that contains the initial seed user:

```json
{
  "users": [
    {
      "name": "Tina User",
      "email": "user@tina.io",
      "username": "admin",
      "password": "admin"
    }
  ]
}
```

> After logging in, you can update the username and password

### Update Tina Backend

Update your `/api/tina/[...routes].{ts,js}` file to use the Auth.js backend.

```ts
import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'

import { TinaAuthJSOptions, AuthJsBackendAuthentication } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : AuthJsBackendAuthentication({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
        }),
      }),
  databaseClient,
})

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res)
}
```

## Testing

<!-- TODO: Maybe a short video for this section -->

Now that you have set up the Auth.js auth provider you can test it out.

### Testing Authentication Locally

Add the following to your script to your package.json file.

```json
"dev:prod": "TINA_PUBLIC_IS_LOCAL=false tinacms dev -c \"next dev\"",
```

This will allow you to test the authentication flow locally.

```bash
yarn dev:prod
```

Now you can open your browser and navigate to `http://localhost:3000/admin/index.html` and you should be redirected to the login page.

### Updating Your Password

Once you have logged in, you will be prompted to update your password. This should be done so that the password is not stored in plain text in your repository.

### Managing users

To add additional users, navigate to the Users collection in the sidebar to add or edit users. See [User Management](/docs/self-hosted/user-management/) for more details.
