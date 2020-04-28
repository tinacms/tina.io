---
title: Editing UI
prev: /docs/cms/apis
next: /docs/cms/styles
consumes:
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Explains setting sidebar position
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Explains hiding sidebar in prod
  - file: /packages/@tinacms/styles/src/Styles.tsx
    details: Shows the Theme interface and Default Theme values
---

The editing UI for Tina is comprised of two main parts: the sidebar and the toolbar. The **sidebar** is a shell for default [forms](/docs/forms) and other [plugins](/docs/plugins). The **toolbar** provides an interface for form actions and form state management.

These two components can be used independently of one another, or in tandem. However there are some common patterns of use. For example, if you're project implements GitHub Open Authoring, you'll need the toolbar for the plugins applicable to that workflow, the PR plugin or branch switcher etc. Or if you've set up Inline Editing, you may want to incorporate the toolbar so content editors can easily save their changes without needing to open the sidebar. It is also common for developers to only use the sidebar as the editing interface.

The editing UI configuration is flexible and dependent on the needs of your project.

## Sidebar Configuration

```ts
interface SidebarOptions {
  position?: 'displace' | 'overlay'
  hidden?: boolean
  buttons?: {
    save: string
    reset: string
  }
}
```

| key          | usage                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **position** | Determines sidebar **position in relation to the website**. 'displace' (default) moves the whole site over; 'overlay' slides the sidebar on top of the site. |
| **hidden**   | Controls whether the sidebar is hidden from view.                                                                                                            |
| **buttons**  | Customizes the string displayed on either the 'save' or 'reset' buttons.                                                                                     |

A site configured to use Tina will display a **blue edit button in the lower-left corner**. Clicking this button will open the sidebar.

![Sidebar after adding remarkform to your template](/img/tina-sidebar-remarkform-gatsby-london.gif)

Sidebar contents are **contextual**. For example, when using Tina with Markdown files, a conventional implementation will display a form for the current page's markdown file. In the event a page is composed of multiple files, it is possible to add multiple forms to the sidebar for that page's context. All forms available in the current context will then be displayed.

<!-- TODO: add toolbar photo here -->

## Toolbar Configuration

```ts
interface ToolbarOptions {
  hidden?: boolean
  buttons?: {
    save: string
    reset: string
  }
}
```

| key         | usage                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| **hidden**  | Controls whether the toolbar is hidden from view — defaults to `true`.   |
| **buttons** | Customizes the string displayed on either the 'save' or 'reset' buttons. |

The toolbar ui component is **hidden by default**; if you don't specify the toolbar options in the CMS config, it will not render.

On its own, the toolbar will display the 'save' and 'reset' buttons, along with a form status indicator to show whether there are unsaved changes. [Custom Widgets](/guides/nextjs/github-open-authoring/toolbar-plugins) can also be added to extend functionality for the particular workflow.

## Examples

### With Gatsby

You'll want to pass in this option to wherever the plugin is registered in the `gatsby-config` file.

**gatsby-config.js**

```javascript
{
  resolve: "gatsby-plugin-tinacms",
  options: {
    sidebar: {
      hidden: process.env.NODE_ENV === "production",
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
      sidebar: {
        hidden: false,
        position: 'overlay',
      },
      toolbar: {
        hidden: false,
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
