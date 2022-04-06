---
title: Testing
last_edited: '2022-04-06T10:00:00.000Z'
---

![Editing English](https://res.cloudinary.com/forestry-demo/image/upload/v1649260597/tina-io/docs/i18n/edit-en.png)

With our Documents created, we can confirm that the correct Document is loaded based on the user's `locale` by adding a `console.log` to `getStaticProps`:

```js
/**
 * /pages/post/[filename].tsx
 */

// `locale` is provided alongside `params`
const getStaticProps = async({ params, locale }) {
  // console out the `locale`
  console.log('locale', locale)
  // compose `filename` with `locale`
  const relativePath = `${params.filename}.${locale}.mdx`

  const tinaProps = await staticRequest({
    query: `query($relativePath: String) {
      getPostDocument(relativePath: $relativePath) {
        data {
          ...
        }
      }
    }`, variables: {relativePath},
  })

  return {
    props: {
      ...tinaProps
    }
  }
}
```

The output will appear in the CLI console:

- Visiting `http://localhost:3000/post/hello-world`

```bash
locale en-US
```

- Visiting `http://localhost:3000/fr/post/hello-world`

```bash
locale fr
```

![Editing French](https://res.cloudinary.com/forestry-demo/image/upload/v1649260596/tina-io/docs/i18n/edit-fr.png)
