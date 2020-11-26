---
title: Introductory Tutorial
id: introduction
prev: null
next: /docs/getting-started/cms-set-up
last_edited: '2020-11-26T14:38:26.429Z'
---
Tina is a **toolkit for building visual editing** into your site. This tutorial will walk you through Tina's fundamental building blocks by setting up editing on a basic `create-react-app` [demo](https://github.com/tinacms/tina-intro-tutorial). **To get the most from Tina, you should have a good working knowledge of JavaScript and React**.

## Why _create-react-app_?

Tina's UI is built with React. Using Tina in a plain React App is the simplest way to get familiar with Tina without relying on helper packages or meta-frameworks. Understanding the core concepts introduced in this tutorial will set you up for success later down the line.

**If this is your first time working with Tina**, we suggest going through this short tutorial.

## Overview

These are the general steps we will cover.

1. [Installing `tinacms`](/docs/getting-started/cms-set-up#install-tinacms)
2. [Creating a CMS instance and adding the `TinaProvider`](/docs/getting-started/cms-set-up#create-a-cms-instance-add-tinaprovider)
3. [Configuring the CMS object](/docs/getting-started/cms-set-up#configure-the-cms-object)
4. [Enabling the CMS](/docs/getting-started/cms-set-up#enabling-the-cms)
5. [Creating and registering a form plugin](/docs/getting-started/edit-content#create--register-a-form)
6. [Loading content from an external API](/docs/getting-started/backends#loading-content-from-an-external-api)
7. [Saving content changes](/docs/getting-started/backends#saving-content)
8. [Adding alerts](/docs/getting-started/backends#adding-alerts)

## Clone the demo

To get started, clone the [demo](https://github.com/tinacms/tina-intro-tutorial), install its dependencies, and start the dev server.

```bash
git clone git@github.com:tinacms/tina-intro-tutorial.git my-tina-app
cd my-tina-app
yarn install
yarn start
```

![tina-cra-tutorial-start](/img/getting-started/tina-tutorial-step1.png)

> If at any point you feel lost or confused during this tutorial, checkout the [Tina Community Forum](https://community.tinacms.org/) to get answers, help, and llama-humor.