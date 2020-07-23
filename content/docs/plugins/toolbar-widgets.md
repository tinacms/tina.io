---
title: Toolbar Widgets
prev: /docs/plugins/screens
next: null
---
Widgets can be added to the `cms.toolbar` to give users easy access to certain features. The

## Interface

```tsx
interface ToolbarWidgetPlugin<Props = any> extends Plugin {
  __type: 'toolbar:widget'
  name: string
  weight: number
  component(): React.ReactElement
  props?: Props
}

```

| Option | Description |
| --- | --- |
| `__type` | The type of the plugin. Always `toolbar:widget` . |
| `name` | The name of this particular widget. |
| `weight` | Used to order the toolbar widgets. |
| `component` | The React component to render in the toolbar. |
| `props` | Extra props to pass to the component. _(Optional)_ |

## Available Toolbar Widgets

### react-tinacms-github

| Name | Description |
| --- | --- |
| [Pull Request]() | Allows editors to open a pull request |
| Repository Information | Displays the name of the current repository along with a link. |
| Branch Select | Allows editors to create and switch branches. |

## Making Your Own Toolbar Widgets

### Add a Button to the Toolbar

```tsx
function HowdyButton() {
  return (
    <button onClick={() => alert("Good day to ya")}>
      Howdy
    </button>
  )
}

export const HowdyWidget = {
  __type: 'toolbar:widget',
  name: 'howdy',
  weight: 5,
  component: HowdyButton,
}
```

With the plugin defined you can add it to the widget by calling `cms.plugins.add(HowdyWidget)`.