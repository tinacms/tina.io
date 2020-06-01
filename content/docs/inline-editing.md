---
title: Inline Editing
prev: /docs/media
next: /docs/inline-editing/inline-text
consumes:
  - file: /packages/react-tinacms-inline/src/inline-form.tsx
    description: InlineForm
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: InlineField
---

_Inline Editing_ in Tina refers to editing values directly in the area they appear on the page, instead of in the Tina sidebar. These are the **general steps** to set up inline editing:

1. [Configure ](/docs/inline-editing#adding-inline-editing-with-inlineform)_[InlineForm](/docs/inline-editing#adding-inline-editing-with-inlineform)_
2. [Add Inline Fields](/docs/inline-editing#using-preconfigured-inline-fields)
3. [Set up Inline Controls](/docs/inline-editing#set-up-inline-form-controls)

## Adding Inline Editing with _InlineForm_

The `InlineForm` and `InlineField` components can be used to set up inline editing in your layout. `InlineForm` receives the form object created via one of the [form hooks](/docs/forms) in order to provide it to the inline editing context.

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

Let's take a modified version of the simplistic example from the [form documentation](/docs/forms):

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

## Using pre-configured Inline Fields

When using `InlineField`, you can create a custom _Inline Field_. This is helpful when you need precise control over rendering or input functionality.

However, Tina provides a set of pre-configured Inline Fields that should **work for many use cases**. These fields provide basic input elements and handle the rendering logic between edit and preview mode.

- [Inline Text](/docs/inline-editing/inline-text)
- [Inline Textarea](/docs/inline-editing/inline-textarea)
- [Inline Wysiwyg](/docs/inline-editing/inline-wysiwyg)
- [Inline Image](/docs/inline-editing/inline-image)
- [Inline Group](/docs/inline-editing/inline-group)
- [Inline Blocks](/docs/inline-editing/inline-blocks)

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

### Extending Inline Field Styles

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

## Set up Inline Form Controls

There are a few fundamental editing actions needed to handle the state of _Inline Form_: Activating and deactivating 'edit mode', along with saving and discarding changes. Below are some examples of how to manually add these control buttons within an _Inline Form_.

![TinaCMS: Inline Controls](/img/inline-blocks/inline-controls.png)

> This configuration **may differ based on the project**. With the introduction of [Open Authoring](/blog/introducing-visual-open-authoring), these editing states are handled through a _Global Toolbar_. The below **implementations may change** as new features are added to the _Inline Editing_ API.

### Activating Edit Mode for Inline Forms

In order to use the editing UI in an inline form, editing mode must be activated by the user. One way to do this is to create a button to toggle edit mode on and off, and insert it somewhere in your inline form:

```jsx
import { useInlineForm } from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

export function EditToggle() {
  // Access 'edit mode' controls via `useInlineForm` hook
  const { status, deactivate, activate } = useInlineForm()

  return (
    <TinaButton
      primary
      onClick={() => {
        status === 'active' ? deactivate() : activate()
      }}
    >
      {status === 'active' ? 'Preview' : 'Edit'}
    </TinaButton>
  )
}
```

After creating this component, you can insert the `<EditToggle />` component anywhere inside of an `InlineForm` to allow the user to turn edit mode on and off.

> The above example imports button styles from `@tinacms/styles`, but this component could be a plain `button` element with its own styles.

### Discarding Changes

Creating a `DiscardChanges` button works similarly by calling `useInlineForm`. This button directly resets the state of `InlineForm`, reverting any updates to the source data to the previous commit.

```js
import { useInlineForm } from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

export function DiscardButton() {
  const { form } = useInlineForm()

  /*
   ** If there are no changes
   ** to discard, return early
   */
  if (form.finalForm.getState().pristine) {
    return null
  }

  return (
    <TinaButton
      color="primary"
      onClick={() => {
        form.finalForm.reset()
      }}
    >
      Discard Changes
    </TinaButton>
  )
}
```

### Saving Changes

A save button will submit the form registered to `InlineForm`. The submit action will commit any changes to the source file connected with the

```js
import { useInlineForm } from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

export function SaveButton() {
  const { form } = useInlineForm()

  /*
   ** If there are no changes
   ** to save, return early
   */
  if (form.finalForm.getState().pristine) {
    return null
  }

  return <TinaButton onClick={form.submit}>Save</TinaButton>
}
```
