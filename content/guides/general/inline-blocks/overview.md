---
title: Overview
last_edited: '2020-08-17T18:49:25.796Z'
---

This guide will show you how to set up inline editing and inline blocks based on a simple [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) demo.

By the end of this guide, you should have a good understanding of how to set-up and work with inline editing and inline blocks. While this guide doesn't cover every single field or potential usecase, it should give you enough of a base to create Inline Editing experiences in your own projects.

> Play around in the [**hosted final state**.](https://logan-anderson.github.io/cra-hosted-demo/)

<iframe width="100%" height="398" src="https://www.youtube.com/embed/4qGz0cP_DSA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The video above gives some reference as to what inline blocks look like in Tina. The demo we are going to set up will be more simple than what is shown in the video, but it should give you some inspiration around what's possible!

## Set-up the demo repo

To get started, you'll need to clone [the repo](https://github.com/tinacms/inline-blocks-demo), install the dependencies. The `master` branch is set-up to be your _initial starting point_.

At this point, it is set up with a TinaCMS instance and renders a simple `Hero` component with hard-coded data. All of the styles and images are configured as well, so when you add blocks they'll look nice 💅.

```bash
git clone git@github.com:tinacms/inline-blocks-demo.git
cd inline-blocks-demo
yarn install
yarn start # Navigate to localhost:3000
```

![Inline Editing demo at install](/img/inline-editing-guide/step1-install.png)

Note that the _demo isn't meant to be a 'starter'_. It is for educational purposes to help you get familiar with the inline editing API.

> There is a [final-state branch](https://github.com/tinacms/inline-blocks-demo/tree/final-state) that you can checkout if you get stuck or need a reference at any point.
