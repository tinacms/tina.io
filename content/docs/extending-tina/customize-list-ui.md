---
title: Customize List User Interface
id: '/docs/extending-tina/customize-list-ui'
prev: /docs/extending-tina/custom-field-components
next: /docs/extending-tina/format-and-parse
---


If list is `true` many times the default label is not very useful to the editors.

![list UI](https://res.cloudinary.com/forestry-demo/image/upload/v1649941182/tina-io/docs/extending-tina/Extending_Tina_No_List_Props.png)

This can be customized threw the use of `itemProps`. When a new item is added to the list, the list UI will get the props passed by this function. The main use case of this is to provide a custom label based on the data in the component.

For example,

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

![List UI with label prop](https://res.cloudinary.com/forestry-demo/image/upload/v1649941182/tina-io/docs/extending-tina/Extending_Tina_Label_List_Props.png)


Although label is probably the most useful part of `itemProps`, `className` and `style` can also be passed to allow custom styling of the list component.



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