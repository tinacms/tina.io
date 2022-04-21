---
title: Non-React-based SSG support
last_edited: '2022-04-21T10:00:00.000Z'
---

## Introduction

Tina's "contextual editing" features require a React-based site, however Tina can still be used in "CMS-only" mode edit content for non-React-based sites.

> ⚠️ **This support is still very much experimental**, and we hope to have a more streamlined onboarding in the future.

While this should work with any Markdown/JSON based site, this guide specifically refers to a Hugo project

## Tina Scaffolding Setup

To set up the Tina scaffolding in your Hugo project...

From within your Hugo root directory, run:

```bash
npx hygen init repo tinalabs/ssg-admin
```

Now we'll create the Node configuration, to run the GraphQL API locally.

Run:

```bash
touch package.json
```

Enter the following values into the newly generated package.json:

```json
{
  "name": "hugo-site",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "yarn tinacms server:start"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@tinacms/cli": "^0.60.11"
  }
}
```

Add the node_modules directory to the .gitignore

```bash
echo "node_modules/" >> .gitignore
```

Now you can install the new dependencies with

```bash
yarn install
```

Now let's test that the content API is running correctly by running

```bash
yarn dev
```

You should be able to browse the content API's dummy content, by going to:
`http://localhost:4001/altair`

![A Blog query returning our data in Altair GraphQL Client](/img/blog/altair-client-tina.png)

## Running the Tina admin:

Now, in a new tab, let's run the Tina admin locally with:

```bash
cd tina-admin
yarn install
yarn dev
```

From here, you should be able to edit your site's content from the editor. For help using the editor, [checkout our docs](https://tina.io/docs/using-tina-editor/)

**Note: To run this locally, you will need to be running the GraphQL server from the previous step**.

<img width="1150" alt="Screen Shot 2022-04-11 at 11 52 58 AM" src="https://user-images.githubusercontent.com/3323181/162766629-999d7d52-6822-4133-90e6-062c08153dec.png">

## Model your content

Out of the box, there is a content model created for a "dummy-post". You will want to check out Tina's [content modeling docs](https://tina.io/docs/schema/), so that you can edit the content that's used within your Hugo site.

## Deploying the admin

### Step 1) Push your repo to git

Push your repo up to git, along with its new Tina configuration.

### Step 2) Setup a Tina Cloud project

Read our [Tina Cloud docs](https://tina.io/docs/tina-cloud/) for help creating a Tina Cloud project

### Step 3) Connect the project ID

In `/tina-admin/src/App.tsx`, set the following properties:

```ts
const clientId = '<YOUR-TINA-PROJECT-ID-GOES-HERE>'
const branch = '<YOUR-BRANCH-HERE>'
```

where `<YOUR-TINA-PROJECT-ID-GOES-HERE>` is replaced by your client-id from your new Tina Cloud project.

### Step 4) Build the admin for prod

Build the site locally with

```bash
  cd tina-admin && yarn build
```

This will output Tina's static admin page to the site's static directory.

Once that is built, push everything up to git (including the newly built admin)

### Step 5) Edit in production

When everything has redeployed, you should be able to enter edit-mode at:
`<your-site-url>/admin`

\_\_Note: Anytime your admin is updated, (E.g, by changing the clientId or branch), you will need to rebuild it locally and re-push it to git).
