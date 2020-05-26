---
title: Tags Field
prev: /docs/fields/select
next: /docs/fields/group
consumes:
  - file: /packages/@tinacms/fields/src/plugins/TagsFieldPlugin.tsx
    details: Shows Tags field and Option interfaces
---

The `tags` field represents a collection of tags.

![TinaCMS-tags-field](/img/fields/tags-field.png)

## Definition

Below is an example of how a `tags` field could be defined in a [form](/docs/forms).

```javascript
const FormConfig = {
  fields: [
    {
      name: 'frontmatter.tags',
      component: 'tags',
      label: 'Tags',
      description: 'Tags for this post',
    },
    // ...
  ],
}
```

## Options

- `name`: The path to some value in the data being edited.
- `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/fields)
- `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
- `description`: An optional description that expands on the purpose of the field or prompts a specific action.

## Interface

```typescript
interface TagsField {
  name: string
  component: 'Tags'
  label?: string
  description?: string
}
```
