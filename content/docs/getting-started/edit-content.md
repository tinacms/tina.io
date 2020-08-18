---
title: Editing Content
prev: /docs/getting-started/cms-set-up
next: /docs/getting-started/backends
last_edited: '2020-08-18T08:13:26.090Z'
---
The purpose of a CMS is to allow editors to change content. [Forms](/docs/plugins/forms) are a fundamental part of this as they define the editing interface for your content. In this step, we will **create and register a form to edit data** rendered on this page.

> _Fun Fact:_ Forms are a type of [plugin](/docs/plugins) in Tina. There are multiple ways to use forms with Tina, and the sidebar is merely one option.

## Import the `useForm` and `usePlugin` hooks

We are going to start by importing the useForm and usePlugin packages from `tinacms`

**src/App.js**

```js
import { TinaProvider, TinaCMS, useCMS, useForm, usePlugin } from 'tinacms'

//...

const pageData = {
  title: 'Tina is not a CMS',
  body: 'It is a toolkit for creating a custom CMS.',
}
```

## Define the [form configuration](/docs/plugins/forms#form-configuration)

> `useForm` needs a [form configuration object](https://tinacms.org/docs/plugins/forms#form-configuration) with properties that determine how the form behaves on load and save, what fields are available, and other metadata.

In this step, we are going to define the form configuration object to contain id, label, fields, initialValues, and onSubmit. 

1. Add the `id`

   The `id` is a **unique identifier** for the form. The `id` is hard-coded in our example, which is OK because the `PageContent` component is only used to render the home page. When you create a form inside of a component that is used on multiple pages, you will want to take care to ensure the form's `id` uniquely identifies the content currently being edited. Typically, you would use the content's filename, or a unique key returned from a content API.
2. Add `fields`  
   The `fields` array is comprised of [field definitions](/docs/plugins/fields#field-definition). All fields share a common [base configuration](docs/plugins/fields#field-config). Field definitions need at least two properties:
   * a `name`, indicating the path to access the data from the values object, and
   * a `component` that displays the interface for editing the data.

   You will be working with fields a lot in Tina. To get more familiar, try to adjust the `label` property or add a new field to the array. Reference [the documentation](/docs/plugins/fields) for a full list of default field plugins.
3. Add `initialValues`  
   `initialValues` contains the data used to populate the form. If you need to load data asynchronously on form creation, you can instead use a function called `loadInitialValues` (we'll get to that soon).
4. Add `onSubmit`  
   This is a function that runs when the form is saved. Right now it just gives an alert message, but we will use this function later to post changes to a backend.

    //...
    function PageContent() {
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
    initialValues: pageData,
    onSubmit: async () => {
    
     window.alert('Saved!')
    },
    }
    //...

## Create a form with `useForm` and the config object

The first step to implementing this is to use the `useForm` hook to [create the form](/docs/plugins/forms#creating-forms).

> `useForm` returns an object containing all of the form's values that will change as the content is updated in the form. 

**src/App.js**

    //...
    
    function PageContent() {
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
        initialValues: pageData,
        onSubmit: async () => {
          window.alert('Saved!')
        },
      }
    +   const [editableData, form] = useForm(formConfig)
    }
    
    //...

## Register the form with `usePlugin`

Although it doesn't automatically appear in the sidebar, the form returned by `useForm` is pre-configured to work as a sidebar plugin. To add this form to the sidebar, all we have to do is pass it into the `usePlugin` hook.

> Calling `useForm` won't automatically make our form appear in the sidebar.

    //...
    function PageContent() {
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
        initialValues: pageData,
        onSubmit: async () => {
          window.alert('Saved!')
        },
      }
       const [editableData, form] = useForm(formConfig)
    +  usePlugin(form)
    }
    //...

## Render the data returned from `useForm`

In this step, we will be switching out our original `props` in the rendering code for this new object, our page will re-render as the content is changed, giving us a real-time preview of the content!

> `useForm` returns an object containing all of the form's values that will change as the content is updated in the form. 

**src/App.js**

```js
 //...
 function PageContent() {
  //...
  const [editableData, form] = useForm(formConfig)
  usePlugin(form)
+  return (
+    <section className="App-header">
+      <img src={logo} className="App-logo" alt="logo" />
+      <h1>{editableData.title}</h1>
+      <p>{editableData.body}</p>
+      <EditButton />
+    </section>
+  )
}

//...
```

## Edit the data

Head back to http://localhost:3000, enable the CMS, open the sidebar and try to update the content. You should now be able to edit the title and body copy on the demo!

![tina-tutorial-edit-data](/img/getting-started/edit-data.png)

Next, we'll look at setting up a simple backend to retrieve and save data from a 3rd-party API.

## Additional Reading

* Gain a deeper understanding of how the [`name` property](/docs/plugins/fields#name) in the field definition works.
* The field examples above uses two _default field components_: [`text`](/docs/plugins/fields/text) & [`textarea`](/docs/plugins/fields/textarea). Tina provides many other default [field plugins](/docs/plugins/fields). You can even create your own [custom fields](/docs/plugins/fields/custom-fields).
* There are other form creation helpers associated with various meta-framework integrations and backend configurations. Refer to the [guides](/guides) or packages documentation to find more information.
* Tina uses the [Final Form library](https://final-form.org/) for all base form configuration.