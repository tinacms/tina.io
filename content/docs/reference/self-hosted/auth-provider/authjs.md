---
id: '/docs/reference/self-hosted/auth-provider/authjs'
title: Default (Auth.js) Auth Provider
prev: '/docs/reference/self-hosted/auth-provider/overview'
next: '/docs/reference/self-hosted/auth-provider/tina-cloud'
---

The default (Auth.js) auth provider uses [Auth.js](https://authjs.dev/) and a user collection to authenticate and authorize users to your TinaCMS instance.

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
import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'

import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
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

## Updating Your Password

Once you have logged in, you will be prompted to update your password. This should be done so that the password is not stored in plain text in your repository.

## Managing users

To add additional users, navigate to the Users collection in the sidebar to add or edit users. See [User Management](/docs/self-hosted/user-management/) for more details.

## Configuring other Auth.js Login Providers

Auth.js supports many different [login providers](https://authjs.dev/getting-started/providers). When self-hosting, it is possible to use
any of these providers with some configuration changes. The user collection will still be used for authorization, but the login flow will be handled by the login provider.

As an example, we can configure the Discord OAuth login provider.

### Update Your Tina Config

Here we switch from the `UsernamePasswordAuthJSProvider` to the `DefaultAuthJSProvider`. We also redefine the user collection to remove the password field, as it is no longer needed.

```ts
import {
  TinaUserCollection,
  DefaultAuthJSProvider,
} from 'tinacms-authjs/dist/tinacms'

// ...

export default defineConfig({
  // When isLocal is true, the CMS will not require authentication
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new DefaultAuthJSProvider(),
  schema: {
    collections: [
      {
        ...TinaUserCollection,
        fields: [
          {
            ...TinaUserCollection.fields[0],
            fields: [
              {
                type: 'string',
                label: 'Username',
                name: 'username',
                uid: true,
                required: true,
              },
              {
                type: 'string',
                label: 'Name',
                name: 'name',
              },
              {
                type: 'string',
                label: 'Email',
                name: 'email',

              },
            ]
          }
        ]
      } as Collection,
      // ...
    ],
  },
})
```
### Update the seed data
Remove the password field from the seed data.

```json
{
  "users": [
    {
      "name": "Tina Discord User",
      "email": "user@tina.io",
      "username": "mydiscorduser"
    }
  ]
}
```
> Note that if you already have users in your database, you will need to remove the password field from them as well.

### Configure the Discord Login Provider

We'll need to split the backend into a separate endpoint, and share the AuthJS options between the two. So in `/pages/api/tina/[...routes].{ts,js}` we'll have:

```ts
export const NextAuthOptions = TinaAuthJSOptions({
  databaseClient: databaseClient,
  debug: process.env.DEBUG === 'true',
  secret: process.env.NEXTAUTH_SECRET,
  uidProp: 'name',
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  ]
})

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({ authOptions: NextAuthOptions }),
  databaseClient,
})

export default (req, res) => {
  return handler(req, res)
}
```
Here we specify the DiscordProvider. Also, note that we have added a `uidProp` to the options. This is used to tell Tina which property on the Discord auth object has
the unique identifier for the user. If you are not sure what this should be, you can enable debug mode to see the auth object.

Next, we'll need to create a separate endpoint for the backend. In `/pages/api/auth/[...nextauth].{ts,js}` we'll have:

```ts
import NextAuth from 'next-auth'
import { NextAuthOptions } from "../tina/[...routes]";

export default (req, res) => {
  return NextAuth(NextAuthOptions)(req, res)
}
```
Note that this is importing the NextAuthOptions from the other endpoint.

### Configure the Discord OAuth Application

To configure the Discord OAuth application, you will need to create a new application in the [Discord Developer Portal](https://discord.com/developers/applications).

Once the application has been created, go to the OAuth2 tab and copy the Client ID and Client Secret. These will be used as environment variables. Add redirects for localhost `http://localhost:3000/api/auth/callback/discord` and your production domain.

Add the following environment variables:

```
DISCORD_CLIENT_ID=<your discord client id>
DISCORD_CLIENT_SECRET=<your discord client secret>
```

Run `yarn dev:prod` to test login locally.
