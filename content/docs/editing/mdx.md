---
title: Markdown & MDX
id: '/docs/editing/mdx'
next: '/docs/editing/blocks'
---

## Tina's approach to handling Markdown and MDX

If you're used to working with markdown or MDX you've most likely written
content directly in a code editor and pushed changes to a Git provider,
which would then trigger an update to your website. This isn't an ideal
workflow for users of a CMS like Tina for a couple of reasons:

- There is a period of time between when content is changed and it's visible on
  your website. Depending on your build strategy this could be a few minutes.
- For MDX, inserting raw JSX is error-prone, and it's not clear to the editor what
  types of elements are available (ie. `import Cta from '../components'`)

Instead, Tina gives you the ability to write content and see updates to your
website immediately. There are few key concepts that make this work:

- [Content is served via GraphQL](#markdown-and-mdx-content-is-served-via-graphql)
- [Content can be rendered `<TinaMarkdown>`](#render-content-with-tinamarkdown)
- [MDX elements are registered ahead of time in the schema](#provide-templates-for-mdx-elements-in-your-schema)

### Markdown and MDX content is served via GraphQL

With traditional markdown and MDX tooling, you'll be pulling content from the
filesytem on your host, which requires a build step before content is
available. But Tina parses markdown and MDX for you and serves it as `JSON`,
no need to handle parsing yourself with tools like `remark` or `markdown-it`.

> Since content is served via GraphQL, there are some limitations to what's
> supported from MDX. [More information](/docs/reference/types/rich-text/#caveats)

### Render content with `<TinaMarkdown>`

Because Tina serves the _parsed_ version of your markdown file, you'll want
to step through each node and render it with full control. `<TinaMarkdown>` lets
you do that, read more about it [here]()

### Provide templates for MDX elements in your schema

Tina doesn't require a compilation step like other MDX tooling you
might be familiar with, so it needs to know about all the possible elements
you support ahead of time. Instead of doing an `import` statement in MDX,
you need to register each element as a `template` in your Tina schema.

## Usage

For full usage details, check out the [`rich-text`](/docs/reference/types/rich-text) reference documentation
