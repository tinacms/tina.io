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
import { defineConfig, wrapFieldsWithMeta } from 'tinacms'

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

> Note: in this example, `parse` is also needed. [Read more about `parse`](/docs/extending-tina/format-and-parse/).

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

Each field has a unique set of properties that can be configured within the schema.

For example, if you take a look at the color field plugin's definition, it takes a `colorFormat` property. We can configure that in our schema like so:

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

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on "Customizing Components" from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/amSRwAbgMR0?start=744" title="TinaCMS Deep Dive (Customizing Components)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>
