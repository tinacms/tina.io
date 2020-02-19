---
title: Forms
prev: /docs/cms
next: /docs/fields
---

**Forms** in Tina are the main building blocks of your CMS. You will use Forms to:

- Arrange the editing interface for your content
- Expose your content to mutation through user edits
- Process and persist the changes to your content

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

## Form Configuration

The signature of a form hook looks something like this:

```javascript
const [modifiedValues, form] = useForm(formConfig, watchedVars)
```

Forms in Tina use the [Final Form](https://final-form.org/) library, ...

```typescript
interface FormOptions<S> {
  id: any
  label: string
  fields: Field[]
  __type?: string
  reset?(): void
  actions?: any[]
  meta?: {
    [key: string]: string
  }
  loadInitialValues?: () => Promise<S>
}
```

| key                 | description                                                                                                                                                                                                   | default |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| id                  | A unique identifier for the form. This should be derived from the content to distinguish it from other instances of the form.                                                                                 |         |
| label               | A label for the form that will appear in the sidebar.                                                                                                                                                         |         |
| fields              | An array of fields. See [fields](/docs/fields) for information on how to configure this.                                                                                                                      |         |
| \_\_type            | Used to identify local vs global (I think)                                                                                                                                                                    |         |
| reset()             | Customize the way that the form "rolls back" its data.                                                                                                                                                        |         |
| actions             | Array of additional actions for the form. These will appear at the bottom near the **Save** button.                                                                                                           |         |
| meta                | Object of miscellaneous data that you can include in the form. Not used by Tina.                                                                                                                              |         |
| loadInitialValues() | Can be used to retrieve the initial values for the form asynchronously. The form will be initialized with `initialValues` and then hydrated with the value returned by `loadInitialValues` once it completes. |         |

watch

```typescript
interface WatchableFormValue {
  values: any
  label: FormOptions<any>['label']
  fields: FormOptions<any>['fields']
}
```

Pass these in as the second param and the form will update when they are changed.

label - good for when label is derived from editable content
fields - makes it possible to use dynamic fields
values - keep data in sync with another content source. Use case here is for local-git, re-updating values after they're saved to disk

### Form Helpers

The three hooks described thus far are the basic interface for creating forms, and they aim to support a broad set of use cases. For specific use cases, we've created some simplified interfaces for quickly setting up forms. Take a look at our [Next.js form docs](/docs/nextjs/creating-forms) and [Gatsby docs](/docs/gatsby/markdown) to learn how to use these.

> **Creating Your Own Form Helpers**
>
> Maybe give a simple example of using the `useForm` or `useLocalForm` hook to make your own helper

## Inline Forms

for more info, check out the inline editing docs
