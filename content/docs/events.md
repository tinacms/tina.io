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

| Type                       | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| `cms:enable`               | The CMS has been enabled.                             |
| `cms:disable`              | The CMS has been disabled                             |
| `sidebar:opened`           | The Sidebar has been opened                           |
| `sidebar:closed`           | The Sidebar has been closed.                          |
| `plugin:add:{__type}`      | A Plugin of a given `__type` has been added.          |
| `plugin:remove:{__type}`   | A Plugin of a given `__type` has been removed.        |
| `media:upload:start`       | A media file upload has begun.                        |
| `media:upload:success`     | A media file was successfully uploaded.               |
| `media:upload:failure`     | A media file upload failed.                           |
| `media:list:start`         | A call to list available media items has been made.   |
| `media:list:success`       | The call to list media items was successful.          |
| `media:list:failure`       | The call to list media items failed.                  |
| `media:delete:start`       | A media file is attempting to be deleted.             |
| `media:delete:success`     | A media file was successfully deleted.                |
| `media:delete:failure`     | The attempt to delete a media file failed.            |
| `media:previewSrc:start`   | A `previewSrc` is being generated for a media file.   |
| `media:previewSrc:success` | The call to `previewSrc` successfully returned a url. |
| `media:previewSrc:failure` | A `previewSrc` failed to be generated.                |

### _react-tinacms-github_

| Event Name               | Decription                                                    |
| ------------------------ | ------------------------------------------------------------- |
| `github:error`           | An error has occurred when making requests to the GitHub API. |
| `github:branch:checkout` | The current branch has been switched.                         |
| `github:branch:create`   | A new branch has been created.                                |

### _@tinacms/git-client_

| Event Name   | Decription                   |
| ------------ | ---------------------------- |
| `git:commit` | A commit has been attempted. |

Below is an example of how you might subscribe to the `git:commit` event in your App. The event passed to the callback function is a [Fetch Response](https://developer.mozilla.org/en-US/docs/Web/API/Response 'Fetch Response'); you can parse the status of the commit from this to trigger various alerts or functions.

**Example**

```jsx
React.useEffect(() => {
  cms.events.subscribe('git:commit', function handleCommitAlerts(event) {
    if (!event.response.ok) {
      cms.alerts.error("Something went wrong! Changes weren't saved")
    } else {
      cms.alerts.info('Content saved successfully!')
    }
  })
}, [])
```
