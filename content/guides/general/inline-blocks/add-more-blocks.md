---
title: Add more Blocks
---

### Step 9

At this point, we've got a taste of the many different aspects to configuring blocks, but our page is lacking and we can only add one type of block. In this step we will add a few more block types: Image Diptych, Paragraph. Feel free to copy and paste these examples directly into the project.

**components/Images.js**

```jsx
import React from 'react'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'
import imageLeft from '../assets/ivan-bandura-unsplash.jpg'
import imageRight from '../assets/martin-sanchez-unsplash.jpg'
import '../styles/images.css'

export function Images({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="image-diptych">
        <InlineImage
          name="left.src"
          parse={filename => `/assets/${filename}`}
          uploadDir={() => '/assets/'}
          previewSrc={() => imageLeft}
          focusRing={false}
        />
        <InlineImage
          name="right.src"
          parse={filename => `/assets/${filename}`}
          uploadDir={() => '/assets/'}
          previewSrc={() => imageRight}
          focusRing={false}
        />
      </div>
    </BlocksControls>
  )
}

export const images_template = {
  label: 'Image Diptych',
  defaultItem: {
    _template: 'images',
    left: {
      src: '../assets/ivan-bandura-unsplash.jpg',
      alt: 'Some alt text',
    },
    right: {
      src: '../assets/martin-sanchez-unsplash.jpg',
      alt: 'Some alt text',
    },
  },
  fields: [
    {
      name: 'left.src',
      label: 'Left-Hand Image',
      component: 'image',
      parse: filename => `/assets/${filename}`,
      uploadDir: () => '/assets/',
      previewSrc: () => imageLeft,
      focusRing: false,
    },
    {
      name: 'left.alt',
      label: 'Left-Hand Image Alt Text',
      component: 'text',
    },
    {
      name: 'right.src',
      label: 'Right-Hand Image',
      component: 'image',
      parse: filename => `/assets/${filename}`,
      uploadDir: () => '/assets/',
      previewSrc: () => imageRight,
      focusRing: false,
    },
    {
      name: 'right.alt',
      label: 'Right-Hand Image Alt Text',
      component: 'text',
    },
  ],
}
```

Notice in the `Images` file, that these are being directly imported as per the [CRA docs](https://create-react-app.dev/docs/adding-images-fonts-and-files/). But this configuration wouldn't work on a real project. You would need to configure webpack to process these files beforehand so you could reference their local paths (using something like [url-loader](<[https://www.npmjs.com/package/url-loader](https://www.npmjs.com/package/url-loader)>) and [file-loader](<[https://www.npmjs.com/package/file-loader](https://www.npmjs.com/package/file-loader)>)).

Furthermore, this project isn't set up with a [media store](https://tinacms.org/docs/media) yet, so uploading new images won't work. The type of media store you use depends on your back-end, and that is beyond the scope of this guide. So for our learning purposes, the same images will always render in the `Images` block.

**components/Paragraph.js**

```jsx
import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import '../styles/paragraph.css'

export function Paragraph({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="paragraph">
        <h3>
          <InlineTextarea name="text" focusRing={false} />
        </h3>
      </div>
    </BlocksControls>
  )
}

export const paragraph_template = {
  label: 'Paragraph',
  defaultItem: {
    text:
      'Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ',
  },
  fields: [],
}
```

Now we need to update the source data.

**data/data.json**

```json
{
  "blocks": [
    {
      "_template": "hero",
      "background_color": "rgb(5, 30, 38)",
      "text_color": "#fffaf4",
      "headline": "Suspended in a Sunbeam",
      "subtext": "Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions inconspicuous motes of rock and gas a mote of dust suspended in a sunbeam great turbulent clouds.",
      "align": "center"
    },
    {
      "_template": "images",
      "left": {
        "src": "../assets/ivan-bandura-unsplash.jpg",
        "alt": "Some alt text"
      },
      "right": {
        "src": "../assets/martin-sanchez-unsplash.jpg",
        "alt": "Some alt text"
      }
    },
    {
      "_template": "paragraph",
      "text": "Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem "
    }
  ]
}
```

And let's pass these blocks to our `InlineBlocks` component.

**Home.js**

```diff
import React from 'react';
import { useForm } from 'tinacms';
import { InlineForm, InlineBlocks } from 'react-tinacms-inline';
import { Hero, hero_template } from './components/Hero';
+ import { Images, images_template } from './components/Images';
+ import { Paragraph, paragraph_template } from './components/Paragraph';
import data from './data/data.json';

export default function Home() {
  //...
}

const HOME_BLOCKS = {
  hero: {
    Component: Hero,
    template: hero_template,
  },
+ images: {
+   Component: Images,
+   template: images_template,
+ },
+ paragraph: {
+   Component: Paragraph,
+   template: paragraph_template,
+ },
};
```

- Reference **this tag** to see the completed step.
