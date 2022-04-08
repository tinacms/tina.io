---
title: Querying a Single Document
id: /docs/graphql/queries/get-document
next: /docs/graphql/queries/query-documents
---

## Querying a single document with `get<collection>Document`

Get a single document, providing it's `relativePath` as the argument. 
- `relativePath` is the portion of the path _relative_ to the `collection`'s path.

So in this example, the `post` collection has a path of `content/posts` and your document can be found at `content/posts/voteForPedro.md` giving `relativePath: "voteForPedro.md"`. If your item was at `content/posts/nested-folder/voteForPedro.md` you'd specify: `relativePath: "nested-folder/voteForPedro.md"`.

Our collections for the above [schema](/docs/graphql/queries/#example-schema) are named "post" and "author", so we can query for each using the `getPostDocument` & `getAuthorDocument`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPostDocument(relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20category%0A%20%20%20%20%20%20author%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%23%20Note%20that%20we%20need%20to%20%0A%20%20%20%20%20%20%20%20%23%20disambiguate%20because%20_author_%0A%20%20%20%20%20%20%20%20%23%20could%20be%20from%20one%20of%20%0A%20%20%20%20%20%20%20%20%23%20several%20collections%0A%20%20%20%20%20%20%20%20...on%20AuthorDocument%20%7B%0A%20%20%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getAuthorDocument(relativePath%3A%20%22napolean.json%22)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />
