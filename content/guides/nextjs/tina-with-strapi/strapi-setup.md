---
title: 'Setting up Strapi'
---

> Strapi is the leading open-source headless CMS. It’s 100% Javascript, fully customizable and developer-first.

Strapi is quite easy to set up, use and customize. This makes it a wonderful example of a backend to use with Tina. We'll be running through a quick Strapi setup using GraphQL to query our data. Feel free to refer to their [documentation](https://strapi.io/documentation/v3.x/getting-started/quick-start.html) to help you along.

## Install Strapi Locally

```bash
yarn create strapi-app tina-strapi-server --quickstart
```

_That's it!_ Strapi probably opened a web-browser for you and is prompting you to create an administrator account. Before we do that let's go ahead and make Strapi even easier to use by installing the GraphQL plugin. Hit `Ctrl+C` to shutdown the server and then run the following command.

```bash
cd tina-strapi-server
yarn strapi install graphql
```

Now you can restart the server and setup your local administrator account.

```
yarn develop
```

@TODO: Toss in an image

> Keep in mind that the administrator account you create now will only be used for Strapi management. We'll be setting up seperate accounts later to get access to the Strapi APIs.

## Create Some Content Types

We'll be setting up a simple blog with two content types: **Blog Posts** and **Authors**. This will let us play with a bunch of different field types and will let us show how we can link content types together.

### Set up the Author Type

Our authors will be very simple with only a `name` and a `picture`. Open up the Strapi management console (at `http://localhost:1337`) and click on **Content-Types** builder in the left nav. Click on **Create a new collection type** and enter "Author" as the display name. Strapi will choose the API friendly name for you based on whatever you enter here.

Next you'll be presented with all of the fields that you can add to your content type.

![Strapi field types](/img/strapi-guide/field_types.png)

Look at all this fun stuff! The two field types we'll use for an author are **Text** and **Media**.

Click on **Text** and enter "name" as the field name. Click on the **Advanced Settings** tab and make this field required. Easy enough! Now we'll click on **Add another field** and select the **Media** type.

We're going to call this field "picture" and switch the type to **Single media**. Once again, move over to the **Advanced Settings** tab and change the allowed types of media to only allow images. Click on **Finish** and then click on **Save**. Strapi will quickly restart the server and your content type will be ready to use.

![Strapi field types](/img/strapi-guide/author_type.png)

> I chose these names to best match what the Next.js starter will provide us with in later steps. If you want to name them something different, just keep in mind you might need to make some extra changes on the front-end.

### Set up the Blog Post Type

The content type that we make for our blog posts will be a bit more interesting than our authors. It's going to have fields for: a title, a slug, an excerpt, a cover image, a date, and a link to an author.

Let's start with fields like those that we've already configured:

@TODO: This section is a bit long, I could maybe be less explicit

1. Create a new short-text field called "title", we want this to be **required** and **unique**, since we will have Strapi automatically generate a slug for us based on this field.
2. Create two long-text fields called "excerpt" and "content". Content is going to be the main body of the blog post, and the excerpt is going to be a small bit of text to show as a preview of the blog post.
3. Create a new **Media** field called "coverImage", like we did with the author picture we should set up this field to only accept images.

Now let's set up our slug field. Create a new **UID** field and call it "slug". Under **Attached field** select "title". Make this field required for a bit of added safety. That's was simple enough! We now have a unique slug field that's automatically generated from the post title.

Two more fields to go. Create a new **Date** field, and name it "date". I'm choosing make this a date-only field because I always try my best to avoid timezone issues.

Finally we'll link our blog posts to authors. Click to add a new **Relation** type and choose the relation that says "Author has many Blog Posts". This will add a field to both this content-type and the Author content-type. This might end up being handy in the future if we ever want to add the ability to see all the posts an author has written.

![Linking author to blog post](/img/strapi-guide/blog_post_author.png)

After you've created all these fields, don't forget to hit the **Save** button.

## Create Sample Data

All that's left for our initial Strapi setup is to create some sample data. Under the **Collection Types** section of the left-nav, click into Author and then **Add New Author**. This is all pretty self explanatory, give your author a name and a _beautiful_ picture and then hit **Save**.

![Example author](/img/strapi-guide/bmitton_author.png)

@TODO: This I don't love.
Now let's make some blog posts. I'd recommend making two or three so we can demonstrate some of the features of the front-end when we make it there. Choose a fun [lorem-ipsum generator](https://loremipsum.io/ultimate-list-of-lorem-ipsum-generators/) to help you fill out the **Content** and **Excerpt**. Don't forget to link an author that you've previously created

![Example blog post](/img/strapi-guide/a_blog_post.png)

## Conclusion

That's the end of our general Strapi setup. We'll be coming back a few times to tweak some settings as the need arises, but for right now let's get going on setting up a front-end for this data that we've created.
