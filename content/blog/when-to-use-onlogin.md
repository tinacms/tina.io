---
title: When to use onLogin
date: '2020-12-08T19:00:00-05:00'
author: DJ
last_edited: '2020-12-07T22:34:53.685Z'
---
\[rough\]

publish after changes to r-t-github are released

talk about changes to onLogin and new github:checkout event

if you've followed the github guide, changes:

* pass an empty function to onLogin
* subscribe to CHECKOUT with the original onLogin function

the github guide uses onLogin to trigger preview mode and refresh the page. New github data is loaded by getStaticProps.

previously, onLogin was triggered any time the branch was changed in the branch switcher. this is semantically and idiomatically incorrect. Now, onLogin handlers only fire after github authentication runs. if you want to execute a function any time a branch is switched, subscribe to the `github:branch:checkout` event. But actually, even that is wrong - if you're supporting open authoring, better subscribe to `github:checkout`, which will also fire when creating/switching to a new fork.

so, when should you use onLogin?
onLogin handlers predated the introduction of a shareable event bus in Tina. it would still be useful, tho, if you wanted to do something like maintain your own sense of the login state.

```ts
const PageWrapper = ({children}) => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  return (
    <TinacmsGithubProvider onLogin={() => setLoggedIn(true)}
      onLogout={() => setLoggedIn(false)} />
      {loggedIn ? children : <Error message="you need to be logged in" />}
    </TinacmsGithubProvider>
  )
}
```