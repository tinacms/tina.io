---
title: Moving from Local-Mode to Prod-Mode
id: '/docs/tina-cloud'
next: '/docs/tina-cloud/dashboard'
---

Tina's GraphQL Content API is flexible, in that it can be run locally using the Tina CLI ("Local Mode") which persists changes to the local file system, or your site can talk to a hosted content API in a production environment ("Prod Mode"), which persists changes to your GitHub repository.

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on "Tina Cloud" from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/r9vzL_8PEW8?start=39" title="TinaCMS Deep Dive (Going To Production)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>

## Local-Mode

When developers are developing locally, it's often convenient to load/save content from their local filesystem rather than connecting to the content on Tina Cloud.

When in local-mode, you **will not** need to login to enter edit-mode.

<div class="short-code-warning">
   <div>
      <p>Note: Local-mode is meant for developing locally, and will not work when your site is hosted on production. When in local-mode, Tina tries to hit `http://localhost:4001`, which isn't available at runtime on your production site (and neither is the underlying filesystem content).</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

## Prod-Mode

Once you are ready to host your site in production and put editing behind authentication, you can self-host the CMS backend yourself or you can use TinaCloud's hosted backend.

Whether you're [self-hosting](/docs/self-hosted/overview) Tina or using [Tina Cloud](/docs/tina-cloud/dashboard/), Tina's Content API authenticates directly with GitHub removing the need for users to create GitHub accounts. Any changes that are saved by your editors will be committed to the configured branch in your GitHub repository.

To start moving from local-mode to prod-mode, the next steps are to:

- Push your repository to GitHub (if it isn't already)
- Setup a [Tina Cloud Project](/docs/tina-cloud/dashboard) or [Self-hosted Tina Backend](/docs/self-hosted/overview)
