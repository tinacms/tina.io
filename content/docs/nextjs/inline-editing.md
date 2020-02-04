---
title: Inline Editing
id: /docs/nextjs/inline-editing
prev: /docs/nextjs/creating-forms
next: /docs/contributing/guidelines
consumes:
  - file: /packages/@tinacms/react-core/src/use-form.ts
    details: Demonstrates using useLocalForm on a Next.js site
  - file: /packages/@tinacms/react-core/src/use-watch-form-values.ts
    details: Demonstrates usage of useWatchFormValues
  - file: /packages/react-tinacms/src/index.ts
    details: Imports useLocalForm and useWatchFormValues from react-tinacms metapackage
---

**Inline editing** refers to the ability to edit content directly on your site's page, as opposed to editing within the CMS sidebar.

## Adding Inline Editing with _inlineJsonForm_

The `inlineJsonForm` [higher-order component](https://reactjs.org/docs/higher-order-components.html) (HOC) let's us register inline forms. It can be used with both functional and class components.

### 1. Configure _inlineJsonForm_

The following example demostrates the first steps to adding inline editing to a component in Next.js:

**Example: /pages/index.js**

```js
/*
 ** 1. Import the `inlineJsonForm` HOC
 */
import { inlineJsonForm } from 'next-tinacms-json'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'

function Index({ jsonFile }) {
  const data = jsonFile.data
  return (
    <Layout>
      <section>
        <ReactMarkdown>{data.body}</ReactMarkdown>
      </section>
    </Layout>
  )
}

const formOptions = {
  label: 'Index Page',
  fields: [
    //...
  ],
}

/*
 ** 2. Wrap your component with `inlineJsonForm`,
 **    pass in optional form field config object
 **    and declare a new variable to hold the
 **    returned component
 */
const EditableIndex = inlineJsonForm(Index, formOptions)

/*
 ** 3. Export the 'editable' version of the
 **    original component
 */
export default EditableIndex

/*
 ** 4. Call `getInitialProps` on the 'editable' component
 */
EditableIndex.getInitialProps = async function() {
  const indexData = await import(`../data/index.json`)
  return {
    /*
     ** 5. Restructure your return data so the necessary
     **    Tina data is contained in an object titled
     **    `jsonFile`
     */
    jsonFile: {
      fileRelativePath: `data/index.json`,
      data: indexData.default,
    },
  }
}
```

`inlineJsonForm` expects the return data from `getInitialProps` to match the following interface:

```js
// A datastructure representing a JSON file stored in Git
interface JsonFile<T = any> {
  fileRelativePath: string
  data: T
}
```

> **Tip:** It's important that the return object for data that will be edited by Tina is named `jsonFile`.

### 2. Add Tina Fields

At this point the the inline form should be registered with the cms. In the next step, you'll need to add [fields](http://localhost:8000/docs/concepts/fields/) into your layout using the `TinaField` component. The `TinaField` component should wrap the HTML that outputs the contents of the field it edits. When editing mode is activated, the content will become editable.

In the following example, we wrap the section that renders the Markdown content in a `TinaField` that uses the `Wysiwyg` component. The `Wysiwyg` component only renders when _editing mode_ is triggered. This provides a field interface for editing on the page. When _editing mode_ is off, the child component will render as normal.

```jsx
import { inlineJsonForm } from 'next-tinacms-json'
import ReactMarkdown from 'react-markdown'

// 1. Import `TinaField`, along with any inline fields
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'

function Index({ jsonFile }) {
  const data = jsonFile.data
  return (
    <Layout>
      <section>
        {/*
         *** 2. Wrap the component that renders
         ***    the editable data with `TinaField`
         */}
        <TinaField name="body" Component={Wysiwyg}>
          <ReactMarkdown>{data.body}</ReactMarkdown>
        </TinaField>
      </section>
    </Layout>
  )
}
```

`TinaField` is a higher-order component that accepts similar props as other [fields](https://tinacms.org/docs/concepts/fields#field-definition).

```ts
interface TinaFieldsProps {
  name: string
  type?: string
  Component: any
  children: any
}
```

- `name`: The key for the value we want to edit from the content source.
- `type`: _Optional_ — Specifies a field plugin type.
- `Component`: Either a React component that renders the field or a string containing the ID of a [built-in](https://tinacms.org/docs/concepts/fields#field-types) or [custom](https://tinacms.org/docs/fields/custom-fields) field plugin.
- `children`: The child component or element that renders the editable content.

### 3. Enable Edit Mode

The last step to enable inline editing is to create a way for the editor to _toggle editing states_.

When your component is processed through `inlineJsonForm`, it receives properties to facilitate this: `isEditing` and `setIsEditing`. You can create a button to handle toggling states and add it to your component.

```jsx
/*
 ** 1. Destructure the editing state props
 */
function Index({ jsonFile, setIsEditing, isEditing }) {
  const data = jsonFile.data
  return (
    <Layout>
      <section>
        <TinaField name="body" Component={Wysiwyg}>
          <ReactMarkdown>{data.body}</ReactMarkdown>
        </TinaField>
        {/*
         *** 2. Add a button that toggles
         ***    editing states
         */}
        <button onClick={() => setIsEditing(p => !p)}>
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      </section>
    </Layout>
  )
}
```
