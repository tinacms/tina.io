Hello! and thanks for bootstrapping a Tina App! Before you do anything click on "toggle edit state" button and a pencil icon in the bottom left hand corner will appear. You can now edit this content in real time! Click save and notice that you have update the Hello world blog post in the local file system.

## Next steps

### Wrap your App in "Edit State"

**NOTE:** If you bootstrapped this application with the CLI it probably took care of this for you and you can skip to the [Make a page editable](#make-a-page-editable) Step.

To do this add the following to your pages/\_app.js. (or create this file if it is not present in your project)

**\_app.js**

```tsx,copy
import dynamic from 'next/dynamic'

import { EditProvider, setEditing, useEditState } from 'tina-graphql-gateway'

// InnerApp that handles rendering edit mode or not
function InnerApp({ Component, pageProps }) {
  const { edit } = useEditState()
  if (edit) {
    // Dynamically load Tina only when in edit mode so it does not affect production
    // see https://nextjs.org/docs/advanced-features/dynamic-import#basic-usage
    const TinaWrapper = dynamic(() => import('../components/tina-wrapper'))
    return (
      <>
        <TinaWrapper {...pageProps}>
          {props => <Component {...props} />}
        </TinaWrapper>
      </>
    )
  }
  return <Component {...pageProps} />
}

// Our app is wrapped with edit provider
function App(props) {
  return (
    <EditProvider>
      <ToggleButton />
      <InnerApp {...props} />
    </EditProvider>
  )
}
const ToggleButton = () => {
  const { edit, setEdit } = useEditState()
  return (
    <button
      onClick={() => {
        setEdit(!edit)
      }}
    >
      Toggle Edit State
    </button>
  )
}

export default App
```

Please restart your dev server (CTR + C and yarn dev) and now you will have access to the `useEditState` hook anywhere in your app. You will also notice that we are lazy loading the tina-wrapper component. This is so that no Tina code will load in your production bundle.

Next you can delete the editProvider and TinaWrapper from 'pages/demo/blog/[filename].ts' by deleting the default export and adding

```tsx
export default BlogPage
```

### Make a page editable

To make a page editable we need to do three things

1.  Update our schema.ts
2.  Update our query
3.  Update our code

#### Update schema.ts

let's update our schema.ts to include product listings. We will do so by adding a "pages collection" with a product listing template. When adding to our existing blog collection it looks like this. We also need a place to store the authors in the file system. So let's create a folder `content/pages`.

```tsx,copy
import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Pages',
      name: 'pages',
      path: 'content/pages',
      templates: [
        {
          label: 'Product listing page',
          name: 'product',
          fields: [
            {
              type: 'group-list',
              label: 'Products',
              name: 'products',
              fields: [
                {
                  type: 'text',
                  label: 'Item ID',
                  name: 'id',
                },
                {
                  type: 'textarea',
                  label: 'Description',
                  name: 'description',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      templates: [
        {
          label: 'Article',
          name: 'article',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
          ],
        },
      ],
    },
  ],
})
```

let's also create a file to query. In the folder we just created (`content/pages`) add a file called `product-listing.md`

```md
---
_template: product
---
```

#### Make a new Next.js page and a graphql Query

Start by making a new file called `pages/product-listing.tsx` that contains the following

```tsx,copy
import { LocalClient } from 'tina-graphql-gateway'
import { Pages_Document } from '../.tina/__generated__/types'
import { AsyncReturnType } from './demo/blog/[filename]'

const ProductListingPage = (
  props: AsyncReturnType<typeof getStaticProps>['props']
) => {
  console.log(props)
  return (
    <div>
      <ol>
        {props.data.getPagesDocument?.data?.products?.map(product => (
          <li key={product.id}>
            id: {product.id}, description: {product.description}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default ProductListingPage

const query = `#graphql
query ProuctPageQuery {
  getPagesDocument(relativePath: "content/pages/product-listing.md"){
    data {
      __typename ... on  Product_Doc_Data{
        products {
          id
          description
        }
      }
    }
  }
}
`
const client = new LocalClient()

export const getStaticProps = async () => {
  return {
    props: {
      data: await client.request<{ getPagesDocument: Pages_Document }>(query, {
        variables: {},
      }),
      variables: {},
      query,
    },
  }
}
```

We are doing a couple of things here. A graphql query was written that looks for the `content/pages/product-listing.md` file

The query is being statically exported so it can be accessed by the TinaWrapper.

The code was updated to display the list of products.

Visit [http://localhost:3000/product-listing](http://localhost:3000/product-listing)to see what you just created. Click the "edit this site" button in the top to edit.

#### Tina Cloud

To hook up this demo to Tina Cloud and save content to Github instead of the file system you can do the following.

1.  Register at https://app.tina.io
2.  Update .env file to include:

```
NEXT_PUBLIC_TINA_CLIENT_ID= get this from the app you create at app.tina.io
NEXT_PUBLIC_USE_LOCAL_CLIENT=0
```
