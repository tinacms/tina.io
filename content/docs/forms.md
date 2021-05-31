---
title: Forms
prev: /docs/cms
next: /docs/fields
consumes:
  - file: /packages/@tinacms/react-core/src/use-form.ts
    description: Describes the useForm hooks
  - file: /packages/@tinacms/forms/src/form.ts
    description: Form configuration
last_edited: '2020-09-10T18:49:43.520Z'
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

Here's how we might call `useForm` to create a form that will be used to edit this content:

```javascript
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useForm, usePlugin } from 'tinacms'

export function Page(props) {
  // 1. Create the form
  const [modifiedValues, form] = useForm(formConfig) // formConfig object omitted for brevity; we'll get to this later

  // 2. Register it with the CMS
  usePlugin(form)

  return (
    <main>
      <h1>{modifiedValues.title}</h1>
      <ReactMarkdown source={modifiedValues.markdownContent}>
    </main>
  )
}
```

`useForm` returns an object containing all of the form's values that will change as the content is updated in the form. By switching out our original `props` in the rendering code for this new object, our page will re-render as the content is changed, giving us a real-time preview of the content!

## Creating Forms

The `useForm` hook let's you create a form, but it does not [register it](/docs/plugins/forms#registering-forms) with the CMS.

Here is how that hook works:

```javascript
const [modifiedValues, form, loadingState] = useForm(formConfig, watchedVars)
```

### Hook Return Values

Like other React hooks, the form hooks enclose their return data in an array, expecting developers to assign these values via destructuring.

The first piece of data returned (`modifiedValues` in the above example) is an object containing all the data that is made editable by the form. As users edit data in the form, the values in this object change.

The second piece of data (`form` in the above example) is an form object that the hook created.

