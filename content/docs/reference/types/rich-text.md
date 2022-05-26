---
title: The "rich-text" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `rich-text`

```ts
type RichTextField = {
  label: string
  name: string
  type: 'rich-text'
  templates: Template[]
}
```

<iframe width="100%" height="700px" src="https://tina-gql-playground.vercel.app/iframe/rich-text" />

#### Slash commands

To add an embedded template quickly enter `/`, this will present you with the embedable objects,
filtering them out as you type.

#### Default values
> Currently, if setting a default value for a rich-text field, you must provide the document AST. See [example here](/docs/schema/#default-value-for-rich-text)