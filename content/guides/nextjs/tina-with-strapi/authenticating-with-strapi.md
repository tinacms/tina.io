---
title: 'Authenticating with Strapi'
---

Before we can implement an editing experience we need to set up an authentication experience. To do this we'll be running through a setup using credentials that Strapi control, but Strapi does allow authentication through 3rd-party providers and they're pretty easy to use!

## Using Next.js Preview Mode

If we're authenticated we're going to display the pages to the user using [Next.js' Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) and display an editing interface to the user.

First we're going to create two API's: one to set `previewData` when we're authenticated, and one to clear `previewData` when we want to unauthenticate.

Create a file called `pages/api/preview.js` and give it the following content.

```js
import { STRAPI_JWT } from 'react-tinacms-strapi-bm-test'
const previewHandler = (req, res) => {
  const previewData = {
    strapi_jwt: req.cookies[STRAPI_JWT],
  }

  res.setPreviewData(previewData)
  res.status(200).end()
}

export default previewHandler
```

Upon authenticating with Strapi, it will pass us a JWT. This method stores that JWT in `previewData` so that we can hand it to any of Strapi's APIs that required authentication.

Create another file called `pages/api/reset-preview.ts` and give it the following content.

```js
export default (_req, res) => {
  res.clearPreviewData()
  res.status(200).end()
}
```

Whenever we call this API, we will clear the preview data and the user will be unauthenticated.

## Modify Strapi's Authenticated Role

Previously you gave read access to Public users. Similarly you must now tell Strapi what permissions to give Authenticated users. Head to Strapi and go to **Roles & Permissions->Authenticated**.

We'll give authenticated user's full permissions on blog posts and authors. So click **Select All** on both of those types and then click **Save**.

Now is also a good time to setup a user who you'll be able to login and change content with. In the left nav clicks **Users** and then click **Add New user**.

Give them a **Username**, **Email**, **Password** and set the **Confirmed** toggle to "ON", then click save. In the future, you'll use this account to make content changes from the front-end.

Additionally, click on the **UPLOAD** section of this page and give the role the **upload** permission. This will give us the ability to upload new cover images for our blog posts from the front-end.

## Setup a Simple Authentication Interface

Head into `pages/_app.js`. We're going to add a button to our pages that will pop-up a window asking for authentication and then put us into preview mode if everything goes well.

First we'll enable or disable Tina based on whether we're in preview mode or not.

```diff
  const cms = new TinaCMS({
    sidebar: { hidden: true },
    apis: {
      strapi: new TinaStrapiClient(),
    },
    media: {
      store: new StrapiMediaStore(),
    },
  });

+ pageProps.preview ? cms.enable() : cms.disable();
```

Next we need to create some functions that let our Strapi provider know what we want to do when we authenticate/unauthenticate. Add the following two methods to the bottom of `_app.js`.

```js
const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname
  })
}

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}
```

Then pass these two functions into the Strapi provider, and while we're here give Strapi knowledge of whether or not w're in preview mode.

```diff
      <StrapiProvider
-       editMode={false}
+       editMode={pageProps.preview}
-       enterEditMode={() => {}}
+       enterEditMode={enterEditMode}
-       exitEditMode={() => {}}
+       exitEditMode={exitEditMode}
      >
        <Component {...pageProps} />
      </StrapiProvider>
```

Now the Strapi provider knows to call our two API functions whenever authentication is successful.

Finally, we'll go ahead and actually create a button that will let us enter/leave editing mode. Create a new function component

```js
export const EditButton = ({ editMode }) => {
  const strapi = useStrapiEditing()
  return (
    <button onClick={editMode ? strapi.exitEditMode : strapi.enterEditMode}>
      {editMode ? 'Stop Editing' : 'Edit This Site'}
    </button>
  )
}
```

and, for simplicity, we'll just have it as the first thing that is displayed on every page.

```diff
  return (
    <TinaProvider cms={cms}>
      <StrapiProvider
        editMode={pageProps.preview}
        enterEditMode={enterEditMode}
        exitEditMode={exitEditMode}
      >
+       <EditButton editMode={pageProps.preview} />
        <Component {...pageProps} />
      </StrapiProvider>
    </TinaProvider>
  );
```

Now let's go into our index page and make a quick change to `getStaticProps`. Whenever this method is called, it can be passed arguments, which to this point we have been ignoring. Two of those arguments are `preview` and `previewData` which let us know if the page should be rendered in preview mode and what is contained in previewData.

```diff
- export async function getStaticProps() {
+ export async function getStaticProps({ params, preview, previewData }) {

  // ...

+ if (preview) {
+   return {
+     props: { allPosts: postResults.data.blogPosts, preview, ...previewData },
+   };
+ }

  return {
    props: { allPosts: postResults.data.blogPosts },
  };
```

If everything has gone well, you can refresh your index page and at the top you'll see a link that says "Edit This Site". Clicking on it will bring up a login screen. If you login with the account credentials you've created earlier you should see it switch to say "Stop Editing".

One more little change we want to make is to have the blog posts page also pass us `preview` and `previewData` from `getStaticProps`. So exactly as we did for the index, go into `[slug].js` and add in the the following

```diff
- export async function getStaticProps({ params }) {
+ export async function getStaticProps({ params, preview, previewData }) {

  // ...
+ if (preview) {
+   return {
+     props: {
+       post: {
+         ...post,
+         content,
+         rawMarkdownBody: post.content,
+       },
+       preview,
+       ...previewData,
+     },
+   };
+ }

  return {
    props: {
      post: {
        ...post,
        content,
        rawMarkdownBody: post.content,
      },
    },
  };
```

With this taken care of we can move onto adding an Editing experience to our blog posts.
