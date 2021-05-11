---
title: Model your content
last_edited: '2020-08-11T13:02:36.046Z'
---

Now that we have Tina set up on our site, we're almost able to start editing some content. Before we can do that, we need to model our content within Tina Cloud.

The "Tina Graphql Gateway CLI" provides some tooling to help make this easy.

## Installation

The CLI can be installed as a dev dependency in your project.

```bash,copy
yarn add --dev tina-graphql-gateway-cli
```

## Getting started

The simplest way to get started is to add a `.tina/schema.ts` file

```bash,copy
mkdir .tina && touch .tina/schema.ts
```

This schema needs to include each of the fields that are in our `\_posts` files.
In `.tina/schema.ts`, copy/paste the following:

```jsx,copy
import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: '_posts',
      templates: [
        {
          label: 'Post',
          name: 'post',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'text',
              label: 'Excerpt',
              name: 'excerpt',
            },
            {
              type: 'text',
              label: 'Cover Image',
              name: 'coverImage',
            },
            {
              type: 'text',
              label: 'Date',
              name: 'date',
            },
            {
              type: 'group',
              label: 'Author',
              name: 'author',
              fields: [
                {
                  type: 'text',
                  label: 'Name',
                  name: 'name',
                },
                {
                  type: 'text',
                  label: 'Picture',
                  name: 'picture',
                },
              ],
            },
            {
              type: 'group',
              label: 'OG Image',
              name: 'ogImage',
              fields: [
                {
                  type: 'text',
                  label: 'Url',
                  name: 'url',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})
```

You also need to add this field/value to each of Markdown file in "\_posts":

`_template: "post"`

Now that we have defined a "post" model, and applied it to each of our posts.

The last step to setting up our content models is to "compile" our schema. Through the terminal, run:

```bash,copy
yarn tina-gql schema:compile
```

Once that is successful, **push your changes up to your GitHub repository** 
This is an mandatory step, as the Tina Cloud content API reads this schema from your GitHub repository.
