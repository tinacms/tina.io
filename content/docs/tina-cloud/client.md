---
title: Tina Cloud Client
---

The Tina Cloud Client allows you to interact with an automatically generated GraphQL API using TinaCMS. Included are multiple GraphQL adapters that give you a consistent GraphQL API regardless of your datasource.

_For example, if your content is Git-backed, you might want to use your local content in development. While in your production Cloud Editing Environment, you can use our "Tina Teams" server to fetch your content. The API for both backends will be consistent, so you can easily switch between the two datasources without changing your site's code._

If you like to work in TypeScript, the [tina-graphql-gateway-cli](https://github.com/tinacms/tina-graphql-gateway/tree/master/packages/cli) package can generate types using the same schema definition that the GraphQL adapters will use.

## Prerequisites

This guide assumes you have a working NextJS site. You can create one quickly with:

```bash
npx create-next-app --example blog-starter-typescript blog-starter-typescript-app
```

or

```bash
yarn create next-app --example blog-starter-typescript blog-starter-typescript-app
```

## Install the client package

This package provides you with:

- A `Client` class (which you can use as a TinaCMS API Plugin), that takes care of all interaction with the GraphQL server.
- A `LocalClient` class - which talks to the local server if you've got one. Ideal for static builds and developement testing.
- A `useGraphqlForms` hook, that you can use to hook into the Tina forms that let you edit your content.

```bash
npm install --save tina-graphql-gateway
```

or

```bash
yarn add tina-graphql-gateway
```

## CLI package

You'll also likely want to install our CLI to help with development:

```bash
npm install --save-dev tina-graphql-gateway-cli
```

or

```bash
yarn add --dev tina-graphql-gateway-cli
```

This CLI performs a few functions:

- Generates GraphQL and TypeScript types based on your content's schema.
- Auditing your content's schema and checking for errors.
- Running a GraphQL server using the built-in filesystem adapter.

For full documentation of the CLI, see [here].(https://github.com/tinacms/tina-graphql-gateway/tree/main/packages/cli)

## Implementation

We'll show how to use this package in a NextJS site

### Create Dummy Content

Let's start by creating a simple dummy piece of content. Our goal will to be able to access and change this content through an auto-generated GraphQL API and Tina forms.

**/\_posts/welcome.md**

```md
---
title: This is my post
---
```

### Configuration

Before we can define the schema of our content, we need set up some configuration. Create a `.tina/` directory in your repository root, and then create a `schema.ts` file inside of this directory.

**.tina/schema.ts**

```ts
import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      /*
      Each collection references a list of files 
      matching the pattern in `path`. In this case, 
      all files in the `_posts` directory will be 
      included in this collection.
      */
      path: '_posts',
      label: 'Posts',
      name: 'posts',

      templates: [
        {
          /*
          A collection will have one or more templates
          that define the shape of its entities' data.
          */
          label: 'Post',
          name: 'post',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
})
```

### Sourcing your content

Now that we have defined our content model, we can connect our site to the Tina.io Content API

_Make sure your .tina directory is pushed to git_

#### Creating a Tina.io app

The Tina.io content API connects to your Github repository, and puts the content behind Tina.io's expressive content API.

- Navigate to [Tina.io](https://auth.tinajs.dev/)
- Create a realm
- Create an app

You will then see a client-id for your new app. We will use this shortly.

#### Using the data within our Next.JS site

First, install the TinaCMS dependencies:

```bash
npm install tinacms styled-components
```

or

```bash
yarn add tinacms styled-components
```

In your site root, add TinaCMS & register the `Client` like so:

**\_app.tsx**

```tsx
import React from 'react'
import { withTina } from 'tinacms'
import { Client } from 'tina-graphql-gateway'
import config from '../.forestry/config'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withTina(MyApp, {
  apis: {
    tina: new Client({
      realm: 'your-realm-name', // this was set by you in the previous step
      clientId: 'your-client-id', // this is visible in your Tina.io dashboard
      // customContentApiUrl: "", // might be used to swap out or proxy through a custom backend service.
      // tokenStorage: (Default Memory). Possible values: "MEMORY" | "LOCAL_STORAGE" | "CUSTOM".
      // NOTE: If you choose to use LOCAL_STORAGE, you may be prone to CSRF vulnerabilities.
      // getTokenFn: undefined, // This is only used when "tokenStorage" is set to "CUSTOM". Instead of grabbing the token from local storage, we can specify how its access token is retreived. You might want to use this if you are fetching content server-side.
    }),
  },
  sidebar: true,
})
```

We'll also want to wrap our main layout in the `TinaCloudProvider` to support authentication

```tsx

//...

function MyApp({ Component, pageProps }) {

  const client = useCMS().api.tina

  return (<TinaCloudProvider
    onLogin={(token: string) => {
      const headers = new Headers()

      //TODO - the token should could as a param from onLogin
      headers.append('Authorization', 'Bearer ' + token)
      fetch('/api/preview', {
        method: 'POST',
        headers: headers,
      }).then(() => {
        window.location.href = '/'
      })

    }}
    onLogout={() => {console.log('exit edit mode')}}
  ><Component {...pageProps} />)
}

//...

```

This Next implementation relies on a backend function to save its auth details.

```tsx
// /pages/api/preview.ts
import Cookies from 'cookies'

const preview = (req: any, res: any) => {
  const token = (req.headers['authorization'] || '').split(' ')[1] || null

  res.setPreviewData({})

  const cookies = new Cookies(req, res)
  cookies.set('tinaio_token', token, {
    httpOnly: true,
  })

  res.end('Preview mode enabled')
}

export default preview
```

The last step is to add a way for the user to enter edit-mode. Let's create a `/login` page.

```tsx
// /pages/login.tsx
import { useCMS } from 'tinacms'

export default function Login(props) {
  const cms = useCMS()

  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
```

Your users should at this point be able to login and view their content from Tina.io's API. We will also want the site to build outside of edit-mode, for your production content.

#### Creating a local GraphQL server

Now that we've defined our schema, let's use the CLI to setup a GraphQL server for our site to use locally, or during production builds.

**Start your local GraphQL server by running:**

```bash
npx tina-gql server:start
```

or

```bash
yarn tina-gql server:start
```

**pages/welcome.tsx**

```tsx
import { useGraphqlForms, LocalClient } from "tina-graphql-gateway";
// These are your generated types from CLI
import type * as Tina from "../.tina/types";

interface ContentQueryResponse {
  getDocument: Tina.SectionDocumentUnion;
}

interface QueryVars {
  relativePath: string;
  section: string;
}

const query = (gql) => gql`
  query ContentQuery($section: String!, $relativePath: String!) {
    getDocument(section: $section, relativePath: $relativePath) {
      __typename
      ... on Pages_Document {
        data {
          ... on Page_Doc_Data {
            name
          }
        }
      }
    }
  }
`;

export async function getServerSideProps({ params }) {
  const client = new LocalClient();

  export const request = async (
    client: Client,
    variables: { section: string; relativePath: string }
  ) => {
    const queryVars = {
      relativePath: "welcome.md",
      section: "pages",
    };
    const content = await client.requestWithForm(query, {
      variables: queryVars,
    });

    return { props: { content, queryVars } };
  };
}

export default function Page(props: {
  content: ContentQueryResponse;
  queryVars: QueryVars;
}) {
  const [response, isLoading] = useGraphqlForms<ContentQueryResponse>({
    query,
    variables: props.queryVars,
  });

  // initialize with production content & hydrate with development content once loaded
  const docData = isLoading ? props.content.getDocument : response.getDocument;

  return <MyComponent {...docData} />;
}
```

Now, if you navigate to [/pages/welcome](http://localhost:3000/pages/welcome) you should see your production content. Once you log-in, you should also be able to update your content using the TinaCMS sidebar.

> TIP: If you have a GraphQL client like [Altair](https://altair.sirmuel.design/), you can explore your graph at `http://localhost:4001/graphql`

Next steps:

- Make changes to our data-model, and verify our templates with `$ tina-gql schema:audit`
- Setup typescript types for your data-model

## Token storage

There are a few ways to store the authentication token:

### Local storage (Default)

Storing tokens in browser local storage persists the user session between refreshes & across browser tabs. One thing to note is; if an attacker is able to inject code in your site using a cross-site scripting (XSS) attack, your token would be vulernable.
To add extra security, a CSRF token can be implemented by using a proxy.

Within your client instantiation:

```ts
new Client({
  // ...
  identityProxy: '/api/auth/token',
})
```

From your site's server (This example uses NextJS's API functions)

```ts
// pages/api/auth/token

// ... Example coming soon
```

### In memory (Coming soon)

This is our recommended token storage mechanism if possible. Storing tokens in memory means that the user session will not be persisted between refreshes or across browser tabs. This approach does not require a server to handle auth, and is the least vulnerable to attacks.

## TypeScript and GraphQL Schema

We can automatically generate TypeScript types based on your schema by running the following command with the Tina Cloud CLI:

```bash
yarn tina-gql schema:types
```

This will create a TypeScript file at `.tina/types.ts` and a GraphQL schema file at `.tina/schema.gql`. The GraphQL schema file is useful for VS Code users who have the [GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql). You can configure it for your project by adding a `graphql.config.js` at the root of your project:

```js
// graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: ['.tina/schema.gql'],
      documents: 'pages/**/*.{graphql,js,ts,jsx,tsx}', // wherever you intend to use the GraphQL client
    },
  },
}
```

# Conceptual Overview

The goal of this package is to give developers the ability to automatically build Tina forms based on the data they're querying for. To that end this package is responsible for 2 things: Data fetching from the GraphQL API and connecting that data to a Tina form.

## Data-fetching:

```ts
const query = gql => gql`
  query ContentQuery($section: String!, $relativePath: String!) {
    getDocument(section: $section, relativePath: $relativePath) {
      __typename
      ... on Authors_Document {
        data {
          __typename
          ... on Author_Doc_Data {
            name
          }
        }
      }
    }
  }
`
const variables = {
  relativePath: 'welcome.md',
  section: 'pages',
}
const payload = await client.requestWithForm(query, {
  variables,
})
```

Note the function name `requestWithForm` - this will take your query and "hydrate" it with additional fields needed by Tina. We also expose a `request` function, which won't add any Tina form fields.

> It may be desirable to support other GraphQL clients like Apollo in the future, there's not much stopping us from doing this, but for simplicity, we're using `fetch` and not doing any caching or normalization on the client.

### Using the data on your site

As you can see there's nothing particularly special about this process - you query for data, pass it to your components, and render it out as you would with any other Headless CMS with a GraphQL API. Maintaining this workflow is one of the goals of this project, we'd like for it to be just as capable as any other CMS in that sense. However since we have a 100% type-safe schema that represents all of your content models, it means we can take things a bit further...

## Connecting to Tina forms

When working with Tina, you'll inevitably face a fork in the road: save content to a CMS, or use a free-form data store like `.json` or `.md` files. The tradeoffs are many, but a few things jump out as big questions you'll need to answer:

### Using free-form data stores

Pros:

- It's quick and easy to get started
- The Tina form config is the single source of truth for the shape of my data.

Cons:

- How will I ensure my data is valid?
- How will I connect pieces of content?
- ... and many other questions which led to the existence of CMSs in the first place

### Using a CMS

Pros:

- You get all of the power of a CMS while making it easy to maintain for your editors.

Cons:

- You need to duplicate your content model definitions as Tina forms, and you need to make sure they generate the same data types.
- You'll need a form for each record you fetch, and in many CMSs this is abstracted away behind a GraphQL API (more on this below)

We hope to offer the best of both options, using Tina forms while still having a single source of truth and the full power of a proper CMS all wrapped up under an expressive GraphQL API.

So to continue on with the code samples from above, passing the query and variables into the `useGraphqlForms` hook will initialize a form for each node in the query:

```ts
import { useGraphqlForms, useDocumentCreatorPlugin } from 'tina-graphql-gateway'

//...

const [result, isLoading] = useGraphqlForms({
  query: query,
  variables: variables,
})

// adds a document creator plugin for adding new documents based on your section configuration
useDocumentCreatorPlugin({
  // When creating a new document, you'll likely want to redirect the user to it.
  // `args` provides information about the file you've created and the section it belongs to.
  onNewDocument: args => {
    window.location.assign(myPathGenerator(args))
  },
})
```

The `result` variable here will have the identical data that you passed in from the `payload` variable, but as a side-effect we've generated Tina forms for each document node in your query and registered them with the CMS context.

---

## Why don't we use the `useForm` hook from `tinacms`?

If you're familiar with TinaCMS you'll notice that this looks similar to the hook it provides, but there are some slight differences:

With the TinaCMS hook:

- We pass the form config as an argument
- The sidebar isn't automatically registered
- The values we get back are **form** values

With the `tina-graphql-gateway` hook:

- We don't need to set any form configuration (this is already done in your template definitions), instead we passed our query.
- The sidebar is automatically registered

The key benefit here is you'll receive the data you queried for, meaning you don't need to do anything special for your content to work with Tina.

### Under the hood

When the hook receives a result from `requestWithForm`, there are additional fields that reflect what you would pass into Tina's [form configuration](https://tina.io/docs/plugins/forms/#form-configuration). Instead of requiring you to provide this (and force you to deal with multiple sources of truth), we initialize the form for you with all of the fields being built automatically.

### Keeping the benefits of GraphQL

GraphQL APIs resolve content relationships (like a graph!), this capability leads to some friction when you're building the form yourself. If you expect to query across relationships:

```graphql
{
  getDocument(...) {
    ...on Post_Document {
      data {
        ...on Post_Doc_Data {
          title
          # author is a reference to a separate document
          author {
            id
            ...on Author_Document {
              data {
                ...on Author_Doc_Data {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
```

How would this look as forms in Tina? We'd need to know that `author` is actually referencing another node, and we'd need to split our response into multiple forms. The `post` form would need to treat the `author` field as a reference (perhaps a select field with all possible "authors"), while the `author` from would be where you can alter the author's data. And to make things more difficult, when the `post` form changes its `author` value, you'll have to refetch the author data from the server and recreate that form.

```ts
const postFormConfig = {
  ...
  fields: [
    {
      name: 'title',
      label: 'Title',
      component: 'text',
    },
    {
      name: 'author',
      label: 'Author',
      component: 'select',
      options: [
        'path-to-author1.md',
        'path-to-author2.md',
      ]
    }
  ],
  initialValues: {
    title: payload.getDocument.data.title,
    // changes to this value mean we need to reset the `authorForm` with new data from the server
    author: payload.getDocument.data.author.id
  },
}
const authorFormConfig = {
  ...
  fields: [
    {
      name: 'name',
      label: 'Name',
      component: 'text',
    },
  ],
  initialValues: {
    name: payload.getDocument.data.author.data.name
  },
}
const [modifiedPostValues, postForm] = useForm(postFormConfig)
const [modifiedAuthorValues, authorForm] = useForm(authorFormConfig)
```

But when the `postForm`'s `author` field changes, the author form would be for the wrong author! So we'll have to connect those manually and refetch the author data from the server on each change. As you can see this is pretty cumbersome, and it unwinds any benefit we had from GraphQL in the first place.

We're referring to this as "The Author Problem", and it gets to the core of why we've found it useful to do the heavy lifting of Tina configuration automatically.

### What about field customization?

Since Tina gives you full control over your field components, you'll inevitably want to make some changes to provided field types or bring your own components entirely. This isn't currently possible but we're exploring where we'd like to put this logic. In general the `useForm` hook from `tina-gateway` should be able to compose anything the developer would like to provide while still orchestrating the form building automatically.

### What if I don't like GraphQL?

GraphQL is at the center of our solution, it's strict types are what allow us to generate a Tina form based on your `.tina` config, however using GraphQL for your website isn't for everyone - and we don't intend to make it mandatory. For now, the only way to work with the Content API is through GraphQL queries, but we hope to improve this package to the point that it's able to work without requiring the developer to write GraphQL if they don't want to.

An example of how this might look:

```ts
client.query.author('path-to-author.md')
// getting relational data
client.query.post('path-to-post.md').include('author')
// or making a mutation
client.mutation.post('path-to-post.md', {
  data: {
    some: 'data',
  },
})
```
