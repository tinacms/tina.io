---
title: Create an Auth Redirect Page
---

Before we add TinaCMS to the project, we need to create a new page to redirect the user to while authorizing with GitHub. This component **will render as a modal** during authorization.

Create a new directory in `pages`, called `github` and then make a new file, `authorizing.tsx`.

**pages/github/authorizing.tsx**

```tsx,copy
import { useGithubAuthRedirect } from 'react-tinacms-github'

// Our GitHub app redirects back to this page with auth code
export default function Authorizing() {
  // Let the main app know, that we received an auth code from the GitHub redirect
  useGithubAuthRedirect()

  return <h2>Authorizing with GitHub, please wait...</h2>
}
```

If you restart the dev server and head to http://localhost:3000/github/authorizing, you can see how this page will render. Feel free to swap out the message or add some styles!
