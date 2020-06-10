---
title: JSON in Gatsby
prev: /docs/gatsby/markdown
next: /docs/gatsby/configure-git-plugin
consumes:
  - file: /packages/gatsby-tinacms-json/src/use-json-form.ts
    details: Demonstrates use of useJsonForm and JsonForm
  - file: /packages/@tinacms/forms/src/form.ts
    details: Explains form options interface
---

## Editing JSON in Gatsby

Creating forms for content provided by the [`gatsby-transformer-json`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json) plugin is made possible by two plugins:

- `gatsby-tinacms-json`: Provides hooks and components for creating JSON forms.
- `gatsby-tinacms-git`: Extends the gatsby dev server to write changes to the local filesystem;
  and registers a [CMS API](/docs/cms#apis) for saving changes to that backend.

**Note on top-level arrays:**

_With Gatsby_, due to the way [`gatsby-transformer-json`](https://www.gatsbyjs.org/packages/gatsby-transformer-json/) handles JSON, Tina cannot accept a top-level array in the JSON file. For example:

```json
[{ "breakfast": "granola" }, { "lunch": "tacos" }, { "dinner": "pizza" }]
```

If you need a top-level array of objects like above, we recommend creating separate JSON files for each object. If you want to keep the data in one file, we recommend creating a single top-level object with the array nested as a value. For example:

```json
{
  "menu": [
    { "breakfast": "granola" },
    { "lunch": "tacos" },
    { "dinner": "pizza" }
  ]
}
```

If you adjust your data structure, it may affect the way you query for the file in Gatsby. [Read more on the specifics of how JSON files are transformed to nodes in GraphQL](https://www.gatsbyjs.org/packages/gatsby-transformer-json/#parsing-algorithm).

### Installation

```
    npm install --save gatsby-source-filesystem gatsby-transformer-json gatsby-tinacms-git gatsby-tinacms-json
```

or

```
    yarn add gatsby-source-filesystem gatsby-transformer-json gatsby-tinacms-git gatsby-tinacms-json
```

### Configuring Gatsby

**gastby-config.js**

```javascript
module.exports = {
  plugins: [
    // ...
    'gatsby-tinacms-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'data',
      },
    },
    'gatsby-transformer-json',
  ],
}
```

This will create a node for each json file in the `src/data` directory. You can then query that data like so:

```graphql
query MyQuery {
  dataJson(firstName: { eq: "Nolan" }) {
    lastName
    firstName
  }
}
```

## Creating JSON Forms

There are two approaches to registering JSON forms with Tina. The approach you choose depends on whether the React template is a class or function.

1. [`useJsonForm`](#useJsonForm): A [Hook](https://reactjs.org/docs/hooks-intro.html) used when the template is a function.
2. [`JsonForm`](#JsonForm): A [Render Props](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns) component to use when the template is a class component.

#### Note: required query data

In order for the JSON forms to work, you must include the following fields in your `dataJson` graphql query:

- `rawJson`
- `fileRelativePath`

An example `dataQuery` in your template might look like this:

    query DataQuery($slug: String!) {
      dataJson(fields: { slug: { eq: $slug } }) {
        id
        firstName
        lastName

        rawJson
        fileRelativePath
      }
    }

Additionally, any fields that are **not** queried will be deleted when saving content via the CMS.

### useJsonForm

This is a [React Hook](https://reactjs.org/docs/hooks-intro.html) for creating Json Forms.
This is the recommended approach if your template is a Function Component.

In order to use a form you must register it with the CMS. There are two main approaches to register forms in Tina: page forms and screen plugins. Please refer to the [form concepts](/docs/forms) doc to get clarity on the differences.

**Interface**

```typescript
useJsonForm(data): [values, form]
```

**Arguments**

- `data`: The data returned from a Gatsby `dataJson` query.

**Return**

- `[values, form]`
  - `values`: The current values to be displayed. This has the same shape as the `data` argument.
  - `form`: A reference to the [CMS Form](/docs/forms) object. The `form` is rarely needed in the template.

#### Example 1: Page Forms

**src/templates/blog-post.js**

```jsx
import { usePlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'

function BlogPostTemplate(props) {
  const [data, form] = useJsonForm(props.data.dataJson)

  usePlugin(form)

  return <h1>{data.firstName}</h1>
}
```

#### Example 2: Forms as Screens

Screens are additional UI modals accessible from the CMS menu. The `useFormScreenPlugin` let's us create and register new Screen Plugin based on a form. This is a great place to put forms for content that doesn't belong on any particular page.

**src/components/layout.js**

```jsx
import { useFormScreenPlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'

function Layout(props) {
  const [data, form] = useJsonForm(props.data.dataJson)

  useFormScreenPlugin(form)

  return <h1>{data.firstName}</h1>
}
```

### JsonForm

`JsonForm` is a [Render Props](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)
based component for accessing [CMS Forms](/docs/forms).

This Component is a thin wrapper of `useJsonForm` and `usePlugin`. Since [React Hooks](https://reactjs.org/docs/hooks-intro.html) are
only available within Function Components you will need to use `JsonForm` if your template is Class Component.

**Props**

- `data`: The data returned from a Gatsby `dataJson` query.
- `render({ data, form }): JSX.Element`: A function that returns JSX elements
  - `data`: The current values to be displayed. This has the same shape as the data in the `Json` prop.
  - `form`: A reference to the [CMS Form](/docs/forms) object. The `form` is rarely needed in the template.

**src/templates/blog-post.js**

```jsx
import { JsonForm } from 'gatsby-tinacms-json'

class DataTemplate extends React.Component {
  render() {
    return (
      <JsonForm
        data={this.props.data.dataJson}
        render={({ data }) => {
          return <h1>{data.firstName}</h1>
        }}
      />
    )
  }
}
```

## Customizing Json Forms

When using a json form with Tina, the shape of the data will initially be created with simple default text components. However, you may want to use Tina's more advanced components or specify things like labels etc. for each field.

**Why customize the form?**

1. The default `label` for a field is it’s `name`.
2. Every field is made a `text` component.
3. The order of fields might not be consistent.

**How to customize the form**

The `useJsonForm` hook accepts an optional `config` object for overriding the default configuration. The following properties are accepted:

- `label`: An optional label for the file
- `actions`: A list of form actions, such as [DeleteAction](https://tinacms.org/docs/gatsby/creating-new-files#deleting-files)
- `fields`: A list of field definitions
  - `name`: The path to some value in the data being edited. (e.g. `rawJson.title`)
  - `component`: The name of the React component that should be used to edit this field. The default options are: `"text"`, `"textarea"`, `"color"`.
  - `label`: A human readable label for the field.
  - `description`: An optional description that expands on the purpose of the field or prompts a specific action.

> _Note:_ there may be additional properties specific to each field, but the above are the rudimentary properties of every field. Check the **Fields** section of the docs for particulars on the properties for each field.

```js
import { usePlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'

function Page(props) {
  const [page, form] = useJsonForm(props.data.page, FormOptions)

  usePligin(form)

  return (
    <section>
      <Wrapper>
        <h2>{page.hero_copy}</h2>
        <p>{page.supporting_copy}</p>
      </Wrapper>
    </section>
  )
}

const FormOptions = {
  fields: [
    {
      label: 'Hero Copy',
      name: 'rawJson.hero_copy',
      description: 'Hero copy for the main block',
      component: 'text',
    },
    {
      label: 'Supporting Copy',
      name: 'rawJson.supporting_copy',
      description: 'Choose your supporting copy for the hero',
      component: 'textarea',
    },
  ],
}

export default Page
```

> _Important:_ You may need to implement default values or dummy files to avoid a GraphQL error when a field is empty. Take a look at our [empty field troubleshooting guide](https://tinacms.org/docs/gatsby/markdown#avoiding-errors-caused-by-empty-fields) for more information.
