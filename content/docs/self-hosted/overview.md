---
title: Self Hosted Tina
last_edited: '2023-07-06T07:00:00.000Z'
next: /docs/self-hosted/starters/nextjs-vercel
---

## Introduction

By default, TinaCMS uses Tina Cloud as its backend. Tina Cloud is a powerful, out-of-the-box solution that handles reading/writing to your GitHub repository, caching content in a queryable data layer, and authentication / authorization.

For users who want to be independent of Tina Cloud, **we also offer a self-hosted alternative** where you can host your own Tina Data Layer and provide your own user authentication and Gitintegration.

## How does it work?

You create a Tina Data Layer by creating backend functions that host the GraphQL API and you create a Data Layer that indexes content from the filesystem into a databse. This database is used to retrive the data. When an editor updates the data a [Gitprovider](/docs/self-hosted/git-provider/overview/) is used to commit the changes to the filesystem.

## Getting Started

### Using a Starter

Self hosting TinaCMS can be a bit of a challenge. We have created a [example](/docs/self-hosted/starters/overview/) that you can use to get started. This starter is a Next.js app that uses Vercel for hosting and GitHub for Gitintegration. It also includes Next Auth authentication.

### Implementing on an Existing Site

If you don't want to use our preconfigured starter, we have a guide for setting up the Self-hosted backend on your existing project. Check it out [here](/docs/self-hosted/existing-site/).
