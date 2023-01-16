---
title: The "datetime" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `datetime`

```ts
type DatetimeField = {
  label: string
  name: string
  type: 'string'
   /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
    dateFormat: string // eg 'YYYY MM DD'
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: string, name: string, field: F) => any
    format?: (value: string, name: string, field: F) => any
    validate?(
      value: string,
      allValues: any,
      meta: any,
      field: UIField<F, Shape>
    ): string | undefined | void  
  }
}
```

The return value for a datetime is in [ISO string format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString "")

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/datetime" />

## Custom format

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/datetime-format" />

### Using a time picker

You can add a timepicker to the date UI by supplying the \`ui.timeFormat\` property

```javascript
{
  type: "datetime",
  name: "date",
  label: "Date",
  ui: {
    timeFormat: "HH:mm"
  },
},
```

