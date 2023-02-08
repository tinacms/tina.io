---
title: Self Hosted Tina
last_edited: '2023-02-01T04:00:00.000Z'
---

TinaCMS treats the filesystem as the single source of truth for you content but still requires the Tina Data Layer to do its job. [Tina Cloud](/docs/tina-cloud/) runs the Tina Data Layer for you and also handles user authentication and communication with GitHub.

For users who do not wish to rely on Tina Cloud, **we also offer a self-hosted alternative** where you can host your own Tina Data Layer and provide your own user authentication and GitHub connection. We love the control and portability you get when storing content in Markdown and JSON files and want to extend that to the rest of the CMS.

If you're interested in self-hosting Tina, you can read about this solution on [GitHub](https://github.com/tinacms/tinacms/discussions/3589) or in this [blog post](https://tina.io/blog/self-hosted-datalayer/).

**Note on Licensing -** Most of TinaCMS is licensed under the Apache 2.0 license, but the Tina Data Layer is released under a modified version of the Fair Source License. You can find this license [here](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/datalayer/LICENSE) and its corresponding FAQ, [here](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/datalayer/LICENSE-FAQ.md).&#x20;
