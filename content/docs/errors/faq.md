---
title: 'FAQ: Content API Errors'
---

## There was a problem saving your document

When using Tina Cloud without [Editorial Workflow](/editorial-workflow), you need to ensure that the [Tina Cloud App](https://github.com/apps/tina-cloud-app) is able to commit to the selected branch of the repository.

If it cannot, you will see an error of the following form:

```
Tina caught an error while updating the page:

Error: Unable to fetch, errors:
    Error in PUT for src/pages/some-page.md
```

To fix this issue, either:

- [Modify the branch's protection rule](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule#editing-a-branch-protection-rule) to allow the Tina Cloud App to bypass the [require a pull request before merging](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-pull-request-reviews-before-merging) rule, or
- Enable [Editorial Workflow](/editorial-workflow) to create PRs on the branch.

## Invalid or undefined branch

The current branch that Tina is using is invalid or undefined. Double check that the correct branch is selected and it does in fact exist.

You can view the branches that have been indexed by Tina Cloud by visiting `https://app.tina.io/projects/<your-project-id>/configuration`.

![Indexed Branches](https://res.cloudinary.com/forestry-demo/image/upload/v1673277689/tina-io/docs/tina-cloud/Screen_Shot_2023-01-09_at_11.20.46_AM.png)

## tina directory not pushed to git

Everything in the `tina` directory (except the `__generated__` folder) needs to be pushed up to the git repository. Be sure to add it to your git repository (and make sure you **don't** have it listed in a `.gitignore`). Also make sure that the branch you're trying to use has the `tina` directory and is up to date.

## API URL is misformatted

The ContentAPI URL isn't formatted correctly. See [here](/docs/tina-cloud/overview/#enabling-tina-cloud-in-tinacms) for information on how the URL _should_ be formatted.

## Trying to access local GraphQL server when it's not running or in prod.

#### In production

Make sure your API URL isn't set to point at your local GraphQL server when in production. You should be pointing to the ContentAPI.

#### Working locally

If you are working locally, make sure your GraphQL server is running. See [here](/docs/graphql/cli/) for more information.

## Document doesn't exist

Double check you aren't trying to access a document that doesn't exist.
