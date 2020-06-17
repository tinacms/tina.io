---
title: Converting Hero to a Block
---

## Step 5 - Make a Component

This simple inline editing configuration is a great start, but the end goal of this demo is to create a Home page built with [_Inline Blocks_](https://tinacms.org/docs/inline-editing/inline-blocks), so let's convert our Hero into a block.

[Blocks](https://tinacms.org/docs/inline-editing/inline-blocks#creating-a-block) are made up of **a component** to render while editing and **a template** to configure defaults, add fields, and other required data. Let's make the _Hero Block Component_ first.

**components/hero.js**

```diff
import React from 'react';
import {
  InlineTextarea,
+  BlocksControls,
} from 'react-tinacms-inline';
import '../styles/hero.css';

-export function Hero() {
+ export function Hero({index}) {
  return (
+   <BlocksControls index={index}>
      <div className="hero">
        <div className="wrapper wrapper--narrow">
          <h1>
-           <InlineTextarea name="hero.headline" />
+           <InlineTextarea name="headline" />
          </h1>
          <p>
-           <InlineTextarea name="hero.subtext" />
+           <InlineTextarea name="subtext" />
          </p>
        </div>
      </div>
+   </BlocksControls>
  );
}
```

Here we're wrapping the Hero in _Block Controls_ to provide a UI for reordering, deleting, and adding new blocks. Notice the `index` being passed as props — this helps to keep track of the block order. We'll need to configure a parent `InlineBlocks` component for this to actually work, but _more on that in a moment._

## Step 6 — Make a Template

Let's make the _Hero Block Template_ next. This template allows us to create the `hero` block type and provide default values for newly created blocks. The `fields` array is empty for now, but this is where we can add additional metadata to edit in a [_Settings Modal_](/guides/general/inline-blocks/settings-modal).

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

## Step 7 - Add _InlineBlocks_

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

// We don't need to access pageData directly anymore
- const [pageData, form] = useForm(formConfig)
+ const [, form] = useForm(formConfig);

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

## Step 8 — Adjust Source Data

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

![Image with multiple hero blocks here]()

Restart the dev server and click on the hero block. You should be able to add numerous hero blocks by hitting the 'plus' icon. Notice how the controls bleed off the page? Let's fix that next.

> **Tip:** You can control the orientation of the 'Add Block' icons by setting `direction: 'column' | 'row'` as a prop on `InlineBlocks`

<!-- - Note margin collapse bug? -->
