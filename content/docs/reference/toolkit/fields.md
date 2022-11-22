---
title: Field Plugins
last_edited: '2020-08-05T15:33:06.570Z'
---

<div class="short-code-warning">
   <div>
      <p>This is an advanced-use feature, and likely not something you'll need to configure. What you probably want is the <a href="/docs/reference/types/">content types reference</a>!</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

Field plugins are the components that the editor interacts with to edit a given field. Tina provides some out of the box field plugins for its basic field types. We also allow you to extend any of the provided field plugins, of create your own.

## Default Field Plugins

These are the default field plugins available through the `tinacms` package:

- [Text](/docs/reference/toolkit/fields/text)
- [Textarea](/docs/reference/toolkit/fields/textarea)
- [Number](/docs/reference/toolkit/fields/number)
- [Image](/docs/reference/toolkit/fields/image)
- [Color](/docs/reference/toolkit/fields/color) _May be external soon_
- [Toggle](/docs/reference/toolkit/fields/toggle)
- [Select](/docs/reference/toolkit/fields/select)
- [Tags](/docs/reference/toolkit/fields/tags)
- [List](/docs/reference/toolkit/fields/list)
- [Group](/docs/reference/toolkit/fields/group)
- [Group List](/docs/reference/toolkit/fields/group-list)
- [Blocks](/docs/reference/toolkit/fields/blocks)
- [Date & Time](/docs/reference/toolkit/fields/date)

## External Field Plugins

These are plugins that must be installed & imported through separate packages:

- [Markdown](/docs/reference/toolkit/fields/markdown)
- [HTML](/docs/reference/toolkit/fields/html)
