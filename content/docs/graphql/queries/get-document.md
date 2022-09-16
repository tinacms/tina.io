---
title: Querying a Single Document
id: /docs/graphql/queries/get-document
next: content/docs/graphql/queries/query-documents.md
---

## Querying a single document

Get a single document, providing it's `relativePath` as the argument.

- `relativePath` is the portion of the path _relative_ to the `collection`'s path.

In this example, the `post` collection has a path of `content/posts` and your document can be found at `content/posts/voteForPedro.md` giving `relativePath: "voteForPedro.md"`. If your item was at `content/posts/nested-folder/voteForPedro.md` you'd specify: `relativePath: "nested-folder/voteForPedro.md"`.

Our collections for the above [schema](/docs/graphql/queries/#example-schema) are named "post" and "author", so we can query for each using the `post` & `author`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20post(relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20category%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20...%20on%20Author%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="800" height="400" />

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20author(relativePath%3A%20%22napolean.json%22)%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D%0A" width="800" height="400" />