The third return value is a boolean to denote [loading state](/docs/plugins/forms/#handling-loading-state) of the form.

### Form Configuration

The first argument that `useForm` receives (`formConfig` in the above example) is the object used to configure the form. Forms in Tina are built upon the [Final Form](https://final-form.org/) library, and inherit all of Final Form's configuration options.

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
  onSubmit?: () => Promise<any>
  reset?(): void
  onChange?(state): void
  actions?: any[]
  buttons?: {
    save: string
    reset: string
  }
  __type?: string
}
```

| key                 | description                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | A unique identifier for the form. This should be derived from the content to distinguish it from other instances of the form.                 |
| `label`             | A label for the form that will appear in the sidebar.                                                                                         |
| `fields`            | An array of fields that will define the shape of the form and how content is edited.                                                          |
| `loadInitialValues` | _Optional:_ A function to load the initial form state asynchronously. Return a promise that passes an object of form values when it resolves. |
| `onSubmit`          | _Optional:_ An asynchronous function to invoke when the form is saved, i.e. when the 'Save' button is pressed.                                |
| `reset`             | _Optional:_ A function that runs when the form state is reset by the user via the 'Reset' button.                                             |
| `actions`           | _Optional:_ An array of custom actions that will be added to the form.                                                                        |
| `buttons`           | _Optional:_ An object to customize the 'Save' and 'Reset' button text for the form.                                                           |
| `onChange`          | _Optional:_ A function that runs when the form values are changed.                                                                            |
| `__type`            | _Optional:_ Sets the Form's plugin type. Automatically set based on which form hook is used.                                                  |

Now that we know how to configure a form, let's revisit the simplified example from the beginning of this document to demonstrate how we might configure this form:

```javascript
import * as React from React
import ReactMarkdown from 'react-markdown'
import { useForm, usePlugin } from 'tinacms'

export function Page(props) {
  const formConfig = {
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
    onSubmit: async (formData) => {
      // save the new form data
    },
  }
  const [modifiedValues, form] = useForm(formConfig)

  usePlugin(form)

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

## Registering Forms

In order to use a form you must register it with the CMS. There are two main approaches to register forms in Tina: page forms and screen plugins.

### Example 1: Page Forms

For general page forms, use the `usePlugin` hook.

> Tip: At one point these were known as _Local Forms_

**src/templates/blog-post.js**

```jsx
import { usePlugin } from 'tinacms'
import { useJsonForm } from 'next-tinacms-json'

function BlogPostTemplate(props) {
  // Create the form
  const [data, form] = useJsonForm(props.data.dataJson)

  // Register it with the CMS
  usePlugin(form)

  return <h1>{data.firstName}</h1>
}
```

### Example 2: Forms as Screens

[Screens](/docs/plugins/screens) are additional UI modals accessible from the CMS menu. Reference the [`useFormScreenPlugin` hook](/docs/plugins/screens#useformscreenplugin) to see an example of registering a form as a screen.

## Form Helpers

The three hooks described thus far are the basic interface for creating forms, and they aim to support a broad set of use cases. For specific use cases, we've created some simplified interfaces for quickly setting up forms depending on the backend. Take a look at the integration packages for [Next.js](/docs/integrations/nextjs#packages) to learn more.

## Customizing Form Buttons

> _Note:_ The 'Save' and 'Reset' button text can also be configured on the sidebar or toolbar when defining the [CMS options](/docs/cms#cms-configuration). If `buttons` are configured on the CMS through the `sidebar` or `toolbar` options, those values will take precedent over button values passed to a form. **It is now recommended to configure button text on the form** intead of the CMS.

'Save' & 'Reset' buttons accompany all forms. They may render at the bottom of the sidebar, in a modal, or on the toolbar. When clicked, these buttons should generally invoke the `onSubmit`(For 'Save') & `reset`(For 'Reset') functions associated with the form.

There may be times when you want to change the button text to improve UX or provide a **better description of the action** for an editor. For example, you may want the 'Save' button to say 'Commit' and the 'Reset' button to say 'Discard Changes'.

Below is an example of a form options object with these custom button options passed in:

```js
const [author, authorForm] = useJsonForm(data.dataJson, {
  label: 'Author',
  fields: [
    {
      name: 'author',
      label: 'Author',
      component: 'select',
      options: [
        'Herbert Huncke',
        'Allen Ginsberg',
        'Jack Kerouac',
        'William S. Burroughs',
      ],
    },
  ],
  buttons: {
    save: 'Commit',
    reset: 'Discard Changes',
  },
})
```

### Reuse with a composition

When using the same button configuraiton for every form, it can be repetitive to continually define the button options. You can use a composition for this. Below is an example if you created a `cms` directory with a `useForm` composition to add the custom button values on every form.

**src/cms/use-form.ts**

```ts
import {
  useForm as baseUseForm,
  FormOptions,
  WatchableFormValues,
} from 'tinacms'
export const useForm = (options: FormOptions, watch?: WatchableFormValues) =>
  baseUseForm(
    {
      buttons: {
        save: 'Save Changes',
        reset: 'Reset Form',
      },
      ...options,
    },
    watch
  )
```

This is how that `useForm` composition could be used, setting up a baseline configuration for the general `useForm` hook from Tina.

**src/pages/index.js**

```ts
import { useForm } from '../cms/use-form'

export default function Home(props) {
  const formOptions = {
    //...
  }
  useForm(formOptions)
}
```

The `formOptions` defined in this example would be the [config object](/docs/cms#cms-configuration) referenced above.

## Handling Loading State

There are times when you may need to fetch form data asynchronously via `loadInitialValues`. When this function is called, the form's loading state is set to `true` until the promise resolves with the returned data.

The loading state can be used to conditionally render a 'loading' component until the form data is available to render.

```js
import {useForm, usePlugin} from 'tinacms'

export default function Page() {
  const [data, form, loading] = useForm({
    id: props.fileRelativePath,
    label: 'Edit Post',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'date',
        label: 'Date',
        component: 'date',
      }
    ],
    loadInitialValues() {
      return fetch(exampleRequest).then(res => res.json())
    },
    onSubmit(formData) => {
      // post saved form data
    },
  })

  return (
    {loading} ?<h1>Loading...</h1>: (
    <section>
      <h1>{data.title}</h1>
      <div>{data.date}</div>
    </section>
    )
  )
}
```

## Inline Forms

Refer to the [Inline Editing](/docs/ui/inline-editing) docs.
