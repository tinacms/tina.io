---
title: 'FAQ: Content API Errors'
---

## Invalid or undefined branch

The current branch that Tina is using is invalid or undefined. Double check that the correct branch is selected and it does in fact exist.

You can view the branches that have been indexed by Tina Cloud by visiting `https://app.tina.io/projects/<your-project-id>/configuration`.

![Indexed Branches](https://res.cloudinary.com/forestry-demo/image/upload/v1673277689/tina-io/docs/tina-cloud/Screen_Shot_2023-01-09_at_11.20.46_AM.png)

## tina directory not pushed to git

Everything in the `tina` directory (except the `__generated__` folder) needs to be pushed up to the git repository. Be sure to add it to your git repository (and make sure you **don't** have it listed in a `.gitignore`). Also make sure that the branch you're trying to use has the `tina` directory and is up to date.

## API URL is misformatted

The ContentAPI URL isn't formatted correctly. See [here](/docs/tina-cloud/connecting-site/#enabling-tina-cloud-in-tinacms) for information on how the URL *should* be formatted.

## Trying to access local GraphQL server when it's not running or in prod.

#### In production

Make sure your API URL isn't set to point at your local GraphQL server when in production. You should be pointing to the ContentAPI.

#### Working locally

If you are working locally, make sure your GraphQL server is running. See [here](/docs/graphql/cli/) for more information.

## Document doesn't exist

Double check you aren't trying to access a document that doesn't exist.
