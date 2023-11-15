---
title: Self-hosting Tina
last_edited: '2023-07-06T07:00:00.000Z'
next: /docs/self-hosted/starters/nextjs-vercel
---

## Introduction

<!-- TODO: Record a short clip that briefly explains the concept of self-hosting TinaCMS Backend. -->

For users who do not wish to host their CMS backend on Tina Cloud, **we provide a self-hosting option**. This allows you to run your own TinaCMS Backend, with the flexibility to provide your own database, authentication, and Git integration, independent of Tina Cloud.

> Want to jump into the code? Check out the [Self-hosted Starter Docs](/docs/self-hosted/starters/nextjs-vercel/).

## What is the Tina Data Layer

he Tina Data Layer provides a GraphQL API that serves Markdown and JSON files backed by a database. You can think of the database as more of an ephemeral cache, since the single source of truth for your content is really your Markdown/JSON files.

![TinaCMS GraphQL Data Layer](https://res.cloudinary.com/forestry-demo/image/upload/v1675375259/tinacms-data-layer_geyrv8.png 'TinaCMS Data Layer')

[Check out the blog post for more info](/blog/self-hosted-datalayer/)

## How Does Self-hosting Work?

When you opt to self-host TinaCMS's backend, you'll be configuring a single API function to act as the backend service. This function will expose a GraphQL endpoint for your content and handle all aspects of authentication and authorization.

The TinaCMS backend is designed to be compatible with any Node.js serverless environment, such as Vercel or Netlify. We provide a [Next.js starter](/docs/self-hosted/starters/nextjs-vercel) that can be deployed to [Vercel](https://vercel.com/) with a single click. You can also deploy to [Netlify](https://www.netlify.com/) or any other serverless environment.

```js
// pages/api/tina/[...routes].{ts,js}
// ...
import { TinaNodeBackend } from '@tinacms/datalayer'
const tinaHandler = TinaNodeBackend({
  // ...
})
export default (req, res) => {
  return tinaHandler(req, res)
}
```

> Note: This is a Next.js example, but you can use TinaCMS with any framework.

Your backend setup will be comprised of three main, configurable modules:

- [Auth Provider](/docs/reference/self-hosted/authentication-provider/overview)
  - Handles authentication and authorization for CMS operations.
- [Database Adapter](/docs/reference/self-hosted/database-adapter/overview)
  - Handles indexing and interaction with the [database](/docs/tina-cloud/faq/#why-do-i-need-a-database-when-using-markdown) (e.g. MongoDB, Postgres, etc.)
- [Git Provider](/docs/reference/self-hosted/git-provider/overview)
  - Handles saving content to Git

Each module is designed to be standalone, meaning you have the option to replace any module with a different implementation or develop a custom solution to fit your specific needs.

## Next Steps

- Don't have an existing site? **check out the [Nextjs self hosted starter guide](/docs/self-hosted/starters/nextjs-vercel/)**.
- Add TinaCMS to an existing project by **following the [existing site setup](/docs/self-hosted/existing-site/)**.

## Join the TinaCMS Community

- **Discord**: [Join our Discord community](https://discord.com/invite/zumN63Ybpf) to connect with other TinaCMS users and developers. It’s a great space to get help, share your work, and discuss ideas
- **GitHub**: [Open an issue](https://github.com/tinacms/tinacms/issues/new/choose) to report problems or suggest new features. We welcome your bug reports, feature requests, and contributions to our discussions. If you're passionate about TinaCMS and want to help make it even better, we encourage you to contribute to our code and documentation!
