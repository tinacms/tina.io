---
title: Editing UI
prev: /docs/ui/styles
next: null
consumes:
  - file: /packages/react-sidebar/src/sidebar.ts
    details: Shows sidebar interface
  - file: /packages/react-toolbar/src/toolbar.ts
    details: Shows toolbar interface
---

The `tinacms` package provides two possible user interfaces: the sidebar and the toolbar.

The main difference between the two UIs is aesthetics. Both provide access to [Screen Plugins](/blog/screen-plugins) and buttons for _saving_ and _resetting_ [Forms](). The main difference is in how they expect the Form's content to be edited: Form's are rendered within the sidebar, while the toolbar is designed to work with [Inline Editing](/docs/ui/inline-editing). Also, widgets can be added to the toolbar as plugins, as in the case of the Branch Switcher provided by `react-tinacms-github` .

## Enabling the User Interface

By default neither UI is enabled. You can enable one (or both) by setting their flags to true in the `TinaCMS` configuration:

```ts
new TinaCMS({
  sidebar: true,
  toolbar: true,
})
```

This will enable the UIs with their default configuration. If you need to configure either UI further, you can pass that object instead:

```ts
new TinaCMS({
  sidebar: {
    position: 'displace',
  },
})
```

Let's take a look at the configuration options for each UI.

### Sidebar Configuration

```ts
interface SidebarOptions {
  position?: 'displace' | 'overlay'
  buttons?: {
    save: string
    reset: string
  }
}
```

| key          | usage                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **position** | Determines sidebar **position in relation to the website**. 'displace' (default) moves the whole site over; 'overlay' slides the sidebar on top of the site. |
| **buttons**  | Customizes the string displayed on either the 'save' or 'reset' buttons.                                                                                     |

A site configured to use Tina will display a **blue edit button in the lower-left corner**. Clicking this button will open the sidebar.

![Sidebar after adding remarkform to your template](/img/tina-sidebar-remarkform-gatsby-london.gif)

Sidebar contents are **contextual**. For example, when using Tina with Markdown files, a conventional implementation will display a form for the current page's markdown file. In the event a page is composed of multiple files, it is possible to add multiple forms to the sidebar for that page's context. All forms available in the current context will then be displayed.

<!-- TODO: add toolbar photo here -->

### Toolbar Configuration

```ts
interface ToolbarOptions {
  buttons?: {
    save: string
    reset: string
  }
}
```

| key         | usage                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| **buttons** | Customizes the string displayed on either the 'save' or 'reset' buttons. |

On its own, the toolbar will display the 'save' and 'reset' buttons, along with a form status indicator to show whether there are unsaved changes. [Custom Widgets](/guides/nextjs/github-open-authoring/toolbar-plugins) can also be added to extend functionality for the particular workflow.

## Examples

### With Gatsby

You'll want to pass in this option to wherever the plugin is registered in the `gatsby-config` file.

**gatsby-config.js**

```javascript
{
  resolve: "gatsby-plugin-tinacms",
  options: {
    enabled: process.env.NODE_ENV !== "production",
    sidebar: {
      position: 'displace'
    },
  }
}
```

### With Next.js

If you followed the implementation in our Next.js docs, you'll want to go to the `_app.js` file where the CMS is registered. Again, depending on your setup with Next + Tina, this config may look slightly different. Note this is also where you might specify the sidebar [display options](https://tinacms.org/docs/concepts/sidebar#sidebar-style).

**pages/\_app.js**

```javascript
class MyApp extends App {
  constructor() {
    super()

    this.cms = new TinaCMS({
      sidebar: true,
      toolbar: {
        buttons: {
          save: 'Commit',
        },
      },
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}
```
