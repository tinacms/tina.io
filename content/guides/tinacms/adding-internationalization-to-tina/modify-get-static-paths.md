---
title: Modify getStaticPaths()
last_edited: '2022-04-06T10:00:00.000Z'
---

Given that we're adding `i18n` support to the `post` collection, we'll be updating `getStaticPaths` inside `/pages/post/[filename].tsx`.

```js
/**
 * /pages/post/[filename].tsx
 */

// `locales` is provided to `getStaticPaths` and matches `locales` in the `config`
const getStaticPaths = async({ locales }) {
  const tinaProps = await staticRequest({
    query: `{
      getPostList {
        edges {
          node {
            sys {
              filename
            }
          }
        }
      }
    }`, variables: {},
  })

  const paths = [];

  tinaProps.data.getPostsList.edges.map((post) => {
    locales.map((locale) => {
      paths.push({
        params: {
          filename: post.node.sys.filename,
          locale,
        },
      });
    });
  });

  return {
    paths,
    fallback: true,
  }
```
