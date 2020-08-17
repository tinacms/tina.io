---
title: Working with Backends
prev: /docs/getting-started/edit-content
next: null
last_edited: '2020-08-17T21:11:10.940Z'
---
Whenever you refresh the page, you may have noticed that your changes are not saved. Every time the page loads, the `data` populates with the form's initial values.

In this step, we will connect Tina's frontend editing framework to a backend to track and persist data changes.

## Loading Content from an external API

For this example, we will use a [fake API](https://jsonplaceholder.typicode.com/) to fetch content and post changes. We will use the `loadInitialValues` function to fetch content.

**src/App.js**

```diff
//..

-const pageData = {
- title: 'Tina is not a CMS',
- body: 'It is a toolkit for creating a custom CMS.',
-}

function PageContent() {
  const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      //...
    ],
-   initialValues: pageData,
+   loadInitialValues() {
+     return fetch(
+       'https://jsonplaceholder.typicode.com/posts/1'
+     ).then((response) => response.json());
+   },
    onSubmit: async () => {
      window.alert('Saved!');
    },
  }

  //...
}

//...
```

Notice how we removed `initialValues` in favor of `loadInitialValues`, which fetches data asynchronously on form creation.

> You can use `initialValues` when your data has already been fetched or defined before your components mount. Typically you would use this if you prefer to fetch your initial data server-side, as we do in our [Next.js + GitHub example](https://tinacms.org/guides/nextjs/github/initial-setup)

## Saving Content

Next we'll adjust the `onSubmit` function. When the editor clicks the 'Save' button in the sidebar, `onSubmit` will be called, sending the updated data back to the API:

**src/App.js**

```diff
function PageContent() {
  const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      //...
    ],
    loadInitialValues() {
      return fetch(
        'https://jsonplaceholder.typicode.com/posts/1'
      ).then(response => response.json())
    },
-   onSubmit: async () => {
-     window.alert('Saved!');
-   },
+   onSubmit(formData) {
+    return fetch('https://jsonplaceholder.typicode.com/posts/1', {
+       method: 'PUT',
+       body: JSON.stringify({
+         id: 1,
+         title: formData.title,
+         body: formData.body,
+         userId: 1,
+       }),
+       headers: {
+         'Content-type': 'application/json; charset=UTF-8',
+       },
+     })
+       .then(response => response.json())
+       .then(data => console.log(data))
+       .catch(e => console.error(e))
+   },
  }

  //...
}
```

Note that this `onSubmit` function won't actually save those new values on the server — it is a fake API after all. But the response will act as if it did. This example just puts the response in the console to show what was returned.

## Adding Alerts

While our form is functional in terms of retrieving and saving content, the editing experience could be improved by additional feedback. What if the form failed to save? Currently, the editor would need to check the console to see that there was an error.

> [**CMS Alerts **](/docs/ui/alerts)are useful for displaying quick, short feedback to the editor.

Let's add a few to improve the feedback for saving content.

### The Steps

1. Access the CMS object through the `useCMS` hook.
2. Use the `info`,`success`, & `error` methods to trigger alerts with a custom messages.

**src/App.js**

```diff
//...

function PageContent() {
+ const cms = useCMS();
  const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      //...
    ],
    loadInitialValues() {
      //...
    },
    onSubmit(formData) {
+     cms.alerts.info('Saving Content...')
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        //...
      })
        .then((response) => response.json())
-       .then(json => console.log(json))
+       .then((data) => {
+         cms.alerts.success('Saved Content!');
+         console.log(data);
+       })
-       .catch(e => console.error(e))
+       .catch((e) => {
+         cms.alerts.error('Error Saving Content');
+         console.error(e);
+       });
    },
  };

  //...
}

//...
```

![tinacms-success-alert](/img/getting-started/alert.png)

> _Tip:_ Dispatching alerts can be powerful in combination with [CMS Events](/docs/events).

## Other backends

Tina is backend-agnostic, meaning that you choose where to store your data based on the project requirements and the React meta-framework you may be using.

Currently, there are numerous packages to support Git & GitHub workflows, as well as integration with 3rd party headless CMS (prototypes).

* [Tutorial to Use Strapi as DataSource](/guides/nextjs/tina-with-strapi/overview)
* Tutorial to Use GitHub as DataSource
* Tutorial to Use Git FileSystem as Data Sourc

Please refer to the [guides](/guides) for in-depth information on setting up various backends. Also, refer to [the forum](https://community.tinacms.org/) to read about other developers' unique configurations. As always, reach out to the Tina Team on [the forum](https://community.tinacms.org/) if you have an integration or backend idea and would like guidance or feedback on how to get started.

## Final Notes

Tina is a toolkit to build your own custom CMS. It’s not a one-size-fits-all approach like a conventional CMS. We think the main aspects to consider when building a CMS are: constructing the editing interface, storing and managing data, and then integrating with various frameworks.

We’d like to provide developers with control and flexibility in all these aspects related to building a custom CMS. Right now, we’re building Tina from the ground up, trying to make a solid foundation with React and Git-oriented workflows, but that’s just the beginning.

**Avenues to keep learning:**

* Gain clarity with our [FAQ](_Coming soon_)
* Set up [Inline Editing](/guides/general/inline-blocks/overview), or editing content directly on the page
* Configure more complex fields, such as [Blocks](/docs/plugins/fields/blocks) or the [Markdown Wysiwyg](docs/plugins/fields/markdown)
* Create new data files with [Content Creator Plugins](/docs/plugins/content-creators)
* Add Tina to a [Next.js Site](/guides/nextjs/adding-tina/overview)
* Add Tina to a [Gatsby Site](guides/gatsby/adding-tina/project-setup)

Follow [Tina on Twitter](https://twitter.com/tina_cms) 🦙! If you're stoked on this project, please give us a 🌟 on the [GitHub repository](https://github.com/tinacms/tinacms).

Stay up to date with the latest developments via [Release Notes](/docs/releases) or reach out on [the forum](https://community.tinacms.org/) with ideas or questions. Interested in contributing? Get started via the [project README](https://github.com/tinacms/tinacms).

<!--TODO: add more additional reading sections on the pages? for the common questions. Would be great to link to a FAQ LINK -->