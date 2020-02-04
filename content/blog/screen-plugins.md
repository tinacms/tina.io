---
title: What are Screen Plugins?
date: '2020-02-05T07:00:00.000Z'
author: Nolan Phillips
draft: false
consumes:
  - file: /packages/tinacms/src/plugins/screen-plugin.ts
    details: Explains the screen plugin interface properties
---

Plugins are a powerful concept. In general plugins are used to extend core functionality of a base system. While many plugin systems are static, TinaCMS is powered by a [dynamic plugin system](https://tinacms.org/blog/dynamic-plugin-system/). In this approach, plugins are added and removed programmatically. This dynamism allows developers to add and remove CMS features based on the context.

If you’ve worked with Tina, you may have already used a few plugins without realizing it. The most common plugin used in `tinacms` is the `FormPlugin` which adds forms for editing content to the [sidebar](https://tinacms.org/docs/concepts/sidebar).

Another plugin worth noting is the [`ContentCreatorPlugin`](https://tinacms.org/docs/gatsby/creating-new-files/#1-add-content-creator-plugin) and it's subclasses `RemarkCreatorPlugin` and `JsonCreatorPlugin`. This plugin provides the foundation for creating new data source files.

One of the more recent additions has been the [`GlobalFormPlugin`](https://tinacms.org/docs/concepts/forms#local--global-forms), which allows you to register _global forms_ to handle broad site data. When accessing a global form, **editors interact with a different ‘screen’.** The truth is, the power of this editing screen for the `GlobalFormPlugin` is derived from illuminati who created the topic of today’s blog post: the `ScreenPlugin`.

## What's that?

Let’s be frank, the name `ScreenPlugin` kinda sucks but it's the best I came up with — what’s that old adage about naming things? `ViewPlugin` was another contender, but here we are. Anyways, if you have any recommendations on a better name, [let ‘em fly](https://twitter.com/ncphi).

Beyond semantics, let’s get to functionality. The **`ScreenPlugin` has three main pieces**: a name, an icon, and a React Component.

The name and the icon are used to list the screen plugin in the global menu.

![global-menu](/img/tina-grande-global-form.jpg)

When the user clicks on the menu item, it opens a screen in which the React Component is rendered. _Think of a screen as an empty canvas_, it provides the space to create an editing interface beyond the sidebar. There are two potential layouts for a screen plugin: `fullscreen` and `popup`.

![full screen plugin](/img/blog/full-screen-plugin2.jpg)
![popup screen plugin](/img/blog/popup-plugin.jpg)

## Let's make a basic screen plugin!

To really get a feel for the way screen plugins work, let’s dive into setting one up.

**Here's our our example layout:**

```js
import { CripplingDebt } from './boomer-legacy'

export default function GenerationXLayout(props) {
  return <CripplingDebt>{props.children}</CripplingDebt>
}
```

Like all good GenX'ers, the parent function did it's best but can't help raising children in an economy ruined by the previous generation. To help lessen the blow, the parents will at least give their children memes.

To unleash memes for the kids, we'll make a screen plugin that will spread snarky, cynical humor. Let's set this up in three steps:

1. Import the `usePlugin` hook from `tinacms`
2. Create our `LeanMemePlugin`
3. Use that plugin in our App

```jsx
// 1. Import `usePlugin`
import { usePlugin } from 'tinacms'
import { CripplingDebt } from './boomer-legacy'

// 2. Define the screen plugin
const LeanMemePlugin = {
  __type: 'screen',
  name: 'Lean Memes',
  Icon: () => <span>?</span>,
  layout: 'popup',
  Component() {
    return (
      <img src="https://static1.thethingsimages.com/wordpress/wp-content/uploads/2018/04/baby-boomer-feat.jpg" />
    )
  },
}

export default function GenerationXLayout(props) {
  // 3. Use the plugin
  usePlugin(LeanMemePlugin)

  return <CripplingDebt>{props.children}</CripplingDebt>
}
```

Notice that I don't know what to do with the `Icon`. That's a problem for another day 🤷‍♂️. You could put an `svg` in there, or find a [pizza-shaped icon](https://boxicons.com/) to fill the void.

Let's see the meme screen plugin in action. Using it will add a new item to the global menu.

![lean memes plugin global menu](/img/blog/global-menu-meme-plugin.jpg)

Clicking on the menu item will open a popup modal where our Component will render.

![lean memes screen plugin](/img/blog/lean-meme-plugin.jpg)

Tada! It works. We made a meme plugin to help the kids cope with unfortunate realities of a Post-Industrial society 👏.

## So what can I do with Screen Plugins?

_Literally whatever you want_, it's just a React Component. You could make magic 8 ball 🎱 screen plugin to help your content team decide where to order lunch. It's all deadly.

## So can I ...

Yes.

## But I didn't ask anythi

It doesn't matter you can do it. I believe in you.

## ...

Goodbye. 🖖
