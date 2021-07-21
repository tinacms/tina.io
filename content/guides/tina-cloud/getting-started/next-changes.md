---
title: NextJS Starter Changes
last_edited: '2021-07-19T15:36:36.046Z'
---


## Creating the getStaticPaths query

The `getStaticPaths` query is going to need to know where all of our markdown files are located, with our current schema you have the option to `getPostsList` which will provide a list of all posts in our `_posts` folder. Make sure your local server is running and navigate to https://localhost:4001/altair and select the Docs button. The Docs button gives you the ability to see all the queries possible and the variables returned:


![Altair Doc example](/gif/altair_doc.gif)

So based upon the `getPostsList` we will want to query the `sys` which is the filesystem and retireve the `filename`, which will return all the filenames without the extension. 

```graphql,copy
query{
  getPostsList{
    sys{
      filename
    }
  }
}
```

If you run this query in the GraphQL client you will see the following returned:

```graphql,copy
{
  "data": {
    "getPostsList": [
      {
        "sys": {
          "filename": "dynamic-routing"
        }
      },
      {
        "sys": {
          "filename": "hello-world"
        }
      },
      {
        "sys": {
          "filename": "preview"
        }
      }
    ]
  }
}
```

### Adding this query to our Blog.

The NextJS starter blog is served on the dynamic route `/pages/posts[slug].js` when you open the file you will see a function called `getStaticPaths` at the bottom of the file.
```js
export async function getStaticPaths() {

....
```

Remove all the code inside of this function and we can update it to use our own code. The first step is to add an import to the top of the file to be able to create a client that can interact with our graphql:

```js
//other imports
.....
import { LocalClient } from "tina-graphql-gateway";
```

Then we can create an constructor function named client so we can use this as needed on our page, and give us the ability to interact with our API. 

```js
import{ LocalClient} from "tina-graphql-gateway"

const client = new LocalClient();
```

Inside of the `getStaticPaths` function we can construct our request to our content-api, when making a request we expect a `query` or `mutation` and then `variables` to be passed to the query, here is an example:

```js
client.request(query, {
        variables,
}),
```

We have already created the query so we can take what we created above and add it as we aren't using a variable holding the grapqhl query we can use `client.request((gql) => gql``QUERY_HERE``)`.

```js,copy
export async function getStaticPaths() {
const postsListData = await client.request(
    (gql) => gql`
      {
        getPostsList {
          sys {
            filename
          }
        }
      }
    `,
    { variables: {} }
  );
  return {
    paths: postsListData.getPostsList.map((post) => ({
      params: { slug: post.sys?.filename },
    })),
    fallback: false,
  };
}
```

#### Quick break down of `getStaticPaths`

The `getStaticPaths` code takes the graphql query we created, because it does not require any `variables` we can send down an empty object. In the return functionality we map through each item in the `postListData.getPostsList` and create a slug for each one. 

We now need to create one more query, this query will fill in all the data and give us the ability to make all our blog posts editable.

## Creating the `getStaticProps` query

The `getStaticProps` query is going to deliver all the content to the blog, which is how it works currently. When we use our content-api we will both delivery the content and give the content team the ability to edit it right in the browser.

We need to query the following things from our content-api:

- Title
- Excerpt
- Date
- Cover Image
- OG Image data
- Author Data
- Body content

### Creating our Query

Using our local graphql client we can query the `getPostsDocument` using the path to the blog post in question, below is the skeleton of what we need to fill out.

```graphql
query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
		//data from our posts.
}
}
```

When retrieveing the data of a blog post we can use an [inline fragment](https://graphql.org/learn/queries/#inline-fragments) to retrieve all of the `Post_Doc_Data` which will look like this:

```graphql 
query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
        data {
          __typename
          ... on  Post_Doc_Data{
				// everything we need is in here.
			}
		}
	}
}
```

We can now fill in the relavent fields we need to query, take special note of both `author` and `ogImage` which are grouped so they get queried as:

```graphql
author{
 name,
 picture
}
ogImage{
 url
},
```

Once you have filed in all the fields you should have a query that looks like the following:

```graphql,copy
query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
        data {
          __typename
          ... on  Post_Doc_Data{
            title,
            excerpt,
            date,
            coverImage,
            author{
                name,
                picture
            }
            ogImage{
              url
            },
            _body
          }
        }
      }
    }
```

### Adding our query to our blog

Firstly we can take that query and make it into a GraphQL request to keep our code organized, this can be added after the Post functionality :

```js,copy
export const query = `#graphql
    query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
        data {
          __typename
          ... on  Post_Doc_Data{
            title,
            excerpt,
            date,
            coverImage,
            author{
              name,
              picture
            }
            ogImage{
              url
            },
            _body
          }
        }
      }
    }
`;
```

Now we remove everything from the getStaticProps and write our own that will interact with the content-api. First we can desructure the `slug` so we can use it for our query and return it as part of the returned data.

```js
export async function getStaticProps({ params }) {
const {slug} = params;
}
```

Then we can make a variables query that is going to be an object that contains the relative path to the post:

```js
export const getStaticProps = async ({params}) => {
  const {slug} = params;
  const variables = { relativePath: `${slug}.md` };
	....
}
```

Now in our return functionality we want to return the result of the query, the slug, the query and the varaibles used. The last two are going to be used by Tina to allow you to make edits in real time. So the full query should look like:

```js,copy
export const getStaticProps = async ({params}) => {
  const {slug} = params;
  const variables = { relativePath: `${slug}.md` };
  return {
    props: {
      data: await client.request(query, {
        variables,
      }),
      slug,
      variables,
      query,
    },
  };
};
```

## Using the new content on the page

We now need to edit the Post function firstly we are now going to pass in the data and slug to it instead of what was there before:

```js
export default function Post({data,slug}) {

// original code
}
```

To make our code easy to follow and read we can destructure the data props:

```js
export default function Post({data,slug}) {
  const {title,coverImage,date,author,_body,ogImage} = data.getPostsDocument.data;
```

Finally we can replace any of the old code with new code so the code should now look like this:


```js,copy
export default function Post({data,slug}) {
  const {title,coverImage,date,author,_body,ogImage} = data.getPostsDocument.data;
  const router = useRouter()
  
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={false}>
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
              <PostBody content={_body } />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}
```

### Editing content:

Now we are ready to launch and start editing the content, launch the application using the `yarn tina-dev` command and navigate one of the posts. Now because our application is "protected" you will need to navigate to http://localhost:3000/admin or click the edit button at the top of the screen. Once you do one of those on the left hand side you will see a blue pencil clicking that will allow you to edit any of the content:

![Editing Gif](/gif/editing_smaller.gif)

At this point we have created an exact replication of the NextJS starter with the ability to edit any of the fields and now have the ability to make changes. This is great except we have an issue the markdown is being treated as plaintext which isn't what we want.