---
title: Advanced Usage
---

## Advanced Usage

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
    getPostDocument(relativePath: "") {
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
      getPostDocument(relativePath: $relativePath) {
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

If Tina is enabled you can see a form for the `getPostDocument` request. If you query for multiple documents, you should see multiple forms:

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
      getPostDocument(relativePath: $relativePath) {
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

xport default App
