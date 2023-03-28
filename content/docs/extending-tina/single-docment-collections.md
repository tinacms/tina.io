---
title: Single Document Collections
last_edited: '2023-03-28T04:00:00.000Z'
---

In Tina, single document collections are collections that can only every contain one document. This can be achieved in the UI by [setting ui.allowedActions.create and ui.allowedActions.delete ](/docs/reference/collections/ "Collection reference")to both be false. This will disable the delete and create buttons in the UI. \
\
Once these are both set to false and the document contains a single file the UI will not go to the list page but straight to the document. \
\
