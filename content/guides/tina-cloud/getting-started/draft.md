# Tina Quickstart Guide

The Tina Quickstart will allow you to get started in minutes with powerful visual editing on an existing NextJS application.

By the end of this guide, your whole team will be able to edit on a deployed version of your site — we recommend using Vercel.

### Create your Next applicaton

```other
npx create-next-app tina-quickstart

cd tina-quickstart
```

### Adding Tina

Tina has created a quick way to bootstrap an application and show the power of visual editing, from your terminal enter the following command:

```other
npx tina-graphql-gateway-cli init
```

This command will do a few things in your application:

1. Install all required dependancies for Tina
2. Define a basic schema that is easily extendable, in the .tina directory
3. Wrap your application in Tina so any page can be easily edited.
4. Create example content in the demo directory.
5. Edit the package.json to add tina commands (tina-dev, tina-build, tina-start)

Now that we have a basic Tina setup you can launch your application using the following commmand:

> yarn tina-dev

Once you have launch the application you have a couple of urls to navigate to:

- http://localhost:3000/demo/posts/firstpost
- http://localhost:4001/altair

The first one will bring you to the frontend with the ability to edit the title of the post and the second will alllow you to interact with your graphql layer .

### A quick test.

Now that we have a basic Tina implementation we should give it a quick test before making the rest of the site editable. Using the URL mentioned above you will see the following screen:

