---
title: Converting Hero to a Block
---

## Step 5 - create component and template

This simple inline editing configuration is a great start, but the end goal of this demo is to create a Home page built with [_Inline_ \*Blocks](<*[https://tinacms.org/docs/inline-editing/inline-blocks](https://tinacms.org/docs/inline-editing/inline-blocks)*>),\* so let's convert our Hero into a block.

[Blocks](https://tinacms.org/docs/inline-editing/inline-blocks#creating-a-block) are made up of **a component** to render while editing and **a template** to configure defaults, add fields, and other required data. Let's make the _Hero Block Component_ first.

**components/hero.js**

```diff
import React from 'react';
import {
  InlineTextarea,
  InlineText,
+  BlocksControls,
} from 'react-tinacms-inline';
import '../styles/Hero.css';

-export function Hero() {
+ export function Hero({index}) {
  return (
+   <BlocksControls index={index}>
      <div className="hero">
        <h1>
-          <InlineText name="hero.headline" />
+          <InlineText name="headline" />
        </h1>
        <p>
-          <InlineTextarea name="hero.subtext" />
+          <InlineTextarea name="subtext" />
        </p>
      </div>
+   </BlocksControls>
  );
}
```

Here we're wrapping the Hero in _Block Controls_ to provide access to edit additional fields, reorder, delete, and add new blocks. Notice the `index` being passed as props, we'll need to configure a parent `InlineBlocks` component for this to actually work. _More on that in a moment._

Let's make the _Hero Block Template_ next. This template allows us to create the `hero` block type and provide default values for newly created blocks. The `fields` array is empty for now, but this is where we can add additional metadata that can't be edited inline.

**components/hero.js**

```jsx
export function Hero({ index }) {
  //...
}

export const hero_template = {
  label: 'Hero',
  defaultItem: {
    headline: 'Suspended in a Sunbeam',
    subtext:
      'Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions.',
  },
  fields: [],
}
```

## Step 6 - adjust source data and register InlineBlocks

We need to add an `InlineBlocks` field that will accept the Hero block and handle the block order.

**Home.js**

```diff
import React from 'react';
import { useForm } from 'tinacms';
- import { InlineForm } from 'react-tinacms-inline';
+ import { InlineForm, InlineBlocks } from 'react-tinacms-inline';
import { Hero, hero_template } from './components/Hero';
import data from './data/data.json';

export default function Home() {
  const formConfig = {
    id: './data/data.json',
    initialValues: {
-      hero: data.hero,
+      blocks: data.blocks,
    },
    onSubmit() {},
  };

  const [, form] = useForm(formConfig);

  return (
    <div className="home">
      <InlineForm form={form} initialStatus="active">
-        <Hero />
+        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  );
}

+ const HOME_BLOCKS = {
+  hero: {
+    Component: Hero,
+    template: hero_template,
+  },
};
```

Notice how we swapped out the `InitialValues` in the form config. We need to update our source data with the `blocks` data.

**data/data.json**

```json
{
  "blocks": [
    {
      "_template": "hero",
      "headline": "Suspended in a Sunbeam",
      "subtext": "Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions inconspicuous motes of rock and gas a mote of dust suspended in a sunbeam great turbulent clouds."
    }
  ]
}
```

Restart the dev server and click on the hero block. You should be able to add numerous hero blocks by hitting the 'plus' icon. Notice how the controls bleed off the page? Let's fix that next.

- Note margin collapse bug?
- **Tip:** You can control the orientation of the 'Add Block' icons by setting `direction: 'column' | 'row'` as a prop on `InlineBlocks`
