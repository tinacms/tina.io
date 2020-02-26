---
title: Forms
prev: /docs/cms
next: /docs/fields
consumes:
  - file: /packages/@tinacms/react-core/src/use-form.ts
    description: useForm and useLocalForm hooks
  - file: /packages/tinacms/src/react-tinacms/use-form.ts
    description: useGlobalForm
  - file: /packages/@tinacms/forms/src/form.ts
    description: Form configuration
---

**Forms** in Tina are the main building blocks of your CMS. You will use Forms to:

- Arrange the editing interface for your content
- Expose your content to mutation through user edits
- Process and persist the changes to your content

> **Use Form Helpers to Get Started Faster**
>
> This document explains how to set up forms in any React project. If you're using Gatsby or Next.js, we have helper packages that streamline this process for specific workflows:
>
> - [Editing Markdown Files with Gatsby](/docs/gatsby/markdown)
> - [Editing JSON Files with Gatsby](/docs/gatsby/json)
> - [Editing Markdown Files with Next.js](/docs/nextjs/markdown)
> - [Editing JSON Files with Next.js](/docs/nextjs/creating-forms)

The recommended way to create forms with Tina is to use the form hooks. These are explained in detail later on in this document, but let's start with a high-level overview of how form hooks are used.

When using form hooks, they should be called inside a **Page** component; that is, the component that takes your content and renders a page from it. In the following contrived example, we have a Page component that receives its content in the component's props, including a `title` and some `markdownContent`:

```javascript
import * as React from React
import ReactMarkdown from 'react-markdown'

export function Page(props) {
    return (
        <main>
            <h1>{props.title}</h1>
            <ReactMarkdown source={props.markdownContent}>
        </main>
    )
}
```

Here's how we might call `useLocalForm` to create a form that will be used to edit this content:

```javascript
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

`useLocalForm` returns an object containing all of the form's values that will change as the content is updated in the form. By switching out our original `props` in the rendering code for this new object, our page will re-render as the content is changed, giving us a real-time preview of the content!

## Form Hooks

Tina includes three hooks for creating forms: `useForm`, `useLocalForm`, and `useGlobalForm`. The API of each of these hooks is exactly the same, and the behavior is mostly similar; the only difference is where the form appears in Tina's sidebar interface.

### _useLocalForm_

`useLocalForm` will create a form and add it to the main area of the sidebar, where its content can be accessed and edited by users. We refer to these as _local forms_ because forms in this part of the sidebar are meant to be contextual to the page you're on. Forms are connected to the sidebar with Tina's [Dynamic Plugin System](/blog/dynamic-plugin-system)

Typically, when using local forms, you would call the `useLocalForm` hook inside the component that renders a specific page (this would be the page component in Gatsby or Next.js). In this case, the form would be added to the sidebar when the user is on that page, and removed once they navigate away.

### _useGlobalForm_

`useGlobalForm` will create a form and add it to the _global menu_ region of the sidebar. This area of the sidebar is intended for forms that persist across all pages on a site.

Note that calling `useGlobalForm` in a non-global context will still cause the form to be added or removed like a local form.

### _useForm_

`useForm` will create a form, but will not add it to the sidebar UI at all. You might use this for content that will be [edited inline](/docs/inline-editing), if you don't want the form to also appear in the sidebar.

## Calling Form Hooks

The signature of a form hook looks something like this:

```javascript
const [modifiedValues, form] = useForm(formConfig, watchedVars)
```

All three basic form hooks follow this same structure.

### Hook Return Values

Like other React hooks, the form hooks enclose their return data in an array, expecting developers to assign these values via destructuring.

The first piece of data returned (`modifiedValues` in the above example) is an object containing all the data that is made editable by the form. As users edit data in the form, the values in this object change.

The second piece of data (`form` in the above example) is an object representing the form.

<!-- TODO expand upon form object and demonstrate a use case where you might need it -->

### Form Configuration

The first argument that a form hook receives (`formConfig` in the above example) is an object used to configure the form. Forms in Tina are built upon the [Final Form](https://final-form.org/) library, and inherit all of Final Form's configuration options.

You can see the all of Final Form's form config options in the [Form Config Documentation](https://final-form.org/docs/final-form/types/Config), but the following options will most commonly be used when creating a form:

| key             | description                                         |
| --------------- | --------------------------------------------------- |
| `initialValues` | An object containing the initial state of the form. |
| `onSubmit`      | A function that runs when the form is saved.        |

In addition to Final Form's options, Tina's form hooks accept the following additional configuration options:

```typescript
interface FormOptions<S> {
  id: any
  label: string
  fields: Field[]
  loadInitialValues?: () => Promise<S>
  reset?(): void
  actions?: any[]
  __type?: string
}
```

| key                 | description                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | A unique identifier for the form. This should be derived from the content to distinguish it from other instances of the form.                 |
| `label`             | A label for the form that will appear in the sidebar.                                                                                         |
| `fields`            | An array of fields that will define the shape of the form and how content is edited.                                                          |
| `loadInitialValues` | _Optional:_ A function to load the initial form state asynchronously. Return a promise that passes an object of form values when it resolves. |
| `reset`             | _Optional:_ A function that runs when the form state is reset by the user.                                                                    |
| `actions`           | _Optional:_ An array of custom actions that will be added to the form.                                                                        |
| `__type`            | _Optional:_ Sets the Form's plugin type. Automatically set based on which form hook is used.                                                  |

Now that we know how to configure a form, let's revisit the simplified example from the beginning of this document to demonstrate how we might configure this form:

```javascript
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useLocalForm } from 'tinacms'

export function Page(props) {
  const [modifiedValues] = useLocalForm({
    id: props.fileRelativePath,
    label: 'Edit Post',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'markdownContent',
        label: 'content',
        component: 'markdown',
      }
    ],
    initialValues: {
      title: props.title,
      markdownContent: props.markdownContent
    },
    onSubmit: (formData) => {
      // save the new form data
    },
  })
  return (
    <main>
      <h1>{modifiedValues.title}</h1>
      <ReactMarkdown source={modifiedValues.markdownContent}>
    </main>
  )
}

```

> Note that when using these basic hooks, you are expected to implement the save functionality yourself by adding an `onSubmit` function. By default, Tina makes no assumptions about how your content is stored. These basic form hooks are building blocks for creating more purpose-built tools to fit specific use cases.

### Watched Vars: Preserve Form Reactivity

The second argument that can be passed to the form hooks is an optional object containing values that the form will need to react to. Use this when dealing with data from external sources or in an environment with Hot Module Replacement; in other words, when you expect this data to change and it's essential to keep the form in sync with it.

```typescript
interface WatchableFormValue {
  values: object
  label: string
  fields: Field[]
}
```

| key      | description                                                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `values` | Form will update its values when this data changes, but will avoid updating a field if it has UI focus. This is useful for keeping values in sync with a remote content source. |
| `fields` | By watching the form's fields, they can be added/removed dynamically.                                                                                                           |
| `label`  | When the form's label is derived from a dynamic value, this will ensure it is updated correctly.                                                                                |

### Form Helpers

The three hooks described thus far are the basic interface for creating forms, and they aim to support a broad set of use cases. For specific use cases, we've created some simplified interfaces for quickly setting up forms. Take a look at our [Next.js form docs](/docs/nextjs/creating-forms) and [Gatsby docs](/docs/gatsby/markdown) to learn how to use these.

## Inline Forms

Refer to the [Inline Editing](/docs/inline-editing) docs.
