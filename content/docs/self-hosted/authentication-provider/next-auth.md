---
id: '/docs/self-hosted/authentication-provider/next-auth'
title: NextAuth Authentication Provider
prev: '/docs/self-hosted/authentication-provider/overview'
next: '/docs/self-hosted/authentication-provider/tina-cloud'
---

> Note: NextAuth requires using Next.js if you are using a differnt framework you will need to use a different authentication provider.

The NextAuth Authentication Provider allows you to use [NextAuth.js](https://next-auth.js.org/) to authenticate users with your TinaCMS instance.

## Getting Started

To get started you will need to install the following dependencies:

```bash
yarn add next-auth next-auth-tinacms
```

## Setup

NextAuth requires a databse to store user and session data. This provider uses [vercel KV]() to presist users. If you have not already, you will need to setup a Vercel DB database.

Once you have done that you can copy the environment variables from the Vercel dashboard.

![Vercel Dashboard](https://res.cloudinary.com/forestry-demo/image/upload/v1690998148/tina-io/docs/self-hosted/Screenshot_2023-08-02_at_1.29.58_PM.png)

Then add the following environment variables to your project:

```env
KV_URL="redis://***"
KV_REST_API_URL="********"
KV_REST_API_TOKEN="********"
KV_REST_API_READ_ONLY_TOKEN="********"
NEXTAUTH_CREDENTIALS_KEY=tinacms_users
```

## Setup NextAuth

Create a file called `tina/auth.{ts,js}` this will contain your NextAuth configuration.

```ts
import { RedisUserStore, TinaCredentialsProvider } from "tinacms-next-auth";

const {
  NEXTAUTH_CREDENTIALS_KEY: authCollectionName = "tinacms_users",
  NEXTAUTH_SECRET: secret,
  KV_REST_API_URL: url = "missing-url",
  KV_REST_API_TOKEN: token = "missing-token",
} = process.env;

const userStore = new RedisUserStore(authCollectionName, { url, token });
const authOptions = {
  pages: {
    error: "/auth/signin", // Error code passed in query string as ?error=
    signIn: "/auth/signin",
  },
  secret,
  providers: [
    TinaCredentialsProvider({ name: "VercelKVCredentialsProvider", userStore }),
  ],
};

export { authOptions, userStore };
```

## Create a NextAuth API Route

Create a new file at `pages/api/auth/[...nextauth].ts` and add the following:

```ts
import NextAuth from "next-auth";
import { authOptions } from "../../../tina/auth";

export default NextAuth(authOptions);
```

Create a file called `pages/api/credentials/register.{ts,js}`

```ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { userStore } from "../../../tina/auth";

export default async function handler(req, res) {
  const { username, password } = req.body;
  if (req.method === "POST") {
    if (!username || !password) {
      res.status(400).json({ message: "Missing username or password" });
    } else {
      try {
        const success = await userStore.addUser(username, password);
        if (success) {
          res.status(200).json({ message: "User added" });
        } else {
          res.status(400).json({ message: "User already exists" });
        }
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    res.status(400).json({ message: "Invalid request" });
  }
}
```


## Create a Signin and Register Page

`pages/auth/signin.{tsx,js}`
```ts
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken } from "next-auth/react"
import { Redis } from "@upstash/redis"

export default function SignIn({ csrfToken, error, userSetupRequired }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (userSetupRequired) {
    return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            <div>User setup required. Click <a href={'/auth/register'} className={"text-blue-700"}>here</a> to add your first user.</div>
          </div>
        </div>
      </div>
    )
  }
  return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
      >
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            {error && (
              <div className="bg-red-500 text-white rounded-md p-3">
                Sign In Failed [{error}]
              </div>
            )}
          </div>
          <form className="p-4 md:p-5 lg:p-6" method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="grid gap-y-3">
              <input
                name="username"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                placeholder="jsmith"
              />
              <input
                name="password"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                type="password"
              />
              <button
                className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userSetupRequired = false
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN && process.env.NEXTAUTH_CREDENTIALS_KEY) {
    const kv = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
    const users = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY)
    if (!users || Object.keys(users).length === 0) {
      userSetupRequired = true
    }
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: context.query?.error || '',
      userSetupRequired
    },
  }
}
```

`pages/auth/register.{tsx,js}`

```ts
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getCsrfToken } from "next-auth/react"
import { Redis } from "@upstash/redis"

export default function SignIn({ csrfToken, error, userSetupRequired }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (userSetupRequired) {
    return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            <div>User setup required. Click <a href={'/auth/register'} className={"text-blue-700"}>here</a> to add your first user.</div>
          </div>
        </div>
      </div>
    )
  }
  return (
      <div
        className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium"
      >
        <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="../tina.svg" alt="TinaCMS Logo" height={100} width={72}/>
            {error && (
              <div className="bg-red-500 text-white rounded-md p-3">
                Sign In Failed [{error}]
              </div>
            )}
          </div>
          <form className="p-4 md:p-5 lg:p-6" method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="grid gap-y-3">
              <input
                name="username"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                placeholder="jsmith"
              />
              <input
                name="password"
                className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                type="password"
              />
              <button
                className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let userSetupRequired = false
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN && process.env.NEXTAUTH_CREDENTIALS_KEY) {
    const kv = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
    const users = await kv.json.get(process.env.NEXTAUTH_CREDENTIALS_KEY)
    if (!users || Object.keys(users).length === 0) {
      userSetupRequired = true
    }
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: context.query?.error || '',
      userSetupRequired
    },
  }
}

```




## Update your Tina Config

Add the following to your `tina/config.{ts.js}` file

```ts
import { createTinaNextAuthHandler } from "tinacms-next-auth/dist/tinacms";

export default defineConfig({
  //...
  contentApiUrlOverride: "/api/gql",
  admin: {
      auth: {
        useLocalAuth: isLocal,
        customAuth: !isLocal,
        ...createTinaNextAuthHandler({
          callbackUrl: "/admin/index.html",
          isLocalDevelopment: isLocal,
          name: "VercelKVCredentialsProvider",
        }),
      },
  }
  //...
})
```


## Protect your GraphQL API endpoint

Add the following to your `pages/api/gql.ts` file

```ts
import { NextApiHandler } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";
import { withNextAuthApiRoute } from "tinacms-next-auth";
import { authOptions } from "../../tina/auth";

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export default withNextAuthApiRoute(nextApiHandler, {
  authOptions,
  isLocalDevelopment: process.env.TINA_PUBLIC_IS_LOCAL === "true",
});
```


## Testing the authentiation flow locally

To test the athentication flow locally you will need to set the following environment variables:

```bash
TINA_PUBLIC_IS_LOCAL=false
```

This will enable the authentication flow to use the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables to connect to your Upstash database.

you can start the dev server by running:

```bash
yarn dev
```


## Managing users

The first time you run the authentication flow you will be redirected to the `/auth/register` page. This page will allow you to add your first user. Once you have added your first user you  not be able to add anymore users via the UI. You can add them by running our local CLI that will allow you to add users to your database.

```bash
npx tinacms-next-auth setup
```

This will allow you to add and delete users.
