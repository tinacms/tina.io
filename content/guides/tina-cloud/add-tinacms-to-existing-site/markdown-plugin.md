---
title: Adding Markdown editors
last_edited: '2021-08-13T18:34:29.221Z'
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
yarn add react-tinacms-editor
```

### Adding our plugin to the site

Inside the `pages/_app.js` file we need to import the `MarkdownFieldPlugin` and add it to the CMS callback:

```diff
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import '../styles/index.css'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })
const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
            branch={process.env.NEXT_PUBLIC_EDIT_BRACH}
            organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
            isLocalClient={Boolean(
              Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true)
            )}
+            cmsCallback={cms => {
+                import('react-tinacms-editor').then((field)=>{
+                  cms.plugins.add(field.MarkdownFieldPlugin)
+                  })
+            }}
            {...pageProps}
          >
            {(livePageProps) => <Component {...livePageProps} />}
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

The `ui` property allows you to control the output of the GraphQL-generated forms where your content editors are working. Let's update the `body` field in our `.tina/schema.ts` to take advantage of our new Markdown plugin:

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

Restart your application by shutting it down and running `yarn tina-dev` and enter edit mode, you will see the body now has Markdown options to make editing easier:

![Markdown Gif](/gif/markdown.gif)

The problem is we are delivering the content directly, so we lose all formatting on our rendered page.

### Markdown to HTML

We need to update the `/post/[slug].js` file to use use the `markdownToHtml` function that the team over at Next.js prove, the problem is each time we update the file we want it to use that function. To handle this we can use `useEffect` and `useState`.

Firstly we need to import `useEffect` and `useState`, add the following to the file:

```js, copy
import { useEffect, useState } from 'react'
```

Then we can create variable called `content` that we can be used with `useState`.

```diff
export default function Post({data,slug}) {
  const {
    title,
    coverImage,
    date,
    author,
    body,
    ogImage,
  } = data.getPostsDocument.data
  const router = useRouter()
+  const [content, setContent] = useState('')
```

Now we can use `useEffect` to set content to the results of `markdownToHtml`

```diff
export default function Post({data,slug}) {
  const {
    title,
    coverImage,
    date,
    author,
    body,
    ogImage,
  } = data.getPostsDocument.data
  const router = useRouter()
  const [content, setContent] = useState('')
+ useEffect(() => {
+  const parseMarkdown = async () => {
+    setContent(await markdownToHtml(body))
+  }

+  parseMarkdown()
+ }, [body])
```

Then finally we can set the `PostBody` content to our nearly updated content.

```js
<PostBody content={content} />
```

The completed file should look like:

```js,copy
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { staticRequest } from 'tinacms'
import { useEffect, useState } from 'react'

export default function Post({ data, slug, preview }) {
  const {
    title,
    coverImage,
    date,
    author,
    body,
    ogImage,
  } = data.getPostsDocument.data
  const router = useRouter()
  const [content, setContent] = useState('')

  useEffect(() => {
    const parseMarkdown = async () => {
      setContent(await markdownToHtml(body))
    }
    parseMarkdown()
  }, [body])
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={ogImage.url} />
              </Head>
              <PostHeader
                title={title}
                coverImage={coverImage}
                date={date}
                author={author}
              />
              <PostBody content={content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const variables = { relativePath: `${slug}.md` }

  const query = `
      query BlogPostQuery($relativePath: String!) {
        getPostsDocument(relativePath: $relativePath) {
          data {
            title
            excerpt
            date
            coverImage
            author {
              name
              picture
            }
            ogImage {
              url
            }
            body
          }
        }
      }
    `

  let data = {}
  try {
    data = await staticRequest({
      query,
      variables,
    })
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      query,
      variables,
      data,
      slug,
    },
  }
}

export async function getStaticPaths() {
  const postsListData = await staticRequest({
    query: `
    query {
      getPostsList {
        edges {
          node {
            sys {
              filename
            }
          }
        }
      }
    }
    `,
    variables: {},
  })
  return {
    paths: postsListData.getPostsList.edges.map(edge => ({
      params: { slug: edge.node.sys.filename },
    })),
    fallback: false,
  }
}
```

Now our content should be correctly formatted, and even when your content team is updated they will see it in real time.

![Markdown Done Gif](/gif/markdown-fin_sm.gif)
