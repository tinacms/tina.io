---
title: Tina Cloud - a Git-backed Headless CMS
date: '2021-04-21T13:34:16-03:00'
author: Scott Gallant
last_edited: '2021-04-21T16:44:06.260Z'
---
Teams should be able to work collaboratively on content stored in Git, but in the context of their sites.

We are adding the final touches to bring this vision to teams. In the coming weeks, we’ll release **an open-source GraphQL API** and a new backend for you to **invite collaborators to visually edit your Next.js apps** versioned in your Git repositories.

Our mission is to take content management to the next level for Jamstack sites. Just over a year ago, we[ announced TinaCMS](https://www.youtube.com/watch?v=iPDCmbaEF0Y), an _open-source, visual editor for React-based websites._

![](https://res.cloudinary.com/forestry-demo/image/upload/v1619023278/tina-cms-visual-editing.gif)

_Real-time editing of a Next.js + TailwindCSS site with Tina’s sidebar._

This was just the beginning of our journey, and while[ visual open authoring](https://tina.io/blog/introducing-visual-open-authoring/) is quite handy for websites talking directly to GitHub, many organizations need a more robust solution to collaborate on content stored in their Git repositories.

Let’s take a brief look at what’s coming.

**Tina Cloud: a best-in-class API on top of Git**

Most other CMS solutions with WYSIWYG or visual editing functionality miss one critical thing:  **the necessary separation between content and code**. These products usually output spaghetti code that no developer can maintain or build upon.

We designed TinaCMS to separate these concerns and write _structured_ _content_ to any backend.  You can edit in the context of your site and those content changes get synced with _any_ storage solution: a Markdown file in GitHub, an Airtable document, a Google Sheet, or just another headless CMS, etc. This gives your team a user-friendly visual interface, without sacrificing code quality and without locking you in to a specific content storage solution.

![](/img/blog/Before.png)

### But with great flexibility comes great friction

We learned that Tina’s storage-agnostic approach adds complexity to the setup process and requires your content editors to authenticate through other means (i.e. GitHub). We wanted to give teams a quicker path to success with richer collaboration features which is why we’re building our own backend, TinaCloud.

![](/img/blog/After.png)

You can think of TinaCloud as a headless CMS stripped of the editing interface, which is provided by TinaCMS.

## A GraphQL API for your content

We are big believers in storing your website’s content in the filesystem backed by Git (Markdown, JSON, YAML, etc.). Not just because Git is a widely adopted and [open standard](https://github.com/git/git), but also because it comes out-of-the-box with great content management features like branching, rollbacks, and pull requests.  Continuous deployment services like Vercel or Netlify rely on Git and content teams should be able to embrace the very same workflow.

However, Git and the filesystem have limitations when you’re interacting with your content programmatically. That’s why databases exist.

_Because of the file-based nature of content in a Git-based CMS, there really is no way to guarantee [referential integrity](https://en.wikipedia.org/wiki/Referential_integrity) — [Brian Rinaldi](https://www.stackbit.com/blog/git-based-cms-relationships/)_

To overcome these limitations, Tina Cloud provides a GraphQL interface to your repository files where content is stored in open formats like Markdown and JSON. This way you can interact with your repository files like you would a database: define content types, relationships, and query your content with GaphQL.

## Bring visual editing to the whole team with Tina Cloud

The best websites result from collaboration between engineers, designers, writers, and marketers.  These people need the ability to work from a single source of truth and Tina Cloud offers a simple **dashboard** for admins to manage sites and collaborators.![](/img/blog/tina-cloud-dashboard.png)

_Tina Cloud Dashboard: Apps Tab_

Tina Cloud provides user management, authentication, and basic roles for your editing team.   
Give your team members access, even if they don’t have a GitHub account.

**Conclusion**

In the future, we’ll look back at clunky, conventional CMSs and wonder why we settled for so long. Content management can be so much better and we intend to show the world what’s possible. To get there, we’re leaning into visual editing and Git-backed content.

We believe in portability, which is why our headless CMS stores your content in open-specification file formats in a repository that you control. Also, we are still very committed to TinaCMS’s storage-agnostic approach and Tina Cloud will be just one of many backend storage solutions available to you. Tina Cloud is the foundation we need to show the world how powerful Git-backed, visual content management can be.

**Limited Availability**

_Tina Cloud is currently open to a limited set of Next.js projects, ask for [early access](https://tina.io/early-access/) if you want to join the private beta._