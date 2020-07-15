---
title: Github Delete Action
id: /docs/nextjs/create-github-delete-action
prev: /docs/nextjs/next-tinacms-markdown
next: /docs/gatsby/quickstart
consumes:
  - file:
    details:
---

This is a delete action for [the github client](<LINK TO GITHUB CLIENT DOCS?>).

![]()

## Options

```ts
interface options {
  getTitle?: (form: Form) => string
  getFilePath?: (form: Form) => string
}
```

| Option      | Description                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| getTitle    | This function takes in the form as its parameter and returns the title that will displayed in the delete action _(Optional)_                      |
| getFilePath | This function takes in the form as its parameter and returns the github file path that will be used when deleting the file in github _(Optional)_ |

## Example

```js
import { CreateGithubDeleteAction } from 'tinacms-react-github'
//...

const deleteAction = CreateGithubDeleteAction()
const formOptions = {
  label: 'Edit blog post',
  actions: [deleteAction],
  //...
}
```

Or if you want to change the title displayed in the modal

```js
import { CreateGithubDeleteAction } from 'tinacms-react-github'
//...

const deleteAction = CreateGithubDeleteAction({
    getTitle: (form)=>{
        return form.values.frontmatter.title
    },
})
const formOptions = {
   label: "Edit blog post",
   actions: [deleteAction],
   fields: [
     {
       name: "frontmatter.title",
       label: "Title",
       component: "text",
     },
     //...
}
```
