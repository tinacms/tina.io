---
title: Customizing Forms
---

With a [Form](/docs/plugins/forms) created, you can now edit your data files in the Tina sidebar. Content changes are written to the files in real time. Hitting `Save` will commit those changes to your repository.

## Customizing Remark or JSON Forms

Tina's form [hooks or components](/guides/gatsby/git/create-remark-form) create the form based on the shape of the data. This is convenient for getting started but you will want to customize the form eventually to make it more user friendly.

**Why customize the form?**

1. The default `label` for a field is it's `name`.
2. Every field is made a `text` component.
3. The order of fields might not be consistent.

**How to customize the form**

You can pass additional configuration options to customize the form. Refer to the [Form documentation](/docs/plugins/forms#form-configuration) to see the entire list of form options.

> _Note:_ there may be additional properties specific to each field, but the above are the rudimentary properties of every field. Check the [**Fields**](/docs/plugins/fields) section of the docs for particulars on the properties for each field.

Below are some basic examples of _Form Configuration_ objects for the components used in previous examples.

### _useRemarkForm_ Example

```js
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'
import { graphql } from 'gatsby'

export default function BlogPostTemplate(props) {
  // 1. Define the form
  const FormOptions = {
    label: 'Blog Post',
    fields: [
      {
        label: 'Title',
        name: 'frontmatter.title',
        description: 'Enter the title of the post here',
        component: 'text',
      },
      {
        label: 'Description',
        name: 'frontmatter.description',
        description: 'Enter the post description',
        component: 'textarea',
      },
    ],
  }

  // 2. Pass the form as the second argument
  const [markdownRemark, form] = useRemarkForm(
    props.markdownRemark,
    FormOptions
  )

  // 3. Register the form as a plugin
  usePlugin(form)

  return (
    <>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.description}</p>
    </>
  )
}
```

### _useJsonForm_ Example

```js
import { usePlugin } from 'tinacms'
import { useJsonForm } from 'gatsby-tinacms-json'
import { graphql } from 'gatsby'

export default function Page(props) {
  // Create the form
  const [data, form] = useJsonForm(props.data.page, FormOptions)

  // Register the form with the CMS
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

// Define the Form Options
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
```

After configuring the form, you should see some changes to the form & fields in the sidebar. These examples show simple [field types](https://tinacms.org/docs/plugins/fields), but there are many default field options provided by the CMS. You can even [create your own fields](https://tinacms.org/docs/plugins/fields/custom-fields).

You may need to implement default values or dummy files to avoid a GraphQL error when a field is empty. Next, we'll look at how to avoid these empty field errors.
