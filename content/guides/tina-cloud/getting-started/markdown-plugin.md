---
title: Adding Markdown editors
last_edited: '2021-07-19T15:36:36.046Z'
---

## Using Markdown plugins:

One of the amazing features of Tina is ability to extend the project through plugins. The NextJS blog starter uses remark to render the Markdown files into HTML, so it would be useful for our content team to be able to edit using a markdown editor, plus we can add the functionality back.

## Adding a plugin

Plugins with Tina are added in three steps:

1. Install the packages you want to use.
2. Tell Tina you want to use it.
3. Implement the code where you want.

### Adding the plugin packages

Lets first add the two new packages we want to use for Markdown plugin:

```bash,copy
yarn add react-tinacms-editor react-tinacms-inline react-final-form final-form
```

### Adding our plugin to the site

Inside the `pages/_app.js` file we need to import the `MarkdownFieldPlugin` and add it to the CMS callback:

```jsx
import '../styles/index.css'
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

// Import the plugin
import { MarkdownFieldPlugin } from 'react-tinacms-editor'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            // ...
            // Add it to the cms instance
            cmsCallback={cms => {
              cms.plugins.add(MarkdownFieldPlugin)
            }}
            {...pageProps}
          >
            {livePageProps => <Component {...livePageProps} />}
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  )
}

export default App
```

The plugin is now available anywhere we want to use our markdown editor.

### Using the `ui` property

The `ui` property allows you to control the output of the GraphQL-generated forms where your content editors are working. Let's update the `body` field in our schema to take advantage of our new Markdown plugin:

```js
// .tina/schema.ts
{
  type: 'string',
  label: 'Body',
  name: 'body',
  isBody: true,
  ui: {
    component: 'markdown'
  }
}
```

### A quick test

If you check the Next Starter now and enter edit mode, you will see the body now has Markdown options to make editing easier:

![Markdown Gif](/gif/markdown.gif)

The problem is we are delivering the content directly, so we lose all formatting on our rendered page.

### Markdown to HTML

Inside of the Post function we need to add `useEffect` and also `useState`, to render the Markdown as HTML.

Firstly we need to import `useEffect` and `useState` to the file:

```js
import { useEffect, useState } from 'react'
```

Then we can create variable called `content` that we can be used with `useState()`.

```js
const [content, setContent] = useState('')
```

Now we can use `useEffect` to set content to the results of `markdownToHtml`

```js,copy
useEffect(() => {
  const parseMarkdown = async () => {
    setContent(await markdownToHtml(body))
  }

  parseMarkdown()
}, [body])
```

Then finally we can set the `PostBody` content to our nearly updated content.

```js
<PostBody content={content} />
```

Now our content should be correctly formatted, and even when your content team is updated they will see it in real time.

![Markdown Done Gif](/gif/markdown-fin_sm.gif)
