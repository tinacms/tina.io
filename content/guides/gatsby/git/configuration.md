---
title: Configure Content Creation
---

When creating new files, you may want to populate those files with default data, or have the user input data to help configure how that file is created.

## Customizing the Create Form

`RemarkCreatorPlugin` & `JsonCreatorPlugin` accept a `fields` option. When using a custom create form, all callback functions will receive an object containing all form data.

One example of how to use this option could be that every new blog post needs a title, date & author to be created. So you could make fields to capture those values. The example below shows how you can capture data to format the path of where the new file is created in the content directory.

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

`RemarkCreatorPlugin` & `JsonCreatorPlugin` must be given a `filename` function that calculates the path of the new file from the form data.

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

`RemarkCreatorPlugin` can be given a `frontmatter` function that returns the default front matter. Like the `filename` function, `frontmatter` receives the state of the form.

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

`RemarkCreatorPlugin` can also be given a `body` function that returns the default Markdown body. Like the previous two functions, `body` receives the state of the form.

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

## Providing Default JSON Data

Similarly to `RemarkCreatorPlugin`, the `JsonCreatorPlugin` accepts a `data` function that returns default data for a new file. The `data` function also receives the state of the form.

**Example**

```js
const CreatePagePlugin = new JsonCreatorPlugin({
  label: 'Create Page',
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
  ],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()

    return `content/${slug}.json`
  },
  data: form => { "title": `${form.title}` },
})
```
