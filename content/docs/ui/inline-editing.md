---
title: Inline Editing
prev: /docs/media
next: /docs/ui/inline-editing/inline-text
consumes:
  - file: /packages/react-tinacms-inline/src/inline-form.tsx
    description: InlineForm
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: InlineField
---

_Inline Editing_ in Tina refers to editing values directly in the area they appear on the page, instead of in the Tina sidebar. These are the **general steps** to set up inline editing:

1. [Configure ](/docs/ui/inline-editing#adding-inline-editing-with-inlineform)_[InlineForm](/docs/ui/inline-editing#adding-inline-editing-with-inlineform)_
2. [Add Inline Fields](/docs/ui/inline-editing#using-preconfigured-inline-fields)

> Play around with this [simple demo](https://logan-anderson.github.io/cra-hosted-demo/) to get a feel for Inline Editing. Get familiar with the Inline Editing API in this [step-by-step guide](/guides/general/inline-blocks/overview).

## Adding Inline Editing with _InlineForm_

The `InlineForm` and `InlineField` components can be used to set up inline editing in your layout. `InlineForm` receives the form object created via one of the [form hooks](/docs/plugins/forms) in order to provide it to the inline editing context.

> Note that it is important to **use a hook to register a form** instead of an HOC or Render Props component. Depending on the Tina packages you are using, the hook names may differ than those seen in the examples.

`InlineForm` should wrap the page or component where you want to add inline editing, turning the _page into the form itself_. You can then nest multiple `InlineField` components, a render props-based component that allows you to conditionally display an editing interface (when in edit mode) or the page as it will appear in production.

The **rough idea** is like this:

```jsx
<InlineForm form={formObject}>
  <InlineField name="name-of-the-field">
    {({ input, status }) => {
      if (status === 'active') {
        // we're in editing mode, show an editable interface
      } else {
        // we're not in editing mode, show the production layout
      }
    }}
  </InlineField>
</InlineForm>
```

### Example

Let's take a modified version of the simplistic example from the [form documentation](/docs/plugins/forms):

```jsx
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useForm, usePlugin } from 'tinacms'

export function Page(props) {
  const [modifiedValues, form] = useForm(props.data)

  usePlugin(form)

  return (
    <main>
      <h1>{modifiedValues.title}</h1>
      <ReactMarkdown source={modifiedValues.markdownContent}>
    </main>
  )
}
```

Using `InlineForm` and `InlineField` from `react-tinacms-inline`, we would rewrite the Page component as follows:

```tsx
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useForm } from 'tinacms'
import { Wysiwyg } from 'react-tinacms-editor'
import { InlineForm, InlineField } from 'react-tinacms-inline'

export function Page(props) {
  /*
   ** The `modifiedValues` aren't
   ** called directly, so we only
   ** need the form object
   */
  const [, form] = useForm(props.data)

  return (
    <InlineForm form={form}>
      <main>
        <InlineField name="title">
          {({ input, status }) => {
            if (status === 'active') {
              return <input type="text" {...input} />
            }
            return <h1>{input.value}</h1>
          }}
        </InlineField>
        <InlineField name="markdownContent">
          {({ input, status }) => {
            if (status === 'active') {
              return <Wysiwyg input={input} />
            }
            return <ReactMarkdown source={input.value} />
          }}
        </InlineField>
      </main>
    </InlineForm>
  )
}
```

## Using Pre-configured Inline Fields

When using `InlineField`, you can create a custom _Inline Field_. This is helpful when you need precise control over rendering or input functionality.

However, Tina provides a set of pre-configured Inline Fields that should **work for many use cases**. These fields provide basic input elements and handle the rendering logic between edit and preview mode.

- [Inline Text](/docs/ui/inline-editing/inline-text)
- [Inline Textarea](/docs/ui/inline-editing/inline-textarea)
- [Inline Wysiwyg](/docs/ui/inline-editing/inline-wysiwyg)
- [Inline Image](/docs/ui/inline-editing/inline-image)
- [Inline Group](/docs/ui/inline-editing/inline-group)
- [Inline Blocks](/docs/ui/inline-editing/inline-blocks)

**Refactoring the above example** with Inline Fields:

```tsx
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useForm } from 'tinacms'
import {
  InlineForm,
  InlineTextField,
  InlineWysiwyg,
} from 'react-tinacms-inline'

export function Page(props) {
  const [modifiedValues, form] = useForm(props.data)

  return (
    <InlineForm form={form}>
      <main>
        <InlineTextField name="title" />
        <InlineWysiwyg name="markdownContent">
          <ReactMarkdown source={modifiedValues.markdownContent} />
        </InlineWysiwyg>
      </main>
    </InlineForm>
  )
}
```

## Creating Custom Inline Fields

There may be cases where you want to create your own Inline Fields. Below is an example of the `Page` component used above, but refactored to define its own custom Inline Fields.

```js
import * as React from React
import ReactMarkdown from 'react-markdown'
// import `useCMS`
import { useForm, useCMS } from 'tinacms'
import { Wysiwyg } from 'react-tinacms-editor'
import { InlineForm, InlineField } from 'react-tinacms-inline'

export function Page(props) {
  // Access the CMS object
  const cms = useCMS()
  const [, form] = useForm(props.data)

  return (
    <InlineForm form={form}>
      <main>
      {/**
      * Use `InlineField` and the render props
      * pattern to create custom field inputs
      * that render when the cms is enabled
      */}
        <InlineField name="title">
          {({ input, status }) => {
            if (cms.enabled) {
              return <input type="text" {...input} />
            }
            return <h1>{input.value}</h1>
          }}
        </InlineField>
        <InlineField name="markdownContent">
          {({ input, status }) => {
            if (cms.enabled) {
              return <Wysiwyg input={input} />
            }
            return <ReactMarkdown source={input.value} />
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

The Inline Fields are meant to have minimal styles. But there may be situations where you'll want to override the base styles. This is made possible via [Styled Components](https://styled-components.com/docs/basics#extending-styles).

```jsx
// An example `InlineTextField` with Extended Styles
export function Page(props) {
  const [, form] = useForm(props.data)

  return (
    <InlineForm form={form}>
      <main>
        <StyledText name="title" />
      </main>
    </InlineForm>
  )
}

// Extended InlineTextField styled component
const StyledText = styled(InlineTextField)`
  color: green;
`
```

Notice how the new component, `StyledText` is just a _styled_ version of `InlineTextField`.
