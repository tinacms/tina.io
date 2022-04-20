---
title: Custom List Rendering
id: '/docs/extending-tina/customize-list-ui'
prev: /docs/extending-tina/custom-field-components
next: /docs/extending-tina/format-and-parse
---


If list is `true` the default label is often not very useful to editors.

![list UI](https://res.cloudinary.com/forestry-demo/image/upload/v1649941182/tina-io/docs/extending-tina/Extending_Tina_No_List_Props.png)

The label used for list items can be customized using the `itemProps` function. The main use-case for this is to provide a custom label based on the data in the component.

For example, to use the `title` field as the label for this image gallery collection:

```ts
// schema.{ts,js,tsx}

// ...Other fields
{
  label: "Image Gallery",
  name: "gallery",
  type: "object",
  list: true,
  ui: {
    itemProps: (item) => {
// Field values are accessed by title?.<Field name>
      return { label: item?.title };
    },
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
      ui: { defaultValue: "A new title" },
    },
    { label: "Image", name: "image", type: "image" },
    {
      label: "Size",
      name: "size",
      type: "string",
      options: ["sm", "med", "lg", "xl"],
    },
  ],
};
```
which will render as:
![List UI with label prop](https://res.cloudinary.com/forestry-demo/image/upload/v1649941182/tina-io/docs/extending-tina/Extending_Tina_Label_List_Props.png)


Although providing a custom label is the most common use-case of `itemProps`, the `className` and `style` props can also be returned to allow custom styling of the list component.


For example:
```ts
// schema.{ts,js,tsx}

// ...Other fields
{
  label: "Image Gallery",
  name: "gallery",
  type: "object",
  list: true,
  ui: {
    itemProps: (item) => {
      if (item?.title === "Dog") {
        return { label: item?.title, style: { backgroundColor: "blue" } };
      }
// Field values are accessed by title?.<Field name>
      return { label: item?.title };
    },
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
      ui: { defaultValue: "A new title" },
    },
    { label: "Image", name: "image", type: "image" },
    {
      label: "Size",
      name: "size",
      type: "string",
      options: ["sm", "med", "lg", "xl"],
    },
  ],
}
```

![List UI with label and style prop](https://res.cloudinary.com/forestry-demo/image/upload/v1649941182/tina-io/docs/extending-tina/Extending_Tina_Style_List_Props.png)