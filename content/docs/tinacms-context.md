---
title: Next.js APIs
id: '/docs/tinacms-context'
next: /docs/edit-state
---

## `getStaticPropsForTina`

TinaCMS is easiest to work with when you provide a predictable shape to the props you return from `getStaticProps`. `getStaticPropsForTina` enforces this shape for you:

```tsx
// pages/home.js
import { getStaticPropsForTina } from 'tinacms'

const getStaticProps = () => {
  return getStaticPropsForTina({
    query: `
      query GetPostDocument($relativePath: String!) {
        getPostDocument(relativePath: $relativePath) {
          title
          body
        }
      }
    `,
    variables: {
      relativePath: 'hello-world.md',
    },
  })
}
```

```ts
type getStaticPropsForTina = (args: {
  query: string
  variables?: object
}) => Promise<{
  query: string
  variables?: object
  data: object
}>
```

> Note: for now, TinaCMS only supports static data fetching, so you must use `getStaticProps` (and `getStaticPaths` for dynamic pages). We'll be opening up more capabilities in the near future!

## `<TinaCMS>`

To make data editable live on your site, you'll need to set up the TinaCMS context. The default import from `tinacms` is a context provider which sets up everything for you. You'll notice we're using a render prop pattern to pass `livePageProps` into your component.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // Required: The query from your `getStaticProps` request
      query={pageProps.query}
      // Required: The variables from your `getStaticProps` request
      variables={pageProps.variables} // Variables used in your query
      // Required: The data from your `getStaticProps` request
      data={pageProps.data}
      // Optional: Set to true when working with the local API
      isLocalClient={true}
      // Optional: When using Tina Cloud, specify the git branch
      branch="main"
      // Optional: Your identifier when connecting to Tina Cloud
      clientId="<some-id-from-tina-cloud>"
      // Optional: A callback for altering the CMS object if needed
      cms={cms => {}}
      // Optional: A callback for altering the form generation if needed
      formify={args => {}}
      // Optional: A callback for altering the document creator plugin
      documentCreator={args => {}}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

## `<EditState />`

We can leverage Next.js `dynamic` imports to avoid bundling TinaCMS with your production build:

```tsx
// pages/_app.js
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const App({ Component, pageProps }) {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS {...pageProps}>
            {livePageProps => <Component {...livePageProps} />}
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

You can enter and exit edit mode by tapping into the `useEditState` hook, a common pattern is to place this hook on an "admin" page, which simply puts you into edit mode and sends you back to the page you were on:

```tsx
// pages/admin.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useEditState } from 'tinacms/dist/edit-state'

const GoToEditPage = () => {
  const { editState, setEdit } = useEditState()
  const router = useRouter()
  useEffect(() => {
    setEdit(!editState)
    // Go back to the page you were on previously
    router.back()
  }, [])
  // Display a brief message to the user
  return <div>Going into edit mode...</div>
}

export default GoToEditPage
```

Note that the `tinacms/dist/edit-state (>2kb)` code _will_ be in your production bundle with this pattern.

## Low-level APIs

For more control, you may want to reach into the building blocks of TinaCMS.

### `Client`

The `Client` does a few things:

- Manages auth with Tina Cloud
- Provides a `request` function for working with the GraphQL API

Start by initializing the `LocalClient` - which automatically connects with your locally-running GraphQL server. From there, you can make GraphQL requests:

#### `client.request`

```ts
const client = new LocalClient()

await client.request(
  gql => gql`#graphql
query BlogPostQuery($relativePath: String!) {
  {
    getPostsDocument(relativePath: "") {
      data {
        title
      }
    }
  }
}
`,
  { variables: { relativePath: 'hello-world.md' } }
)
```

> This API currently doesn't support filtering and sorting "list" queries. We have plans to tackle that in upcoming cycles.

#### Configuration

```ts
import { Client, LocalClient } from 'tinacms'
const client = new Client({
  branch: 'main',
  clientId: 'the client ID you get from Tina Cloud',
  tokenStorage: 'LOCAL_STORAGE' | 'MEMORY' | 'CUSTOM',
})

