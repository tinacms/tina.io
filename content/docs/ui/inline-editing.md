---
title: Inline Editing
prev: /docs/media
next: /docs/ui/inline-editing/inline-text
consumes:
  - file: /packages/react-tinacms-inline/src/inline-form.tsx
    description: InlineForm
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: InlineField
last_edited: '2020-11-27T01:24:22.267Z'
---
_Inline Editing_ in Tina refers to editing values directly in the area they appear on the page, instead of in the Tina sidebar. These are the **general steps** to set up inline editing:

1. [Configure ](/docs/ui/inline-editing#adding-inline-editing-with-inlineform)_[InlineForm](/docs/ui/inline-editing#adding-inline-editing-with-inlineform)_
2. [Add Inline Fields](/docs/ui/inline-editing#using-preconfigured-inline-fields)

> Play around with this [simple demo](https://logan-anderson.github.io/cra-hosted-demo/) to get a feel for Inline Editing. Get familiar with the Inline Editing API in this [step-by-step guide](/guides/general/inline-blocks/overview).

## Adding Inline Editing with _InlineForm_

The `InlineForm` and `InlineField` components can be used to set up inline editing in your layout. `InlineForm` receives the form object created via one of the [form hooks](/docs/plugins/forms) in order to provide it to the inline editing context.

`InlineForm` should wrap the page or component where you want to add inline editing, turning the _page into the form itself_. Below is an example of adding `InlineForm` to a page component:

```diff

import * as React from React
import { useForm, usePlugin } from 'tinacms'
+import { InlineForm } from 'react-tinacms-inline'

export function Page(props) {
  const [modifiedValues, form] = useForm(props.data)

  usePlugin(form)

  return (
+   <InlineForm form={form}>
      <main>
        <h1>{modifiedValues.title}</h1>
      </main>
+   </InlineForm>
  )
}
```

The Inline Form alone won't change any behavior. To edit on the page, you'll need to add [Inline Fields](/docs/ui/inline-editing#all-inline-fields).

## Using Pre-configured Inline Fields

The `react-tinacms-inline` package provides a set of pre-configured Inline Fields that should **work for many use cases**. These fields provide basic input elements and handle the rendering logic between edit and preview mode.

Let's add some Inline Fields using the previous example:

```diff
import * as React from React
import { useForm, usePlugin } from 'tinacms'
+import { InlineForm, InlineText } from 'react-tinacms-inline'

export function Page(props) {
  const [modifiedValues, form] = useForm(props.data)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <main>
-       <h1>{modifiedValues.title}</h1>
+       <h1>
+         <InlineText name="title" />
+       </h1>
      </main>
    </InlineForm>
  )
}
```

All Inline Fields expect a `name` prop, as with regular [Tina Fields](/docs/plugins/fields#name), the value should be the path to the data being edited by that field. Refer to individual inline field docs to see their specific properties.

> Check out [the final-form docs](https://final-form.org/docs/final-form/field-names) for a more detailed look at how the `name` field works.

### All Inline Fields

Currently, these supported Inline Fields available:

* [Inline Text](/docs/ui/inline-editing/inline-text)
* [Inline Textarea](/docs/ui/inline-editing/inline-textarea)
* [Inline Wysiwyg](/docs/ui/inline-editing/inline-wysiwyg)
* [Inline Image](/docs/ui/inline-editing/inline-image)
* [Inline Group](/docs/ui/inline-editing/inline-group)
* [Inline Blocks](/docs/ui/inline-editing/inline-blocks)

## Creating Custom Inline Fields

There may be cases where you want to create your own Inline Fields. The `InlineField` component allows you to create a custom _Inline Field_. This is helpful when you need precise control over rendering or input functionality.

First, make sure your component is wrapped in an `InlineForm`. You can then add `InlineField` components, a render props-based component that allows you to conditionally display an editing interface (when in edit mode) or the page as it will appear in production.

The **rough idea** is like this:

```jsx
<InlineForm form={formObject}>
  <InlineField name="path-to-data">
    {({ input }) => {
      if (cms.enabled) {
        // we're in editing mode, show an editable interface
      } else {
        // we're not in editing mode, show the production layout
      }
    }}
  </InlineField>
</InlineForm>
```

Below is an example of the `Page` component used in previous examples, but refactored to define its own custom Inline Fields:

```js
import * as React from React
// import `useCMS`
import { useForm, useCMS, usePlugin } from 'tinacms'
import { InlineForm, InlineField } from 'react-tinacms-inline'

export function Page(props) {
  // Access the CMS object
  const cms = useCMS()

  const [, form] = useForm(props.data)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <main>
      {/**
      * Use `InlineField` and the render props
      * pattern to create custom field inputs
      * that render when the cms is enabled
      */}
        <InlineField name="title">
          {({ input }) => {
            if (cms.enabled) {
              return <input type="text" {...input} />
            }
            return <h1>{input.value}</h1>
          }}
        </InlineField>
      </main>
    </InlineForm>
  )
}
```

`InlineField` uses [render props](https://reactjs.org/docs/render-props.html) to pass the form state and other props to its children. Based on `cms.enabled`, you can conditionally render editing inputs or the original element / value.

> If you have an idea for an Inline Field plugin, consider contributing! [Make an issue](https://github.com/tinacms/tinacms/issues) with your suggestion or reach out on [the forum](https://community.tinacms.org/) for support.

## Extending Inline Field Styles

**Via Styled-Components**

The Inline Fields are meant to have minimal styles. But there may be situations where you'll want to override the base styles. This is made possible via [Styled Components](https://styled-components.com/docs/basics#extending-styles).

```jsx
// An example `InlineText` with Extended Styles
export function Page(props) {
  const [, form] = useForm(props.data)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <main>
        <StyledText name="title" />
      </main>
    </InlineForm>
  )
}

// Extended InlineText styled component
const StyledText = styled(InlineText)`
  color: green;
`
```

Notice how the new component, `StyledText` is just a _styled_ version of `InlineText`.

**Via Class Name**

You can also extend styles by assigning a `className` to the Inline Field.

```jsx
    // In an Inline Form
    <InlineImage
      name="frontmatter.image"
      uploadDir={() => '/public/images/'}
      parse={media => media.id}
      className="inline-img"
    />

    // Style via className in css
    .inline-img {
      background-color: pink;
    }
```

### Fields Available to Extend Styles

* [Inline Text](/docs/ui/inline-editing/inline-text)
* [Inline Textarea]()
* [Inline Blocks](/docs/ui/inline-editing/inline-blocks)
* [Inline Image](/docs/ui/inline-editing/inline-image)

## Additional Reading

* A guide — [Working With Inline Blocks](/guides/general/inline-blocks/overview)
* `react-tinacms-inline` package [documentation](/docs/ui/inline-editing/inline-textarea)