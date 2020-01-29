---
title: Inline Editing
id: inline-editing
prev: /docs/gatsby/custom-fields
next: null
consumes:
  - file: /packages/gatsby-tinacms-remark/src/remarkFormHoc.tsx
    details: Depends on remarkForm & liveRemarkForm hoc in example
  - file: /packages/gatsby-tinacms-remark/src/useRemarkForm.tsx
    details: HOC examples depends on useLocalRemarkForm hook
  - file: /packages/@tinacms/fields/src/Wysiwyg/Wysiwyg.tsx
    details: TinaField uses Wysiwyg component for inline editing
  - file: /packages/@tinacms/form-builder/src/Form.tsx
    details: Depends on TinaField accepting compponent & name, shows example
---

**Inline editing** refers to the ability to edit content directly on your site's page, as opposed to editing within the CMS sidebar.

## Enabling Inline Editing for Remark Content

Creating an inline editing experience for Remark content only requires a few extra steps. Note that users will still be able to edit via the sidebar when inline editing is configured.

### 1. Replace remarkForm with liveRemarkForm

If you followed the [editing markdown in Gatsby](/docs/gatsby/markdown#editing-markdown-content) guide, you used the `remarkForm` function to attach the CMS to your page template. Once you've added some inline fields into your template, all you have to do is replace the call to `remarkForm` with a call to `liveRemarkForm`

**Before**

```jsx
import { remarkForm } from 'gatsby-tinacms-remark'

const Template = ({ data }) => (
  <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
)

export default remarkForm(Template)
```

**After**

```jsx
import { liveRemarkForm } from 'gatsby-tinacms-remark'

const Template = ({ data }) => (
  <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
)

export default liveRemarkForm(Template)
```

### 2. Add Inline Fields

To facilitate inline editing, you will need to add fields into your layout using the `TinaField` component. The `TinaField`component should wrap the HTML that outputs the contents of the field it edits. When **editing mode** is activated, the content will become editable.

In the following example, we wrap the `section` that renders the Markdown content in a `TinaField that uses the Wysiwyg` component. Note that the field being edited by `TinaField` does **not** have to be the same as the field being rendered in its child components.

**Before**

```jsx
import { liveRemarkForm } from 'gatsby-tinacms-remark'

const Template = ({ data }) => (
  <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
)

export default liveRemarkForm(Template)
```

**After**

```jsx
import { liveRemarkForm } from 'gatsby-tinacms-remark'
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'

const Template = ({ data }) => (
  <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
    <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
  </TinaField>
)

export default liveRemarkForm(Template)
```

### 3. Trigger Edit Mode

When your template is processed through the `liveRemarkForm` function, it will have the properties `isEditing` and `setIsEditing` that you can use to create a trigger for activating inline editing mode.

```jsx
import { liveRemarkForm } from 'gatsby-tinacms-remark'
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'

const Template = ({ data, isEditing, setIsEditing }) => (
  <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
    <section class="content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></section>
    <button onClick={() => setIsEditing(p => !p)}>{isEditing ? 'Preview' : 'Edit'}</button>
  </TinaField>
)

export default liveRemarkForm(Template)
```

For the time being, users will still need to open the CMS sidebar in order to save.
