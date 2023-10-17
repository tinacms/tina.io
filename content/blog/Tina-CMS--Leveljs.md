---
title: Tina CMS & Level.js
date: '2023-10-17T04:00:00.000Z'
last_edited: '2023-10-17T04:00:00.000Z'
author: Kelly Davis
prev: content/blog/Supercharge-Your-Markdown-Blog-with-AI.md
---

Tina CMS is an open-source, Git-backed headless content management system (CMS) with a unique approach to content storage and retrieval. In this article, we are going to dive into its architecture and discover how Level.js strikes the perfect balance between simplicity and functionality needed by Tina.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1697555916/tina-io/new-homepage/homepage-demo-2b_lmoaj8.gif)

# The Challenge of Building a CMS on Git

One of the key features of Tina CMS is that instead of writing content to a database, it is stored in a Git repository. By using Git, Tina gets built-in version control and enables Git-based collaborative workflows. Similar to other headless CMS products, content is exposed for rendering using a queryable API that is generated using a developer-defined schema.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1675375259/tinacms-data-layer_geyrv8.png)

If Tina's API were to directly query the filesystem for content, it would be quite slow to access content, especially as the amount of content grows. Accessing individual documents and listing of files in a particular folder is straightforward. However, if we want to find all of the blog posts for a particular category, we have to load them all into memory, and then filter them before returning a result. Another common use case is ordering posts by the date they were authored. Unless we use a file naming scheme that incorporates a date field, sorting posts by date again would require loading all of the posts into memory and then sorting them before returning the sorted list. These solutions might be fine for a small site, but they are clearly not scalable.

For a typical headless CMS, the solution to this problem is to incorporate a database. A database provides both long term data storage and sophisticated scalable query capabilities. With a database, finding all the blog posts in a given category is as simple as adding a filter for the category field of a query to a posts table. Sorting is easily accomplished by identifying the field to sort by and specifying a sort direction. A typical database is also going to easily scale to the number of documents required by even the largest of web sites.

It’s self-evident, then, that Tina’s content API cannot rely solely on the Git file system. Some kind of hybrid solution incorporating both a database for scalable query capabilities and Git for storage and version control is needed. In our search for the right database solution for Tina, we had three constraints that guided us:

* When developing locally or self-hosting, developers should be able to use whichever database they prefer
* It should be easy to get up and running
* Behavior should be absolutely consistent between local development and production environments

# Discovering Level.js

## A Brief History

In 2010 Mozilla took a position against the [Web SQL Database](https://www.w3.org/TR/webdatabase/) standard developed by Apple. As Arun Ranganathan argued:
