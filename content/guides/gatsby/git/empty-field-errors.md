---
title: Avoiding Errors Caused by Empty Fields
---

If a value is empty from a source file, for example an empty string, Tina will delete the entire key-value pair from the file. This will cause Gatsby to throw a GraphQL error, since it's trying to query a field that doesn't exist. If you're editing in Tina and you completely delete the text from a field, you may see this error.

This may not be a problem if you have a query that is running over numerous files with a similar data shape. Let's say you have a collection of recipes, and they all have the same frontmatter data. The recipe pages are generated from a template where this query lives. If a key-value pair gets deleted from one recipe file, the query will still run since there are other files that still have the populated value.

However, if you have a single source file for a page, you will run into issues because this is the only instance of the data shape. If the value is deleted, then GraphQL doesn't know what field it's querying.

To work around this, we need to create either a dummy file or manually override the parse value in the field object by passing in an empty string.

### Option 1: Override the parse value

```js
/*
** Override the parse value
** in the field definition object
*/

fields: [
  {
    label: "Favorite Food",
    name: "frontmatter.fav_food",
    component: "text",
    // If there's no value, return empty string
    parse(value) {
      return value || ""
    },
  },...
]
```

This option will provide an empty string if no value exists, so the frontmatter key/value pair will not get fully deleted from the source file.

### Option 2: Creating a Dummy File

This second option involves **creating a dummy source file** with the same shape of data in your real source files, but filled with dummy values. This works best when you're using a template to generate numerous pages.

> Check-out this approach implemented in Tina Grande: the [dummy file](https://github.com/tinacms/tina-starter-grande/blob/master/content/pages/dummy.json), the [other content files files](https://github.com/tinacms/tina-starter-grande/tree/master/content/pages), and the [query](https://github.com/tinacms/tina-starter-grande/blob/master/src/templates/page.js#L136).
