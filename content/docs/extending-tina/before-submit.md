---
title: Before Submit Function
id: '/docs/extending-tina/before-submit'
prev: /docs/extending-tina/filename-customization
# next: /docs/extending-tina/before-submit
---

The before submit function allows you to run a function on the frontend before the form is submitted to the backend and optionally modify the values of a document.

## Definition

```ts
type BeforeSubmitFunction = (args: {
  values: Record<string, unknown>
  cms: CMS
  form: Form
  tinaForm: TinaForm
}) => Promise<void | Record<string, unknown>>
```

## Examples

### Adding a last updated field

```js
// tina/config.{ts.js}

export default defineConfig({
  schema: {
    collections: [
      {
        ui: {
          // Example of beforeSubmit
          beforeSubmit: async ({ values }) => {
            return {
              ...values,
              lastUpdated: new Date().toISOString(),
            }
          },
          //...
        },
        //...
      },
      //...
    ],
  },
  //...
})
```

### Adding a created at field

```js
export default defineConfig({
  schema: {
    collections: [
      {
        ui: {
          beforeSubmit: async ({ values, form }) => {
            if (form.crudType === 'create') {
              return {
                ...values,
                createdAt: new Date().toISOString(),
              }
            }
          },
          //...
        },
        //...
      },
      //...
    ],
  },
  //...
})
```

### Adding a slug field

```js
export default defineConfig({
  schema: {
    collections: [
      {
        ui: {
          beforeSubmit: async ({ values, form }) => {
            return {
              ...values,
              slug: values.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, ''),
            }
          },
          //...
        },
        //...
      },
      //...
    ],
  },
  //...
})
```
