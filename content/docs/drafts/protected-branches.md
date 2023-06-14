---
title: Protected Branches
last_edited: '2023-06-14T04:00:00.000Z'
id: '/docs/drafts/protected-branches'
---

> Note: The protected branches feature is only available for projects on the **business and enterprise plans**.

If your content editors need to work on multiple branches, you can use the protected branches feature.Instead of directly saving your content to a protected branch (e.g., main), a new branch is created. A draft pull request is then generated, and all subsequent edits are made on this new branch. Once the content is ready to be published, it can be merged back into the protected branch (main) via GitHub.

## Setting Up

To set up protected branches, follow these steps:

1. Go to the "Configuration" tab of your project in the dashboard.
2. Toggle the "Enable" option.
3. Enter the names of the branches you want to protect.
4. Make sure to refresh your page after setting up the protected branches.

## Accessing CMS and Saving to Protected Branches

After completing the setup, you can access the CMS, and a new branch switcher button will appear at the top. When you are on a protected branch and click "Save," a modal will appear asking for the name of the new branch you would like to save to.

Once you enter the new branch name:

- The new branch will be created.
- The content of the new branch will be indexed (This may take a couple of minutes).
- The changes will be saved to the new branch.
- A draft pull request will be created.

## Publishing Content

Once you are ready to publish your content, you can merge the draft pull request into the protected branch (e.g., main) via GitHub. Once the pull request is merged, the new branch will be deleted and the content will be available on the protected branch.
