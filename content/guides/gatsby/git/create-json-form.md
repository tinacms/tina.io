---
title: Creating JSON Forms
---

There are [two approaches](https://github.com/tinacms/tinacms/tree/master/packages/gatsby-tinacms-json) to registering JSON forms with Tina. In the example below, we will cover how to work with the `useJsonForm` hook.

## Create & Register the Form

`useJsonForm` is a [React Hook](https://reactjs.org/docs/hooks-intro.html) for creating JSON Forms. This hook works for functional components that source data from a [static query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query) using Gatsby's `useStaticQuery` hook. It also works with functional page components, using a [page query](https://www.gatsbyjs.org/docs/page-query/).

> `useJsonForm` only creates a form. In order to interact with the form, you must _register_ it with the CMS. There are two main approaches to register forms in Tina: page forms and screen plugins. Please refer to the [form concepts](/docs/plugins/forms#registering-forms) doc to get clarity on the differences. In the examples below, we will only use the `usePlugin` hook to register the form.

### _useJsonForm_

As it's first argument, `useJsonForm` accepts the data returned from a Gatsby `dataJson` query. The second argument is a `formConfig` object; we will cover that in the next step.

Similar to other form helpers, this hook returns the data to be rendered in the component and the [`form`](/docs/plugins/forms) connected with those editable values.

### Required Query Data

In order for the JSON forms to work, you must include the following fields in your `dataJson` graphql query:

- `rawJson`
- `fileRelativePath`

An example `dataQuery` in your template might look like this:

```diff
query DataQuery($slug: String!) {
  dataJson(fields: { slug: { eq: $slug } }) {
    id
    firstName
    lastName
+   rawJson
+   fileRelativePath
  }
}
```

> Any fields that are **not** queried will be deleted when saving content via the CMS.

### Example

Below is an example of how to use this hook:

1. Import the `usePlugin` & `useJsonForm` hooks.
2. Create the form by calling `useJsonForm` with the return data from the `dataJson` query.
3. Register the page form with the CMS by calling `useForm` and passing the `form` returned from `useJsonForm`.
4. Add `rawJson` and `fileRelativePath` to the `dataJson` query.

**src/pages/page.js**

```jsx
// 1. import `usePlugin` & `useJsonForm`
import { usePlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'
import { graphql } from 'gatsby'

export default function Page(props) {
  // 2. Create the form
  const [data, form] = useJsonForm(props.data.dataJson, FormOptions)

  // 3. Register the form with the CMS
  usePlugin(form)

  return (
    <section>
      <Wrapper>
        <h2>{data.hero_copy}</h2>
        <p>{data.supporting_copy}</p>
      </Wrapper>
    </section>
  )
}

// 4. Add the required query parameters
export const pageQuery = graphql`
  dataJson(fields: { slug: { eq: $slug } }) {
    id
    hero_copy
    supporting_copy
    rawJson
    fileRelativePath
  }
}
`
```

After creating and registering the form in your component, restart the dev server and you should see a form in the sidebar populated with default text fields in the sidebar. Try editing one of the values and watch it live update on your site.

> _Note:_ You will only see the associated form in the sidebar if the component is currently rendered on the page.

To customize the form with different [fields](/docs/plugins/fields), you can pass in a config options object as the second parameter. Let's do that next.
