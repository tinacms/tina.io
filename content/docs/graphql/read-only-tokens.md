---
title: Read Only Tokens
last_edited: '2021-11-06T18:00:00.000Z'
---
{{ WarningCallout text="This is an experimental feature and may be slow as we work on performance improvements" }}

Read only tokens allow data fetching at runtime without the need for the local graphQL server. Some use cases might include the following.


- Runtime server side logic in `getServerSideProps`, `getStaticProps` (when fallback is not `false`), etc.
- [Incremental Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [Server components](https://nextjs.org/docs/advanced-features/react-18#react-server-components)
- [Nextjs middleware](https://nextjs.org/docs/middleware)
- Client side data fetching
- Future support for server side frameworks like [remix](https://remix.run/)

In all of these use cases we can no longer rely static content but need a way to fetch data in real-time without being authenticated.

## How to use Read Only Tokens

### Generate them from the dashboard

> TODO

### Make a fetch request using the API kry 

> TODO
