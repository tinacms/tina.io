---
title: Tina Cloud
id: '/docs/tina-cloud'
next: '/docs/tina-cloud/dashboard'
---

Tina Cloud is a multi-level backend solution for TinaCMS. Included in this solution is our expressive Content API and a Dashboard to easily manage sites and users.

## Tina Cloud Dashboard

The Tina Cloud dashboard is used to connect sites with your editors. Through the dashboard, you can setup an app. An app connects to your site's GitHub repository, and authorizes Tina Cloud to push and pull content directly from the repository. You can also authenticate certain users to edit your site through the dashboard's user management page. Together, this allows users to login directly to your site and start editing the content while also simultaneously updating the content within the GitHub repository.

An important distinction to make is that unlike a traditional CMS dashboard, the Tina Cloud dashboard is not used to edit your content. The difference of the Tina Cloud dashboard is that the content editing capabilities are setup by you, the developer, using our TinaCMS toolkit.

## Content API

Tina Cloud's Content API unlocks a few powerful features for the Tina experience. Firstly, Tina's Content API authenticates directly with GitHub therefore removing the need for your users to possess GitHub accounts. They are given access through the dashboard, and therefore can login directly through your site to begin editing!

The Content API also houses our powerful GraphQL Gateway API. The GraphQL API is important for a variety of reasons:

- **Editing Environment Flexibility:**
  The GraphQL API works regardless of the datasource, allowing for flexibility during development. It can connect to your local filesystem for optional local development, or can be run through the server during production.
- **Control over Content**:
  The GraphQL API returns useful data in a way that makes sense for Tina development. It returns the data for the page as well as the form configuration needed for Tina forms. So, you as the developer only need to define your content model once and not have to worry about mirroring the model between the data source and Tina. The [Tina CLI](/docs/cli-overview/) also has helpful commands to autogenerate the GraphQL queries to be used in these API requests as well as the TypeScript types which match the data and forms.
- **Link Resolution**:
  The Content API leverages the power of GraphQL and thus can return data that is linked to another file, all within one request. You only need to query for what you need and nothing more.
