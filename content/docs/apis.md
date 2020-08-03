---
title: External APIs
prev: /docs/media
next:
consumes:
  - file: /packages/@tinacms/core/src/cms.ts
    description: Demonstrates adding APIs to CMS obj
---

**APIs** in the CMS are objects intended to communicate with third-party services. Unlike Plugins, which can modify the behavior of the CMS, APIs do not interact with Tina's UI or internals. APIs allow you to achieve [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) with Tina.

## Adding an API

Whereas Plugins can include multiple objects grouped under a single type, each API registered to the CMS has its own namespace.

Call `cms.registerApi(namespace, api)` to add an API:

```javascript
import { TinaCMS } from 'tinacms'

class HelloApi {
  sayHello() {
    alert('Hello, world!')
  }
}

const cms = new TinaCMS({ enabled: true })
cms.registerApi('hello', new HelloApi())
```

> Unlike Plugins, APIs should be registered when the CMS is instantiated, and never removed.

## Using an API

Access your API directly from the `cms.api` object, via the namespace you registered it to.

```jsx
import * as React from 'react'
import { useCMS } from 'tinacms'

export function Hello() {
  const cms = useCMS()
  return <button onClick={cms.api.hello.sayHello}>Say Hello</button>
}
```
