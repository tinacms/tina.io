---
title: Inline Editing
prev: /docs/media
next: /docs/inline-blocks
consumes:
  - file: /packages/react-tinacms-inline/src/inline-form.tsx
    description: InlineForm
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: InlineField
---

**Inline Editing** in Tina refers to editing values directly in the area they appear on the page, instead of in the Tina sidebar.

## _InlineForm_ and _InlineField_

The `InlineForm` and `InlineField` components can be used to set up inline editing in your layout. `InlineForm` receives the form object created via one of the [form hooks](/docs/forms) in order to provide it to the inline editing context. You can then nest multiple `InlineField` components, a render props-based component that allows you to conditionally display an editing interface (when in edit mode) or the page as it will appear in production.

The rough idea is like this:

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

## Example

Let's take the simplistic example from the [form documentation](/docs/forms):

```jsx
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useLocalForm } from 'tinacms'

export function Page(props) {
  const [modifiedValues] = useLocalForm(formConfig) // formConfig omitted for brevity; we'll get to this later
  return (
    <main>
      <h1>{modifiedValues.title}</h1>
      <ReactMarkdown source={modifiedValues.markdownContent}>
    </main>
  )
}

```

Using `InlineForm` and `InlineField` from `react-tinacms-inline`, we would rewrite the Page component as follows:

```jsx
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useForm, Wysiwyg } from 'tinacms'
import { InlineForm, InlineField } from 'react-tinacms-inline'

export function Page(props) {
  const [, form] = useForm(formConfig)

  return (
    <InlineForm form={form}>
      <main>
        <InlineField name="title">
        {
          ({input, status}) => {
            if (status === 'active') {
              return <input type='text' {...input} />
            }
            return <h1>{input.value}</h1>
          }
        }
        </InlineField>
        <InlineField name="markdownContent">
        {
          ({input, status}) => {
            if (status === 'active') {
              return <Wysiwyg input={input} />
            }
            return <ReactMarkdown source={input.value} />
          }
        }
        </InlineField>
      </main>
    </InlineForm>
  )
}

```

> Note that we switched the call to `useLocalForm` with a call to `useForm`. This will prevent the form from showing in the Tina sidebar. If you want the form to also be available in the sidebar, `useForm` can be replaced with `useLocalForm`.

## Inline Form Controls

There are a few fundamental editing actions needed to handle the state of _Inline Form_: Activating and deactivating 'edit mode', along with saving and discarding changes. Below are some examples of how to manually add these control buttons within an _Inline Form_.

![TinaCMS: Inline Controls](/img/inline-blocks/inline-controls.png)

> This configuration **may differ based on the project**. With the introduction of [Open Authoring](/blog/introducing-visual-open-authoring), these editing states are handled through a _Global Toolbar_. The below **implementations may change** as new features are added to the Inline Editing API.

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
