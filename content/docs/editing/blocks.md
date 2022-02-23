---
title: Block-based editing
id: '/docs/editing/blocks'
next: /docs/advanced/extending-tina
---

Tina supports block-based editing, so that your editors can build out full pages using your pre-defined blocks

![block-based-editing](/img/your-blocks.gif)

Let's say you want your editors to build out a page, and you have 3 main "block" types to start.

- a "Hero" block
- a "Feature" block
- a "Main Content" block

We want to allow our editors to use various blocks on each page.

## Defining our schema

We are going to use the [`object` type](/docs/schema/#grouping-properties-within-an-object), and provide a list of `templates`, where each "template" represents a unique block type.

```ts
// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

const heroBlock = {
  name: 'hero',
  label: 'Hero',
  ui: {
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text:
        'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Text',
      name: 'text',
      ui: {
        component: 'markdown',
      },
    },
  ],
}

const featureBlock = {
  name: 'features',
  label: 'Features',
  fields: [
    {
      type: 'object',
      label: 'Feature Items',
      name: 'items',
      list: true,
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Text',
          name: 'text',
        },
      ],
    },
  ],
}

const contentBlock = {
  name: 'content',
  label: 'Content',
  ui: {
    defaultItem: {
      body:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
    },
  },
  fields: [
    {
      type: 'string',
      ui: {
        component: 'markdown',
      },
      label: 'Body',
      name: 'body',
    },
  ],
}

export default defineSchema({
  collections: [
    {
      // ...
      fields: [
        {
          type: 'object',
          list: true,
          name: 'blocks',
          label: 'Sections',
          templates: [heroBlock, featureBlock, contentBlock],
        },
      ],
    },
  ],
})
```

We have defined the structure of our 3 blocks (`content`, `features`, `hero`), as well as our main blocks field: `blocks`.

> Note, since our contentBlock uses the [markdown plugin](/docs/reference/toolkit/fields/markdown/) which is not registered out of the box, we will need to manually import the `react-tinacms-editor` plugin.

## Querying Block Data

Because each item in a list of blocks can have a unique schema, querying this data isn't as straightforward as other types of fields. We'll need use GraphQL's fragment syntax to query the appropriate data shape for each block type.

The fragment names are automatically generated based on the collection name and parent field name. For example, if the collection is `pages`, the field is `blocks`, and the block's name is `hero`, the fragment will be named `PagesBlocksHero`.

```graphql
query getPagesDocument($relativePath: String!) {
  getPagesDocument(relativePath: $relativePath) {
    data {
      blocks {
        __typename
        ... on PagesBlocksHero {
          __typename
          tagline
          headline
          text
        }
        ... on PagesBlocksFeatures {
          __typename
          title
          text
        }
        ... on PagesBlocksContent {
          __typename
          body
        }
      }
    }
  }
}
```

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPagesDocument(relativePath%3A%20%22turbo.json%22)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20blocks%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20...%20on%20PagesBlocksHero%20%7B%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20tagline%0A%20%20%20%20%20%20%20%20%20%20headline%0A%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20...%20on%20PagesBlocksFeatures%20%7B%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20items%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20text%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20...%20on%20PagesBlocksContent%20%7B%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20body%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=getPagesDocument" width="800" height="400">

> For more info on how to query data with Tina's GraphQL API, check out the [Query Documentation](https://tina.io/docs/graphql/queries/)

## Rendering our blocks

We can render out the blocks on a page by creating a new `Blocks` component, which will conditionally render each block-type in a switch statement.

```tsx
// Blocks.tsx

import React from "react";
import type { Pages } from "../.tina/__generated__/types";
import { Content } from "./blocks/content";
import { Features } from "./blocks/features";
import { Hero } from "./blocks/hero";
import { Testimonial } from "./blocks/testimonial";

export const Blocks = (props: Pages) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "PagesBlocksContent":
                return (
                  <React.Fragment key={i + block.__typename}>
                    <Content data={block} />
                  </React.Fragment>
                );
              case "PagesBlocksHero":
                return (
                  <React.Fragment key={i + block.__typename}>
                    <Hero data={block} />
                  </React.Fragment>
                );
              case "PagesBlocksFeatures":
                return (
                  <React.Fragment key={i + block.__typename}>
                    <Features data={block} />
                  </React.Fragment>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
```

Note that the `__typename` on each blog is `{CollectionName}{FieldName}{BlockTemplateName}`

In our case:

- CollectionName: "Pages"
- FieldName: "Blocks"
- BlockTemplateName: "Content" | "Hero" | "Features"
