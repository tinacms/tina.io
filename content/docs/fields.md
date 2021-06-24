---
title: Field Plugins
prev: /docs/forms
next: /docs/plugins/content-creators
last_edited: '2020-08-05T15:33:06.570Z'
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

- [Text](/docs/fields/text)
- [Textarea](/docs/fields/textarea)
- [Number](/docs/fields/number)
- [Image](/docs/fields/image)
- [Color](/docs/fields/color) _May be external soon_
- [Toggle](/docs/fields/toggle)
- [Select](/docs/fields/select)
- [Tags](/docs/fields/tags)
- [List](/docs/fields/list)
- [Group](/docs/fields/group)
- [Group List](/docs/fields/group-list)
- [Blocks](/docs/fields/blocks)

## External Field Plugins

These are plugins that must be installed through separate packages:

- [Date & Time](/docs/fields/date)
- [Markdown](/docs/fields/markdown)
- [HTML](/docs/fields/html)

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

> Check out [the final-form docs](https://final-form.org/docs/final-form/field-names) for a more detailed look at how the `name` field works.

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

`'color'` is referring to the `name` of the Color [Field Plugin](/docs/fields/custom-fields#2-creating-field-plugins) that is hooked up to the CMS by default.

You can also define components to render in place of a default field:

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

In the example above, the custom field component isn't being used to edit data, but rather as a method of customizing the sidebar organization.

## Additional Reading

- Read these blogs on creating custom [field components](/blog/custom-field-components) and [field plugins](/blog/custom-field-plugins)
- There are also [fields for Inline Editing](/docs/ui/inline-editing#using-pre-configured-inline-fields)
