---
title: Creating Forms
---

After wrapping our App component in the Tina Provider, we can create forms by calling the `useForm` hook inside our Post component. `useForm` returns two values in an array, kinda like `React.useState`, which we assign via destructuring:

```js
const [modifiedValues, form] = useForm(formConfig)
```

`modifiedValues` contains the values we provide to the form (inside of `formConfig`) after being modified by the end user. `form` contains the form object created by calling `useForm`, which we'll need in a moment.

## Form Configuration

For details on how to configure forms, take a look at our [form configuration docs](/docs/forms#form-configuration). For the purposes of this guide, we will use the following configuration:

```js
const formConfig = {
  id: post.slug,          // a unique identifer for this instance of the form
  label: 'Blog Post',     // name of the form to appear in the sidebar
  initialValues: post,    // populate the form with starting values
  onSubmit: (values) => { // do something with the data when the form is submitted
    alert(`Submitting ${values.title}`)
  }
  fields: [               // define fields to appear in the form
    {
      name: 'title',        // field name maps to the corresponding key in initialValues
      label: 'Post Title',  // label that appears above the field
      component: 'text',    // the component used to handle UI and input to the field
    },
    {
      name: 'rawMarkdownBody', // remember we want `rawMarkdownBody`, not `content` here
      label: 'Content',
      component: 'markdown',  // `component` accepts a predefined components or a custom React component
    },
  ]
}
```

## Adding the Form to the Post Component

First, we'll need to import `useForm` and `usePlugin` from the `tinacms` package:

```js
import { useForm, usePlugin } from 'tinacms'
```

Now, just add the form to the `Post` component with the configuration we laid out previously:

```js
export default function Post({ post, morePosts, preview }) {
  //...

  const formConfig = {
    id: post.slug,
    label: 'Blog Post',
    initialValues: post,
    onSubmit: (values) => {
      alert(`Submitting ${values.title}`)
    }
    fields: [
      {
        name: 'title',
        label: 'Post Title',
        component: 'text',
      },
      {
        name: 'rawMarkdownBody',
        label: 'Content',
        component: 'markdown',
      },
    ]
  }

  let form
  ;[post, form] = useForm(formConfig)

  const [htmlContent, setHtmlContent] = useState(post.content)
  useEffect(() => {
    ;(async () => {
      const markdownHtml = await markdownToHtml(post.rawMarkdownBody)
      setHtmlContent(markdownHtml)
    })()
  }, [post.rawMarkdownBody])

  return (
    //...
  )
}
```

> If these two lines look awkward to you:
>
> ```js
> let form
> ;[post, form] = useForm(formConfig)
> ```
>
> We're just doing that so we can reassign the modified `post` values back into the original `post` object provided by `getInitialProps`. The only reason we do it here is for the sake of brevity, to avoid having to replace references to `post` in our layout code. If you prefer a "cleaner" approach where you assign the modified values into a new variable, that is perfectly acceptable:
>
> ```js
> const [modifiedPost, form] = useForm(formConfig)
> //...
> return (
>   //...
>   <title>{modifiedPost.title}</title>
>   //...
> )
> ```

### Adding the Form to the Sidebar

At this point, the form is all wired up with its field configuration, and our `post` object will send updated values back through our layout rendering code. However, if you've followed along this far, you'll see that the form does not appear in the Tina sidebar.

In order to hook our form into the sidebar, we'll need to call `usePlugin` and pass it our form object:

```diff
  let form
  ;[post, form] = useForm(formConfig)
+ usePlugin(form)
```

That's it!

> **Why do we need to call usePlugin?**
>
> There are a few different ways to use forms: in the sidebar, in the global utility menu, and [inline](/docs/inline-editing). How you plan to use the form will determine how you should set it up in the CMS.

## More Info

- [Tina Docs: Forms](/docs/forms)
