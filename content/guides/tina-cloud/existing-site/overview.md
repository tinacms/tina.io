---
title: Overview
last_edited: '2021-05-10T10:00:00.000Z'
---

In this guide, we take you through adding TinaCMS and Tina Cloud to the Next.js blog starter.
With the help of TinaCMS, you will be able to edit your Next.js site in real time on an `/admin` route to avoid impacting your production website. Your changes are saved back to your GitHub repository thanks to Tina Cloud Content API.

We're going to use the Next.js [blog starter](https://github.com/zeit/next.js/tree/canary/examples/blog-starter) as the base for our project. Create a new project by running the following commands in your terminal:

```bash,copy
yarn create next-app -e blog-starter my-tina-blog
```

Once the site is created, **push it up as a repository to your GitHub account.**
