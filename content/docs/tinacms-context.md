---
title: Contextual Editing
id: '/docs/tinacms-context'
next: '/docs/graphql/overview'
---

After modelling our content, and using Tina's API for data-fetching, we can add TinaCMS to our site's frontend and add contextual editing.

## Adding Tina to the site's frontend

To make data editable live on your site, you'll need to set up the TinaCMS context. The default import from `tinacms` is a context provider which sets up everything for you. You'll notice we're using a render prop pattern to pass `livePageProps` into your component.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      /**
       * The URL for the content API.
       *
       * When working locally, this should be http://localhost:4001/graphql.
       *
       * For Tina Cloud, use https://content.tinajs.io/content/my-client-id/github/my-branch
       */
      apiURL="http://localhost:4001/graphql"
    >
      <Component {...pageProps} />
    </TinaCMS>
  )
}

export default App
```

## Code-splitting tinacms with `TinaEditProvider`

We can leverage Next.js `dynamic` imports to avoid bundling TinaCMS with your production build:

```tsx
// pages/_app.js
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS apiURL="http://localhost:4001/graphql">
            <Component {...pageProps} />
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  )
}

export default App
```

Instead of having the full `tinacms` code in your production site, your main production bundle will just contain the much smaller `tinacms/dist/edit-state` bundle (>2kb).

## Entering / exiting edit-mode

You can log into edit mode by visiting `/admin` and log out of edit mode by visiting `/admin#/logout`.

> If you setup Tina with [`tinacms init`](/guides/tina-cloud/add-tinacms-to-existing-site/create-app/#adding-tina), this should already be setup for you in the `/pages/admin.js` page.

If you do not have a `/pages/admin.js` file, you can create it very easily with two lines:

```
import { TinaAdmin } from 'tinacms';
export default TinaAdmin;
```

## Adding contextual-editing to a page

Contextual editing can be setup on a page with the `useTina` hook

```jsx
// ...
import { useTina } from 'tinacms/dist/edit-state'

const query = `{
  getPageDocument(relativePath: "home.mdx"){
    data{
      body
    }
  }
}`

export default function Home(props) {
  // Pass our data through the "useTina" hook to make it editable
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  })

// Note how our page body uses "data", and not the original "props.data".
// This ensures that the content will be updated in edit-mode as the user types
  return <h1>{data.getPageDocument.data.body}</h1>
}

export const getStaticProps = async () => {
  const data = await staticRequest({
      query,
      variables = {},
    })

  // return the original data, which is used in our production page
  return { props: { data } }
}
```

![usetina-hello-world](https://res.cloudinary.com/forestry-demo/image/upload/q_32/v1643294947/tina-io/hello-world.png)

### The `useTina` hook:

`useTina` is used to make a piece of Tina content contextually editable. It is code-split, so that in production, this hook will simply pass through its data value. In edit-mode, it registers an editable form in the sidebar, and contextually updates its value as the user types.

`useTina` takes in a parameter with a few keys:

- `query` and `variables`: These are the same values that you would use for the [backend data-fetching](/docs/features/data-fetching/).
- `data`: This is the production value that gets passed through to the response unchanged in production.

## Accessing contextual-editing from the CMS

At this point, when your editors go to `/your-page-url` in edit-mode, they will be able to edit and see those changes reflected in real-time. Next, let's wire up the CMS so that users will be navigated to that same editing experience when clicking any document in the Document List (instead of seeing the basic editor).

To accomplish this, we will make use of the `RouteMappingPlugin`.

### The `RouteMappingPlugin`

The `RouteMappingPlugin` is used by the CMS's Document List to navigate to a document's contextual editor rather than the basic editor.

```ts
RouteMappingPlugin(mapper: (collection: Collection, document: Document) => string | undefined)
```

The `RouteMappingPlugin` accepts a single argument - the `mapper` function - that is run when a document is clicked within a Document List:

- If the `mapper` returns a `string`, the `string` is used as the document's route rather than the default.
- If the `mapper` returns `undefined`, the user is navigated to the document's basic editor.

This is an example of the `RouteMappingPlugin` added to our `tina-cloud-starter` template:

```tsx
...

cmsCallback={(cms) => {
  /**
   * 1. Import `tinacms` and `RouteMappingPlugin`
   **/
  import('tinacms').then(({ RouteMappingPlugin }) => {

    /**
    * 2. Define the `RouteMappingPlugin`
    **/
    const RouteMapping = new RouteMappingPlugin(
      (collection, document) => {
        /**
        * Because the `authors` and `global` collections do not
        * have dedicated pages, we return `undefined`.
        **/
        if (["authors", "global"].includes(collection.name)) {
          return undefined;
        }

        /**
        * While the `pages` collection does have dedicated pages,
        * their URLs are different than their document names.
        **/
        if (["pages"].includes(collection.name)) {
          if (document.sys.filename === "home") {
            return `/`;
          }
          if (document.sys.filename === "about") {
            return `/about`;
          }
          return undefined;
        }
        /**
        * Finally, any other collections (`posts`, for example)
        * have URLs based on values in the `collection` and `document`.
        **/
        return `/${collection.name}/${document.sys.filename}`;
      }
    );

    /**
    * 3. Add the `RouteMappingPlugin` to the `cms`.
    **/
    cms.plugins.add(RouteMapping);
  });
}
```

## Summary

- Tina can be added to a site's UI by wrapping its layout in the `<TinaCMS>` component.
- The `<TinaEditProvider>` component should be used to dynamically code-split Tina out of your production site.
- The Tina admin usually lives on the `/admin` route. This page allows editors to log in and enter edit-mode.
- A piece of content can be made editable by running it through the `useTina` hook. In production, it returns the original data unchanged. In edit-mode, it returns the live data, which is updated as the user types in the sidebar.
- Make use of the `RouteMappingPlugin` to automatically navigate to the contextual-editing experience from the CMS.
