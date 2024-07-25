---
title: Next.js Pages Router
prev: /docs/frameworks/next/overview
---

> ☝️ This guide assumes you are using the **Next.js pages router.**

## Video Guide

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/0oYSzT1DDLg" title="TinaCMS - Setting up Next.js" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>

## Installing dependencies

From within your site's directory, run:

```bash
npx @tinacms/cli@latest init
```

This will ask you a few setup questions. When prompted for the **public assets directory**, enter: **public**.

## Updating your build scripts

`tina init` should have updated your `package.json` scripts.

```json
"scripts": {
  "dev": "tinacms dev -c \"next dev\"",
  "build": "tinacms build && next build",
  "start": "tinacms build && next start"
}
```

These should be applied manually if they haven't been set by the CLI.

## Starting TinaCMS

You can start TinaCMS with:

```bash
pnpm dev
```
**We recommend using pnpm.**

With TinaCMS running, navigate to `http://localhost:3000/admin/index.html`.

> ❓ Hint: If you are getting errors when running this command, please see the [Common Errors](/docs/forestry/common-errors) page.

At this point, you should be able to see the Tina admin, select a post, save changes, and see the changes persisted to your local markdown files.

![TinaCMS Admin Screenshot](/img/hugo-tina-admin-screenshot.png)

## TinaCMS Config file

After running the `tina init` command a few files were created to get you started as quick as possible. One of these is the `tina/config.ts` file. This is the a required config file that defines all the tina schemas.

It looks like the following:

```ts
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});

```

**For a more detailed overview about the config see [Content Modeling with TinaCMS](docs/extending-tina/overview/)**

> 💡 If you've followed this guide using the `tina  init` command, you might have noticed that a `content` and a `pages` folder got created:
>
> ```bash
> Adding file at content/posts/hello-world.md... ✅
> Adding file at pages/demo/blog/[filename].tsx... ✅
> ```
>
> These can be used as a quick reference but are safe to delete.

## Creating a New Post

> 💡 As defined in the `tina/config.ts` file we have 1 collection called `post` which will be picked up by TinaCMS and mapped to what you see in the TinaCMS Admin page.

1.Head over to `/admin/index.html`

2.Click on Posts

3.Click on Create

4.Enter required fields

5.Save

Now, let's go back and check what was created. You will see a `/content` folder with your new post saved as a `.md` file. This path is defined in the `tina/config.ts` files post collection!

```bash
content
    └── posts
        └── hello-world.md
```

## Rendering the Post Collection

Let's start by creating a `/posts` folder. The index here will list all our posts.

**File:** `pages/posts/index.tsx`

```tsx
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function PostList(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const postsList = data.postConnection.edges;
  return (
    <>
      <h1>Posts</h1>
      <div>
        {postsList.map((post) => (
          <div key={post.node.id}>
            <Link href={`/posts/${post.node._sys.filename}`}>
              {post.node._sys.filename}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.postConnection();

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
```

## Rendering a Single Post

**File:** `pages/posts/[slug].tsx`

```tsx
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <code>
        <pre
          style={{
            backgroundColor: "lightgray",
          }}
        >
          {JSON.stringify(data.post, null, 2)}
        </pre>
      </code>
    </>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.postConnection();
  const paths = data.postConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
```

## Next Steps

- [Check out the content modeling docs](/docs/schema/)
- [Learn how to query your content](/docs/features/data-fetching/)
- [Deploy Your Site](/docs/tina-cloud)

