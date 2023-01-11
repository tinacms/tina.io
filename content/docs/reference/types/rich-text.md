---
title: The "rich-text" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `rich-text`

Tina's `rich-text` field leverages MDX so you can embed your own structured blocks. To render
a `rich-text` field with React we recommend the `<TinaMarkdown>` component from `tinacms`. See [usage](#usage)
for details.

```ts
type RichTextField = {
  label: string
  name: string
  type: 'rich-text'
  templates: Template[]
}
```

<iframe width="100%" height="700px" src="https://tina-gql-playground.vercel.app/iframe/rich-text" />

```ts
import { defineConfig } from 'tinacms'

export default defineConfig({
  //...
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        // This assumes that you have a /content/post directory
        path: 'content/post',
        fields: [
          // ...
          {
            type: 'rich-text',
            label: 'Body',
            name: 'body',
            isBody: true,
            templates: [
              {
                name: 'Cta',
                label: 'Call to Action',
                fields: [
                  {
                    type: 'string',
                    name: 'heading',
                    label: 'Heading',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
})
```

Given a markdown file like this:

```md
## Hello, world!

This is some text

<Cta heading="Welcome" />
```

Results in the following response from the content API:

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20post(relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20body%0A%20%20%7D%0A%7D%0A" width="800" height="400" />

> Notice the `body` response, it's a structured object instead of a string!

## Using `TinaMarkdown`

The `<TinaMarkdown>` component allows you to control how each element
is rendered. You _must_ provide a component for each template registered
in the `templates` property of your field definition. Note that you can also
control rendering of built-in elements like `<h1>, <a>, <img>`

```ts
type TinaMarkdown = ({
  // The rich-text data returned from the content API
  content: TinaMarkdownContent
  /**
   * Any templates provided in the rich-text field.
   * Optionally, most elements (ex. <a>) can also
   * be overridden
   */
  components?: Components<{}>
}) => JSX.Element
```

```ts
import { TinaMarkdown } from 'tinacms/dist/rich-text'

// The `props` here are based off our custom "Cta" MDX component
const Cta = (props) => {
  return <h2>{props.heading}</h2>
}

export default function MyPage(props) {
  return (
    <div>
      <h1>{props.data.post.title}</h1>
      <TinaMarkdown components={{ Cta }} content={props.data.post.body} />
    </div>
  )
}
```

---

## Caveats

Since markdown and MDX are traditionally handled through some sort of build
step, Tina's approach adds some constraints to make things work as expected.
[Read more](/docs/editing/markdown/) about Tina's approach to handling markdown
and MDX.

### All content must be _serializable_

When we say serializable, we mean that they must not be JavaScript expressions that would need to be executed at any point.

- No support for `import`/`export`
- No support for JavaScript expressions (eg. `const a = 2`, `console.log("Hello")`)

For example:

```md
## Today is {new Date().toLocaleString()}
```

This expression will be ignored, instead register a "Date" `template`:

```md
## Today is <Date />
```

Then you can create a `Date` component which returns `new Date().toLocaleString()` under the hood.

### All JSX must be registered as a `template`

In the above example, if you failed to add the `Cta` _template_ in your schema definition, the JSX element
will be treated as html

---

## Handling markdown

Since markdown is an open-format Tina does it's best to handle the most common syntaxes, but in some scenarios Tina will ignore or automatically alter content:

### Unsupported elements

While most markdown features are supported out of the box, Tina will ignore elements that it cannot handle. We _do not_ expect to support the full [CommonMark](https://commonmark.org/) and
[Github Flavored Markdown](https://github.github.com/gfm/) specs. Be sure to voice your support for various rich-text features by reaching out through one of our [community channels](/community/)!

- Tables
- Footnotes
- Code blocks via indentation (use ` ``` ` instead)
- Strikethrough

### Automatic transforms

For some elements, Tina will automatically transform the values:

**Bold and italic marks**:

```
__Hello__
```

Will be transformed to:

```
**Hello**
```

**Line items**:

```
- Item 1
```

Will be transformed to:

```
* Item 1
```

**Deeply-nested blockquotes and code blocks**:

Some of the more complex nesting patterns you can do with markdown are not supported

```
* > My blockquote
```

Will be transformed to:

```
* My blockquote
```

## Custom shortcode syntax

<div class="short-code-warning">
   <div>
      <p>This is an experimental feature, and the API is subject to change. Have any thoughts? Let us know in the chat, or through one of our <a href="/community/">community channels</a></p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

If you have some custom shortcode logic in your markdown, you can specify it in the `templates` property and Tina will handle it as if it were a `jsx` element:

The following snippet would throw an error while parsing since Tina doesn't know what to do with `{{}}`:

```markdown
{{ WarningCallout content="This is an experimental feature, and the API is subject to change. Have any thoughts? Let us know in the chat, or through one of our [community channels](/community/)!" }}
```

But you can tell Tina how to handle it with a `template`:

```ts
{
  collections: [
    {
      // ...
      fields: [
        {
          type: 'rich-text',
          name: 'body',
          templates: [
            {
              name: 'WarningCallout',
              label: 'WarningCallout',
              match: {
                start: '{{',
                end: '}}',
              },
              fields: [
                {
                  name: 'content',
                  label: 'Content',
                  type: 'string',
                  required: true,
                  ui: {
                    component: 'textarea',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
```

### Raw strings in shortcodes

Certain frameworks support shortcodes with Raw string values:

```
{{<  myshortcode "This is some raw text" >}}
```

This is supported in Tina with the special `_value` field.

```ts
fields: [
  {
    type: 'rich-text',
    name: 'body',
    templates: [
      {
        name: 'myshortcode',
        label: 'myshortcode',
        match: {
          start: '{{',
          end: '}}',
        },
        fields: [
          {
            name: '_value',
            label: 'value',
            type: 'string',
            required: true,
          },
        ],
      },
    ],
  },
]
```

### Nesting content in a shortcode.

Shortcodes can provide a `children` field, which allows content to be nested within a shortcode.

```md
{{% shortcode %}}
What up!
{{% /shortcode %}}
```

### Using shortcode names with dashes.

Sometimes your shortcode will contain characters that aren't supported in Tina's content modelling

```md
{{% my-shortcode %}}
```

You can supply a `name` on the `match` object to handle this.

```ts
fields: [
  {
    type: 'rich-text',
    name: 'body',
    templates: [
      {
        name: 'myshortcode',
        label: 'myshortcode',
        match: {
          start: '{{',
          end: '}}',
          name: 'my-shortcode',
        },
        // ...
      },
    ],
  },
]
```

## Other notes

### Default values

If setting a default value for a rich-text field, you must provide the document AST. See [example here](/docs/schema/#default-value-for-rich-text)
