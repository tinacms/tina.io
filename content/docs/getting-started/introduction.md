---
title: Tutorial Introduction
id: introduction
prev: null
next: /docs/cms
---

Tina is a toolkit for building content management systems. This tutorial will walk you through Tina's fundamental building blocks. To get the most from Tina, you should have a good working knowledge of JavaScript and React.

This tutorial will show you how to set-up editing on a _very simple_ `create-react-app` demo.

## Why _create-react-app_?

Tina's UI is built with React. Using Tina in a _plain_ React App is the simplest way to get familiar Tina, without helper packages or meta-frameworks. Understanding the core concepts and APIs introduced in this tutorial will set you up for success if you do end up using Tina with a meta-framework, such as Gatsby or Next.js.

Tina's modular design means it can work with most frameworks. Whether you're site is static, dynamic, or somewhere in between, Tina gives you the tools you need. If you'd like to dive right into using Tina with a React meta-framework, checkout the following these pages:

- [Next.js Integration](/docs/integrations/nextjs)
- [Gatsby Integration](/docs/integrations/gatsby)

But it's your first time working with Tina, we suggest going through this short tutorial.

## Get Started

To get started, clone the demo and install the dependencies.

```
git clone //... my-tina-app
cd my-tina-app
yarn install
```

These are the general steps we will cover in this tutorial.

1. Install `tinacms`
2. Add the `TinaProvider` and create a CMS instance
3. Configure the CMS object
4. Enabling the CMS
5. Creating a form
6. Loading content from an external API
7. Saving content changes

> Looking for help with Tina, or want to stay on top of the latest developments? Checkout the [Tina Community Forum](https://community.tinacms.org/) to get answers, help, and llama-humor.
