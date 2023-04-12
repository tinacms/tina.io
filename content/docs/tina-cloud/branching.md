---
title: Using Multiple Branches
last_edited: '2023-04-12T10:00:00.000Z'
---

If your content editors need to work on multiple branches, you can enable Tina's branch switching plugin.  This allows you to create new branches and switch between them from Tina's UI. In the future, we'll build on this foundation and support creating pull requests, merging, and other related workflows.  ![Switch Branches](https://res.cloudinary.com/forestry-demo/image/upload/v1681311018/tina-io/docs/branch-selector_e5ndeg.gif "Switch Branches")

## Installation

Simply add the branch-switcher flag to your CMS callback function in your tina [config file](http://localhost:3000/docs/reference/config/). If your site does not already make use of the CMS callback function, add this to your config.

```javascript
cmsCallback: cms => {
    cms.flags.set("branch-switcher", true);
    return cms;
  }
```

\
For an example, see [this repo](https://github.com/tinacms/demo-incremental/blob/main/.tina/config.tsx#L16). 

## Demo

Here is a quick video demo of Tina's branch plugin

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/XvL3pFiYaVw" title="TinaCMS Branching Demo video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>
