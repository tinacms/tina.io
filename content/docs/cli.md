---
title: The TinaCMS CLI
---

The _TinaCMS CLI_ can be used to set up your project with TinaCMS schema configuration, and run a local version of the TinaCMS API (using your file system's content). For a real-world example of how this is being used checkout the [Tina Cloud Starter](https://github.com/tinacms/tina-cloud-starter).

## Installation

The CLI can be installed as a dev dependency in your project.

Npm:

```bash
npm install --save-dev @tinacms/cli
```

Yarn:

```bash
yarn add --dev @tinacms/cli
```

## Usage

```sh
> yarn run tinacms

Usage:  command [options]

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  server:start [options]  Start Filesystem Graphql Server
  schema:compile          Compile schema into static files for the server
  schema:types            Generate a GraphQL query for your site's schema, (and
                          optionally Typescript types)
  help [command]          display help for command
```

## Getting started

The simplest way to get started is to add a `.tina/schema.ts` file

```
mkdir .tina && touch .tina/schema.ts
```

### `defineSchema`

`defineSchema` tells the CMS how to build your content API.

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

## Run the local GraphQL server

Let's add some content so we can test out the GraphQL server

#### Add an author

```sh
mkdir content && mkdir content/authors && touch content/authors/napolean.md
```

Now let's add some content to the author

```markdown
---
name: Napolean
---
```

#### Add a post

```sh
mkdir content/posts && touch content/posts/voteForPedro.md
```

Now we add some content to the post

```markdown
---
title: Vote For Pedro
author: content/authors/napolean.md
---

You should really vote for Pedro.
```

#### Start the filesystem server

```sh
> yarn run tinacms server:start

Started Filesystem GraphQL server on port: 4001
Visit the playground at http://localhost:4001/altair/
Generating Tina config
...
```

The below query can be run against your locally-running GraphQL server

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getDocument(collection%3A%20%22post%22%2C%20relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20...on%20PostDocument%20%7B%0A%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20author%20%7B%0A%20%20%20%20%20%20%20%20%20%20...on%20AuthorDocument%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" width="800" height="400" />

## Next Steps

[Enable live-editing on your Next.js site](/docs/tinacms-context/)

[Deep dive on the Tina schema](/docs/schema/)

[Learn all about the GraphQL API](/docs/graphql/)