// For a simpler setup while working locally you can instantiate the LocalClient as a convenience
const client = new LocalClient()
```

### `useGraphQLForms`

While GraphQL is a great tool, using it with Tina can be difficult. GraphQL can query across multiple nodes, but since each document would require its own Tina form it could be difficult to sync the data with your query with all of the forms you'd need to build. The Tina GraphQL server knows all about your content schema so we're actually able to build forms automatically by inspecting your query. To see this in action, pass your query into the `useGraphqlForms` hook:

```tsx
import { useGraphqlForms } from 'tinacms'

const query = gql => gql`#graphql
  query BlogPostQuery($relativePath: String!) {
    {
      getPostsDocument(relativePath: $relativePath) {
        data {
          title
        }
      }
    }
  }
`

const MyPage = (props) => {
  const [payload, isLoading] = useGraphqlForms<PostQueryResponseType>({
    query,
    variables: { relativePath: `${props.filename}.md` },
  });

  isLoading ? <div>Loading...</div> : <MyComponent {...payload}>
}
```

If Tina is enabled you can see a form for the `getPostsDocument` request. If you query for multiple documents, you should see multiple forms:

```tsx
const query = gql => gql`#graphql
  query BlogPostQuery($relativePath: String!) {
    {
      # this generates a Tina Form
      getSiteNavsDocument(relativePath: "site-nav.md") {
        data {
          items {
            title
            link
          }
        }
      }
      # this generates a separate Tina Form
      getPostsDocument(relativePath: $relativePath) {
        data {
          title
        }
      }
    }
  }
`
```

#### Formify

If you'd like to control the output of those forms, tap into the `formify` callback:

##### Form customization

```tsx
import { useGraphqlForms } from 'tinacms'
import { Form, GlobalFormPlugin, useCMS } from 'tinacms'

const [payload, isLoading] = useGraphqlForms({
  query,
  formify: ({ formConfig, createForm, skip }) => {
    if (formConfig.id === 'getSiteNavsDocument') {
      const form = new Form(formConfig)
      // The site nav will be a global plugin
      cms.plugins.add(new GlobalFormPlugin(form))
      return form
    }

    return createForm(formConfig)
  },
  variables: { relativePath: `${props.filename}.md` },
})

// or to skip the nav from creating a form altogether:
const [payload, isLoading] = useGraphqlForms({
  query,
  formify: ({ formConfig, createForm, skip }) => {
    if (formConfig.id === 'getSiteNavsDocument') {
      return skip()
    }

    return createForm(formConfig)
  },
  variables: { relativePath: `${props.filename}.md` },
})
```

##### Field customization

Since your forms are built automatically, `formify` can also be used to customize fields:

```tsx
const [payload, isLoading] = useGraphqlForms({
  query,
  formify: ({ formConfig, createForm, skip }) => {
    return createForm({
      ...formConfig,
      fields: formConfig.fields.map(field => {
        if (field.name === 'title') {
          // replace `text` with `textarea`
          field.component = 'textarea'
        }
        return field
      }),
    })
  },
  variables: { relativePath: `${props.filename}.md` },
})
```

### `useDocumentCreatorPlugin`

This hook allows your editors to safely create new pages. Note that you'll be responsible for redirecting the user after a new document has been created. To use this:

```tsx
import { useDocumentCreatorPlugin } from 'tinacms'

// args is of type:
// {
//   collection: {
//     slug: string;
//   };
//   relativePath: string;
//   breadcrumbs: string[];
//   path: string;
// }
useDocumentCreatorPlugin(args => window.location.assign(buildMyRouter(args)))
```

#### Customizing the content creator options

To prevent editors from creating documents from certain collections, provide a filter function:

```tsx
// options are of type:
// {
//   label: string;
//   value: string;
// }[]
useDocumentCreatorPlugin(null, options =>
  options.filter(option => option.name !== 'post')
)
```
