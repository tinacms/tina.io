---
title: Drafts in TinaCMS
id: '/docs/drafts/overview'
next: '/docs/drafts/drafts-fields'
---

TinaCMS supports a few implementations of "drafts".

## Document-based "draft" state

Developers can setup a "draft" field on a document, which can be toggled to conditionally include pages based on their draft state.

[Read more about implementing a "draft field" here](/docs/drafts/drafts-fields)

## Working in branches

Some editorial teams like to work in branches, for more control over what gets merged into production.

In these cases, you may want to have your editors work from your hosting provider's preview deployments, instead of `<your-production-site>/admin`.

See our [Tina Cloud Docs](/docs/tina-cloud/dashboard/projects/#glob-patterns) for help setting this up.
