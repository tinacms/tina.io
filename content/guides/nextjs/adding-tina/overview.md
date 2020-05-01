---
title: Overview
---

This guide will show you how to set up Tina in a Next.js environment. Since Next.js is a relatively open-ended framework and there are many different ways to build with it, these docs will attempt merely to give you an overview of what is required to get Tina working in a Next.js environment and provide some suggestions. The ultimate implementation will depend on your content strategy.

> **The Finished Product**
>
> The repository at [dwalkr/next-tina-blog-starter](https://github.com/dwalkr/next-tina-blog-starter) contains the end product of this guide. Feel free to fork it and follow along!

## Project Setup Recommendations

Tina aims to work with a variety of project setups and content strategies, but we suggest following a few principles to ensure success when working with Tina.

### Client-side Capable Transformation

Tina is best suited to content that can be transformed via JavaScript running on the client side. What we mean by this is that if your source content requires a transformation step, such as Markdown, that it is capable of being performed on the client side. This enables Tina to provide real-time previewing without requiring a call to server-side code every time a small update is made.

This doesn't mean that you can _only_ perform content transformation on the client side; in fact, best practices dictate that you should generate the HTML of your content server-side or during a build step. Fortunately, Next.js' hybrid approach makes this relatively easy.

The kinds of projects that will struggle to work well with Tina are those which perform content transformation exclusively at build time, such as through a Webpack plugin.

### Next 9.3 Data Fetching Methods

Next.js 9.3 introduces [next-gen data fetching methods](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support) _getStaticProps_, _getStaticPaths_, and _getServerSideProps_. Our Next.js documentation will center around workflows using these methods.

### Function Components Preferred over Class Components

Tina makes extensive use of React Hooks, which can only be used inside of function components. Our documentation will opt for expressing components as function components instead of class components in most cases.

## More Info

- [nextjs.org: Next-gen SSG Support](https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support)
