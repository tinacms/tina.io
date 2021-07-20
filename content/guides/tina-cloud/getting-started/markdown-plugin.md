---
title: Adding Markdown editors
last_edited: '2021-07-19T15:36:36.046Z'
---



## Using Markdown plugins:

One of the amazing features of Tina is ability to extend the project through plugins. The NextJS blog starter uses remark to render the Markdown files into HTML, so it would be useful for our content team to be able to edit using a markdown editor, plus we can add the functionality back. 


## Adding a plugin

Plugins with tina are added in three steps:

1. Install the packages you want to use.
2. Tell Tina you want to use it.
3. Implement the code where you want. 


### Adding the plugin packages

Lets first add the two new packages we want to use for Markdown plugin: 

```bash, copy
    yarn add react-tinacms-editor react-tinacms-inline
```

### Adding our plugin to the site

Inside the `tina-wrapper` file found at `/components/tina-wrapper` we need to import the `MarkdownFieldPlugin` and `useCMS`

```js
import { MarkdownFieldPlugin } from "react-tinacms-editor"
import { useCMS } from "tinacms"
```

Then inside our Inner function we can add the plugin

```js
const Inner = (props) => {  
  const cms = useCMS();
  cms.plugins.add(MarkdownFieldPlugin);
  ...
```

The plugin is now avaialbe anywhere we want to use our markdown editor.

### Using formify

Formify is allows you to control the output of the GraphqlForms where you content editors are working. We want to look for a specific field named `_body` and make sure our editor displays the markdown editor. 

To handle this, we will add some additonal code to our `useGraphqlForms` in the same function. Currently it looks like the following:

```js
const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
  });
```

We can add under the variables formify and look for our field named `_body`: 

```js
formify: ({ createForm, formConfig }) => {
      formConfig.fields?.forEach(field => {
        //use markdown plugin with _body field
        if (field.name === '_body') {
          field.component = 'markdown'
        }
      })
      return createForm(formConfig)
    },
```
We are taking the formConfig, which contains all the fields of a particular query. Then creating a new form with the configuration change. 

### A quick test 

If you check the Next Starter now and enter edit mode, you will see the body now has Markdown options to make editing easier: 

![Markdown Gif](/gif/markdown.gif)

The problem is we are delivering the content directly, so lose all formatting. 


### Markdown to HTML

Inside of the Post function we need to add `useEffect` and also `useState`, to render the Markdown as HTML.

Firstly we need to import `useEffect` and `useState` to the file: 

```js
import {useEffect,useState} from "react";
```

Then we can create variable called `content` that we can be used with `useState()`. 

```js
const [content, setContent] = useState('')
```

Now we can use `useEffect` to set content to the results of `markdownToHtml` 

```js,copy
useEffect(() => {
    const parseMarkdown = async () => {
      setContent(await markdownToHtml(_body))
    }

    parseMarkdown()
  }, [_body]);
```

Then finally we can set the `PostBody` content to our nearly updated content. 

```js
<PostBody content={content} />
```

Now our content should be correctly formatted, and even when your content team is updated they will see it in real time. 

![Markdown Done Gif](/gif/markdown-fin.gif)