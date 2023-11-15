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
- [NextAuth](/docs/reference/self-hosted/auth-provider/authjs) for its [auth provider](/docs/reference/self-hosted/auth-providers/overview)

## Deploy The Starter Template

You can deploy the [self-hosted starter](https://github.com/tinacms/tina-self-hosted-demo) using our preconfigured Vercel template:

<!-- TODO: update url to point to `main` once https://github.com/tinacms/tina-self-hosted-demo/pull/110 is merged -->

<a target="_blank" href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo%2Ftree%2Fself-host&env=GITHUB_PERSONAL_ACCESS_TOKEN,NEXTAUTH_SECRET&amp;stores=%5B%7B%22type%22%3A%22kv%22%7D%5D"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

This will:

- Create a copy of the self-hosted starter [repository](https://github.com/tinacms/tina-self-hosted-demo) in your GitHub account
- Create a new Vercel project with the starter code
- Create a new Vercel KV store for the project

### Setup Vercel KV Store

In the initial Vercel project setup, you will be prompted to set up the Vercel KV store. Use the default `KV_` environment variables prefix.

### Setup Environment Variables

You will be prompted to enter values for the following environment variables:

#### `GITHUB_PERSONAL_ACCESS_TOKEN`

A GitHub personal access token can be generated in your [GitHub developer settings](https://github.com/settings/personal-access-tokens/new). Make sure to assign it `repo` access to the new repository with Read/Write access to Contents.

You may want to change the expiry date to longer than 30 days (max is 1 year).

![Github Auth Settings](https://res.cloudinary.com/forestry-demo/image/upload/c_thumb,w_1000,g_face/v1699036547/tina-io/docs/self-hosted/personal-access-token.png)

#### `NEXTAUTH_SECRET`

Random string used by NextAuth.js for JWT encryption.

Can be generated with the following command:

```shell
openssl rand -hex 16
```

### Test Deployment

At this point you should be able to see your deployed starter site. If you add `/admin` to the URL, you should be prompted to login. You can login with the **default username** of `admin` and **password** of `admin`. Once logged in you will be prompted to change your password.

![TinaCMS username and password](https://res.cloudinary.com/forestry-demo/image/upload/c_thumb,w_600,g_face/v1699559718/tina-io/docs/self-hosted/tina-login-screen.png)

## Adding Additional Users

Check out the [User management docs](/docs/self-hosted/user-management/) for information on how to add additional users.

> Note: when you're testing TinaCMS locally, you don't need to be logged in to access the CMS."

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

Use the same environment variables locally that you setup with the Vercel project earlier.
You will also need to add some environment variables that are applied automatically in Vercel for your [Vercel KV Store](https://vercel.com/dashboard/stores)

```env
# Github credentials for onPut and onDelete
GITHUB_PERSONAL_ACCESS_TOKEN=

# Required when building locally
GITHUB_OWNER=
GITHUB_REPO=
GITHUB_BRANCH=

# Used by NextAuth.js to encrypt JWT
NEXTAUTH_SECRET=changeme

# Used by Vercel KV (Can be found in the vercel dashboard)
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

### Run the Project Locally

```shell
yarn dev
```

You will be able to view your starter on http://localhost:3000. To edit content with TinaCMS go to http://localhost:3000/admin
