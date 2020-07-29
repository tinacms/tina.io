---
title: Editing Content
prev: /docs/getting-started/cms-set-up
next: /docs/getting-started/backends
---

Creating a CMS is all about providing ways for editors to change content — [forms](/docs/plugins/forms) connect the editing interface to the content. In this step, we will **create and register a form to edit data** rendered on this page.

> _Fun-Fact:_ Forms are a type of [plugin](/docs/plugins) in Tina.

## Create & Register a Form

We will use the `useForm` hook to [create the form](/docs/plugins/forms#creating-forms), and the `usePlugin` hook to [register it](/docs/plugins/forms#registering-forms) with the CMS.

### The Steps

1. Import the `useForm` and `usePlugin` hooks
2. Define the [form configuration](/docs/plugins/forms#form-configuration) options
3. Create a form with `useForm`, pass the form config object
4. Register the form using `usePlugin`

**src/App.js**

```js
// 1. Import `useForm` and `usePlugin`
import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from 'tinacms'

//...

const data = {
  title: 'Tina is not a CMS',
  body: 'It is a toolkit for creating a custom CMS.',
}

function PageContent() {
  // 2. Define the form configuration object
  const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'body',
        label: 'Body',
        component: 'textarea',
      },
    ],
    initialValues: {
      ...data,
    },
    onSubmit: async () => {
      window.alert('Saved!')
    },
  }

  // 3. Create the form
  const [editableData, form] = useForm(formConfig)

  // 4. Register it with the CMS
  usePlugin(form)

  return (
    <section className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>{editableData.title}</h1>
      <p>{editableData.body}</p>
      <ExitButton />
    </section>
  )
}

//...
```

## Form Configuration

`useForm` needs a [form configuration object](/docs/plugins/forms#form-configuration) with properties that determine how the form behaves on load and save, what fields to render and their associated content, along with other metadata.

The most important properties to look at in the example above are `fields`, `initialValues`, and `onSubmit`. We'll look closely at each of these now.

### Fields

[Fields](/docs/plugins/fields) are integral inputs for editing content. The `fields` array in the form config is comprised of Field objects that define at least two properties: a `name` or path to the editable data and a `component` to edit that data from. All fields share a common [base configuration](docs/plugins/fields#field-config), but some fields will have different properties beyond these base field options.

Our example above uses two default fields: [`text`](/docs/plugins/fields/text) & [`textarea`](/docs/plugins/fields/textarea). Tina provides many other default field plugins, along with some more complex fields such as an [HTML](/docs/plugins/fields/html) / [Markdown](/docs/plugins/fields/markdown) wysiwygs, and [date picker](/docs/plugins/fields/date).

You will be working with fields a lot in Tina. You can even create your own [custom fields](/docs/plugins/fields/custom-fields). To get more familiar, try to adjust the `label` property or add a new field to the array. Reference [the documentation](/docs/plugins/fields) for a full list of default field options.

### _initialValues_

//...TODO

### _onSubmit_

//...TODO

Restart the dev server, enable the CMS, open the sidebar and try to update the content. You should now be able to edit the title and body copy on the demo through the form we just created!

> Note: mention the form helpers depending on the framework or backend
