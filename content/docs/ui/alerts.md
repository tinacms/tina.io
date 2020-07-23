---
title: Alerts
prev: /docs/ui/inline-editing
next: /docs/ui/styles
---

The CMS' **alerts** feature allows you to display short, ephemeral messages to users.

Display an alert by calling one of the **alert level methods** on the CMS object, and passing in your message.

```javascript
cms.alerts.info('This is an alert')
```

{{ AlertTest type="info" message="This is an alert"}}

## Alert Levels

The CMS supports four alert levels: `success`, `info`, `warn`, and `error`. Each alert level is its own method on `cms.alerts`; call the corresponding method with your message to trigger the appropriate alert.

{{ AlertTest type="success" message="This is a 'success' alert" buttonText="Success"}}
{{ AlertTest type="info" message="This is an 'info' alert" buttonText="Info"}}
{{ AlertTest type="warn" message="This is a 'warn' alert" buttonText="Warn"}}
{{ AlertTest type="error" message="This is an 'error' alert" buttonText="Error"}}

## Alert Timeout

You can also optionally pass in a _timeout_ argument that specifies the message lifetime in milliseconds. The default timeout is 3000ms (3 seconds).

```javascript
cms.alerts.info('This alert will hang around a little longer', 5000)
```

{{ AlertTest type="info" message="This alert will hang around a little longer", timeout="5000"}}

## Usage Example

The below example demonstrates how you might use alerts with a custom save handler:

```jsx
import { useCMS, useForm } from 'tinacms'
import { saveFormData } from './my-custom-save-handler'

export function Page() {
  const cms = useCMS()
  const [modifiedData] = useForm({
    // ...
    onSubmit: async formData => {
      try {
        await saveFormData(formData)
        cms.alerts.success('Page saved successfully.')
      } catch (e) {
        cms.alerts.error(`Error saving post: ${e.message()}`)
      }
    },
  })
  return (
    // ...
  )
}
```
