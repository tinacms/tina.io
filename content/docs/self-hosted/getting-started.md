---
title: Getting Started with Self-Hosting TinaCMS
id: /docs/self-hosted/getting-started
last_edited: '2023-07-07T04:00:00.000Z'
---

## Introduction

This doc will guide you through setting up our pre-configured self-hosted starter repository. This implementation uses our NextJS starter, Vercel KV for its data-storage, and NextAuth for its authentication.

## Deploy The Starter Template

Deploy the [the self-hosted starter](https://github.com/tinacms/tina-self-hosted-demo) using our preconfigured Vercel template:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo\&env=GITHUB_PERSONAL_ACCESS_TOKEN,GITHUB_BRANCH,NEXTAUTH_SECRET,KV_REST_API_JAMES_REST_API_URL,KV_REST_API_JAMES_REST_API_TOKEN,NEXTAUTH_CREDENTIALS_KEY\&envDescription=See%20the%20self-hosted%20demo%20README%20for%20more%20information\&envLink=https%3A%2F%2Fgithub.com%2Ftinacms%2Ftina-self-hosted-demo%2Fblob%2Fmain%2FREADME.md\&project-name=tina-self-hosted-demo\&repository-name=tina-self-hosted-demo\&stores=%5B%7B%22type%22%3A%22kv%22%7D%5D&)

### Setup KV Store

In the initial Vercel project setup. You will be prompted to setup your Vercel KV store in a few clicks. Use the default `KV_` environment variables prefix.

### Setup Environment Variables

You will be prompted to enter values for the following environment variables:

#### `GITHUB_PERSONAL_ACCESS_TOKEN`

GitHub personal access token generated in your [GitHub developer settings](https://github.com/settings/personal-access-tokens/new). Make sure to assign it `repo` access to your new repository with Read/Write access to Contents.

#### `GITHUB_BRANCH`

Branch name with your site's content (e.g: "main")

#### `NEXTAUTH_SECRET`

Random string used by NextAuth.js for JWT encryption

#### `NEXTAUTH_CREDENTIALS_KEY`

The key name to use for storing user credentials in the KV database (i.e. `tinacms_users`).

Click the Deploy button to finish deploying the site.

### Test Out Your New Deployment

At this point you'll be able to poke around with your new starter. If you add `/admin` to the URL, you'll see that you'll be prompted to login.

### Creating Your First User

When you first visit the sign in screen, you will be prompted to setup a user to login. Once the user is created, you will be redirected to login. Use the new account credentials to sign in and you will be redirected to TinaCMS.

## Local Development

### Clone the Repository

(Replace the URL with your newly forked repo)

```shell
git clone https://github.com/<YOUR_GITHUB_ACCOUNT>/tina-self-hosted-demo self-hosted-demo
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

You will be able to view your starter on http://localhost:3000. To play around with TinaCMS and edit some content, you can go to http://localhost:3000/admin

## Adding Additional Users

When you are testing TinaCMS locally, you don't need to be logged in to access the CMS.
When you navigate to /admin on your Vercel deployment, or if you run `yarn build` & `yarn start`, you will be required to login. If you want to add additional users or update a user's password, you can run the user management script:

```shell
yarn setup:users
```

If the KV\_REST\_API\_URL & KV\_REST\_API\_TOKEN variables are not set, you will be prompted for them the first time the script is executed. Once you have created a user with a password, they will be able to login to your production site, make changes, and have those updates persisted to your live site.
