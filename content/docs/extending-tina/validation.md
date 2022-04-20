---
title: Validation
id: '/docs/extending-tina/validation/'
prev: '/docs/extending-tina/overview'
next: '/docs/extending-tina/custom-field-components'
---

Tina allows frontend validation to be provided in the form of a function. This function returns a `string` of an error message if the value is **invalid** and returns `null` if the field is **valid**.

Example;
```ts
// .tina/schema.{js,tsx}

//...
{
    type: 'string'
    name: 'title',
    ui: {
        validate: (value)=>{
            if(value.length > 40){
                return 'Title cannot be more than 40 characters long'
            }
        }
    }
}
```

<!-- TODO: add screenshot -->

To include other field values of the form in the validation, a data argument can be used.

```ts
// .tina/schema.{js,tsx}

/// ...
fields: [
    // Other fields...
        {
         name: "title",
         type: "string",
         ui: {
           validate: (value, data)=>{
             const lengthOfTitle = value?.length || 0
//  We have access to value of description by using data?.<Name of field>
             const lengthOfDescription = data?.description?.length || 0
             if(lengthOfTitle >= lengthOfDescription){
               return 'The description must be longer than the title'
             }
           }
         }
      },
      {
        name: "description",
        type: "string",
      },
    ]
```

<!-- TODO: add screenshots -->



The following schema types support the use of `validate`
- [string](/docs/reference/types/string/)
- [datetime](/docs/reference/types/datetime/)
- [boolean](/docs/reference/types/boolean/)
- [image](/docs/reference/types/image/)
- [number](/docs/reference/types/number/)
