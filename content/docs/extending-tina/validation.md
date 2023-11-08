---
title: Validation
last_edited: '2023-11-06T05:00:00.000Z'
prev: /docs/extending-tina/overview
next: /docs/extending-tina/custom-field-components
---

Tina allows client-side validation using a validation function. This function returns a `string` error message if the value is **invalid** or `null` if the field is **valid**.

To include other field values of the form in the validation, a data argument can be used.

## Example

::::code-snippets
:::code-snippet{open=true url="/img/code-snippets/invalid-1.png"}

### Validate the length of a `string` field

```ts
{
  label: "Title",
  name: "title",
  type: "string",
  ui: {
    validate: (value, data)=>{
      const lengthOfTitle = value?.length || 0
      const lengthOfDescription = data?.description?.length || 0
      if(lengthOfTitle >= lengthOfDescription){
        return 'The description must be longer than the title'
      }
    }
  }
}
```

:::
::::

The following schema types support the use of `validate`:

* [string](/docs/reference/types/string/)
* [datetime](/docs/reference/types/datetime/)
* [boolean](/docs/reference/types/boolean/)
* [image](/docs/reference/types/image/)
* [number](/docs/reference/types/number/)
