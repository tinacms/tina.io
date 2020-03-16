# TinaCMS.org

Source code for the tinacms.org website.

## Shortcodes

This site supports shortcodes in Markdown content via [remark-shortcodes](https://github.com/djm/remark-shortcodes).

Shortcodes must be written as React components. To add a shortcode, export it from `utils/shortcodes.tsx`.

```jsx
export function MyShortcode({ textContent }) {
  return <div>{textContent}</div>
}
```

Call the shortcode in your content by writing the name of the component encased in double curly braces. Key-value pairs included in the shortcode will be passed to your component as props.

```
{{ MyShortcode textContent="Example shortcode" }}
```

### Shortcode Limitations

Shortcodes must be standalone elements; "wrapping" shortcodes will not work.
