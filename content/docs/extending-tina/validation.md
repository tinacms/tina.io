---
title: Validation
id: '/docs/extending-tina/validation'
prev: null
next: null
---

Tina allows frontend validation to be provided in the form of a function. This function returns a `string` of an error message if the value is **invalid** and returns `null` if the field is **valid**.

Example;
```ts
//...
{
    type: 'string'
    name: 'title',
    ui: {
        validate: (value)=>{
            if(value.length > 40){
                return 'Title can not be more then 40 characters long'
            }
        }
    }
}
```

<!-- TODO: add screenshot -->


If you also want to include other field values of the form in the validation, a data argument can be used.

```ts
/// ...
fields: [
    // Other fields...
        {
         name: "title",
         type: "string",
         ui: {
           validate: (value, data)=>{
             const lengthOfTitle = value?.length || 0
             //  We have access to value by using data?.<Name of field>
             const lengthOfDescription =data?.description?.length || 0
             if(lengthOfTitle >= lengthOfDescription){
               return 'The description must be longer then the title'
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



Support schema types that can use `validate`
- [string](/docs/reference/types/string/)
- [datetime](/docs/reference/types/datetime/)
- [boolean](/docs/reference/types/boolean/)
- [image](/docs/reference/types/image/)
- [number](/docs/reference/types/number/)
