---
title: Customizing JSON Forms
---

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
  // Create the form
  const [page, form] = useJsonForm(props.data.page, FormOptions)

  // Register the form with the CMS
  usePlugin(form)

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
