---
title: Choosing a Git Provider
id: '/docs/reference/self-hosted/git-provider/overview'
prev: null
next: '/docs/reference/self-hosted/git-provider/github'
---

The Git Provider is responsible for saving content to git. It is passed as a prop to the `createDatabase` function. Out of the box we support a [GitHub Git Provider](/docs/reference/self-hosted/git-provider/github). If you do not use Github, you can [make your own](/docs/reference/self-hosted/git-provider/make-your-own).

## Adding a Git Provider

```ts
// database.{ts,js}
//...

export default isLocal ? createLocalDatabase() ? createDatabase({
    gitProvider: new SomeGitProvider(),
    // ...
})
```

Where `SomeGitProvider` is a class that implements the [`GitProvider`]() interface.

Please read [Github Git Provider](/docs/reference/self-hosted/git-provider/github) to see how to setup interaction with GitHub.
