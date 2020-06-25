---
title: Events
prev: /docs/cms/apis
next: /docs/cms/alerts
---

The **Events** feature allows decouple parts of the CMS to notify the rest of the system about certain events which have happened.

## Interface

```ts
interface Events {
  dispatch(event: Event): void
  subscribe(event: string, listener: Listener): Unsubscribe
}

interface Event {
  type: string
  // Any other data may be added to the event.
  [key: string]: any
}

type Listener = (event: Event) => void

type Unsubscribe = () => void
```

## Usage

### Dispatching Events

```ts
cms.events.dispatch({
  type: 'something-happened',
})
```

### Subscribing to Events

#### Log All Events

```ts
cms.events.subscribe('*', event => {
  console.log(event)
})
```

#### Log all Plugin Events

```ts
cms.events.subscribe('plugins', ({ plugin }) => {
  console.log(`Something happened to the plugins`)
})
```

#### Log when a Form Plugin is added

```ts
cms.events.subscribe("plugins:add:form", ({ plugin }) => {
  console.log(`Added form "${plugin.__type}" called "${plugin.name}"`
})
```

#### Log all Form Events

```ts
cms.events.subscribe("plugins:*:form", ({ plugin }) => {
  console.log(`Added form "${plugin.__type}" called "${plugin.name}"`
})
```

## Existing Events

### _tinacms_

| Type                     | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `cms:enabled`            | The CMS has been enabled.                      |
| `cms:disabled`           | The CMS has been disabled                      |
| `sidebar:opened`         | The Sidebar has been opened                    |
| `sidebar:closed`         | The Sidebar has been closed.                   |
| `plugin:add:{__type}`    | A Plugin of a given `__type` has been added.   |
| `plugin:remove:{__type}` | A Plugin of a given `__type` has been removed. |

### _react-tinacms-github_

| Event Name               | Decription                                                    |
| ------------------------ | ------------------------------------------------------------- |
| `github:error`           | An error has occurred when making requests to the GitHub API. |
| `github:branch:checkout` | The current branch has been switched.                         |
