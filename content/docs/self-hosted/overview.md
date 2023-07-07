---
title: Self Hosted Tina
last_edited: '2023-07-06T07:00:00.000Z'
next: /docs/self-hosted/getting-started
---

## Introduction

By default, TinaCMS uses Tina Cloud as its backend. Tina Cloud is a powerful, out-of-the-box solution that handles reading/writing to your GitHub repository, caching content in a queryable data layer, and authentication / authorization.

For users who want to be independent of Tina Cloud, **we also offer a self-hosted alternative** where you can host your own Tina Data Layer and provide your own user authentication and git integration. We love the control and portability you get when storing content in Markdown and JSON files and this allows users to extend that flexibility to the rest of the CMS.

## Note on Licensing

Most of TinaCMS is licensed under the Apache 2.0 license, but the Tina Data Layer is released under a modified version of the Fair Source License. You can find this license [here](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/datalayer/LICENSE) and its corresponding FAQ, [here](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/datalayer/LICENSE-FAQ.md).
