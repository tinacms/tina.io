---
title: Data Layer
last_edited: '2022-06-15T15:51:56.737Z'
---

{{ WarningCallout text="This is an experimental feature, and the API is subject to change. Have any thoughts? Let us know in the chat, or through one of our [community channels](/community/)!" }}

Tina Cloud now supports an optional Data Layer which implements a database layer between the Tina GraphQL API and the
GitHub REST API. This data layer buffers requests between Tina Cloud and GitHub resulting in improved editing
performance with TinaCMS. It also enables additional capabilities such as:

- [sorting](/docs/graphql/queries/advanced/sorting/)
- [filtering](/docs/graphql/queries/advanced/filter-documents/)
- [pagination](/docs/graphql/queries/advanced/pagination/)
- referential integrity

# Enabling the Data Layer

The TinaCMS data layer is enabled by specifying the following TinaCMS command line flag: `--experimentalData`. We
recommend editing the script(s) in your site's package.json to pass the flag:

```json
"start": "yarn tinacms server:start -c \"next start\" --experimentalData"
```

To opt-in to the frontend features of the datalayer you must set the `experimentalData` flag in the `cmsCallback` to true.

```ts
cmsCallback: (cms) => {
   cms.flags.set("experimentalData", true);
},
```

Once the flag is added and the TinaCMS CLI is executed using the flag, the generated schema will be updated. **These
updates must be committed and pushed to the remote GitHub repository in order to activate the data layer.**

# Indexing

Once the data layer is enabled, Tina Cloud will automatically maintain a synchronized copy of your repository in our
secure cloud database. We refer to this synchronization process as indexing. It involves fetching each item from your
GitHub remote repository and storing a copy in the database. After the initial indexing process, Tina Cloud will only
index content that has been updated. There are some circumstances where a full re-indexing may be required. Some example
scenarios are:
- Changes to `.tina/schema.ts`
- Changes to the [path to tina](/docs/tina-cloud/dashboard/projects/#path-to-tina)
- Changes to the configured [repository](/docs/tina-cloud/dashboard/projects/#changing-the-repository)
- New branches in GitHub

## `waitForDB`

We offer a server command to poll for the status of indexing and wait for completion: `server:waitForDB`.  When using 
`server:start`, `server:waitForDB` is automatically called if you have configured `client.ts`.
  - You can learn more about `server:waitForDB` [here](/docs/cli-overview/#tinacms-serverwaitfordb-experimental).

## Synchronization Issues

### Webhook Failures

In rare circumstances, the GitHub Webhook connecting your repository to Tina Cloud may be disrupted. If the webhook does
not execute, Tina Cloud may become out of sync with your GitHub repository. 

Use the [Refresh Webhooks](/docs/tina-cloud/dashboard/projects/#refresh-webhooks) button to re-initialize the webhook.

### External Updates Not Synchronized

In some cases, Tina Cloud's repository cache may become out of sync with your GitHub repository which might result in
changes being present in your repository but not in TinaCMS. Generally this should only happen if there is a problem 
with the GitHub webhook. If this does occur, you can reset the cached repository, restoring the cache to the current 
state of your repository. This will discard any updates in Tina Cloud that haven't been pushed to your repository.

Use the [Reset Repository Cache](/docs/tina-cloud/dashboard/projects/#reset-repository-cache) button to re-initialize the webhook.

### Conflicts

If you have changes that are visible in edit mode but not in your repository or site, there may be a conflict between
the TinaCMS repository cache and your GitHub repository. In this situation, it may be necessary to force push the 
changes to your repository to resolve this issue. This will destroy any commits in your GitHub repository that are not 
in the TinaCMS repository cache and should be used with caution.

Use the [Force Push](/docs/tina-cloud/dashboard/projects/#force-push) button to re-initialize the webhook.
