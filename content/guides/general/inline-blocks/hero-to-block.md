---
title: Converting Hero to a Block
---

This simple inline editing configuration is a great start, but the end goal of this demo is to create a Home page built with [_Inline Blocks_](https://tinacms.org/docs/inline-editing/inline-blocks). In this step we will add `InlineBlocks` to the homepage and convert our `Hero` into a block.

> If you're wanting to get a better feel for the 'Blocks' concept, there is a great blog that dives deeper into [_what blocks are_](/blog/what-are-blocks).

## Add _InlineBlocks_

First we will add the `InlineBlocks` field to the home page. `InlineBlocks` accepts an array of block options — `blocks` — and a path to the block data — `name`. It handles block order, among other things. Anytime you want to make blocks inline, you will need this parent component to _house_ the blocks.

Head to `Home.js` and make these changes:

**Home.js**

```jsx
import React from 'react'
import { useForm } from 'tinacms'

// 1. Import `InlineBlocks` and `hero_template`
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { Hero, hero_template } from './components/Hero'
import data from './data/data.json'

export default function Home() {
  // 2. Update initial values with 'blocks' data
  const formConfig = {
    id: './data/data.json',
    initialValues: {
      blocks: data.blocks,
    },
    onSubmit() {},
  }

  const [, form] = useForm(formConfig)

  return (
    <div className="home">
      <InlineForm form={form} initialStatus="active">
        {/**
         * 3. Replace `Hero` with `InlineBlocks`
         */}
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  )
}

// 4. Define the blocks that get passed to `InlineBlocks`
const HOME_BLOCKS = {
  hero: {
    Component: Hero,
    template: hero_template,
  },
}
```

Take notice of the `HOME_BLOCKS` object. This object is _fed_ to `InlineBlocks`, letting it know what block options are available to add.

Right now it has a single `hero` block defined. [Inline Blocks](https://tinacms.org/docs/inline-editing/inline-blocks#creating-a-block) are made up of **a component** to render while editing and **a template** to configure defaults, add fields, and other required data. These don't exist yet, we will _create these soon_.

## Adjust Source Data

Notice how we swapped out the `initialValues` in the form config from `hero` to `blocks`? We need to update our source file with the `blocks` data that the `initialValues` point to.

Replace the entire contents of `data/data.json` with this:

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

## Make a Component

Now that our data is ready and `InlineBlocks` are set up on the home page, we need to make both parts of the hero block: a component and a template.

Let's make the _Hero Block Component_ first.

**components/Hero.js**

```diff
import React from 'react'
import {
  InlineTextarea,
+  BlocksControls,
} from 'react-tinacms-inline'
import '../styles/hero.css'

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

Here we're wrapping `Hero` in _Block Controls_ to provide a UI for reordering, deleting, and adding new blocks. Notice the `index` being passed as props to `BlockControls` — this helps to keep track of the block order.

You may have also seen that the `name` values were updated for our inline fields. The path for a block's source data references from the parent `InlineBlocks`. So the `name` value passed to the parent (`InlineBlocks`) will be the starting reference point for all children block paths. `InlineBlocks` uses the block index to know which object to write to / reference.

## Make a Template

Our Hero block still needs a template to be complete. This template allows us to create the `hero` block type and provide default values for newly created blocks.

Add this code below the `Hero` component definition:

**components/Hero.js**

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

The `fields` array is empty for now, but this is where we can add additional metadata to edit in a [_Settings Modal_](/guides/general/inline-blocks/settings-modal). We will cover this in a few steps.

Restart the dev server and click on the hero block. You should see some new _Blocks Controls_ UI. Try to add new hero blocks by hitting the 'plus' icon!

![hero block](/img/inline-editing-guide/step8-hero-block.png)

Even though we got this working, there's a few things to adjust. See how the **controls bleed off the page**? Let's fix that next.

<!-- - Note margin collapse bug? -->
