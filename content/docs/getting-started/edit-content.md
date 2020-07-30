---
title: Editing Content
prev: /docs/getting-started/cms-set-up
next: /docs/getting-started/backends
---

Creating a CMS is all about providing ways for editors to change content — [forms](/docs/plugins/forms) connect the editing interface to the content. In this step, we will **create and register a form to edit data** rendered on this page.

## Create & Register a Form

We will use the `useForm` hook to [create the form](/docs/plugins/forms#creating-forms), and the `usePlugin` hook to [register it](/docs/plugins/forms#registering-forms) with the CMS.

> _Fun-Fact:_ Forms are a type of [plugin](/docs/plugins) in Tina.

### The Steps

1. Import the `useForm` and `usePlugin` hooks
2. Define the [form configuration](/docs/plugins/forms#form-configuration) options
3. Create a form with `useForm`, pass the form config object
4. Register the form using `usePlugin`
5. Render the data returned from `useForm`

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
      {/**
       * 5. Render the `editableData` returned from `useForm`
       */}
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

While there are other form config properties, the key ones to examine in the example above are `fields`, `initialValues`, and `onSubmit`. We'll look closely at each of these now.

### _fields_

[Fields](/docs/plugins/fields) are integral inputs for editing content. The `fields` array in the form config is comprised of Field objects.

All fields share a common [base configuration](docs/plugins/fields#field-config), but some fields will have different properties beyond these base field options. At their most basic, fields need at least two properties: a `name` or path to the editable data and a `component` to edit that data from.

Notice how the value for `name` in our first field is 'title', that matches the property name in the original `data` object. If that property were named `headline` (instead of `title`), we'd have to update the `name` in the field object to connect that field with the proper data value.

Our example above uses two _default fields_: [`text`](/docs/plugins/fields/text) & [`textarea`](/docs/plugins/fields/textarea). Tina provides many other default [field plugins](/docs/plugins/fields), along with some more complex fields such as an [HTML](/docs/plugins/fields/html) / [Markdown](/docs/plugins/fields/markdown) wysiwygs, and [date picker](/docs/plugins/fields/date). You can even create your own [custom fields](/docs/plugins/fields/custom-fields).

You will be working with fields a lot in Tina. To get more familiar, try to adjust the `label` property or add a new field to the array. Reference [the documentation](/docs/plugins/fields) for a full list of default field options.

### _initialValues_

`initialValues` are an object of values to initially populate the form. This option, along with `onSubmit` are inherited by the [Final Form library field configuration](https://final-form.org/docs/final-form/types/Config) that Tina uses for all forms. You can use this option when you don't need to load data asynchronously. If you do need to load data asynchronously on form creation, you'd use a function called `loadInitialValues` (we'll get to that soon).

### _onSubmit_

This is a function that runs when the form is saved. Right now it just gives an alert message, but we will use this function later to post changes to a backend.

## Edit the data

Restart the dev server, enable the CMS, open the sidebar and try to update the content. You should now be able to edit the title and body copy on the demo through the form we just created!

> Note: There are other form creation helpers associated with various meta-framework integrations and backend configurations. Refer to the [guides](/guides) or packages documentation to find more information.
