---
title: 'TinaCMS Security Alert: Information Exposure for versions >= 1.0.0, < 1.0.9'
date: '2023-02-06T04:00:00.000Z'
last_edited: '2023-02-06T04:00:00.000Z'
author: TinaCMS Team
---

There has been a recent security vulnerability that has been discovered in our open-source library.

To address this, update @tinacms/cli to the latest patch 1.0.9. If you're on a version prior to 1.0.0 this vulnerability does not affect you.

The vulnerability exposes environment variables used in the build pipeline, which are leaked to a publicly accessible index.js file on the live site. This issue has been assessed as having a high severity rating, as the leaked information could include sensitive data such as passwords or keys.

We highly recommend that you take immediate action to address this issue:

- Please update the @tinacms/cli library to the latest version that includes a fix for this vulnerability (@tinacms/cli >= 1.0.9)
- Rotate any sensitive keys associated with your project.

Tina credentials like the API token are not considered especially vulnerable because they're for read-only access. Nevertheless, it may be a good idea to update them. More importantly, if your Tina-enabled website has other credentials (eg. Algolia API keys) you should rotate those keys immediately.

If you have any questions or concerns, please don't hesitate to reach out to our security team at support@tina.io

Thank you for your attention on this matter.

Best regards,
TinaCMS team
