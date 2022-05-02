---
title: Updating a document
id: /docs/graphql/queries/update-document
next: /docs/graphql/queries/add-document
---

## Updating a document with `update<collection>`

Our collections for the above [schema](/docs/graphql/queries/#example-schema) are named "post" and "author", so we can apply an update to each collection type using the `updatePost` & `updateAuthor`

> Note: Update mutations will overwrite _all_ fields. Omitting a field will result in it being nullified.

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20updatePost(relativePath%3A%20%22voteForPedro.json%22%2C%20params%3A%20%7Btitle%3A%20%22Vote%20For%20Napolean%20Instead%22%2C%20category%3A%20%22politics%22%2C%20author%3A%20%22content%2Fauthors%2Fnapolean.json%22%7D)%20%7B%0A%20%20%20%20title%0A%20%20%20%20category%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20...%20on%20Author%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="800" height="400" />

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20updateAuthor(relativePath%3A%20%22napolean.json%22%2C%20params%3A%20%7Bname%3A%20%22Napolean%22%2C%20avatar%3A%20%22https%3A%2F%2Fpath.to%2Fmy-avatar.jpg%22%7D)%20%7B%0A%20%20%20%20name%0A%20%20%20%20avatar%0A%20%20%7D%0A%7D%0A" width="800" height="400" />
