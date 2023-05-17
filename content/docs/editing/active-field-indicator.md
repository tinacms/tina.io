---
title: Active Field Indicator (Experimental)
last_edited: '2021-11-06T18:00:00.000Z'
---

<div class="short-code-warning">
   <div>
      <p>This API will be phased out and replaced with <a href="/docs/editing/quick-editing/">Quick Editing</a> in the future!</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

## Try it out

To enable Active field indication you will need to add the `data-tinafield` to your client code that is powered by Tina. The `data-tinafield` will need to match the field name you provided in your schema. Below is an example:

### Schema Code

```typescript
export default defineConfig({
  // ...
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'posts',
        path: 'content/posts',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
          },
          {
            type: 'rich-text',
            label: 'Body',
            name: '_body',
            templates: [],
          },
        ],
      },
    ],
  },
})
```

### Client Code

```javascript,copy
<h2 data-tinafield="title">{props.data.post.title}</h2>
```

![Active Field Indicator](https://res.cloudinary.com/forestry-demo/image/upload/v1639489428/tina-io/Active%20Field%20Indicator.gif)
