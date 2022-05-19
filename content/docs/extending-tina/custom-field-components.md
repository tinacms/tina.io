---
title: 'Custom field components'
id: '/docs/extending-tina/custom-field-components'
prev: /docs/extending-tina/validation
next: /docs/extending-tina/customize-list-ui
---

A custom component can be passed and rendered by setting the `ui.component` property on a field. This component completely overrides the original component, providing the user with the ability to fully customize the field.

## Providing your own component

A field's `ui.component` property is a React component that accepts three props:

- `field`: The [field definition](https://tinacms.org/docs/reference/toolkit/fields) for the current field.
- `input`: The data and callbacks necessary to make an input.
- `meta`: Metadata about the field in the form. (e.g. `dirty`, `valid`)

Checkout the [react-final-form](https://github.com/final-form/react-final-form#fieldrenderprops) docs for a more detailed description of the `input` and `meta` props.

### Custom Component Example

Here is a custom slider component that can be used for adjusting image saturation.

![A basic slider custom component](https://res.cloudinary.com/forestry-demo/image/upload/v1652976482/tina-io/docs/extending-tina/image-saturation.png)

```tsx
// .tina/schema.{js,tsx}
import { defineSchema, wrapFieldsWithMeta } from 'tinacms'

//.. other fields
{
  label: "Image Saturation",
  name: "saturation",
  type: "number",
  description: "My custom saturation field",
  ui: {
    parse: (val) => Number(val),

    // wrapping our component in wrapFieldsWithMeta renders our label & description.
    component: wrapFieldsWithMeta(({ field, input, meta }) => {
      return (
        <div>
          <input
            name="saturation"
            id="saturation"
            type="range"
            min="0"
            max="10"
            step=".1"
            // This will pass along props.input.onChange to set our form values as this input changes.
            {...input}
          />
          <br />
          Value: {input.value}
        </div>
      )
    })
  }
}
```

> Note in this example parse is also needed. [Read more about parse here](/docs/extending-tina/format-and-parse.md)

## Using pre-built components

Tina also provides a variety of pre-built components. To specify these, the `ui.component` property should be configured with the string name of the registered field plugin.

Below is a list of default fields.

### Default Field Plugins

- [text](/docs/reference/toolkit/fields/text/)
- [textarea](/docs/reference/toolkit/fields/textarea/)
- [number](/docs/reference/toolkit/fields/number/)
- [image](/docs/reference/toolkit/fields/image/)
- [color](/docs/reference/toolkit/fields/color/)
- [toggle](/docs/reference/toolkit/fields/toggle/)
- [radio-group](/docs/reference/toolkit/fields/radio-group/)
- [select](/docs/reference/toolkit/fields/select/)
- [tags](/docs/reference/toolkit/fields/tags/)
- [list](/docs/reference/toolkit/fields/list/)
- [group](/docs/reference/toolkit/fields/group/)
- [group-list](/docs/reference/toolkit/fields/group-list/)
- [blocks](/docs/reference/toolkit/fields/blocks/)
- [date](/docs/reference/toolkit/fields/date/)

Tina also supports some add-on field plugins. These need to be imported and registered from separate packages:

- [markdown](/docs/reference/toolkit/fields/markdown/)
- [html](/docs/reference/toolkit/fields/html/)

### Configuring a field plugin

Each field has a unique set of properties that can be configured within the `.tina/schema.ts` file.

For example, if you take a look at the color field plugin's definition, it takes a `colorFormat` property. We can configure that in our `.tina/schema.ts` like so:

```ts
// ...
        {
          type: 'string',
          label: 'Background Color',
          name: 'color',
          ui: {
            component: "color",
            colorFormat: "rgb"
          }
        },
// ...
```
