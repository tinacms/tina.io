---
title: Sidebar
id: /docs/concepts/sidebar
prev: /docs/getting-started/how-tina-works
next: /docs/concepts/forms
consumes:
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Explains setting sidebar position
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Explains hiding sidebar in prod
  - file: /packages/@tinacms/styles/src/Styles.tsx
    details: Shows the Theme interface
---

The **sidebar** is the primary interface in Tina. It is the shell that holds [forms](/docs/concepts/forms 'Tina Concepts: Forms') and [plugins](/docs/concepts/plugins 'Tina Concepts: Plugins').

## Setup the Sidebar

Head over to the [Gatsby Quickstart Guide](/docs/gatsby/quickstart) to learn how to set up the sidebar on a Gatsby site. If you want to set up the sidebar on an existing site, head to the [Gatsby Manual Setup](/docs/gatsby/manual-setup).

## Using the Sidebar

A site configured to use Tina will display a blue edit button in the lower-left corner. Clicking this button will open the sidebar.

![Clicking the pen icon to reveal Tina Sidebar](/img/tina-sidebar-gatsby-london.gif)

Sidebar contents are **contextual**. For example, when using Tina with Markdown files, a conventional implementation will display a form for the current page's markdown file.

![Sidebar after adding remarkform to your template](/img/tina-sidebar-remarkform-gatsby-london.gif)

In the event a page is composed of multiple files, it is possible to add multiple forms to the sidebar for that page's context. All forms available in the current context will then be displayed.

## Sidebar Style

The sidebar has two display options: `displace` and `overlay`.

By default, Tina's sidebar will overlay on top of your website (`overlay`). This default is set to prevent any layout conflicts with the sidebar and your site. If you set Tina to position `displace`, when you open Tina, your website will shrink to make space for the sidebar. Depending on your site's design, you may have CSS rules that conflict with this approach (`displace`), or may simply prefer to have the sidebar overlay your content instead of displacing it (`overlay`). Override or adjust this by specifying the sidebar option in the config file where you register Tina plugins.

For example, in your `gatsby-config.js` file...

```javascript
 {
    resolve: 'gatsby-plugin-tinacms',
    options: {
      sidebar: {
        position: 'displace',
      },
    },
  }...
```
<tip>These display options were updated from `fixed` and `float`. Consider `fixed` to equal `displace` & `float` to equal `overlay`. The updates are backwards compatible; the older options will still work.</tip>

## Hiding Sidebar in Production

Tina is an editing tool that we don't want accessible or visible in production environments. Tina's packages are optimized to not run in production, but you need to take an extra step to hide the sidebar completely. You'll need to have [`dotenv`](https://www.npmjs.com/package/dotenv) installed. Then you'll pass in additional info to Tina about this sidebar option. Depending on the meta-framework you are using, the implementation might look slightly different.

### With Gatsby

You'll want to pass in this option to wherever the plugin is registered in the `gatsby-config` file.

```javascript
// gatsby-config.js

{
  resolve: "gatsby-plugin-tinacms",
  options: {
    sidebar: {
      hidden: process.env.NODE_ENV === "production"
    }
  }
}
```

### With Next.js

If you followed the implementation in our Next.js docs, you'll want to go to the `_app.js` file where the CMS is registered. Again, depending on your setup with Next + Tina, this config may look slightly different. Note this is also where you might specify the sidebar [display options](https://tinacms.org/docs/concepts/sidebar#sidebar-style).

```javascript
//_app.js

class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS()
    const client = new GitClient('http://localhost:3001/___tina')
    this.cms.registerApi('git', client)
  }
  // Sidebar options
  options = {
      sidebar: {
        hidden: process.env.NODE_ENV === "production"
      }
  }
  render() {
    const { Component, pageProps } = this.props
    // Pass in sidebar options to Tina component
    return (
      <Tina cms={this.cms} {...this.options.sidebar}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}
```

<tip>_Note:_ This is an intermediate workaround that we plan on enhancing further to extract Tina code during production builds.</tip>

## Customizing the Sidebar Theme

We want you to be able to mold Tina to fit your use-case, including the styling of the sidebar UI. You can override the sidebar theme by passing in your theme object in either a `gatsby-config` file or however sidebar options are passed to Tina.

``` javascript
// gatsby-config.js

const theme = require("./content/settings/theme.json")

{
  resolve: 'gatsby-plugin-tinacms',
  options: {
    sidebar: {
      theme: {
        color: {
          primary: {
            light: theme.color.primary,
            medium: theme.color.primary,
            dark: theme.color.primary,
          },
        },
      },
    },
  },
}
```

Below is the interface for the Tina Theme — all the properties to play with.

``` typescript
interface Theme {
  color: {
    primary: {
      light: string
      medium: string
      dark: string
    }
    error: {
      light: string
      medium: string
      dark: string
    }
    grey: {
      0: string
      1: string
      2: string
      3: string
      4: string
      5: string
      6: string
      7: string
      8: string
      9: string
    }
  }
  radius: {
    small: string
    big: string
  }
  padding: {
    small: string
    big: string
  }
  font: {
    size: {
      0: string
      1: string
      2: string
      3: string
      4: string
      5: string
      6: string
    }
    weight: {
      regular: number
      bold: number
    }
  }
  shadow: {
    small: string
    big: string
  }
  timing: {
    short: string
    medium: string
    long: string
  }
}
```
