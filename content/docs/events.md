---
title: Events
prev: /docs/plugins
next: /docs/media
---

The **Events** feature allows decoupled parts of the CMS to:

1. Notify the rest of the system that something has happened, and
2. React to things that happen elsewhere in the system.

## Interface

```ts
interface Events {
  dispatch(event: Event): void
  subscribe(eventType: string, listener: Listener): Unsubscribe
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

The `cms.events.subscribe` function can be used to start listening for certain events.

```ts
cms.events.subscribe(EVENT_NAME, event => {
  // ...
})
```

The `EVENT_NAME` is a string that matches a pattern for the event name.

[Checkout the tests for specific examples of how the matching happens.](https://github.com/tinacms/tinacms/blob/master/packages/@tinacms/core/src/events.test.ts)

#### Log all Events

```ts
cms.events.subscribe('*', event => {
  console.log(event)
})
```

### Log when a Form Plugin is added

```ts
cms.events.subscribe("plugins:add:form", (event) => {
  console.log(`Added a Form called "${event.plugin.name}"`
})
```

#### Log all Form Events

```ts
cms.events.subscribe('plugins:*:form', event => {
  console.log(`Something happened to the form plugins`)
})
```

#### Log all Plugin Events

```ts
cms.events.subscribe('plugins', event => {
  console.log(`Something happened to the plugins`)
})
```

Note that the string `plugins`is equivalent to `plugins:*` or `plugins:*:*`.

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
| `github:branch:create`   | A new branch has been created.                                |
