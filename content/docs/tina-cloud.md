---
id: /docs/tina-cloud
title: Going to Production
next: /docs/tina-cloud/overview/
---

To deploy your site to production, you'll need to connect Tina to a hosted backend. This doc will walk you through the steps to get your site from [running locally to running for production](/docs/tina-cloud/faq/#what-is-local-mode-vs-prod-mode).

<!-- Tina's GraphQL Content API is flexible, in that it can be run locally using the Tina CLI ("Local Mode") which persists changes to the local file system, or your site can talk to a hosted content API in a production environment ("Prod Mode"), which persists changes to your GitHub repository. -->

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on "Tina Cloud" from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w\&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB\&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/r9vzL_8PEW8?start=39" title="TinaCMS Deep Dive (Going To Production)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>

### Push your repository to GitHub

Make sure all the contents of your site are pushed to Github and your `tina/tina-lock.json` is up to date and pushed to Github.

## Using Tina CLoud

If your using Tina Cloud, [check out the docs on how to deploy a Tina CLoud](/docs/tina-cloud/overview).

## Using a Self Hosted Backend

If you are self hosting, [check out the docs on how to deploy a self hosted backend](/docs/self-hosted/overview).

## Not sure which to use?

<!-- TODO: Maybe this should link to a different expiation -->

Check out [this doc](/docs/tina-cloud/faq#what-is-tina-cloud) that explains the differences between the two.
