---
title: Extending Tina
id: '/docs/extending-tina/overview'
prev: null
next: /docs/extending-tina/validation
---

Tina has many advanced features that allow the entire CMS editing experience to be customized.

## Customizing Fields

Tina allows the forms to be customized through the `ui` property. This allows a custom experience to be created for your editors. Some of the main customization features are:

- Adding [client-side validation](/docs/extending-tina/validation/) to a component so that a desired format can be enforced before saving
- Customizing [the field component](/docs/extending-tina/custom-field-components/) that is rendered
- Customizing how the users input is [parsed and formatted](/docs/extending-tina/format-and-parse/)


## Customizing the CMS instance

The `.tina/schema.ts` config has an optional `cmsCallback` parameter that can be added to customize the CMS instance.

```diff
// .tina/schema.ts

// ...
export config = defineConfig({
  apiURL,
+ cmsCallback: (cms) => {
+   cms.sidebar.position = 'overlay'
+   return cms
+ }
})
```

The `cmsCallback` hook might be used to alter Tina's UI, dynamically hide the sidebar on certain pages, tap into the CMS event bus, etc, but the most common use-case is for registering custom field plugins.

