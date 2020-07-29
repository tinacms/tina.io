---
title: Working with Backends
prev: /docs/getting-started/edit-content
next: null
---

You may have noticed that content changes don't persist on refresh. Every time the page loads, the `data` populates the form's initial values. With a real CMS, you'll need to track and persist those data changes with some sort of backend.

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
      //...
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

  //...
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
      //...
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

  //...
}
```

<!--TODO: add alerts! -->

Note that this function won't actually save those new values on the server — it is a fake API after all. But the response will act as if it did. This example just puts the response in the console to show what was returned.

## Other backends

Tina is fairly un-opinionated about how it receives data to edit, or where that data is stored. The backend you choose depends on your project and the React meta-framework you may be using. Currently there are numerous packages to support Git & GitHub workflows, but Tina is designed to potentially work with any data source. We have also made working prototypes to source data from [Strapi](/guides/nextjs/tina-with-strapi/overview) and Contentful (not yet documented).

Please refer to the [guides](/guides) for in-depth information on setting up various backends. Also, refer to [the forum](https://community.tinacms.org/) to read about other developers' unique configurations. As always, reach out to the Tina Team on [the forum](https://community.tinacms.org/) if you have an integration or backend idea and would like guidance or feedback on how to get started.

## Final Notes

Tina is a toolkit to build your own custom CMS. It’s not a one-size-fits-all approach like a conventional CMS. We think of the main aspects to consider when building a CMS as: constructing the editing interface, storing and managing data, and then integrating with various frameworks.

We’d like to provide developers with control and flexibility in all these aspects related to building a custom CMS. Right now, we’re building from the ground up, trying to make a solid foundation with React and Git-oriented workflows, but that’s not the end of the story in terms of what’s possible with Tina.

**Avenues to keep learning:**

- Set up [Inline Editing](/guides/general/inline-blocks/overview), or editing content directly on the page
- Configure more complex fields, such as [Blocks](/docs/plugins/fields/blocks) or the [Markdown Wysiwyg](docs/plugins/fields/markdown)
- Create new data files with [Content Creator Plugins](/docs/plugins/content-creators)
- Add Tina to a [Next.js Site](/guides/nextjs/adding-tina/overview)
- Adding Tina to a [Gatsby Site](guides/gatsby/adding-tina/project-setup)

Follow [Tina on Twitter](https://twitter.com/tina_cms) 🦙! Stay up to date with the latest developments via [Release Notes](TODO: what url?). If you're stoked on this project, please give us a 🌟 on the [GitHub repository](https://github.com/tinacms/tinacms). Interested in contributing? Get started via the [project README](https://github.com/tinacms/tinacms).
