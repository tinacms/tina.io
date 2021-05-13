---
title: 'Tina Cloud and Next.js: the perfect match'
date: '2021-05-13T14:34:20+02:00'
author: Logan Anderson
last_edited: '2021-05-13T13:09:14.835Z'
---
Next.js is **our default choice** when it comes to managing static content, and it works perfectly with our new headless CMS [Tina Cloud]().

We jumped on the Next.js bandwagon as soon as we realized this would be a perfect companion for Tina, especially because Next.js is a rather unopinionated React framework, that gives you great flexibility when it comes to working with data at build time or at run time.

Tina Cloud is a Git-backed CMS, Next.js is just what we need to deliver fast static sites that you can edit visually in context.

Let’s see how Next.js makes a Tina developers' job easier.

# Next.js, more than a static site generator

Next.js is a popular, open-source meta-framework and is quickly becoming[ the standard for new React projects](https://www.npmtrends.com/next-vs-gatsby-vs-nuxt). Its hybrid nature means that it can be used for both static site generation (SSG) _and_ server-side rendering (SSR). We’ll see later that, with **Tina Cloud**, we don’t even need the latter.

Next.js offers a very convenient way to do [static site generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) with the  `getStaticProps` function: your content is fetched at build time and the output is a good old static HTML file.

It’s core to the Jamstack philosophy to render your site before it is served to users from a CDN. With Next.js static mode, the React code is rendered on a server and then served as HTML. This static HTML file is served from a performant CDN, and won't change until the next build.

During the build step, we have access to the file system, so we can source our content from Markdown and JSON files, or through a headless CMS like **Tina Cloud**. We only source content at build time and not every time someone visits the site, that’s what makes static sites so fast.

Another powerful feature from Next.s is [server-side rendering](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering): this time the React component is rendered on the server and then sent to the client. This is roughly the same process as static site generation but it happens _every time the page is requested_. SSR is useful when you have dynamic content that changes often.  For example, the stock count on an e-commerce product page or user-specific data.

TinaCMS uses Next.js [preview mode](https://nextjs.org/docs/advanced-features/preview-mode) for our [visual open authoring](/blog/introducing-visual-open-authoring/) backed by GitHub workflow.

You wouldn’t be able to fetch data directly from GitHub in the browser in this flow.

Here we first need to check that you have the proper permission to modify the content stored in the repository, so we have to fetch data from the server, and use SSR.

On the other hand, [Tina Cloud](/early-access/), our headless API that talks to GitHub handle the authentication for you, so we are able to fetch our editable content from Github directly from the browser. No need for SSR then, we work with `getStaticProps` only and get a similar editing experience. That’s the approach we take in the **Tina Cloud Starter**. This doesn't mean you are limited to only using `getStaticProps` or you're unable to use preview mode, it just means that we handle the complex authentication for you with Tina Cloud.

# Next.js, a natural fit for Tina Cloud

Although some parts of TinaCMS are framework-agnostic, about 75% of the core code is built with React. For instance, the TinaCMS user interface does depend on React, but there’s no dependency on Next.js. Next.js as a React framework offers a much better developer experience and elegantly solves some issues for us.

Next.js allows you to serve a static blazing-fast™ website while fetching and updating remote data from GitHub on edit mode. With Tina Cloud, you get a powerful GraphQL Content API on top of your file system, auto-generated TinaCMS forms, and user authentication.

> **Why not Gatsby?**
>
> _Gatsby, another popular choice for React static site generators, was also in our minds but we ultimately decided it wasn't a good fit as [**it’s using a build time plugin to parse and transform the Markdown files**.](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-the-filesystem) This means the development server has to be running or the site has to be rebuilt to preview the site — not the user experience we aim at for real-time editing. Gatsby is very opinionated about how files are fetched and forces you to use its [GraphQL data layer](https://www.gatsbyjs.com/docs/how-to/sourcing-data/sourcing-from-the-filesystem#using-gatsby-source-filesystem). We could opt out of this but this would cause friction for existing Gatsby users. We decided it would be better to go for a less opinionated and more flexible approach, à la Next.js._

[Tina Cloud](/cloud/) gives you instant editing previews by fetching the data dynamically in the browser from GitHub, loading and passing it as props to your page components. As the data is wrapped in React state, when you change the data in the content forms, it’s immediately reflected on your site preview. When your site is built for production use, the files are fetched from the file system using our [local GraphQL server.](https://tina.io/blog/using-graphql-with-the-filesystem/)

```js
const Inner = (props) => {
// Fetch dynamic data from Tina cloud
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query),
    variables: props.variables || {},
  });
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
           // Return children with Static Props
           {props.children(props)}
        </>
      ) : (
        // pass the new edit state data to the child, 
        // payload is React State and will update when the form data is updated
        props.children({ ...props, data: payload })
      )}
    </>
  );
};
```

![Real-time editing with TinaCMS and Tina Cloud](https://lh4.googleusercontent.com/ulRIvu560NGj4Zu57oWnZZxJaIGhte6RC8MioL4s0I6pWHwaz4ic41KhYt-ENb8z_jKlWUphkWopWVkRwRXSyH_ybph1kJjAxNowu2DMcV5SiOvL09mYTEG72B3tITe9enacvy8k "Real-time editing with TinaCMS and Tina Cloud" =624x351)

We needed a solution that was **statically generated** as fetching all of the data from GitHub on each request would slow down your website. We need to fetch our static data once at build time. Since the site is statically generated, the production site can be static while the editing site can load data dynamically from GitHub, directly or through our Tina Cloud Content API.

For now, **we are recommending using Tina Cloud in your Next.js projects**, as it is the quickest way to get up and running. The use of `getStaticProps` allows you to fetch your static files for production builds and fetch dynamic data forms to edit your site with Tina Cloud.

## Don’t let TinaCMS impact your production website

Given it’s all React, it is tempting to load TinaCMS on your Next.js website and call it a day. Please bear in mind that given its client-side nature, TinaCMS comes with some JS bundles and a performance price to pay. As always it depends on your context, it might be perfectly fine for an internal project where you care much more about providing a better editing experience to your teammates than a perfect Lighthouse score. On a public-facing website though, TinaCMS should only load on your site when you're in editing mode so it does not increase your production bundle. Your visitors shouldn’t have to pay any performance fees.

In edit mode, your site is wrapped with a `TinaProvider` component that uses React state to update your website in real-time. This removes the need to wait for a build step and unlocks instant previews.

This is made easy with [Next.js dynamic imports](https://nextjs.org/docs/advanced-features/dynamic-import#basic-usage) that will code split out the `TinaWrapper` when not in edit mode.

In your Next.js `_app.js` file you can write:

```js
function InnerApp({ Component, pageProps }) {
  const {edit} = useEditState()
  if (edit) {
    // Dynamically load TinaCMS when in edit mode 
    const TinaWrapper = dynamic(() => import("../components/tina-wrapper"));
    return {
        <TinaWrapper {...pageProps}>
          {(props) => <Component {...props} />}
        </TinaWrapper>
    );
  }
  // Don't load TinaCMS on production
  return (
      <Component {...pageProps} />
  );
```

We plan to extend to other frameworks and other static site generators later, but for now, we feel good about working with Next.js and tailor a good editing experience for your teammates.

Focusing on a single framework helps make development as flawless as possible. Once we feel good about the developer and user experience,  we will be more confident to expand to other tools, whether it’s Vue apps or non-react websites. Tina is not a CMS, it's an open-source toolkit to build client-side editing on your website, and can be ported to other use cases.