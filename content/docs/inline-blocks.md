---
title: Inline Blocks
prev: /docs/inline-editing
next: /docs/nextjs/overview
consumes:
  - file: /packages/react-tinacms-inline/src/inline-form.tsx
    description: InlineForm
---

Inline Blocks combine the content modelling flexibility of regular [blocks](https://tinacms.org/blog/what-are-blocks) with the improved editing experience of [Inline Editing](https://tinacms.org/docs/inline-editing).

> **Please note:** This is considered an unstable API. Any breaking changes will be shared in the weekly [Release Notes](https://tinacms.org/blog). That said, we will do our best to keep this document up-to-date.

![TODO: add gif]()

## Creating a Block

A _block_ is comprised of two parts: **a component** that renders in edit mode, and **a template** to configure fields, defaults and other required data.

```ts
interface Block {
  Component: React.FC<BlockComponentProps>
  template: BlockTemplate
}
```

### Block Component

```jsx
import { BlocksControls, BlockTextArea } from 'react-tinacms-inline'

// Example 'Heading' Block
export function Heading(props) {
  return (
    <BlocksControls index={props.index}>
      <BlockTextarea name="text" />
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

This component should render `BlocksControls`, the UI for editing, deleting, or moving blocks and at least one _Block Field_.

**Available Block Fields**:

- [BlockText]()
- [BlockTextarea]()
- [BlockImage]()

### Block Template

```jsx
export const heading_template = {
  type: 'heading',
  label: 'Heading',
  defaultItem: {
    _template: 'heading',
    text: 'At vero eos et accusamus',
  },
  key: undefined,
  fields: [],
}
```

The _Inline Block Template_ is similar to a Regular [Block Template](https://tinacms.org/docs/fields/blocks#block-template-options) definition.

| Key            |           Type            |                                                                                              Purpose |
| -------------- | :-----------------------: | ---------------------------------------------------------------------------------------------------: |
| `type`         |         `string`          |                                                  This value connects source data with this template. |
| `label`        |         `string`          |                                                                              A human readable label. |
| `defaultItem?` | `object | (() => object)` |                                                              Populates new blocks with default data. |
| `key`          |         `string`          | A unique value to optimize the [rendering or the list](https://reactjs.org/docs/lists-and-keys.html) |
| `fields`       |          `Array`          |                                    Populates fields in the [Settings Modal](link to settings modal). |

## Configuring Inline Blocks with Inline Form

The initial steps to configuring Inline Blocks involve setting up [Inline Form](https://tinacms.org/docs/inline-editing#inlineform-and-inlinefield) on a page or component. We then use a component called `InlineBlocks`, where we will pass the blocks configuration data.

1. Wrap your component with `InlineForm`, pass the `form` object.
2. Set up Inline Controls: `EditToggle` & `DiscardChanges`.
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
import { EditToggle, DiscardButton } from './inline-ui'

/*
 ** Example 'PageBlocks' Component
 */

export default function PageBlocks({ jsonFile }) {
  // Creates the form
  const [, form] = useJsonForm(jsonFile)

  return (
    <InlineForm form={form}>
      <EditToggle />
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
}
```

- `blocks`: An object composed of individual [Blocks](/docs/inline-editing/inline-blocks#creating-a-block).

- `name`: The path to the **source data** for the blocks.

### Blocks Source Data

The source data for the blocks in the example above could look something like this:

```json
// Example blocks JSON source file
{
  "blocks": [
    {
      "_template": "image",
      "src": "/img/bali-1.jpg",
      "alt": ""
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

## Creating Inline Controls Manually

To add controls for editing Inline Blocks, you can create your own button components.

![TODO: add photo]()

> **Note:** This configuration may change soon as these controls will be moved to a _Global Toolbar_ component.

### Toggle Edit Mode

To access 'edit mode' controls, you can use the `useInlineForm` hook to access the form status and functions to activate or deactivate 'edit mode'.

```jsx
/*
 ** Example EditToggle button component
 */
import { useInlineForm } from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

export function EditToggle() {
  const { status, deactivate, activate } = useInlineForm()

  return (
    <TinaButton
      primary
      onClick={() => {
        status === 'active' ? deactivate() : activate()
      }}
    >
      {status === 'active' ? 'Preview' : 'Edit'}
    </TinaButton>
  )
}
```

**Note:** The above example imports button styles from `@tinacms/styles`, but this component could be a plain `button` element with it's own styles.

### Discarding Changes

Creating a `DiscardChanges` button works similarly by calling `useInlineForm`. This button directly resets the state of `InlineForm`.

```js
import { useInlineForm } from 'react-tinacms-inline'
import { Button as TinaButton } from '@tinacms/styles'

export function DiscardButton() {
  const { form } = useInlineForm()

  /*
   ** If there are no changes
   ** to discard, return early
   */
  if (form.finalForm.getState().pristine) {
    return null
  }

  return (
    <TinaButton
      color="primary"
      onClick={() => {
        form.finalForm.reset()
      }}
    >
      Discard Changes
    </TinaButton>
  )
}
```

## Using the Settings Modal

There may be times when a Block needs more field inputs than the inline field. For example, an image may need a field for the ‘alt’ tag. For these additional settings, we can use `ModalProvider` and add additional fields to our Block Template.

![TODO: add photo]()

### 1. Define Fields in the Block Template

Field definitions added to the `fields` property will render in the Settings Modal. These fields are defined exactly the same as regular [sidebar fields](https://tinacms.org/docs/fields).

```js
const image_template = {
  type: 'image',
  label: 'Image',
  defaultItem: {
    _template: 'image',
    src: '/img/bali-1.jpg',
    alt: '',
  },
  key: undefined,
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
          <BlockImage
            name="src"
            parse={filename => `/img/${filename}`}
            uploadDir={() => '/public/img/'}
          >
            {/*
             ** The 'alt' data from the
             ** 'settings' is consumed
             */}
            <img src={data.src} alt={data.alt} />
          </BlockImage>
        </BlocksControls>
      </div>
    </>
  )
}
```

### 3. Add the `ModalProvider`

To use the `ModalProvider`, simply wrap it around the `InlineForm` that renders `InlineBlocks`. This will provide the 'Settings Modal' view. The fields defined in the block template will populate the form in that modal.

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
