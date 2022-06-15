---
title: Fields
id: fields
last_edited: '2021-07-27T15:51:56.737Z'
---

<!-- # next: /docs/reference/schema -->

Fields are how the shape of the content is defied. There are [many types of fields](/docs/reference/types) each with its own type of input and shape.


Although some fields have more properties here is a list of common ones that are used.

| Property     | Description              |
|--------------|--------------------------|
| `name` | The name of the field |
| `type` | The [type of the field](/docs/reference/types/) to be used |
| `label` | A human friendly label that will be displayed to the user (*optional* and will default to `name`)|
| `required` | If `true`, the collection can not be saved without this field present (*optional*, defaults to `false`) | 
| `isTitle`  | The title of the document. This will be displayed in the CMS. (*optional*, defaults to `false`)|
| `isBody`  | If `true` this field will be used as the body of the document (*optional*, defaults to `false`) |
| `ui`  | What is used to extend the user interface of the field. See [extending tina section](/docs/extending-tina/overview/) for more information |



<!-- (Requires the [datalayer to be enabled](), and requires `required: true`) -->