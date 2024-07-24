---
id: /docs/features/data-fetching
title: Data Fetching
prev: /docs/schema
next: /docs/contextual-editing/overview
---

## Introduction

With Tina, your content is stored in Git along with your codebase. Tina provides a Content API in front of your repo-based content, so that you can interact with your files as if they're in a database.

You can:

* Query content for a given collection
* Apply filters, sorting, pagination, etc
* Query your content based on relational fields.

To interface with the API, you can use Tina's type-safe client for data-fetching, or manually write custom GraphQL queries and hit the API yourself.

## Making requests with the Tina Client

The Tina client is the easiest way to fetch your site's content. The client can be configured the `tina/config.<js|ts>` in the `defineConfig` function.

> Note: token, clientId and branch are **not** used in [local-mode](/docs/tina-cloud/#local-mode). To setup these values for production see [this doc](/docs/tina-cloud/overview)

```js
// tina/config.{js,ts,tsx}
export default defineConfig({
  schema,
  token: '***',
  clientId: '***',
  branch: 'main',
})
```

When working locally, the client is built with the local url ([http://localhost:4001/graphql](http://localhost:4001/graphql)). When in [production mode](/docs/tina-cloud/#prod-mode), `clientId`, `branch` and `token` are used to query Tina Cloud.

Tina client provides a type-safe query builder, that is auto-generated based on your site's schema:

```js
import { client } from '../[pathToTina]/tina/__generated__/client'

const myPost = await client.queries.post({ relativePath: 'HelloWorld.md' })

console.log(myPost.data.title)
```

The above `client.queries.post` query is not built-in to Tina's API. This is an example of a query based on *your* defined schema, (where you have a "post" collection defined).

On a page that displays a list of posts, you can fetch the posts like so:

```js
const postsResponse = await client.queries.postConnection()
const posts = postsResponse.data.postConnection.edges.map((post) => {
  return { slug: post.node._sys.filename }
})
// This would return an array like: [ { slug: 'HelloWorld.md'}, /*...*/ ]
```

> For more information on manually writing queries for your specific schema, check out our ["Writing Custom Queries"](/docs/data-fetching/custom-queries/#writing-inline-queries) docs.

## The Local Filesystem-based Content API

When developing locally, it's often beneficial to talk to the content on your local file-system, rather than talk to the hosted content API. Tina provides a CLI tool that lets you run the Content API locally next to your site. This allows all of your content to be made available through the same expressive GraphQL API during development.

> If you setup Tina via `@tinacms/cli init`, or used one of our starters, this should be setup by default. (Read about the CLI [here](/docs/graphql/cli/.)

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on "Data Fetching" from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w\&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB\&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/PcgnJDILv4w?start=403&end=534" title="TinaCMS Deep Dive (Data Fetching)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>

## Summary

* Tina provides a GraphQL API for querying your git-based content.
* Tina provides a client that allows you to make type-safe requests to the Content API.
* The client's "queries" property is generated based on *your* schema.
* A local version of the Content API can be used for local development.
