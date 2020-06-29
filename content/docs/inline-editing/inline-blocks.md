---
title: Inline Blocks
prev: /docs/inline-editing/inline-group
next: null
consumes:
  - file: /packages/react-tinacms-inline/src/inline-form.tsx
    description: InlineForm
  - file: /packages/react-tinacms-inline/src/blocks/block.ts
    description: Shows Block interface
  - file: /packages/@tinacms/fields/src/plugins/BlocksFieldPlugin.tsx
    description: Shows Block Template interface
  - file: /packages/react-tinacms-inline/src/blocks/inline-field-blocks.tsx
    description: Shows Inline Blocks interface and gives example
  - file: /packages/react-modals/src/ModalProvider.tsx
    description: Uses ModalProvider for Block Settings
---
Inline Blocks combine the content modelling flexibility of regular [Blocks](/blog/what-are-blocks) with the improved editing experience of [Inline Editing](/docs/inline-editing).

> **Please note:** This is considered an unstable API. Any breaking changes will be shared in the weekly [Release Notes](/blog). That said, we will do our best to keep this document up-to-date.

![TinaCMS: Inline Blocks Gif](/gif/inline-blocks.gif)

## Creating a Block

A _block_ is **made of two parts**: _a component_ that renders in edit mode, and _a template_ to configure fields, defaults and other required data.

```ts
interface Block {
  Component: React.FC<BlockComponentProps>
  template: BlockTemplate
}
```

### Part 1: Block Component

```jsx
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'

// Example 'Heading' Block
export function Heading(props) {
  return (
    <BlocksControls index={props.index}>
      <InlineTextarea name="text" />
    </BlocksControls>
  )
}
```

The _Block Component_ is passed `index`, its position in the block order, and `data`, the source data.

```ts
interface BlockComponentProps {
  index: number
  data: any
}
```

Since it **renders in 'edit mode,'** this component should display `BlocksControls` and at least one _Inline Field_. `BlocksControls` is the UI for editing, deleting, or moving blocks. An _Inline Field_ is, at its most basic, an input field stripped of styling to blend in with the site.

#### Blocks Controls Options

| Key | Description |
| --- | --- |
| `index` | The index of the block associated with these controls. |
| `insetControls` | A boolean to denote whether the group controls display within or outside the group. |
| `focusRing` | Either an object to style the focus ring or `false`, which hides the focus ring entirely. For styles, `offset` (in pixels) controls the distance from the ring to the edge of the group; `borderRadius`(in pixels) controls the [rounding](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) edge of the focus ring. |
| `children` | Any child components, typically inline field(s). |

```ts
interface BlocksControlsProps {
  index: number
  insetControls?: boolean
  focusRing?: false | FocusRingProps
  children: any
}

interface FocusRingProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}
```

<!-- TODO: update image -->

![TinaCMS: Inline Block Controls](/img/inline-blocks/block-controls.png)

The image above shows the _InlineTextarea_ field in use with Blocks Controls.

**Additional Available Inline Fields**:

* [Text](/docs/inline-editing/inline-text)
* [Textarea](/docs/inline-editing/inline-textarea)
* [Image](/docs/inline-editing/inline-image)
* [Group](/docs/inline-editing/inline-group)

### Part 2: Block Template

```jsx
export const heading_template = {
  type: 'heading',
  label: 'Heading',
  defaultItem: {
    text: 'At vero eos et accusamus',
  },
  key: 'heading-block',
  fields: [],
}
```

