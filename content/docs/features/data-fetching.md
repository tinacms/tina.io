---
title: Data Fetching
id: '/docs/features/data-fetching'
next: '/docs/tinacms-context'
---

## Introduction

With Tina, your content is stored in Git along with your codebase. Tina provides a Content API in front of your repo-based content, so that you can interact with your files as if they're in a database.

You can:

- Query content for a given collection
- Apply filters, sorting, pagination, etc
- Query your content based on relational fields.

To interface with the API, you can use Tina's type-safe client for data-fetching, or manually write custom GraphQL queries and hit the API yourself.

## Making requests with the Tina Client

The Tina client is the easiest way to fetch your site's content. The client can be configured in `.tina/client.<js|ts>`.

Tina client provides a type-safe query builder, that is auto-generated based on your site's schema:

```js
import { client } from '../[pathToTina]/.tina/client'

const myPost = await client.queries.post({ relativePath: 'HelloWorld.md' })

console.log(myPost.title)
```

The above `client.queries.post` query is not built-in to Tina's API. This is an example of a query based on _your_ defined schema, (where you have a "post" collection defined).

From the post-list page, you can fetch the list of posts like so:

```js
const postsResponse = await client.queries.postConnection()
const posts = postResponse.data.postConnection.edges.map(x => {
  return { slug: x.node._sys.filename }
})
// This would return an array like: [ { slug: 'HelloWorld.md'}, /*...*/ ]
```

> For more information on manually writing queries for your specific schema, check out our ["Using the GraphQL API"](/docs/graphql/overview/) docs.

## The Local Filesystem-based Content API

When developing locally, it's often beneficial to talk to the content on your local file-system, rather than talk to the hosted content API. Tina provides a CLI tool that lets you run the Content API locally next to your site. This allows all of your content to be made available through the same expressive GraphQL API during development.

> If you setup Tina via `@tinacms/cli init`, or used one of our starters, this should be setup by default. (Read about the CLI [here](/docs/graphql/cli/.)

## Summary

- Tina provides a GraphQL API for querying your git-based content.
- Tina provides a client that allows you to make type-safe requests to the Content API.
- The client's "queries" property is generated based on _your_ schema.
- A local version of the Content API can be used for local development.
