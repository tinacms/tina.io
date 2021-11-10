---
title: The CMS
prev: /docs/content-management
next: /docs/forms
consumes:
  - file: /packages/tinacms/src/tina-cms.ts
    description: Creates TinaCMS instance and describes config
  - file: /packages/tinacms/src/react-tinacms/with-tina.tsx
    description: Shows how to use withTina HOC
  - file: /packages/tinacms/src/use-cms.ts
    description: Demonstrates useCMS hook
  - file: /packages/react-sidebar/sidebar.ts
    description: Shows sidebar state interface
  - file: /packages/react-toolbar/toolbar.ts
    description: Shows Toolbar state interface
last_edited: '2021-06-22T19:01:05.703Z'
---

> This document documents how to use the CMS object how our legacy API. Checkout the underlying CMS reference doc for details on how to use this object.

> Reference [Step 1](/docs/getting-started/cms-set-up) of the Introductory Tutorial for an example on setting up the CMS.

## Setting up the CMS Object

A project that uses Tina will start by setting up an instance of the CMS.

```javascript
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS({ enabled: true })
```

The `TinaCMS` constructor receives an object that can be used to configure CMS behavior. See [CMS Configuration](#cms-configuration) for details.

### The <TinaProvider> Component

The `<TinaProvider>` component should wrap your entire site. It provides the following:

1. The user interface for interacting with Tina.
2. A [Context](https://reactjs.org/docs/context.html) for accessing the CMS object via the [useCMS](#accessing-the-cms-object) hook.

After instantiating the CMS object, pass it to the `<TinaProvider>` component via its `cms` prop.

```jsx
import * as React from 'react'
import { TinaProvider, TinaCMS } from 'tinacms'
import MyApp from './my-app'

export default function App() {
  const cms = React.useMemo(() => new TinaCMS({ enabled: true }))
  return (
    <TinaProvider cms={cms}>
      <MyApp />
    </TinaProvider>
  )
}
```

> Learn more about [conditionally loading Tina Styles](/docs/ui/styles#dynamically-loading-tina-styles).

Alternatively, you can use the `withTina` higher-order component to wrap your site with the `<TinaProvider>` component. `withTina` will automatically instantiate the CMS object.

```javascript
import { withTina } from 'tinacms'
import MyApp from './my-app'

export default withTina(MyApp)
```

`withTina` accepts a [configuration object](#cms-configuration) as a second argument that is passed to the `TinaCMS` constructor.

```javascript
import { withTina } from 'tinacms'
import MyApp from './my-app'

export default withTina(MyApp, {
  enabled: process.env.NODE_ENV !== 'production',
  sidebar: true,
})
```

## Accessing the CMS Object

The CMS object can be retrieved from context via the `useCMS` hook. Reference the available [core properties](/docs/cms#reference) to work with.

```javascript
import * as React from 'react'
import { useCMS } from 'tinacms'

// <SomeComponent /> is assumed to be nested inside of the <TinaProvider> context
export default function SomeComponent() {
  const cms = useCMS()
  //...
}
```

## Disabling / Enabling the CMS

The CMS can be enabled or disabled via methods or configuration on the CMS object. Disabling the CMS prevents the editing UI from rendering and forms from registering.

```js
import * as React from 'react'
import { useCMS } from 'tinacms'

// <ExitButton /> is assumed to be nested inside of the <TinaProvider> context
export default function ExitButton() {
  const cms = useCMS()

  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? `Exit Tina` : `Edit with Tina`}
    </button>
  )
}
```

**Example**

```javascript
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS({
  enabled: process.env.NODE_ENV !== 'production',
  plugins: [
    {
      __type: 'hello',
      name: 'hello-dj',
      user: 'DJ',
    },
  ],
  apis: {
    hello: {
      sayHello: () => alert('Hello, world!'),
    },
  },
  sidebar: {
    position: 'displace',
  },
  toolbar: false,
})
```

## CMS Configuration & Reference

For full details on configuring the CMS object, see its [reference docs](/docs/reference/toolkit/cms).
