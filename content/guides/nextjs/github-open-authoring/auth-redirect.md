---
title: Create an Auth Redirect Page
---

We also need to create a new page to redirect the user to while authenticating with GitHub. This component **will render as a modal** during authentication.

Create a new directory in `pages`, called `github` and then make a new file, `authorizing.tsx`.

**pages/github/authorizing.tsx**

```tsx
import { useGithubAuthRedirect } from 'react-tinacms-github'

// Our GitHub app redirects back to this page with auth code
export default function Authorizing() {
  // Let the main app know, that we received an auth code from the GitHub redirect
  useGithubAuthRedirect()

  return <h2>Authorizing with GitHub, please wait...</h2>
}
```
