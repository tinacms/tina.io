---
title: Incrementally migrating to NextJS + Tina
last_edited: '2022-04-21T10:00:00.000Z'
---

## Introduction

To leverage Tina's "contextual editing" features, some sites may look to migrate to NextJS from more static SSG's like Hugo or Jekyll. This can be done incrementally, using [NextJS's rewrites](https://nextjs.org/docs/migrating/incremental-adoption#rewrites).

> If you want to first test this out on a minimal site, you can quicky setup a [Hugo site here](https://gohugo.io/getting-started/quick-start/).

We will refer to our starting site as our "Hugo" site, however the same principals apply regardless if its Hugo, Jekyll, Vue, 11ty, Gridsome, etc.

## Tina Scaffolding Setup

To set up the NextJS in your Hugo project...

From within your Hugo root directory, run:

```bash
npm install next react react-dom
# or
yarn add next react react-dom
```

We'll need to create our Next project's page directory

```bash
mkdir ./pages
```

Now we'll initialize Tina

```bash
npx @tinacms/cli@latest init
```

Add the node_modules & .next directories to the .gitignore

```bash
echo "node_modules/" >> .gitignore
echo ".next/" >> .gitignore
```

Now let's test that the content API is running correctly by running

```bash
yarn dev
```

You should be able to navigate to the Tina admin, by going to:
[http://localhost:3000/admin](http://localhost:3000/admin)

From here, you should be able to edit your site's content from the editor. For help using the editor, [checkout our docs](https://tina.io/docs/using-tina-editor/)

<img width="1150" alt="Screen Shot 2022-04-11 at 11 52 58 AM" src="https://user-images.githubusercontent.com/3323181/162766629-999d7d52-6822-4133-90e6-062c08153dec.png">

## Model your content

Out of the box, there is a content model created for a "dummy-post". You will want to check out Tina's [content modeling docs](https://tina.io/docs/schema/), so that you can edit the content that's used within your Hugo site.

## Deploying the admin

### Step 1) Push your repo to git

Push your repo up to git, along with its new Tina configuration.

### Step 2) Setup a Tina Cloud project

Read our [Tina Cloud docs](https://tina.io/docs/tina-cloud/) for help creating a Tina Cloud project

### Step 3) Configure the branch

In your project's `.tina/schema.ts` file, set the branch that you are using with Tina:

```diff
- const branch = "main";
+ const branch = <YOUR BRANCH GOES HERE>;
```

### Step 4) Create a separate deployment for your Next+Tina project

Your Hugo project will continue to be built with your original deployment pipeline, but we will setup a separate deployment for our Next+Tina project.

You can do so with Vercel [here](https://vercel.com/new)

In Vercel, during setup, you will want to add the following environment variable:

```
NEXT_PUBLIC_TINA_CLIENT_ID=<YOUR TINA CLIENT ID GOES HERE>
```

### Step 5) Edit in production

When everything has redeployed, you should be able to enter edit-mode at:
`<your-vercel-site-url>/admin`

> Note: Anytime your admin is updated, (E.g, by changing the clientId or branch), you will need to rebuild it locally and re-push it to git).

## Creating a unified site (Optional)

If you followed the above steps, you should have separate projects for your Next pages (including the admin), and a separate project for your Hugo pages. You can move towards making all pages accessible under the same URL using Next's rewrites.

Add the following `next.config.js` file to your project:

```js
// next.config.js

module.exports = {
  async rewrites() {
    return {
      // This first checks agsinst all generated Next.js pages // and proxies any other requests against our legacy site
      fallback: [
        {
          source: '/:path*',
          destination: `https://<YOUR HUGO DEPLOYMENT HERE>/:path*/`,
        },
      ],
    }
  },
}
```

Make sure to replace `<YOUR HUGO DEPLOYMENT HERE>` in the above snippet with your Hugo site's URL

> For more information on Next's rewrites, see [here](https://nextjs.org/docs/migrating/incremental-adoption#rewrites)

Now, once you push and everything is redeployed, you should be able to access all your legacy pages, your Next pages (including the Tina admin) all through your new Vercel project's URL.

## Next steps: (we want your feedback!)

Non-React-based SSG support is still experimental, so we would love to hear your early feedback.

You can reach out to us in the chat bubble, or in our [Community Discord](https://discord.com/invite/zumN63Ybpf)