The _Inline Block Template_ **configures the block** with the CMS. It has a similar shape to a Regular [Block Template](/docs/fields/blocks#block-template-options) definition.

| Key | Type | Purpose |
| --- | :---: | ---: |
| `type` | `string` | This value connects source block data with the template. |
| `label` | `string` | A human readable label. |
| `defaultItem?` | `object \\\| (() => object)` | Populates new blocks with default data. |
| `key` | `string` | A unique value to optimize the [rendering of the list](https://reactjs.org/docs/lists-and-keys.html) |
| `fields` | `Array` | Populates fields in the [Settings Modal](link to settings modal). |

## Configuring Inline Blocks with Inline Form

The initial steps to configuring _Inline Blocks_ involve setting up an _[Inline Form](/docs/inline-editing#inlineform-and-inlinefield)_ on the page or component where the blocks should render. Then, you should [add controls](/docs/inline-editing#inline-form-controls) to handle editing state. Finally, you can use a component called `InlineBlocks` that **renders blocks in order** based on the source data.

### The Steps:

1. Wrap your component with `InlineForm`, pass the `form` object.
2. Set up [Inline Controls](/docs/inline-editing#inline-form-controls).
3. Configure `InlineBlocks`, pass the `name` and `blocks` values.

```jsx
import { useJsonForm } from 'next-tinacms-json'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import {
  BodyCopy,
  body_copy_template,
  Heading,
  heading_template,
  Image,
  image_template,
} from './blocks'
import { EditToggle, DiscardButton, SaveButton } from './inline-ui'

/*
 ** Example 'PageBlocks' Component
 */

export default function PageBlocks({ jsonFile }) {
  // Creates the form
  const [, form] = useJsonForm(jsonFile)

  return (
    <InlineForm form={form}>
      <EditToggle />
      <SaveButton />
      <DiscardButton />
      <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
    </InlineForm>
  )
}

/*
 ** Multiple blocks are grouped into a single object,
 ** with their associated Component and template values.
 ** This object is passed to InlineBlocks
 */

const PAGE_BLOCKS = {
  heading: {
    Component: Heading,
    template: heading_template,
  },
  body_copy: {
    Component: BodyCopy,
    template: body_copy_template,
  },
  image: {
    Component: Image,
    template: image_template,
  },
}
```

### _InlineBlocks_ Interface

To be configured properly, `InlineBlocks` requires `name` and `blocks`.

```ts
interface InlineBlocksProps {
  name: string
  blocks: {
    [key: string]: Block
  }
  className?: string
  direction?: 'vertical' | 'horizontal'
  itemProps?: {
    [key: string]: any
  }
  min?: number
    max?: number
}
```

| Key | Purpose |
| --- | ---: |
| `name` | The path to the **source data** for the blocks. |
| `blocks` | An object composed of individual [Blocks](/docs/inline-editing/inline-blocks#creating-a-block). |
| `className` | To set styles directly on the input or extend via [styled components](/docs/inline-editing#extending-inline-field-styles). |
| `direction` | Sets the orientation of the drag direction and `AddBlock` button position. |
| `itemProps` | An object that passes additional props to every block child element. |
| `min` | Controls the minimum number of blocks. Once reached, blocks won't be able to be removed. _(Optional)_ |
| `max` | Controls the maximum number of blocks allowed. Once reached, blocks won't be able to be added. _(Optional)_ |

### Blocks Source Data

The source data for the blocks in the example above could look something like this:

```json
// Example blocks JSON source file
{
  "blocks": [
    {
      "_template": "image",
      "src": "/img/bali-1.jpg",
      "alt": "bali-viaje"
    },
    {
      "_template": "heading",
      "text": "Ne quaesiveris extra."
    },
    {
      "_template": "body_copy",
      "text": "Sed ut perspiciatis unde omnis iste natus error."
    }
  ]
}
```

The key ("blocks" in this example) for the array of individual blocks must match the `name` value passed to `InlineBlocks`.

Each individual _block_ object must have a `_template` value to connect its data with a block template. This value should match the `type` value defined in the associated block template.

## Using the Settings Modal

There may be times when a _Block_ **needs more field inputs** than a single inline field. For example, an image may need a field for the ‘alt’ tag. For this metadata, you can use `ModalProvider` and add additional fields to the _Block Template_.

![TinaCMS: Inline Blocks Settings Modal](/img/inline-blocks/settings-modal.png)

### 1. Define Fields in the Block Template

Field definitions added to the `fields` property will render in the _Settings Modal_. These fields are defined exactly the same as regular [sidebar fields](/docs/fields).

```js
const image_template = {
  type: 'image',
  label: 'Image',
  defaultItem: {
    src: '/img/bali-1.jpg',
    alt: '',
  },
  key: 'image-block',
  /*
   ** Define fields to render
   ** in a Settings Modal form
   */
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      component: 'text',
    },
  ],
}
```

### 2. Use the field data in your Block Component

You can then use that field data in the Block Component. In this example, the data will populate the `alt` attribute for the image.

```jsx
export function Image({ data, index }) {
  return (
    <>
      <div>
        <BlocksControls index={index}>
          <InlineImage
            name="src"
            previewSrc={formValues => formValues.blocks[index].src}
            parse={filename => `/img/${filename}`}
            uploadDir={() => '/public/img/'}
          >
            {/*
             ** The 'alt' data from the
             ** 'settings' is consumed
             */}
            <img src={data.src} alt={data.alt} />
          </InlineImage>
        </BlocksControls>
      </div>
    </>
  )
}
```

### 3. Add the `ModalProvider`

To use the `ModalProvider`, wrap it around the `InlineForm` that renders `InlineBlocks`. This will provide the _Settings Modal_ view. The fields defined in the block template will **populate the form** in that modal.

```jsx
import { useJsonForm } from 'next-tinacms-json'
import { ModalProvider } from 'tinacms'
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'

export default function IndexBlocks({ jsonFile }) {
  const [, form] = useJsonForm(jsonFile)

  // Wrap InlineForm with the ModalProvider
  return (
    <ModalProvider>
      <InlineForm form={form}>
        {/*
         ** //...
         */}
      </InlineForm>
    </ModalProvider>
  )
}
```

<!--  TODO: add info on nested blocks, or write a guide?-->
