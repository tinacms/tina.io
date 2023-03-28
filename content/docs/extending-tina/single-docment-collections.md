---
title: Single Document Collections
last_edited: '2023-03-28T04:00:00.000Z'
---

In Tina, single document collections are collections that can only every contain one document. This can be achieved in the UI by [setting ui.allowedActions.create and ui.allowedActions.delete ](/docs/reference/collections/ "Collection reference")to both be false. This will disable the delete and create buttons in the UI. \
\
Once these are both set to false and the document contains a single file the UI will not go to the list page but straight to the document. \
\
[Single\_Collection\_Demo](https://res.cloudinary.com/forestry-demo/video/upload/v1680013970/tina-io/docs/extending-tina/Single_Collection_Demo.mov "Single_Collection_Demo")

### Caveats

Right now there is no query generation that comes with this so you will have to [write a custom query](/docs/data-fetching/custom-queries/ "Custom Query Docs"). 

Setting ui.allowed actions only changes the user interface, If you want to block the API from adding more files to the collection this can be done [with the match property](/docs/reference/collections/#matchinclude "Collection Docs"). \


```javascript
match: {
  include: "documentName"
}
```

\
This will now block any new documents from being created. 
