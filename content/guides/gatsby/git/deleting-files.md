---
title: Deleting Files
---

When you need to provide the option of deleting files in a Gatsby site, the config is much simpler. Instead of adding a `creator` plugin to the sidebar, all we need to do is pass a _delete action_ to the form options object and the 'action' will be added to the sidebar.

Head to the template file where you may have a Tina form setup. Read more on setting up forms for content editing with [remark](/guides/gatsby/git/installation) or [JSON](/guides/gatsby/git/create-json-form). First, you'll need to import the `DeleteAction` from `gatsby-tinacms-remark`. Then, in your form options object just before the field definitions, add the action.

```javascript
import { useRemarkForm, DeleteAction } from 'gatsby-tinacms-remark'

//...

const FormOptions = {
  actions: [DeleteAction],
  fields: [
    //...
  ],
}
```

With the `DeleteAction` now passed to the form via the configuration object, you'll be able to access it via the three-dot icon in the lower right-hand corner of the sidebar.

![tinacms-delete-action-example](/img/delete-action-ex.png)
