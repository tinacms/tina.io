---
title: Defining Content 
last_edited: '2021-07-15T15:36:36.046Z'
---

### Defining the shape of our content

One key element of Tina is defining a schema that allows you to shape and interact with the content on the page. Opening up the project, you will see a folder called `.tina` which contains a `schema.ts` file. This file allows you to instruct Tina's Contant API what content type to look for, how it should be labeled and much more!

Before we look at our current project, let's discuss how the content is shaped. Our schema can be broken down into four sections: `collections`, `templates`, `fields` and `references`. Each one of them has its role:

#### Collections

The top-level key in the schema is an array of *collections*, a `collection` informs the API about *where* to save content.

#### Templates

Templates are responsible for defining the shape of your content and we can instruct the Content API *what* files belong to a template.

#### Fields

Fields instruct the Content API of the type expected for example text as well as the queryable name and the name to display to your content team.

#### References

We also have `reference` and `reference-list` fields. These are important concepts, when you *reference* another collection, you're effectively saying: "this document *belongs to* that document".

The Next.js blog starter comes with three example blog posts that we are going to use to shape our content in our schema. You can find on any of the blog posts in the `_posts` directory, let us look at the front matter of the `preview.md`.

```md
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

```json
{
      label: 'Blog Posts',
      name: 'posts',
      path: '_posts',
      templates: []
}
```

Here we have created a label with a human friendly name "Blog Posts", and the queryable name will be "posts" and alll content should be saved in the "_posts" directory, which is where the NextJS starter blog post content lives.  The next step is to create the content template which will need to match the front matter we showed above:

```js
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

```js,copy
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

The final change required to make everything work, is to state that each of blog posts are part of our template named post, open up each of the markdown files found in _posts and add `_template: post` to the bottom of the frontmatter so it should look like: 

```md
---
title: A Test title
excerpt: >-
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo
  vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla
  facilities morbi tempus.
coverImage: >-
  http://res.cloudinary.com/dub20ptvt/image/upload/v1624743050/Embrace_Typescript_ly0g9c.png
date: '2020-03-16T05:35:07.322Z'
author:
  name: JJ Kasper
  picture: /assets/blog/authors/jj.jpeg
ogImage:
  url: /assets/blog/dynamic-routing/cover.jpg
_template: post
---
```
