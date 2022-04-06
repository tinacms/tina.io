---
title: Modify getStaticProps()
last_edited: '2022-04-06T10:00:00.000Z'
---

Next, we'll want to update `getStaticProps` to include `locale` as part of the `relativePath`.

```js
/**
 * /pages/post/[filename].tsx
 */

// `locale` is provided alongside `params`
const getStaticProps = async({ params, locale }) {
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
