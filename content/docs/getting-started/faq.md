---
title: Frequently Asked Questions
---

## General

### Why do you say "Tina is not a CMS?"

Tina is a suite of packages that enable developers to build highly customized content management systems. A conventional CMS provides a fully-realized editing interface, requiring you to create an edit content within its bounds. Tina takes an "inside-out" approach, helping developers craft their own CMS according to their specific content needs.

### I added Tina to my website and now it's really slow and crashes the browser. What's going on?

Tina provides a **real-time preview** of React-based websites by manipulating the content that gets passed into a component's props, triggering the re-rendering of that component. Without Tina, this type of content is not usually changed after its initial render. It's common for latent performance issues to suddenly emerge when these props start receiving frequent updates. The following tips might help:

- [Memoize](https://reactjs.org/docs/hooks-reference.html#usememo) expensive operations
- Identify rendering loops with React Devtools
