---
title: Separate Content Repo
last_edited: '2023-01-24T10:00:00.000Z'
---

## Introduction

Tina supports sourcing content from a separate Git repo. With this approach you can continue to define your
Tina config in your "website repo", but documents will be saved elsewhere.

### Why?

You might want to do this for a variety of reasons, such as:

- To decouple your website code from your content files so your commit history isn't a mix of content updates and code updates
- To avoid having to give Tina Cloud write access to your website's code (only give access to your content repo)

<div class="short-code-warning">
  <div>
    <p>Throughout this guide we'll be referring to a "website repo" and a "content repo". The "website repo" is where your actual website is running, while the "content repo" is where you'll be storing your markdown content.</p>
  </div>

  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z" />
  </svg>
</div>

### Requirements

- You must have _both_ the "content repo" and the "website repo" checked out onto your local machine.
- You must provide the location of your content repo in your Tina config (more about that below).
- When making changes, you'll need to ensure you've pushed _both_ repos to Github, with the "content repo"
  changes first

## Create the website repository

We have deployed a basic starting "website repo", which you can clone to get started.

```sh
git clone git@github.com:tinacms/separate-website-repo.git
```

The "website repo" contains the NextJS site, and the .tina config.

## Create the content repository

To set up the "content repo", we'll start with a simple `.mdx` file:

```sh
mkdir -p ../demo-content-repo/content/pages && touch ../demo-content-repo/content/pages/home.mdx && echo "Hello" >> ../demo-content-repo/content/pages/home.mdx
```

This command created a folder (`demo-content-repo`) and added a single MDX file to it in the `content/pages` directory, we'll be using that directory for the `page` collection defined in the Tina config.

## Local Development

In the "website repo", install the project's dependencies

```sh
yarn install
```

Run the project locally:

```sh
yarn dev
```

## Visit the page in edit mode

Open [http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html)

From here you can add more fields to you content models in `.tina/config.js`. [Visit the docs](https://tina.io/docs/schema/) to learn more about content modeling.

## Deploying your content repo

Next we'll want to create a Tina Cloud project from our "content repo"

Initialize Git in your content repo and push it to Github. From there [connect to Tina Cloud](https://tina.io/docs/tina-cloud/dashboard/projects/)

Once that's done, [create a token](https://tina.io/docs/tina-cloud/dashboard/projects/#read-only-tokens) for the `main` branch, or use `*` to allow all branches.

Switch back to your "website repo" and set up an `.env` file to use when connecting to Tina Cloud:

```
cp .env.example .env
```

When you run `tinacms build`, it will use those credentials to connect to Tina Cloud rather than the local server:

```sh
yarn build
```

## Learn More

To learn more about Tina, take a look at the following resources:

- [Tina Docs](https://tina.io/docs)
- [Getting starter guide](https://tina.io/guides/tina-cloud/starter/overview/)

You can check out [Tina Github repository](https://github.com/tinacms/tinacms) - your feedback and contributions are welcome!
