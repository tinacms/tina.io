---
title: Plugins
prev: /docs/cms
next: /docs/cms/apis
consumes:
  - file: /packages/@tinacms/core/src/plugins.ts
    description: Describes Plugin interface
  - file: /packages/tinacms/src/react-tinacms/use-plugin.ts
    descrition: Demonstrates usePlugin
  - file: /packages/@tinacms/core/src/cms.ts
    description: Demonstrates adding plugins to CMS obj
---

**Plugins** are objects used to extend and modify the behavior of the CMS. Plugins are identified by their _type_, and different types of plugins will be used by Tina in different ways.

All plugins must conform to the **Plugin** interface:

```typescript
interface Plugin {
  __type: string // Identifies how the plugin should be used
  name: string //   Unique identifier for the plugin
}
```

Beyond that, a plugin's properties will depend on what it's used for. Most of Tina's features, including [Forms](/docs/forms) and [Fields](/docs/fields), are implemented as Plugins!

## Adding Plugins

Call `cms.plugins.add` and pass in the plugin.

```javascript
import { TinaCMS } from 'tinacms'
import { HtmlFieldPlugin, MarkdownFieldPlugin } from 'react-tinacms-editor'

const cms = new TinaCMS()

cms.plugins.add(HtmlFieldPlugin)
cms.plugins.add(MarkdownFieldPlugin)
```

Alternatively, you can call the `usePlugins` hook from inside a function component.

```jsx
import * as React from 'react'
import { usePlugins } from 'tinacms'
import { HtmlFieldPlugin, MarkdownFieldPlugin } from 'react-tinacms-editor'

export function SomeComponent({ children }) {
  usePlugins([HtmlFieldPlugin, MarkdownFieldPlugin])

  return <div>{children}</div>
}
```

When adding plugins from inside a React component, the plugin is added when the component mounts, and removed when the component unmounts. This is both expected and encouraged, as Tina has a [Dynamic Plugin System](/blog/dynamic-plugin-system).

### Adding Plugins Dynamically

In some cases, you may not want plugins to be included in the initial JavaScript file/bundle of your website, as some plugins can be quite large. In these scenarios, you can import the plugins dynamically, and the plugins will only be downloaded when they are needed.

```tsx
import { TinaCMS } from 'tinacms'
import { HtmlFieldPlugin, MarkdownFieldPlugin } from 'react-tinacms-editor'

const cms = new TinaCMS()

import('react-tinacms-editor').then(
  ({ HtmlFieldPlugin, MarkdownFieldPlugin }) => {
    cms.plugins.add(HtmlFieldPlugin)
    cms.plugins.add(MarkdownFieldPlugin)
  }
)
```

If you're using React this can be done inside of a component:

```tsx
import * as React from 'react'
import { usePlugins } from 'tinacms'
import { HtmlFieldPlugin, MarkdownFieldPlugin } from 'react-tinacms-editor'

export function SomeComponent({ children }) {
  React.useEffect(() => {
    import('react-tinacms-editor').then(
      ({ HtmlFieldPlugin, MarkdownFieldPlugin }) => {
        cms.plugins.add(HtmlFieldPlugin)
        cms.plugins.add(MarkdownFieldPlugin)
      }
    )
  }, [])

  return <div>{children}</div>
}
```

## Using a Plugin

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
