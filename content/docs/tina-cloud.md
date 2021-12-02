---
title: Tina Cloud
id: '/docs/tina-cloud'
next: '/docs/tina-cloud/dashboard'
---

Tina Cloud is a multi-level backend solution for TinaCMS. Included in this solution are our expressive Content API and a Dashboard interface to easily manage projects and users.

## Content API

Tina Cloud's Content API unlocks powerful features for the Tina experience.

Firstly, Tina's Content API authenticates directly with GitHub removing the need for users to create GitHub accounts. Access is granted through the dashboard, allowing users to login directly through your site and begin editing!

Secondly, the Content API provides a powerful GraphQL gateway API. The GraphQL API is important for a variety of reasons:

- **Editing Environment Flexibility:**
  The GraphQL API works regardless of the data-source, allowing for flexibility during development. It can connect to your local filesystem for optional local development, or can be run through a cloud server during production.
- **Control over Content**:
  The GraphQL API returns useful data in a way that makes sense for Tina development. It returns both the data for the page as well as the form configuration needed for the Tina editor. As a developer you only need to define your content model once and don't need to worry about mirroring the model between the data source and Tina. The [Tina CLI](/docs/cli-overview/) also has helpful commands to auto-generate the GraphQL queries to be used in API requests as well as TypeScript types which match the data and forms.
- **Link Resolution**:
  The Content API leverages the power of GraphQL and thus can return data that is linked to another file, all within one request. You only need to query for what you need and nothing more.


## Tina Cloud Dashboard

The Tina Cloud dashboard is used to connect sites with your editors. The dashboard allows creation of TIna Cloud projects. A project connects to your site's GitHub repository and authorizes Tina Cloud to push and pull content directly from it. You can also authorize users to edit your site through the dashboard's user management page. These capabilities allows users to login directly to your site and start editing content with all changes saved in your GitHub repository.

An important distinction here is that unlike traditional CMS dashboards, Tina Cloud's dashboard is not used to edit your content. Instead, content editing capabilities are setup by you, the developer, using the [TinaCMS toolkit](/docs/reference/toolkit/overview/).
