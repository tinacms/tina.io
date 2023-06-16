---
title: Getting Started with Self-Hosting TinaCMS
id: /docs/self-hosted/getting-started
last_edited: '2023-02-01T04:00:00.000Z'
---

## Introduction

This doc will guide you through setting up our pre-configured self-hosted starter repository.

## Fork The Repo

Fork [the self-hosted repository](https://github.com/tinacms/tina-self-hosted-demo) into your GitHub account.

## Clone your repo locally

(Replace the URL with your newly forked repo)

```bash
git clone https://github.com/<YOUR_GITHUB_ACCOUNT>/tina-self-hosted-demo self-hosted-demo
```

## Local Development

Setup the .env file:

```
cp .env.example .env
```

We'll configure these values so that TinaCMS can run in your production environment shortly. For now let's continue on so we can test TinaCMS locally.

Install the project's dependencies:

```
yarn install
```

Run the project locally:

```
yarn dev
```

You will be able to view your starter on http://localhost:3000. To play around with TinaCMS and edit some content, you can go to http://localhost:3000/admin

### Configure environment for production

At this point, we're able to run the starter locally. Any changes that you make through TinaCMS modify the local markdown files.

When you get to the point of hosting this website, some extra configuration is needed.

Let's take a look at the .env file we created earlier:

```env
MONGODB_URI=***
GITHUB_OWNER=***
GITHUB_REPO=***
GITHUB_BRANCH=***
GITHUB_PERSONAL_ACCESS_TOKEN=***
TINA_PUBLIC_IS_LOCAL=true

# _optionally_ Use Tina Cloud for user authentication
NEXT_PUBLIC_TINA_CLIENT_ID=***
```

Here's a rundown of what each of these values do.

`MONGODB_URI` is the connection string to your MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get a free database.

`GITHUB_OWNER` is the owner of the repository you want to use for your content.

`GITHUB_REPO` is the name of the repository you want to use for your content.

`GIT_BRANCH` is the branch of the repository you want to use for your content.

`GITHUB_PERSONAL_ACCESS_TOKEN` is a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with `repo` access.

`TINA_PUBLIC_IS_LOCAL` is a flag that tells Tina to use the local filesystem as the backend.

`NEXT_PUBLIC_TINA_CLIENT_ID` (_optionally_ use Tina Cloud for auth) is the client id for your Tina Cloud application. You can create a Tina Cloud application [here](https://app.tina.io/projects/choose).
