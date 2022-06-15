---
title: The Schema
id: schema
last_edited: '2022-06-15T15:51:56.737Z'
next: /docs/reference/collections
prev: /docs/reference/overview
---


The Schema is located in `.tina/schema.{ts,tsx,js}` and it **must be** the default export of this file. It is used to define the shape of the content. 


| Property     | Description              |
|--------------|--------------------------|
| `collection` | An array of [collections](/docs/reference/collections/). |


## Example

```ts
const schema = defineSchema({
    collections: [
        //..Array of collections
    ]
}) 

// ...

export default schema
```



For more information [check out the content modeling section](/docs/schema/)