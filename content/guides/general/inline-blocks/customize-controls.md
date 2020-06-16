---
title: Customize controls
---

## Step 9 - Adjust focus ring & inset

The blocks controls accept extra config so you can precisely control how the controls render and behave. `insetControls` and `focusRing` are the two we will configure.

![image before controls are configured]()

```tsx
interface BlocksControlsProps {
  children: any
  index: number
  insetControls?: boolean
  focusRing?:
    | false
    | {
        offset?: number | { x: number; y: number }
        borderRadius?: number
      }
}
```

> **Tip**: The offset values render in _pixels_.

Right now the focus ring is bleeding off the page. First, we'll adjust the offset; this is the amount of distance between the edge of the block element and where the 'ring' displays. Since this component is 'page-width', we'll also _inset_ the controls to render within the block area. This way if the block renders at the very top of the page, the controls don't get cut off.

**components/Hero.js**

```diff
export function Hero({index) {
  return (
    <BlocksControls
      index={index}
+     focusRing={{ offset: 0 }}
+     insetControls={true}
    >
      <div className="hero">
        <h1>
-         <InlineText name="headline" />
+         <InlineText name="headline" focusRing={false} />
        </h1>
        <p>
-	  <InlineTextarea name="subtext" />
+         <InlineTextarea name="subtext" focusRing={false} />
        </p>
      </div>
    </BlocksControls>
  );
}
```

![image after controls are configured]()

Notice how we added `focusRing={false}` to the Inline Fields. This is totally up to your preference whether you want the child fields to render their focus ring. For this demo, we chose to hide them for a cleaner aesthetic.

> **Tip:** If you wanted to have even more control over the focus ring `offset`, you could pass in specific x & y values — `focusRing={{ offset: { 'x': 10, 'y': 16 } }}`
