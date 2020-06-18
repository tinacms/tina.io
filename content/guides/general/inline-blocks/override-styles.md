---
title: Override Inline Blocks Styles
---

Our _Features List_ is functional but it could benefit from better layout styles. This component is a great example for a [grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). With _CSS Grid_, we can define a set of columns / rows and new `Feature` blocks will populate automatically according to the layout.

If you open up the [Page Inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector) in your dev tools, you'll see that `InlineBlocks` actually adds a div to the DOM that wraps all the child blocks. In order to style the child blocks in a grid, we need to directly style that `InlineBlocks` div.

Luckily, Tina provides a way to override this components styles. We can do this by passing a custom class name, or by [defining a new styled-component](https://tinacms.org/docs/inline-editing#extending-inline-field-styles) that _styles_ `InlineBlocks`.

Let's look at the simple approach first:

## Override styles via className

**components/Features.js**

```diff
//...

export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="wrapper">
        <InlineBlocks
          name="features"
          blocks={FEATURE_BLOCKS}
+         direction="horizontal"
+         className="feature-list"
        />
      </div>
    </BlocksControls>
  );
}

//...
```

This class and its grid styles have already been set up in `styles/features.css`, so if you refresh you should see the new grid layout.

![photo of features list with grid?]()

You also may have noticed the new `direction` prop being passed. This controls whether the add block buttons render on the top / bottom or left / right. It also sets a direction for the [drag context](https://github.com/atlassian/react-beautiful-dnd#api-%EF%B8%8F).

## Same solve, but with styled-components

Here's what it would look like if you wanted to use [styled components](https://styled-components.com/) to implement this:

**components/FeaturesList.js**

```js
//...

import styled from 'styled-components'

export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="wrapper">
        <StyledInlineBlocks
          name="features"
          blocks={FEATURE_BLOCKS}
          direction="row"
        />
      </div>
    </BlocksControls>
  )
}

// Define a new 'styled' version of InlineBlocks
const StyledInlineBlocks = styled(InlineBlocks)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;
`

//...
```
