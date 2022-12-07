---
title: 'Comparing Tina & Forestry: Data Files'
id: '/docs/forestry/data-files/'
---

In Forestry, you can define a "data file" which is a single document that belongs to a template (rather than a group of documents). This can be a convenient way to manage global data for your site, such as site settings or navigation menus.

At the time of writing, this concept has not yet been implemented in TinaCMS. In the meantime, you can define a collection that contains a single document, and then disable the ability to create or delete documents in this collection using the "allowedActions" property in your collection definition.

Some features like setting up select-fields to references arrays in a data-file are not yet available in Tina.
