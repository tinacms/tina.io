---
title: Creating Field Plugins
date: '2020-02-14T07:00:00.000Z'
author: Kendall Strautman
draft: false
consumes:
  - file: /packages/next-tinacms-json/src/use-local-json-form.ts
    details: Example shows useLocalJsonForm in use
  - file: /packages/next-tinacms-json/src/use-json-form.ts
    details: Example shows useLocalJsonForm in use
  - file: /packages/@tinacms/form-builder/src/field-plugin.tsx
    details: Depends on the FieldPlugin interface
---

In the [previous post](https://tinacms.org/blog/custom-field-components), we learned how to create a custom field component and register it to the sidebar. So let's **go full circle on the topic of custom fields** in TinaCMS. In this short but sweet post we’ll cover how to _turn a plain ol’ field component into a field plugin._

**Getting Started 👏**

To follow along, you should have a custom field component set-up with a Tina form. If not, no worries! Just take a gander at the post on [how to create a custom field component](https://tinacms.org/blog/custom-field-components); it should provide enough working knowledge to get going. In the following examples, I will continue using the [llama-filters](https://github.com/kendallstrautman/llama-filters) demo created in the previous post.

There are **two steps to adding a field plugin to the CMS**. First, we'll define the field component object and register it with the CMS. Next, we'll use the field plugin in a form definition so we can edit content in the sidebar with our fancy custom field plugin.

## 1. Add the Field Plugin to the CMS

To register the custom field as a plugin with the CMS, we’ll need to head to the file where we can access the cms instance. In our Next.js demo, we’ll look at `_app.js`. This it the place where we override the default Next app to wrap `Tina` around each page.

```js
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
import { GitClient } from '@tinacms/git-client'
/*
 ** 1. Import the custom field component
 */
import RangeInput from '../components/RangeInput'

export default class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS({
      apis: {
        git: new GitClient('http://localhost:3001/___tina'),
      },
      sidebar: {
        position: 'overlay',
        hidden: process.env.NODE_ENV === 'production',
      },
    })
  }

  /*
  ** 2. Define the field plugin
  */
  customFieldPlugin = {
    name: 'range-input',
    Component: RangeInput,
  }

  /*
  ** 3. Register the plugin with the cms
  */
  this.cms.fields.add(this.customFieldPlugin)

  // TODO - TEST THIS UPDATE.
  // should I add it on the CMS definition like the sidebar??

  render() {
    const { Component, pageProps } = this.props
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}
```

You’ll want to import the custom field component and then register the plugin with the CMS directly. Notice how we import the `RangeInput` component created in the [previous post](https://tinacms.org/blog/custom-field-components), this is the custom _field component_ that we're now attaching to a _field plugin_.

> If you’re working with Gatsby, this [looks slightly different](https://tinacms.org/docs/gatsby/custom-fields/). _Hint_: you’ll head to the **gatsby-browser.js** file to access the CMS instance.

### Field Plugin Definition

A plugin is used to extend functionality in the CMS. A field plugin in particular allows us to create and register custom fields to the CMS.

The field plugin definition **requires (at a minimum) a name and a component.** The name will be used to reference the custom field in form definitions. The component is what will actually be rendered in the sidebar.

```ts
interface FieldPlugin {
  __type: 'field'
  name: string
  Component: React.FC<any>
  type?: string
  validate?(
    value: any,
    allValues: any,
    meta: any,
    field: Field
  ): string | object | undefined
  parse?: (value: any, name: string, field: Field) => any
  format?: (value: any, name: string, field: Field) => any
  defaultValue?: any
}
```

You can see that there are additional configuration functions and options. These options are incredibly useful for creating more complex fields that require [validation](https://tinacms.org/docs/fields/custom-fields#validate-optional) or formatting, such as an [email field](https://tinacms.org/docs/gatsby/custom-fields/).

## 2. Use the custom field in a form

Now that the plugin is registered with the CMS, we can use it in any form definition. Going back to the [llama-filters demo](https://github.com/kendallstrautman/llama-filters), let’s head to index.js where the Tina form is configured. We need to **update the form options** for our image saturation field to reference the field plugin as opposed to calling the component directly.

```diff
/*
** 1. Remove the import of the custom field component
*/
- import RangeInput from '../components/RangeInput'
import React from 'react'
import { useLocalJsonForm } from 'next-tinacms-json'

export default function Index(props) {
  //...
}

const formOptions = {
 fields: [
   /*
   ** 2. Reference the field plugin `name` instead
   **    of passing the custom component directly
   */
   {
     label: 'Image Saturation',
     name: 'saturation',
-    component: RangeInput
+    component: 'range-input'
   }
 ]
}

Index.getInitialProps = async function() {
  //...
}
```

> Note how the `component` property in the field definition matches the `name` value defined in the field plugin.

### Short and sweet, as promised 🍰

This post, combined with the former, should give you all the building blocks to start making your own field plugins. Feel free to _dive into the documentation_ on [fields](https://tinacms.org/docs/fields/custom-fields/) or [plugins](https://tinacms.org/docs/concepts/plugins) to go deep with the concepts. Make sure to **share your groovy custom fields with us [@tina_cms](https://twitter.com/tina_cms)** 🖖!
