---
title: Using the Next.js Vercel Example
id: /docs/self-hosted/starters/nextjs-vercel
last_edited: '2023-07-07T04:00:00.000Z'
next: /docs/self-hosted/existing-site
---

## Introduction

This doc will guide you through setting up our pre-configured self-hosted example repository. This implementation uses:

- [NextJS](https://nextjs.org/)
- [Vercel](/docs/reference/self-hosted/database-adapters/vercel-kv) KV for the [database adapter](/docs/reference/self-hosted/database-adapters/overview)
- [NextAuth](/docs/reference/self-hosted/authentication-provider/authjs) for its [auth provider](/docs/reference/self-hosted/authentication-providers/overview)

## Deploy The Starter Template

You can deploy the [the self-hosted starter](https://github.com/tinacms/tina-self-hosted-demo) using our preconfigured Vercel template:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo&env=GITHUB_PERSONAL_ACCESS_TOKEN,GITHUB_BRANCH,NEXTAUTH_SECRET,KV_REST_API_JAMES_REST_API_URL,KV_REST_API_JAMES_REST_API_TOKEN,NEXTAUTH_CREDENTIALS_KEY&envDescription=See%20the%20self-hosted%20demo%20README%20for%20more%20information&envLink=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo%2Fblob%2Fmain%2FREADME.md&project-name=tina-self-hosted-demo&repository-name=tina-self-hosted-demo&stores=%5B%7B%22type%22%3A%22kv%22%7D%5D&)

This will:

- Create a copy of the self-hosted starter [repository](https://github.com/tinacms/tina-self-hosted-demo) in your GitHub account
- Create a new Vercel project with the starter code
- Create a new Vercel KV store for the project

### Setup KV Store

In the initial Vercel project setup, you will be prompted to setup the Vercel KV store. Use the default `KV_` environment variables prefix.

### Setup Environment Variables

You will be prompted to enter values for the following environment variables:

#### `GITHUB_PERSONAL_ACCESS_TOKEN`

A GitHub personal access token can be generated in your [GitHub developer settings](https://github.com/settings/personal-access-tokens/new). Make sure to assign it `repo` access to the new repository with Read/Write access to Contents.

![Github Auth Settings](https://res.cloudinary.com/forestry-demo/image/upload/c_thumb,w_1000,g_face/v1699036547/tina-io/docs/self-hosted/personal-access-token.png)

#### `NEXTAUTH_SECRET`

Random string used by NextAuth.js for JWT encryption

### Test Deployment

At this point you'll be able to poke around with your new starter. If you add `/admin` to the URL, you should be prompted to login.

## Local Development

### Clone the Repository

(Replace the URL with your newly forked repo)

```shell
git clone <YourGitUrl>
```

Install the project's dependencies:

```shell
yarn install
```

### Configure the Development Environment

Setup the .env file:

```shell
cp .env.example .env
```

Use the same values locally that you setup with the Vercel project earlier.
You will also need to add some environment variables that are applied automatically in Vercel for your Vercel KV Store.

```env
# These can be found in your Vercel KV store settings.
KV_REST_API_URL="https://<REPLACE-THIS-VALUE>.kv.vercel-storage.com"
KV_REST_API_TOKEN="<REPLACE-THIS-VALUE>"

```

### Run the Project Locally

```shell
yarn dev
```

You will be able to view your starter on http://localhost:3000. To edit content with TinaCMS go to http://localhost:3000/admin

## Adding Additional Users

When you are testing TinaCMS locally, you don't need to be logged in to access the CMS.
If you visit \<Your Production URL\>/admin, or if you run `yarn build` & `yarn start`, you will be required to login. Check out the [User management docs](/docs/self-hosted/user-management/) for information on how to add additional users.
