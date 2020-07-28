---
title: Editing Content
---

You'll notice that the sidebar is empty. We need to create a form to edit the data on this page — once registered with the CMS, this form will render in the sidebar and you could edit content from there.

Forms are a type of plugin in Tina, arguably the most important plugin. Creating a CMS is all about providing ways for editors to change content — forms connect the editing interface to the content.

## Create a Form

We will use the `useForm` hook to create the form, and the `usePlugin` hook to register it with the CMS. First, We'll refactor the `App` a bit to do this.

In the example blow, you can see that we extracted out `PageContent` into its own component. Typically, you'll register forms in page and template components that are separate from the base `App`, so this makes things bit easier to see what's going on. For learning purposes, we'll keep all these components on one page, but feel free to create separate files if you prefer.

Go ahead and copy / paste the code below to refactor the `App` to render `PageContent`:

**src/App.js**

```js
import React from 'react'
import { TinaProvider, TinaCMS, useCMS } from 'tinacms'
import logo from './Icon.svg'
import './App.css'

function App() {
  const cms = new TinaCMS({
    enabled: false,
    sidebar: true,
  })

  return (
    <TinaProvider cms={cms}>
      <PageContent />
    </TinaProvider>
  )
}

export default App

function ExitButton() {
  const cms = useCMS()
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}

const data = {
  title: 'Tina is not a CMS',
  body: 'It is a toolkit for creating a custom CMS.',
}

function PageContent() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{editableData.title}</h1>
        <p>{editableData.body}</p>
        <ExitButton />
      </header>
    </div>
  )
}
```

Now let's create the form within `PageContent`:

**src/App.js**

```js
// Import `useForm` and `usePlugin`
import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from 'tinacms'

//...

const data = {
  title: 'Tina is not a CMS',
  body: 'It is a toolkit for creating a custom CMS.',
}

function PageContent() {
  // Create the form
  const [editableData, form] = useForm({
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
  })

  // Register it with the CMS
  usePlugin(form)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{editableData.title}</h1>
        <p>{editableData.body}</p>
        <ExitButton />
      </header>
    </div>
  )
}
```

In the example above, we used the `useForm` hook to create the form. `useForm` needs a [form configuration object](/docs/plugins/forms#form-configuration) with properties that determine how the form behaves on load and save, what fields to render and their associated content, along with other metadata.

The most important properties to look at in the example above are `fields`, `initialValues`, and `onSubmit`. We'll look closely at each of these now.

### Fields

Fields are another type of plugin — integral inputs for editing content. Tina provides numerous [default field plugins](/docs/plugins/fields), along with some more complex fields such as an [HTML](/docs/plugins/fields/html) & [Markdown](/docs/plugins/fields/markdown) wysiwyg, and [date picker](/docs/plugins/fields/date).

You will be working with fields a lot in Tina. You can even create your own [custom fields](/docs/plugins/fields/custom-fields). To get more familiar, try to adjust the `label` property or add a new field to the array. Reference [the documentation](/docs/plugins/fields) for a full list of default field options.

### _initialValues_

//...TODO

### _onSubmit_

//...TODO

Restart the dev server, enable the CMS, open the sidebar and try to update the content. You should now be able to edit the title and body copy on the demo through the form we just created!

> Note: mention the form helpers depending on the framework or backend
