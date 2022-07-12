---
title: Data Layer
last_edited: '2022-06-15T15:51:56.737Z'
---

Tina Cloud implements a database layer between the Tina GraphQL API and the
underlying Git repository. This data layer buffers requests between Tina Cloud and GitHub resulting in improved editing performance with TinaCMS. It also enables additional capabilities such as:

- [sorting](/docs/graphql/queries/advanced/sorting/)
- [filtering](/docs/graphql/queries/advanced/filter-documents/)
- [pagination](/docs/graphql/queries/advanced/pagination/)
- referential integrity

# Indexing

Tina Cloud will automatically maintain a synchronized copy of your repository in our
secure cloud database. We refer to this synchronization process as indexing. It involves fetching each item from your
GitHub remote repository and storing a copy in the database. After the initial indexing process, Tina Cloud will only
index content that has been updated. There are some circumstances where a full re-indexing may be required. Some example
scenarios are:

- Changes to `.tina/schema.ts`
- Changes to the [path to tina](/docs/tina-cloud/faq/#does-tina-cloud-work-with-monorepos)
- Changes to the configured [repository](/docs/tina-cloud/dashboard/projects/#changing-the-repository)
- New branches in GitHub
