---
title: Add TinaCMS to the site
last_edited: '2020-08-11T13:02:36.046Z'
---

## Installation

From within your site's root directory, we need to install some tina packages & peer dependencies:

```bash,copy
yarn add tinacms tina-graphql-gateway react-tinacms-editor react-tinacms-inline styled-components
```

## Create Tina wrapper.

We want to create a "TinaWrapper" that will wrap our site, and add an editing interface.

```bash,copy
touch components/tina-wrapper.js
```

Paste the following snippet inside your new **tina-wrapper.js** file

```jsx,copy
import React from 'react'
import { TinaCMS } from 'tinacms'
import { Client, TinaCloudAuthWall } from 'tina-graphql-gateway'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'

const TinaWrapper = ({ children }) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: new Client({
          organizationId: 'YOUR_ORGANIZATION_ID',
          clientId: 'YOUR_CLIENT_ID',
          branch: 'main',
        }),
      },
      plugins: [MarkdownFieldPlugin],
      sidebar: true,
      enabled: true,
    })
  }, [])

  return <TinaCloudAuthWall cms={cms}>{children}</TinaCloudAuthWall>
}

export default TinaWrapper
```

Remember the `organization-id` and `client-id` on the app settings in the Tina Cloud dashboard? **Time to copy/paste those values into the code snippet above.**

## Use the Tina Wrapper

We want to show Tina's editing controls whenever a user navigates to our "/admin" pages.

Open up `/pages/_app.js` and you should see something like this:

```jsx
import '../styles/index.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

Let's wrap our site with the Tina wrapper that we defined above. We'll add a conditional so that it's only loaded on `/admin` pages, and not on our production pages.

**pages/\_app.js**

```jsx,copy
import '../styles/index.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const TinaWrapper = dynamic(() => import('../components/tina-wrapper'))

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if (router.pathname.startsWith('/admin')) {
    return (
      <TinaWrapper>
        <Component {...pageProps} />
      </TinaWrapper>
    )
  }
  return <Component {...pageProps} />
}
```

If you run your site with `yarn dev`, you should see that your site looks the same. That's because we haven't added any `/admin` pages yet. Let's create an admin page for us to edit this site's blog posts.

Create an admin page with:

```bash,copy
  mkdir pages/admin && mkdir pages/admin/posts && touch pages/admin/posts/[slug].js
```

Paste the following snippet inside this new file.

```jsx,copy
import React from 'react'

export default function() {
  return <div>My admin page</div>
}
```

It's a very simple page for now (we'll make this admin page look a bit more impressive in a few steps).

One thing that you will notice is that when you navigate to a [post using this page layout](http://localhost:3000/admin/posts/hello-world), you are prompted to log in to Tina Cloud (You may be already logged in). Once logged in, you will see a pencil icon in the corner. Open it up and you'll see a blank Tina sidebar!
