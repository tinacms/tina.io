---
title: Non-React-based SSG support
last_edited: '2022-04-21T10:00:00.000Z'
---

## Introduction

Tina's "contextual editing" features require a React-based site, however Tina can still be used in "CMS-only mode" to edit content for non-React-based sites.

## Getting Started

Most of this guide should apply to any Markdown/JSON-based site: E.g: Hugo, GatsbyJS, Astro, Jekyll, 11ty, Gridsome, etc.

We'll assume you're using Hugo for this example. If you don't have a Hugo site you started you can clone this [simple starter site](https://github.com/tinalabs/vanilla-hugo).

```bash,copy
git clone https://github.com/tinalabs/vanilla-hugo.git
cd vanilla-hugo
```

> Ensure you have Hugo [installed](https://gohugo.io/getting-started/installing/) on your machine!

Run the Hugo dev server

```bash,copy
hugo server -D -p 3003
```

Visit [http://localhost:3003](http://localhost:3003) and you'll see a very plain website with no content:

![Vanilla Hugo site screenshot](/img/hugo-screenshot.png)

Now that we have a working Hugo site, stop your server so we can add TinaCMS.

## Adding TinaCMS

You can initialize tina with the `init` command:

```bash,copy
 npx @tinacms/cli@latest init --static
```

The command will ask you a few questions which we'll go through one-by-one, once it's done you'll have everything you need to work with Tina:

- A `package.json`
- A TinaCMS configuration file at `.tina/config.js`. Here you can give TinaCMS instructions on how to handle your content.
- A markdown file at `content/posts/hello-world.md`. The frontmatter in this file will match the schema definition you'll find in `.tina/config.js`.

First it'll ask you to choose a package manager, let's choose `NPM`:

```bash
? Choose your package manager › - Use arrow-keys. Return to submit.
    PNPM
    Yarn
❯   NPM
```

And we'll opt in to using Typescript so errors in our config more clear:

```bash
? Would you like to use Typescript? › (Y/n)
```

Next it'll ask us where public assets should be stored. TinaCMS is installed as a static asset so it should be
deployed alongside other assets like images, stylesheets and javascript files. Since this is a [Hugo site](https://gohugo.io/content-management/static-files/), well enter "static".

```bash
? Where are public assets stored? (default: "public") › static
```

Once Tina finishes installing it's time to run your site. This command will start the TinaCMS dev server along with whatever
subprocess you give it, _this should be the dev command for your site_.

```bash,copy
npx tinacms dev -c "hugo server -D -p 3003"
```

Navigate to the TinaCMS dashboard, with the default configuration is will be [http://localhost:3003/admin](http://localhost:3003/admin)

From here you can navigate to the `Posts` collection and edit the markdown file provided.

> Depending on your framework you may need to append `index.html` to the URL. For Hugo, this isn't necessary.

![](/img/hugo-tina-admin-screenshot.png)

For Hugo sites, the default content initalized by Tina has some fields in common with Hugo's default [archetype](https://gohugo.io/content-management/archetypes/#readout)
so when you visit your homepage you should see content right away! Note that for other frameworks, or if your Hugo site is set up with different archetypes you'll need to
edit the `.tina/config.ts` "schema" property to match the shape of your content.

![](/img/hugo-tina-screenshot.png)

> You can edit the "Hello, World" blog post by visiting [http://localhost:3003/admin/post/hello-world](http://localhost:3003/admin/post/hello-world)

## Next steps

### Model your content

Out of the box, there is a content model created for a "dummy-post". You will want to check out Tina's [content modeling docs](/docs/schema/), so that you can edit the content that's used within your Hugo site.

### Deploy your site

To edit your site on a deployed server you'll need to authorize with Tina Cloud. You can read about signing up and going to production [here](/docs/tina-cloud/)

### We want your feedback!

Non-React-based SSG support is still experimental, so we would love to hear your early feedback.

You can reach out to us in the chat bubble, in our [Community Discord](https://discord.com/invite/zumN63Ybpf), or on [this GitHub discussion](https://github.com/tinacms/tinacms/discussions/2215)
