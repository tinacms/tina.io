---
title: List Field
prev: /docs/fields/tags
next: /docs/fields/group
consumes:
---

The **List Field** represents an array of [primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) values — specifically strings or numbers.

Use this field when you want to support _multiple entities_ that all output a single value. Each entity will appear in a list where you can edit, add and delete them. Fields that can be used to edit the array of primitive values in the list are: text, textarea, number & select.

![tinacms-list-field](/img/fields/list-field.png)

## Options

```typescript
interface ListFieldDefinititon extends Field {
  component: 'list'
  name: string
  field: {
    component: 'text' | 'textarea' | 'number' | 'select'
  }
  label?: string
  description?: string
  defaultItem?: string | number | (() => string | number)
  itemProps?: (
    item: object
  ) => {
    key?: string
  }
}
```

| Option        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component`   | The name of the plugin component. Always `'list'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `name`        | The path to some value in the data being edited.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `field`       | The [`field`](/docs/fields) that will render to edit each list item. Component Options: 'text', 'textarea', 'number', or 'select'                                                                                                                                                                                                                                                                                                                                                                         |
| `label`       | A human readable label for the field. Defaults to the `name`. _(Optional)_                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `description` | Description that expands on the purpose of the field or prompts a specific action. _(Optional)_                                                                                                                                                                                                                                                                                                                                                                                                           |
| `defaultItem` | Provides the `list` items with default data upon being created. Returns an empty string if no value is provided. _(Optional)_                                                                                                                                                                                                                                                                                                                                                                             |
| `itemProps`   | A function that generates `props` for each list item. It takes the item as an argument. _(Optional)_ <br><br> It returns an object containing, `key`: This property is used to optimize the rendering of lists. If rendering is causing problems, use `defaultItem` to generate a new key, as is seen in [this example](http://tinacms.org/docs/fields/group-list#definition). Feel free to reference the [React documentation](https://reactjs.org/docs/lists-and-keys.html) for more on keys and lists. |

> This interfaces only shows the keys unique to the list field.
>
> Visit the [Field Config](/docs/fields) docs for a complete list of options.

## Definition

Below is an example of how a `list` field could be defined in a form.

For example, if we had a list of lunch options in the frontmatter of a Markdown file:

```yaml
---
lunch_menu:
  - Hotdog
  - Tacos
  - Falafel
  - Sliders
---

```

Our `list` field config could look like this:

```javascript
const formOptions = {
  fields: [
    {
      label: 'Lunch Options',
      name: 'frontmatter.lunch_menu',
      component: 'list',
      defaultItem: 'Turkey & Swiss',
      field: {
        component: 'text',
      },
    },
  ],
}
```
