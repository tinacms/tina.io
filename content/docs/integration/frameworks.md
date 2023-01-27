---
title: Frameworks
---

## Which Frameworks does Tina support?

Tina's default "basic editor" works in a wide varierty of frameworks. It reads/writes file-based content (Markdown, MDX, JSON, etc).

![basic editor](https://res.cloudinary.com/forestry-demo/image/upload/v1647455231/tina-io/docs/basic-editor.png)

> Tina also allows support for ["Contextual Editing"](/docs/contextual-editing/overview/) so that editors can see their pages being updated in real-time as they make changes. Contextual editing is currently limited to React-based frameworks (NextJS, React, etc).

## Configuring Tina with each framework

When configuring Tina, you will be prompted to provide a `publicFolder` in your tina config. Here are some default values for some common frameworks:

| **Framework**                | **Public assets directory** |
| ---------------------------- | --------------------------- |
| NextJS                       | public                      |
| Astro                        | public                      |
| Create React App             | public                      |
| Hugo                         | static                      |
| Jekyll                       | ./                          |
| Gatsby                       | static                      |
| Nuxt v3                      | public                      |
| Nuxt v2                      | static                      |
| Remix                        | public                      |
| Vue                          | public                      |
| Eleventy                     | Configured per project      |
| Plain HTML site (using JSON) | ./                          |
