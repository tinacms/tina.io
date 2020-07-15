---
title: Configure How Content Is Created
---

## Customizing the Create Form

`RemarkCreatorPlugin` accepts a `fields` option, similar to [Remark Form](/docs/gatsby/markdown#creating-remark-forms). When using a custom create form, all callback functions will receive an object containing all form data.

**Example: Create Posts in Subdirectories**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'section', label: 'Section', component: 'text', required: true },
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    return `content/blog/${form.section}/${form.title}/index.md`
  },
})
```

## Formatting the filename & path

The `RemarkCreatorPlugin` must be given a `filename` function that calculates the path of the new file from the form data.

**Example 1: Hardcoded Content Directory**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => `content/blog/${form.title}.md`,
})
```

**Example 2: Content as index files**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => `content/blog/${form.title}/index.md`,
})
```

**Example 3: Slugify Name**

> The [`slugify`](https://www.npmjs.com/package/slugify) package is also great for this usecase.

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
})
```

## Providing Default Front Matter

The `RemarkCreatorPlugin` function can be given a `frontmatter` function that returns the default front matter. Like the `filename` function, `frontmatter` receives the state of the form.

**Example: Title + Date**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  frontmatter: form => ({
    title: form.title,
    date: new Date(),
  }),
})
```

## Providing a Default Body

The `RemarkCreatorPlugin` function can be given a `body` function that returns the default Markdown body. Like the previous two functions, `body` receives the state of the form.

**Example: Title + Date**

```javascript
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/blog/${slug}/index.md`
  },
  body: form => `This is a new blog post. Please write some content.`,
})
```
