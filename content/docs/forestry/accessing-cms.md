---
title: 'Comparing Tina & Forestry: Accessing the CMS'
id: '/docs/forestry/accessing-cms/'
---

## CMS Hosting

One of the main differences between Forestry.io and TinaCMS is how you access the CMS. In Forestry, you access the CMS via our hosted environment (`app.forestry.io`).

In TinaCMS, the CMS frontend is hosted alongside your site. This pattern is comparable to Forestry's "remote-admin" feature, which allows you to access the CMS from your site's URL.

To set this up, your site's build script will change to something like:

```diff
- build: hugo
+ build: tinacms build && hugo
```

The `tinacms build` step outputs the TinaCMS dashboard SPA in your site's build directory.

Once TinaCMS is setup, your editors will access the CMS via (`<your-site-url>/admin`)
![](https://res.cloudinary.com/forestry-demo/image/upload/v1670430150/tina-io/docs/forestry-migration/accessing-admin.gif)

## Extra flexibility

By having the CMS-frontend hosted within your site, you have more flexibility/control over your CMS behaviour. Write custom field components, create custom field validations, reuse your schema models, etc.

For example, here's how you might go about creating a custom "read-only field"

```js
//config.js
// ...
const ReadonlyTextField = wrapFieldsWithMeta(({ input }) => {
  return <input type="text" disabled className={textFieldClasses} {...input} />
})

export default defineSchema({
  collections: [
    {
      label: 'Post',
      name: 'post',
      path: 'posts',
      fields: [
        {
          label: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          label: 'identifier',
          name: 'identifier',
          type: 'string',
          ui: {
            component: ReadonlyTextField,
          },
        },
      ],
    },
  ],
})
```
