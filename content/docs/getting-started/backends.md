---
title: Working with Backends
prev: /docs/getting-started/edit-content
next: null
---

You may have noticed that content changes don't persist on refresh. Every time the page loads, the `data` populates the form's initial values. With a real CMS, you'll need to track and persist those data changes with some sort of backend.

<!-- TODO: drill this point in better, how Tina doesn't care where the data comes from. List currently documented backend options at the moment or refer to guides to get latest info on backends. -->

## Loading Content from an external API

For this example, we will use a [fake API](https://jsonplaceholder.typicode.com/) to fetch content and post changes. We will use the `loadInitialValues` function to fetch content.

**src/App.js**

```diff
//..

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
-   initialValues: {
-     ...data,
-   },
+   loadInitialValues() {
+     return fetch(
+       'https://jsonplaceholder.typicode.com/posts/1'
+     ).then((response) => response.json());
+   },
    onSubmit: async () => {
      window.alert('Saved!');
    },
  }

  const [editableData, form] = useForm(formConfig);

  usePlugin(form);

  return (
    //...
  );
}

//...
```

## Saving Content

Next we'll adjust the `onSubmit` function to send the updated data back to this API:

**src/App.js**

```js
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
    loadInitialValues() {
      return fetch(
        'https://jsonplaceholder.typicode.com/posts/1'
      ).then(response => response.json())
    },
    // Send the updated form data to the fake API
    onSubmit(formData) {
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: 1,
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(json => console.log(json))
    },
  }

  const [editableData, form] = useForm(formConfig)

  usePlugin(form)

  return (
    //...
  )
}
```

Note that this function won't actually save those new values on the server — it is a fake API after all. But the response will act as if it did. This example just puts the response in the console to show what was returned.

### Other backends

//.. blurb on backends in Tina how it depends on your framework, workflow etc. The frontend React UI for editing in Tina doesn't really care where the data comes from. It's super flexible in this way.
