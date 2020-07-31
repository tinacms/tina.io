---
title: Field Plugins
prev: /docs/plugins/forms
next: /docs/plugins/content-creators
---

Fields are added to forms via the `fields` array and create the editing interface of a form.

## Field Config

All field plugins share a common config:

```typescript
interface FieldConfig {
  name: string
  component: string | ReactComponent
  label?: string
  parse?(value: any, name: string, field: Field): any
  format?(value: any, name: string, field: Field): any
  validate?(
    value: any,
    allValues: any,
    meta: any,
    field: Field
  ): string | object | undefined
}
```

| key         | description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `name`      | Equivalent of an input's `name` attribute.                                                     |
| `component` | Either a string denoting a field already registered with the CMS, or a custom field component. |
| `label`     | _Optional:_ A label to render above the field input.                                           |
| `parse`     | _Optional:_ Prepare the data for usage in the field component.                                 |
| `format`    | _Optional:_ Prepare the data for saving.                                                       |
| `validate`  | _Optional:_ Return undefined when valid. Return a string or an object when there are errors.   |

## Default Field Plugins

These are the default field plugins available through the CMS:

- [Text](/docs/plugins/fields/text)
- [Textarea](/docs/plugins/fields/textarea)
- [Number](/docs/plugins/fields/number)
- [Image](/docs/plugins/fields/image)
- [Color](/docs/plugins/fields/color) _May be external soon_
- [Toggle](/docs/plugins/fields/toggle)
- [Select](/docs/plugins/fields/select)
- [Tags](/docs/plugins/fields/tags)
- [List](/docs/plugins/fields/list)
- [Group](/docs/plugins/fields/group)
- [Group List](/docs/plugins/fields/group-list)
- [Blocks](/docs/plugins/fields/blocks)

## External Field Plugins

These are plugins that must be installed through separate packages:

- [Date & Time](/docs/plugins/fields/date)
- [Markdown](/docs/plugins/fields/markdown)
- [HTML](/docs/plugins/fields/html)

## Field Definition

You can add fields to a form through the `fields` array in the [form configuration](/docs/plugins/forms#form-configuration). The Field definition at minimum needs a `name` and `component`. This is an example of a simple [`text`](/docs/plugins/fields/text) field definition.

**Example form configuration**

```js
const formOptions = {
  id: 'lynel-hoofs',
  label: 'Edit This Page',
  fields: [
    {
      name: 'tagline',
      component: 'text',
    },
  ],
}
```

> Refer to individual field plugin docs for additional examples.

### _name_

The `name` property connects the field with the source data by providing the path to that content from the root of the source data.

For example, say we had a JSON object:

```json
{
  "headline": "Banana Pancakes"
}
```

Our field definition to edit `headline` would be:

```js
{
  fields: [
    {
      name: 'headline',
      component: 'text',
    },
  ],
}
```

If the data structure looked a little different:

```json
{
  "hero": {
    "headline": "Banana Pancakes"
  }
}
```

The `name` property should be updated to reflect the different path:

```js
{
  fields: [
    {
      name: 'hero.headline',
      component: 'text',
    },
  ],
}
```

### _component_

The `component` field property can either be the name of a field plugin (a string), or a React Component.

All of the previous examples show the `component` being set with a string:

```js
{
  fields: [
    {
      name: 'background_color',
      component: 'color',
    },
  ],
}
```

`'color'` is referring to the `name` of the Color [Field Plugin](/docs/plugins/fields/custom-fields#2-creating-field-plugins) that is hooked up to the CMS by default.

You can also define components inline to render in place of a default field:

**Example**

```js
const formOptions = {
  label: 'My Page',
  fields: [
    {
      label: "Athlete's Name",
      name: 'name',
      component: 'text',
    },
    // The custom inline field
    {
      name: '_',
      component: () => <h4>Best Scores</h4>,
    },
    {
      name: 'scores',
      component: 'list',
      field: 'number',
    },
  ],
}
```

In the example above, the custom inline field component isn't being used to edit data, but rather as a method of customizing the sidebar organization.

## Additional Reading

- Read these blogs on creating custom [field components](/blog/custom-field-components) and [field plugins](/blog/custom-field-plugins)
- There are also [fields for Inline Editing](/docs/ui/inline-editing#using-pre-configured-inline-fields)
