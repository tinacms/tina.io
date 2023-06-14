---
title: Protected Branches
last_edited: '2023-06-14T04:00:00.000Z'
id: '/docs/drafts/protected-branches'
---

> Note: The protected branches feature is only available for projects on the business and enterprise plans.

If your content editors need to work on multiple branches, you can utilize the protected branches feature. Instead of saving your content directly to a protected branch (e.g., `main`), a new branch is created. A draft pull request is generated, and all subsequent edits are made on this new branch. When your content is ready to be published, it can be merged back into the protected branch (e.g., `main`) via GitHub.

## Setting Up

To set up protected branches, follow these steps:

1. Go to the "Configuration" tab of your project in the dashboard.
2. Toggle the "Enable" option.
3. Enter the names of the branches you want to protect.
4. After setting up the protected branches, refresh your page to ensure the changes take effect.

## Accessing CMS and Saving to Protected Branches

After completing the setup, you can access the CMS, and a new branch switcher button will appear at the top. When you are on a protected branch and click "Save," a modal will prompt you to enter the name of the new branch you wish to save to.

Once you enter the new branch name, the following actions will occur:

- The new branch will be created.
- The content of the new branch will be indexed (this process may take a few minutes).
- The changes will be saved to the new branch.
- A draft pull request will be created.

## Publishing Content

When you are ready to publish your content, merge the draft pull request into the protected branch (e.g., main) through GitHub. After the pull request is successfully merged, the new branch will be deleted, and the content will be available on the protected branch.
