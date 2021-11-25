---
title: The TinaCMS CLI
---

The _TinaCMS CLI_ can be used to set up your project with TinaCMS schema configuration, and run a local version of the TinaCMS API (using your file system's content). For a real-world example of how this is being used checkout the [Tina Cloud Starter](https://github.com/tinacms/tina-cloud-starter).

The `@tinacms/cli` package will be installed as a dev dependency with the [tina init](/docs/setup-overview/#manual-setup-on-an-existing-site) command.

## Available Commands

```sh
> yarn run tinacms

Usage: @tinacms/cli command [options]

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  server:start [options]    Start Filesystem Graphql Server
  schema:compile [options]  Compile schema into static files for the server
  schema:types [options]    Generate a GraphQL query for your site's schema,
                            (and optionally Typescript types)
  init [options]            Add TinaCMS to an existing project
  help [command]            display help for command
```

## Basic Usage:

### init

> **Hint:** If you don't have a next.js site on hand you can first bootstrap one with
>
> ```bash,copy
> npx create-next-app --example with-typescript demo-project
> ```

In an **existing** Next.js project you can run

```bash,copy
npx @tinacms/cli init
```

This will,

1. Install all of the dependencies you need
2. Setup a basic content model in your [`schema.ts` file](/docs/schema/)
3. Drop in a ready to go `_app.js` file
4. Add an editable page at http://localhost:3000/demo/blog/helloWorld

### schema:start

> Prerequisite: To run this command, you must have a valid `.tina/schema.ts` file.

`schema:start` will compile the schema into static files, generates typescript types for you to use in your project and starts a graphQL server on http://localhost:4001

This command also takes an argument (`-c`) that allows you to run a command as a child process. This is very helpful for running a dev server and building your next.js app. The scripts portion of your package.json should look like this.

```json,copy
"scripts": {
  "tina-dev": "yarn tinacms server:start -c \"next dev\"",
  "tina-build": "yarn tinacms server:start -c \"next build\"",
  "tina-start": "yarn tinacms server:start -c \"next start\"",
  ...
},
```

For example, let's say that we have a schema like the one below:

```ts
// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      fields: [
        {
          type: 'string'
          label: 'Title',
          name: 'title',
        },
      ],
    },
  ],
})
```

We can run our local GraphQL server with:

```sh
> yarn run tinacms server:start

Started Filesystem GraphQL server on port: 4001
Visit the playground at http://localhost:4001/altair/
Generating Tina config
...
```

Once the graphql server is running, you can start to query your locally-running GraphQL server.

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getDocument(collection%3A%20%22post%22%2C%20relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20...on%20PostDocument%20%7B%0A%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20author%20%7B%0A%20%20%20%20%20%20%20%20%20%20...on%20AuthorDocument%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" width="800" height="400" />
