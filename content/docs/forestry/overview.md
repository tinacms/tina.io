---
title: Overview
id: '/docs/forestry/overview/'
next: '/docs/forestry/migrate'
---

## Introduction

Forestery.io and TinaCMS are both headless content management systems (CMS's) that allow you to manage your content in a centralized location and deliver it to your website or application. However, there are some key differences between the two that you should be aware of..

## Core Differences between Forestry.io and TinaCMS

### Open-source

Forestry.io is closed-source, while TinaCMS's front-end is open-source. This means that TinaCMS far more customizable to be custom fields, plugins, etc.

### Previews

TinaCMS is focused on providing live, in-context editing capabilities, while Forestry.io offers a more traditional approach to content management. This means that with TinaCMS, you can see your changes as you make them, while with Forestry.io, you have to preview your changes in separate window. These previews currently work with React pages, and Vue support is planned for next year.

### Improved Local Workflow

TinaCMS gives allows devs to iterate more quickly by allowing TinaCMS to be run in dev-mode, locally alongside your site. For example, you can make changes to your content models and fields, and see the results immediately, without having to wait for them to be synchronized with a hosted dashboard.

To read more about some of the specific conceptual difference of TinaCMS vs Forestry, read our [Comparing Forestry & Tina Concepts doc]("/docs/forestry/accessing-cms/")

## Caveats of using TinaCMS

- As mentioned above, TinaCMS's contextual editing only supports React-based websites and applications. If your website or application is not built with React, you will still be able to use the TinaCMS standalone editor, but there will be no previews.
- TinaCMS is a relatively new and rapidly evolving CMS, so there may be some missing Framework-specific features compared to Forestry.
- Since TinaCMS uses code by configuration, the initial setup process may take a bit more effort compared to Forestry's UI import. This is a tradeoff for the amount of customizability TinaCMS provides.

For a list of Forestry features that that haven't (yet) made their way to TinaCMS, see our [blog post](https://github.com/forestryio/forestry.io/blob/forestry-tina-migration/hugo/content/blog/forestry-tina-migration.md).

TinaCMS is our V2 CMS, and where or future development efforts will be focused. We're confident TinaCMS will eclipse Forestry's feature-set, and provide a much improved editor experience & developer experience to teams.

Read on for a step-by-step guide of migrating to TinaCMS from Forestry!
