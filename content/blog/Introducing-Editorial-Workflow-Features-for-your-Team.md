---
title: Introducing Editorial Workflow Features for your Team!
date: '2023-07-06T03:00:00.000Z'
last_edited: '2023-07-06T03:00:00.000Z'
author: James O'Halloran
---

We're excited to introduce some new Editorial Workflow features for teams! Enabling Editorial Workflow features on a project allows editors to work on branches and make PRs without logging into GitHub.

<Youtube embedSrc="https://www.youtube.com/embed/gYukiULGqGc" />

<WarningCallout body="&#x22;Editorial Workflow&#x22; features are available today on the Tina Cloud Business and Enterprise plans." />

We understand that Git concepts are new to many content editors, so the TinaCMS Editorial Workflow offers an approachable UX that makes Git easy.

## Protected Branches

In Tina Cloud, you can assign a "protected branch". When editors make a change on a protected branch, they will be prompted to create a new branch where those changes will be applied.

`<insert video>`

Editors can continue making changes to the branch changeset, or they can switch back to the default branch.

## Sharing Previews

When on a branch, editors now have an accessible link to the GitHub PR. This allows editors to easily share their site preview with other stakeholders.

## Leverage GitHub's Reviews

When editors make changes, commits and pull-requests are made to GitHub under the hood. Reviewers are able to use the Git workflow that they're comfortable with to review changes. This also allows teams to ensure that their CI/CD workflow all passes before merging any content updates to their main branch.

## Improved Branch UI

If you've used our experimental branch plugin in the past, the branch UI can be a bit overwhelming. The new editorial workflow branch UI contains some quality of life improvements, like only displaying content branches by default, allowing you  to exclude branches such as those from developers or Dependabot.

To learn more about setting up the Editorial Workflow feature for your team, check out [our docs](/docs/drafts/editorial-workflow/).
