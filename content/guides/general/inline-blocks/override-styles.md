---
title: Overriding _InlineBlocks_ styles
---

Our Features List is functional but doesn't look great. This component would be a nice fit for a grid style. This way we could define a set of columns and rows and new `Feature` blocks will populate automatically according to this layout.

If you open up the DOM inspector in your dev tools, you'll see that `InlineBlocks` actually adds a div to the DOM that wraps all the child blocks. In order to style the child blocks in a grid, we need to add styles directly to that `InlineBlocks` div.

We provide a way to override this components styles. We can do that by passing a custom class name, or by defining a new styled-component that _styles_ `InlineBlocks` directly. Let's look at the simple approach first.

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
      <InlineBlocks
        name="features"
        blocks={FEATURE_BLOCKS}
+       direction="row"
+       className="feature-list"
      />
    </BlocksControls>
  );
}

//...
```

This class and its grid styles have already been set up in `styles/features.css`, so if you refresh you should see the new grid layout.

You also may have noticed the new `direction` prop being passed. This controls whether the add block buttons render on the top / bottom or left / right. It also sets a direction for the drag context.

### Same solve, but with styled-components

Here's what it would look like if you wanted to use styled components to implement this:

**components/Hero.js**

```diff
//...

+import styled from 'styled-components';

export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
-     <InlineBlocks
+     <StyledInlineBlocks
        name="features"
        blocks={FEATURE_BLOCKS}
        direction="row"
      />
    </BlocksControls>
  );
}

+const StyledInlineBlocks = styled(InlineBlocks)`
+ padding: 4rem 2rem;
+ display: grid;
+ grid-template-columns: 1fr 1fr 1fr;
+ grid-gap: 2rem;
+ grid-template-rows: auto;
+`;

//...
```
