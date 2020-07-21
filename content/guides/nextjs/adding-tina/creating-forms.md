---
title: Creating Forms
---

After wrapping our App component in the Tina Provider, we can create forms by calling the `useForm` hook inside our Post component. `useForm` returns two values in an array, similar to `React.useState`, which we assign via destructuring:

```js
const [modifiedValues, form] = useForm(formConfig)
```

`modifiedValues` contains the values we provide to the form (inside of `formConfig`) after being modified by the end user. `form` contains the form object created by calling `useForm`, which we'll need in a moment.

To simplify our implementation, we'd like to store `modifiedValues` in the `post` variable so that our layout code can continue to work without modification. Let's rename the incoming `post` variable to `initialPost`, to differentiate it from the `post` values that Tina sends back to us:

```js
export default function Post({ post: initialPost, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !initialPost?.slug) {
    return <ErrorPage statusCode={404} />
  }

  //...
}
```

## Form Configuration

For details on how to configure forms, take a look at our [form configuration docs](/docs/plugins/forms#form-configuration). For the purposes of this guide, we will use the following configuration:

```js
const formConfig = {
  id: initialPost.slug,           // a unique identifier for this instance of the form
  label: 'Blog Post',             // name of the form to appear in the sidebar
  initialValues: initialPost,     // populate the form with starting values
  onSubmit: (values) => {         // do something with the data when the form is submitted
    alert(`Submitting ${values.title}`)
  }
  fields: [                    // define fields to appear in the form
    {
      name: 'title',           // field name maps to the corresponding key in initialValues
      label: 'Post Title',     // label that appears above the field
      component: 'text',       // the component used to handle UI and input to the field
    },
    {
      name: 'rawMarkdownBody', // remember we want `rawMarkdownBody`, not `content` here
      label: 'Content',
      component: 'markdown',   // `component` accepts a predefined components or a custom React component
    },
  ]
}
```

> Note that our `onSubmit` handler is just a stub. How you implement this function will depend on how your content is stored, and will be explored in later guides.

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
    id: initialPost.slug,
    label: 'Blog Post',
    initialValues: initialPost,
    onSubmit: (values) => {
      alert(`Submitting ${values.title}`)
    },
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
    ],
  }
  const [post, form] = useForm(formConfig)

  const [htmlContent, setHtmlContent] = useState(post.content)
  const initialContent = useMemo(() => post.rawMarkdownBody, [])
  useEffect(() => {
    if (initialContent == post.rawMarkdownBody) return
    markdownToHtml(post.rawMarkdownBody).then(setHtmlContent)
  }, [post.rawMarkdownBody])

  return (
    //...
  )
}
```

### Adding the Form to the Sidebar

At this point, the form is all wired up with its field configuration, and our `post` object will send updated values back through our layout rendering code. However, if you've followed along this far, you'll see that the form does not appear in the Tina sidebar.

In order to hook our form into the sidebar, we'll need to call `usePlugin` and pass it our form object:

```diff
  const [post, form] = useForm(formConfig)
+ usePlugin(form)
```

That's it!

> **Why do we need to call usePlugin?**
>
> There are a few different ways to use forms: in the sidebar, in the global utility menu, and [inline](/docs/ui/inline-editing). How you plan to use the form will determine how you should set it up in the CMS.

## More Info

- [Tina Docs: Forms](/docs/plugins/forms)
