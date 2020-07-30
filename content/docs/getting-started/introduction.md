---
title: Introductory Tutorial
id: introduction
prev: null
next: /docs/getting-started/cms-set-up
---

Tina is a toolkit for building content management systems. This tutorial will **walk you through Tina's fundamental building blocks** by setting-up editing on a _very simple_ `create-react-app` [demo](https://github.com/tinacms/tina-intro-tutorial).

> _Note:_ To get the most from Tina, you should have a good **working knowledge of JavaScript and React**.

## Why _create-react-app_?

Tina's UI is built with React. Using Tina in a _plain_ React App is the simplest way to get familiar Tina, without helper packages or meta-frameworks. **Understanding the core concepts** introduced in this tutorial will set you up for success later down the line.

Tina's modular design means it can work with most frameworks. Whether you're site is static, dynamic, or somewhere in between, Tina gives you the tools you need. If you'd like to dive right into using Tina with a React meta-framework, checkout the following pages:

- [Next.js Integration](/docs/integrations/nextjs)
- [Gatsby Integration](/docs/integrations/gatsby)

But **if it's your first time working with Tina**, we suggest going through this short tutorial.

## Overview

These are the general steps we will cover.

1. [Install `tinacms`](/docs/getting-started/cms-set-up#install-tinacms)
2. [Add the `TinaProvider` and create a CMS instance](/docs/getting-started/cms-set-up#add-tinaprovider-create-a-cms-instance)
3. [Configure the CMS object](/docs/getting-started/cms-set-up#configure-the-cms-object)
4. [Enabling the CMS](/docs/getting-started/cms-set-up#enabling-the-cms)
5. [Creating and registering a form](/docs/getting-started/edit-content#create--register-a-form)
6. [Loading content from an external API](/docs/getting-started/backends#loading-content-from-an-external-api)
7. [Saving content changes](/docs/getting-started/backends#saving-content)
8. [Adding alerts](/docs/getting-started/backends#adding-alerts)

## Clone the demo

To get started, clone the [demo](https://github.com/tinacms/tina-intro-tutorial) and install its dependencies.

```bash
git clone git@github.com:tinacms/tina-intro-tutorial.git my-tina-app
cd my-tina-app
yarn install
```

> If at any point _you feel lost or confused_ during this tutorial, checkout the [Tina Community Forum](https://community.tinacms.org/) to get answers, help, and llama-humor.
