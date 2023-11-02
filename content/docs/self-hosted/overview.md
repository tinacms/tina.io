---
title: Self-hosting Tina
last_edited: '2023-07-06T07:00:00.000Z'
next: /docs/self-hosted/starters/nextjs-vercel
---

## Introduction

<!-- TODO: Record a short clip that briefly explains the concept of self-hosting TinaCMS Backend. -->

TinaCMS is a powerful content management system that traditionally relies on Tina Cloud for backend services. Tina Cloud offers a ready-to-use solution, managing content operations such as reading/writing to your GitHub repository, content caching in a queryable data layer, and handling authentication and authorization seamlessly.

For users who prefer full control over their content and infrastructure, **we provide a self-hosting option**. This allows you to run your own TinaCMS Backend, with the flexibility to provide your own database, authentication, and Git integration, independent of Tina Cloud.

> For a detailed guide on setting up your self-hosted environment, refer to our [Self-hosted Starter Docs](/docs/self-hosted/starters/overview/).

## How Does Self-hosting Work?

When you opt to self-host TinaCMS's backend, you'll be configuring a single API function to act as the backend service. This function will expose a GraphQL endpoint for your content and handle all aspects of authentication and authorization.

The TinaCMS backend is designed to be compatible with any Node.js serverless environment. We provide a [Next.js](https://nextjs.org/) starter that can be deployed to [Vercel](https://vercel.com/) with a single click. You can also deploy to [Netlify](https://www.netlify.com/) or any other serverless environment.

```js
// pages/api/tina/[...routes].{ts,js}
// ...
export default (req, res) => {
  // If necessary, modify the request here
  return tinaHandler(req, res)
}
```

> Note: This is a Next.js example, but you can use TinaCMS with any framework.

Your backend setup will be comprised of three main, configurable modules:

The backend relies upon a three configurable modules:

- [Auth Provider](/docs/self-hosted/authentication/overview)
  - Handles authentication and authorization for CMS operations.
- [Database Adapter](/docs/reference/self-hosted/database-adapter/overview)
  - Handles indexing and interaction with the database
- [Git Provider](/docs/reference/self-hosted/git-provider/overview)
  - Handles saving content to Git

Each module is designed to be standalone, meaning you have the option to replace any module with a different implementation or develop a custom solution to fit your specific needs.

Ready to begin? Jump into our step-by-step self-hosted setup guide in the [Starter Docs](/docs/self-hosted/starters/nextjs-vercel/).
