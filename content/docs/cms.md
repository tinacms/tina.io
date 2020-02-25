---
title: The CMS
next: /docs/forms
consumes:
  - file: /packages/tinacms/src/tina-cms.ts
    description: Creates TinaCMS instance and describes config
  - file: /packages/tinacms/src/react-tinacms/with-tina.tsx
    description: Shows how to use withTina HOC
  - file: /packages/tinacms/src/use-cms.ts
    description: Demonstrates useCMS hook
  - file: /packages/@tinacms/core/src/plugins.ts
    description: Describes Plugin interface
  - file: /packages/tinacms/src/react-tinacms/use-plugin.ts
    descrition: Demonstrates usePlugin
  - file: /packages/@tinacms/core/src/cms.ts
    description: Demonstrates adding plugins and APIs to CMS obj
---

The CMS object in Tina is a container for attaching and accessing Plugins and APIs. On its own, the CMS does very little; however, since it's the central integration point for everything that Tina does, it's extremely important!

## Setting up the CMS Object

A project that uses Tina will start by setting up an instance of the CMS.

```javascript
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS()
```

The `TinaCMS` constructor receives an object that can be used to configure CMS behavior. See [CMS Configuration](#cms-configuration) for details.

### The &lt;Tina&gt; Component

The `<Tina>` component should wrap your entire site. It provides the following:

1. The user interface for interacting with Tina, and
2. A [Context](https://reactjs.org/docs/context.html) for accessing the CMS object via the [useCMS](#accessing-the-cms-object) hook.

After instantiating the CMS object, pass it to the `<Tina>` component via its `cms` prop.

```jsx
import * as React from 'react'
import { Tina, TinaCMS } from 'tinacms'
import MyApp from './my-app'

export default function App() {
  const cms = React.useMemo(() => new TinaCMS())
  return (
    <Tina cms={cms}>
      <MyApp />
    </Tina>
  )
}
```

Alternatively, you can use the `withTina` higher-order component to wrap your site with the `<Tina>` component. `withTina` will automatically instantiate the CMS object.

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

## Plugins

**Plugins** are objects used to extend and modify the behavior of the CMS. Plugins are identified by their _type_, and different types of plugins will be used by Tina in different ways.

All plugins must conform to the **Plugin** interface:

```typescript
interface Plugin {
  __type: string // Identifies how the plugin should be used
  name: string //   Unique identifier for the plugin
}
```

Beyond that, a plugin's properties will depend on what it's used for. Most of Tina's features, including [Forms](/docs/forms) and [Fields](/docs/fields), are implemented as Plugins!

### Adding Plugins

Call `cms.plugins.add` and pass in the plugin.

```javascript
import { TinaCMS } from 'tinacms'

const cms = new TinaCMS()
cms.plugins.add({
  // essential plugin data
  __type: 'hello',
  name: 'hello-dj',

  // plugin-specific data
  user: 'DJ',
})
```

Alternatively, you can call the `usePlugins` hook from inside a function component.

```jsx
import * as React from 'react'
import { usePlugins } from 'tinacms'

export function SomeComponent() {
  usePlugins([
    {
      __type: 'hello',
      name: 'hello-dj',
      user: 'DJ',
    },
  ])
  //...
}
```

When adding plugins from inside a React component, the plugin is added when the component mounts, and removed when the component unmounts. This is both expected and encouraged, as Tina has a [Dynamic Plugin System](/blog/dynamic-plugin-system).

### Using a Plugin

Retrieve all plugins of a given type via `cms.plugins.all`.

```jsx
import * as React from 'react'
import { useCMS } from 'tinacms'

export function Hello() {
  const cms = useCMS()
  const sayHello = React.useCallback(() => {
    // get all of the "hello" plugins.
    const helloPlugins = cms.plugins.all('hello')

    // iterate over all of the "hello" plugins
    helloPlugins.forEach(plugin => alert(`Hello, ${plugin.user}!`))
  }, [])
  return <button onClick={sayHello}>Say Hello</button>
}
```

## APIs

**APIs** in the CMS are objects intended to communicate with third-party services. Unlike Plugins, which can modify the behavior of the CMS, APIs do not interact with Tina's UI or internals. APIs allow you to achieve [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) with Tina.

### Adding an API

Whereas Plugins can include multiple objects grouped under a single type, each API registered to the CMS has its own namespace.

Call `cms.registerApi(namespace, api)` to add an API:

```javascript
import { TinaCMS } from 'tinacms'

class HelloApi {
  sayHello() {
    alert('Hello, world!')
  }
}

const cms = new TinaCMS()
cms.registerApi('hello', new HelloApi())
```

> Unlike Plugins, APIs should be registered when the CMS is instantiated, and never removed.

### Using an API

Access your API directly from the `cms.api` object, via the namespace you registered it to.

```jsx
import * as React from 'react'
import { useCMS } from 'tinacms'

export function Hello() {
  const cms = useCMS()
  return <button onClick={cms.api.hello.sayHello}>Say Hello</button>
}
```

> **Combining APIs and Plugins**
>
> Looking at these two examples and wondering if you could combine them? Sure, _you absolute madman_.
>
> ```jsx
> import * as React from 'react'
> import { TinaCMS, useCMS } from 'tinacms'
>
> export default function App() {
>   const cms = React.useMemo(() => {
>     const cms = new TinaCMS()
>     cms.plugins.add({
>       __type: 'hello',
>       name: 'hello-dj',
>       user: 'DJ',
>     })
>     cms.registerApi('hello', {
>       sayHello: () => {
>         cms.plugins
>           .all('hello')
>           .forEach(plugin => alert(`Hello, ${plugin.user}!`))
>       },
>     })
>     return cms
>   })
>
>   return (
>     <Tina cms={cms}>
>       <Hello />
>     </Tina>
>   )
> }
>
> function Hello() {
>   const cms = useCMS()
>   return <button onClick={cms.api.hello.sayHello}>Say Hello</button>
> }
> ```

## CMS Configuration

When instantiating the `TinaCMS` object, you can pass in a configuration object. This allows you to configure some options for the sidebar, and also allows you to configure Plugins and APIs declaratively.

```typescript
interface TinaCMSConfig {
  plugins?: Array<Plugin>
  apis?: { [key: string]: any }
  sidebar?: {
    hidden?: boolean
    position?: SidebarPosition
    theme?: Theme
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
| **sidebar.theme**    | Override certain sidebar styles                                                                         |

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
})
```
