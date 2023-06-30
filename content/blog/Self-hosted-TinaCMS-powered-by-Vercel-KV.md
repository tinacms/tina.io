---
title: Self-hosted TinaCMS powered by Vercel KV & NextAuth
date: '2023-06-30T04:00:00.000Z'
last_edited: '2023-06-30T04:00:00.000Z'
author: Kelly Davis
prev: content/blog/self-hosted-datalayer.md
---

Earlier this year, we [released](/blog/self-hosted-datalayer/ "released") the first iteration of Self-hosted Tina. The initial demo relied on Tina Cloud for authorization and used MongoDB for the data layer. Today we are excited to announce the next iteration of self-hosted Tina, leveraging [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for the data layer and [NextAuth.js](NextAuth.js).

Internally Tina uses LevelDB as an abstraction over the 
