---
title: The CMS
next: /docs/cms/plugins
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
---

The CMS object in Tina is a container for attaching and accessing Plugins and APIs. On its own, the CMS does very little; however, since it's the central integration point for everything that Tina does, it's extremely important!

## Setting up the CMS Object

A project that uses Tina will start by setting up an instance of the CMS.

```javascript
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS()
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
  const cms = React.useMemo(() => new TinaCMS())
  return (
    <TinaProvider cms={cms}>
      <MyApp />
    </TinaProvider>
  )
}
```

> Learn more about [conditionally loading Tina Styles](/docs/cms/styles#dynamically-loading-tina-styles).

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
  sidebar: {
    hidden: process.env.NODE_ENV === 'production',
  },
})
```

## Accessing the CMS Object

The CMS object can be retrieved from context via the `useCMS` hook.

```javascript
import * as React from 'react'
import { useCMS } from 'tinacms'

// <SomeComponent /> is assumed to be nested inside of a <Tina> component
export default function SomeComponent() {
  const cms = useCMS()
  //...
}
```

## CMS Configuration

When instantiating the `TinaCMS` object, you can pass in a configuration object. This allows you to configure some options for the sidebar, and also allows you to configure [Plugins](/docs/cms/plugins) and [APIs](/docs/cms/apis) declaratively.

```typescript
interface TinaCMSConfig {
  plugins?: Plugin[]
  apis?: { [key: string]: any }
  sidebar?: {
    hidden?: boolean
    position?: SidebarPosition
    placeholder?: React.FC
    buttons?: {
      save: string
      reset: string
    }
  }
  toolbar?: {
    hidden?: boolean
    buttons?: {
      save: string
      reset: string
    }
  }
}
```

---

| key                  | usage                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| **plugins**          | Array of plugins to be added to the CMS object.                                                         |
| **apis**             | Object containing APIs to be registered to the CMS                                                      |
| **sidebar**          | Configures behavior of the sidebar                                                                      |
| **sidebar.hidden**   | Removes the sidebar outright                                                                            |
| **sidebar.position** | 'displace': sidebar pushes content to the side when open; 'overlay': sidebar overlaps content when open |
| **sidebar.placeholder** | Provides a placeholder component to render in the sidebar when there are no registered forms |
| **sidebar.buttons**  | Configures the text on 'Save' and 'Reset' buttons                                                       |
| **toolbar**          | Configures behavior of the toolbar                                                                      |
| **toolbar.hidden**   | Hides the toolbar altogether — is hidden by default                                                     |
| **toolbar.buttons**  | Configures the text on 'Save' and 'Reset' buttons                                                       |

---

```javascript
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS({
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
    hidden: process.env.NODE_ENV === 'production',
    position: 'displace',
  },
  toolbar: {
    hidden: true,
  },
})
```
