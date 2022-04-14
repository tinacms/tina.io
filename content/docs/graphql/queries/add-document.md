---
title: Add a pending document
id: /docs/graphql/queries/add-document
[//]: # (next: /docs/graphql/queries/add-document.md)
---

## Adding a document with `addPendingDocument`

The `addPendingDocument` mutation will take in the collection name as a parameter, as well as the new relative path.

> Note: `addPendingDocument` does not currently support fields of any kind, just creating the record.

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20addPendingDocument(collection%3A%20%22post%22%2C%20relativePath%3A%20%22pedro.json%22)%20%7B%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

> Ready to try out some of these queries using your specific schema? Try [running the Tina CLI](/docs/graphql/cli/) and testing them out using the Altair client
