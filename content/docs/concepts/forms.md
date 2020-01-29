---
title: Forms
id: /docs/concepts/forms
prev: /docs/concepts/sidebar
next: /docs/concepts/fields
consumes:
  - file: /packages/@tinacms/core/src/cms-forms/form.ts
    details: Shows Form Options interface
  - file: /packages/@tinacms/react-core/src/use-form.ts
    details: Creates custom form with useForm & useLocalForm
  - file: /packages/tinacms/src/react-tinacms/use-form.ts
    details: Creates custom form with useGlobalForm
---

In Tina, **forms** are how you expose your site's content for editing.

## Local & Global Forms

There are two distinct types of forms: Local and Global. Local forms are contextual, typically associated with editing content specific to the page or context. Local forms render in the sidebar by default.

![tina-grande-local-form](/img/tina_grande_local_forms.jpg)

Global forms live within a settings-type panel, they could be site-wide settings, theme configurations, general metadata, or other top-level configs. In the sidebar, global forms are accessed via the hamburger menu in the upper left-hand corner. These forms are typically registered on a global (layout) component so that they are always accessible through different page contexts.

![tina-grande-global-form](/img/tina-grande-global-form.jpg)

## Setup Predefined Forms

Most of the time, you will be using predefined forms provided by Tina. If you're using Gatsby, most of your needs will be met by the [remark](/docs/gatsby/markdown) & [JSON](/docs/gatsby/json) forms already defined by Tina. If your site uses Markdown as a data source, head over to the [Using Markdown Files](/docs/gatsby/markdown) tutorial. If you need to edit JSON data, head over to the [Using JSON Files](/docs/gatsby/json) tutorial.

## Creating Custom Forms

If you want to make custom forms, they can be created by invoking the `useForm`, `useLocalForm`, or `useGlobalForm` hooks. They are incredibly similar, the main difference being that `useLocalForm` & `useGlobalForm` will register the forms as plugins, and `useForm` does not.

<tip>**Please note:** creating custom forms is considered an advanced use-case. It is recommended for most folks to use Tina's predefined forms mentioned above.</tip>

### useForm

This custom hook creates a form without registering it to the CMS. Check out the [`usePlugin` hook](/docs/concepts/plugins#adding-and-removing-plugins) documentation to see how to register a form to the CMS.

```typescript
function useForm(
  options: FormOptions,
  watch: Partial<WatchableFormValue> = {}
): [object, Form | undefined]

interface FormOptions {
  id: any
  label: string
  initialValues: object
  fields: Field[]
  onSubmit(object): Promise<object | null>
}
```

### useLocalForm

```typescript
function useLocalForm(
  options: FormOptions,
  watch: Partial<WatchableFormValue> = {}
): [object, Form | undefined]

interface FormOptions {
  id: any
  label: string
  initialValues: object
  fields: Field[]
  onSubmit(object): Promise<object | null>
}
```

### useGlobalForm

```ts
function useGlobalForm(
  options: FormOptions,
  watch: Partial<WatchableFormValue> = {}
): [FormShape, Form | undefined]

interface FormOptions {
  id: any
  label: string
  initialValues: object
  fields: Field[]
  onSubmit(object): Promise<object | null>
}
```

- `id`: Must be a unique identifier.
- `label`: The name of the form being edited.
- `initialValues`: The initial values being edited by the form.
- `fields`: A list of field definitions. This is used to render the form widgets so the values can be edited.
- `onSubmit`: A javascript function to be called when the form is submitted. See the [final-form](https://github.com/final-form/final-form#onsubmit-values-object-form-formapi-callback-errors-object--void--object--promiseobject--void) docs for more details.

#### Example

```javascript
import { useLocalForm } from 'react-tinacms'

function PageTemplate(props) {
  let [ someData ] = useLocalForm({
    id: 'uid',
    label: 'someData',
    initialValues: props.data.someData,
    fields: [{ name: 'someField', component: 'text' }],
    onSubmit(someData) {
      // ...
    },
  })

  return (
    <div>
      Some Field: <span>{someData.someField}</span>
    </div>
  )
}
```
<tip>Update react-tinacms version:0.9.0: The previous hook `useCMSForm` used to create custom forms is now the same as `useLocalForm`</tip>
