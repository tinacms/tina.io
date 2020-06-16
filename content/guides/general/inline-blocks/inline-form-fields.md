---
title: Add an Inline Form & Fields
---

## Step 2 - Register a generic form

<!-- Add tagged commit -->

The first thing we are going to do is create an _Inline Form_ with [`useForm`](<[https://tinacms.org/docs/forms#creating-forms-in-react](https://tinacms.org/docs/forms#creating-forms-in-react)>). Note that since we don't have a backend set up, the data changes won't persist and the toolbar won't save / track form status as expected. Please refer to [other guides](<[https://tinacms.org/guides/](https://tinacms.org/guides/)>) to learn more on setting up a backend.

Head to `Home.js`; this component imports `data` from a local JSON file and renders the `Hero` component, passing the data as props.

To create an `InlineForm`, first we need to create a form with the CMS. We will use the `useForm` hook to do this.

**Home.js**

```jsx
import React from 'react'
// 1. Import `useForm`
import { useForm } from 'tinacms'
import Hero from './components/Hero'
import data from './data/data.json'

export default function Home() {
  // 2. Create a config object
  const formConfig = {
    id: './data/data.json',
    initialValues: {
      hero: data.hero,
    },
    onSubmit() {},
  }

  // 3. Call `useForm` with the config object.
  const [pageData, form] = useForm(formConfig)

  // 4. Use the return data now connected with a TinaCMS form
  return (
    <div className="home">
      <Hero data={pageData.hero} />;
    </div>
  )
}
```

## Step 3 - Create an _Inline Form_

<!-- Add tagged commit -->

Now let's add an _Inline Form_ to the home page. First, install the `react-tinacms-inline` package.

```bash
yarn add react-tinacms-inline
```

Wrap `InlineForm` around the `Hero` component, and pass the `form`.

**Home.js**

```jsx
import React from 'react'
import { useForm } from 'tinacms'
// 1. Import `InlineForm`
import { InlineForm } from 'react-tinacms-inline'
import { Hero } from './components/Hero'
import data from './data/data.json'

export default function Home() {
  const formConfig = {
    id: './data/data.json',
    initialValues: {
      hero: data.hero,
    },
    onSubmit() {},
  }

  const [pageData, form] = useForm(formConfig)

  // 2. Wrap `InlineForm` around `Hero`, pass the form
  return (
    <div className="home">
      <InlineForm form={form}>
        <Hero data={pageData.hero} />
      </InlineForm>
    </div>
  )
}
```

If you restart the dev server, things won't look different. But changes have happened under the hood — the data being rendered by `Hero` is now _hooked up_ to an _Inline Form_ with the CMS.

At this point, we've turned the entire home page into a form. So any _Inline Fields_ we add to this on-page form will be editable directly on the page.

## Step 4 - Add _Inline Fields_

<!-- Add tagged commit -->

Now that we have the _Inline Form_ set up, we can add fields to it. _Inline Fields_ are essentially various types of inputs, with stripped-down styles so they blend in with the page. You can [create your own manually](https://tinacms.org/docs/inline-editing#adding-inline-editing-with-inlineform), or use the [pre-configured fields](https://tinacms.org/docs/inline-editing#using-pre-configured-inline-fields) provided by `react-tinacms-inline`. For the demo, we will only be using the pre-configured fields.

Head to the `Hero` component; we will turn the headline and subtext into _Inline Textareas_

**components/Hero.js**

```diff
import React from 'react'
// 1. Import `InlineTextarea`
+ import { InlineTextarea } from 'react-tinacms-inline'
import '../styles/hero.css'

- export function Hero({data}) {
+ export function Hero() {

  // 2. Replace `data` with Inline Fields
  return (
    <div className="hero">
-     <h1>{data.headline}</h1>
+     <h1>
+       <InlineTextarea name="hero.headline" />
+     </h1>
-     <p>{data.subtext}</p>
+     <p>
+       <InlineTextarea name="hero.subtext" />
+     </p>
    </div>
  )
}
```

Notice how we don't need to access `data` directly anymore. The `name` value on the Inline Field provides the path to the content in the source file based on the form passed to `InlineForm`.

You should now be able to edit those fields inline. Try selecting a field and updating the content.

> **Tip:** Remember that if you refresh the page, those data changes won't persist without a back-end set up.

![Hero component with inline fields configured]()