![Screen Shot 2021-07-12 at 10.29.18 AM.png](https://res.craft.do/user/full/c67cad1b-6dc6-4909-0f8e-19d468ba9fd4/doc/A8636858-4B8D-4C7C-839D-30ACB08EFBD3/40389D93-8802-4E63-A184-8ADA6FD88114_2/Screen%20Shot%202021-07-12%20at%2010.29.18%20AM.png)

Selecting the pencil in the bottom left will allow you to edit the title and the body of the page right in the frontend. When you hit save, that will save those files to the markdown file found at

> This works by using our content-api which will go into greater depth during this guide.

### Defining the shape of our content

One key element of Tina is defining a schema that allows you to shape and interact with the content on the page. Opening up the project, you will see a folder called .tina which contains a `schema.ts` file. This file allows you to instruct the conten-api what content type to look for, how it should be labeled and much more!

Before we look at our current project, lets discuss how the content is shaped. Our schema can be broken down in to 4 sections: `collections`, `templates`, `fields`, `references`. Each one of them has its role:

Collections:

The top-level key in the schema is an array of *collections*, a `collection` informs the API about *where* to save content.

Templates:

Templates are responsible for defining the shape of your content and we can instruct the content api what files belong to a template.

Fields:

Fields instruct the content-api of the type expected for example text as well as the queryable name and the name to display to your content team.
References:

We also have `reference` and `reference-list` fields. These are important concepts, when you *reference* another collection, you're effectively saying: "this document *belongs to* that document".

The NextJS blog starter comes with 3 example blog posts that we are going to use to shape our content in our schema. You can find on any of the blog posts in the _posts directory, let us look at the front matter of the `preview.md` .

```other
//preview.md

---
title: 'Preview Mode for Static Generation'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2020-03-16T05:35:07.322Z'  
author:
  name: Joe Haddad
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---
```

As you can see, we have a quite a few fields that we want our content team to be able to edit as well as the body of the blog post. To begin with underneath the object we need to create a new collection object:

```other
{
      label: 'Blog Posts',
      name: 'posts',
      path: '_posts',
      templates: []
}
```

Here we have created a label with a human friendly name "Blog Posts", and the queryable name will be "posts" and alll content should be saved in the "_posts" directory, which is where the NextJS starter blog post content lives.  The next step is to create the content template which will need to match the front matter we showed above:

```other
templates: [
        {
          label: 'Post',
          name: 'post',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
```

Here is an example before we post the entire templating for each field. As you can see we have selected to call this template post and it currently contains a single field of type of text named Title.

Now we need a full template, to handle all the fields:

```other
{
        label: 'Blog Posts',
        name: 'posts',
        path: '_posts',
        templates: [
          {
            label: 'Post',
            name: 'post',
            fields: [
              {
                type: 'text',
                label: 'Title',
                name: 'title',
              },
              {
                type: 'textarea',
                label: 'Excerpt',
                name: 'excerpt',
              },
              {
                type: 'text',
                label: 'Cover Image',
                name: 'coverImage',
              },
              {
                type: "text",
                label: "Date",
                name: "date",
              },
              {
                type: 'group',
                label: 'Author',
                name: 'author',
                fields: [
                  {
                    type: 'text',
                    label: 'Name',
                    name: 'name',
                  },
                  {
                    type: 'text',
                    label: 'Picture',
                    name: 'picture',
                  },
                ],
              },
              {
                type: 'group',
                label: 'OG Image',
                name: 'ogImage',
                fields: [
                  {
                    type: 'text',
                    label: 'Url',
                    name: 'url',
                  },
                ],
              },
            ],
          },
        ],
      },
```

> You will notice there is a new type here called group. This works as a way to group fields together and on the UI which you will see in the future allows you to click into them and edit each field.

### Using and editing the content:

Now the content is shaped, we can create a graphQL query to access the data and also edit the data. Using the url : [http://localhost:4001/altair/](http://localhost:4001/altair/) you can access a local client we need to create two different queries:

1. `getStaticPaths` which will define a list of paths that have to be rendered to HTML at build time.
2. `getStaticProps` to get the data we need for Tina and to display to the user.

### Creating the getStaticPaths query

The `getStaticPaths` query is going to need to know where all of our markdown files are located, with our current schema you have the option to `getPostsList` which will provide a list of all posts in our _posts folder. You can find the image below by selecting Docs on the right hand side and selecting Query.

![CleanShot 2021-07-13 at 13.18.05.png](https://res.craft.do/user/full/c67cad1b-6dc6-4909-0f8e-19d468ba9fd4/doc/A8636858-4B8D-4C7C-839D-30ACB08EFBD3/CC45C289-6517-4326-9DA8-7E90F8B55392_2/CleanShot%202021-07-13%20at%2013.18.05.png)

So based upon the `getPostsList` we will want to query the `sys` and retireve the `filename`, the query will look like the following:

```other
query{
  getPostsList{
    sys{
      filename
    }
  }
}
```

If you run this query in the GraphQL client you will see the following returned:

```other
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

The NextJS starter blog is served on the dynamic route /pages/posts[slug].js when you open the file you will see at the bottom

export async function getStaticPaths() {

....

Remove all the code inside and we can update it to use our TIna client and of course newly defined query above. The first step is to add an import to the top section to be able to create a client that can interact with our graphql:

```other
//other imports
.....
import { LocalClient } from "tina-graphql-gateway";
```

Then we can create an constructor function named client so we can use this localClient as needed.

```other
import{ LocalClient} from "tina-graphql-gateway"

const client = new LocalClient();
```

Inside of the getStaticPaths function we can construct our request to our content-api, when making a request we expect a query or mutation and any variables required, here is an example:

```other
client.request(query, {
        variables,
}),
```

As we already know what the query is we can make a request using the following:

```other
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

We  don't need to send any variables so we are sending an empty object, and this will return the list of the posts just as the previous getStaticPaths() that we replaced. If you launch the application nothing will change but know behind the scenes we are using the Tina content-api.

We now need to create one more query, this query will fill in all the data and give us the ability to make all our blog posts editable.

### Creating the getStaticProps query

The getStaticProps query is going to deliver all the content to the blog, which is how it works currently. When we use our content-api we will both delivery the content and give the content team the ability to edit it right in the browser.

We need to query the following things from our content-api:

- Title
- Excerpt
- Date
- Cover Image
- OG Image data.
- Author Data
- Body content

### Creating our Query

Using our local graphql client we can query the getPostsDocument using the path to the blog post in question, below is the skeleton of what we need to fill out.

```other
query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
		//data from our posts.
}
}
```

When retrieveing the data of a blog post we can use an [inline fragment](https://graphql.org/learn/queries/#inline-fragments) to retrieve all of the `Post_Doc_Data` which will look like this:

```other
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

We can now fill in the relavent fields we need to query, take special note of both author and ogImage which are grouped so they get queried as:

```other
author{
 name,
 picture
}
ogImage{
 url
},
```

Once you have filed in all the fields you should have a query that looks like the following:

```other
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

Firstly we can take that query and make it into a graphql request to keep our code organized, this can be added after the Post functionality :

```other
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

Now we remove everything from the getStaticProps and write our own that will interact with the content-api. First lets desructure the slug so we can use it for our query and return it as part of the returned data.

```other
export async function getStaticProps({ params }) {
const {slug} = params;
}
```

Then we can make a variables query that is going to be an object that contains the relative path to the post:

```other
export const getStaticProps = async ({params}) => {
  const {slug} = params;
  const variables = { relativePath: `${slug}.md` };
	....
}
```

Now in our return functionality we want to return the result of the query, the slug, the query and the varaibles used. The last two are going to be used by Tina to allow you to make edits in real time. So the full query should look like:

```other
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

### Using the new content on the page

We now need to edit the Post function firstly we are now going to pass in the data and slug to it instead of what was there before:

```other
export default function Post({data,slug}) {

// original code
}
```

To make our code easy to follow and read we can destructure the data props:

```other
export default function Post({data,slug}) {
  const {title,coverImage,date,author,_body,ogImage} = data.getPostsDocument.data;
```

Finally we can replace any of the old code with new code so the code should now look like this:

```other
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

Now we are ready to launch and start editing the content, launch the application using the yarn tina-dev command and navigate one of the posts, on the left hand side you will see a blue pencil clicking that will allow you to edit any of the content:

<Picture / Gif Here>

At this point we have created an exact replication of the NextJS starter with the ability to edit any of the fields and now have the ability to make changes. This is great except we have an issue the markdown is being treated as plaintext which isn't what we want.

## Using Markdown plugins:

To be added.

## Connect to Tina Cloud (BELOW TO BE EDITED)

While the fully local development workflow is the recommended way for developers to work, you'll likely want other editors and collaborators to be able to make changes on a hosted website with authentication.

> ℹ️ Changes in edit mode show up on your home page after your site finishes a rebuild.

## Register your local application with Tina Cloud

1. Visit [auth.tina.io](https://auth.tina.io/register), create an organization, and sign in. Make a note of your organization name.
2. Create a Tina Cloud app that connects to the GitHub repository you've just forked. Once your app is created, click on the app to get to the app settings and copy the client ID.

## Connect your local project with Tina Cloud

In the `env.local` file set:

- `NEXT_PUBLIC_USE_LOCAL_CLIENT` to `0`.
- `NEXT_PUBLIC_ORGANIZATION_NAME` to your Tina Cloud organization name
- `NEXT_PUBLIC_TINA_CLIENT_ID` to the Client ID displayed in your Tina Cloud App.

Restart your server and run `yarn dev` again.

Open [`http://localhost:3000/`](http://localhost:3000/%60) and click "enter edit mode"

#### Edit content

Make some edits through the sidebar and click save. Changes are saved in your GitHub repository.

Now that Tina Cloud editing is working correctly, we can deploy the site so that other team members can make edits too.

> ℹ️ Gotcha: since your changes are being synced directly to Github, you'll notice that when you're in non-"edit" mode your page still receives the unedited data from your local file system. This is mostly fine since editing with Tina Cloud is designed for hosted environments. But beware that changes to your schema may result in a mismatch between the Tina Cloud API and your local client.

## Deploy

### Vercel

Connect to your GitHub repository and set the same environment variables as the ones in your `env.local` file:

```other
NEXT_PUBLIC_ORGANIZATION_NAME= <YOUR_ORGANIZATION>
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
```

![vercel-congratulations.png](https://raw.githubusercontent.com/tinacms/tina-cloud-starter/main/public/uploads/vercel-congratulations.png)

🎉 Congratulations, your site is now live!

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, click "edit this site", log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.

### Netlify

Connect to your GitHub repository, click on **advanced** to set the same environment variables as the ones in your `env.local` file:

```other
NEXT_PUBLIC_ORGANIZATION_NAME= <YOUR_ORGANIZATION>
NEXT_PUBLIC_TINA_CLIENT_ID= <YOUR_CLIENT_ID>
```

Set the **build command** to `yarn build`, Set the **publish directory**. To `.next/` .

Once you're done, click "Deploy site".

You can test that everything is configured correctly by navigating to `[your deployment URL]/`, click "edit this site", log in to Tina Cloud, and making some edits. Your changes should be saved to your GitHub repository.

