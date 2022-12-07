---
title: 'Content Modelling'
id: '/docs/forestry/content-modelling/'
---

Another key difference between the two platforms is how content modelling is handled. In Forestry, content modelling is done in the CMS user interface (UI), which means that you can create and manage your content models directly in the CMS. This can be a convenient way to get started, but it may not be as flexible as working with content models in code.

In TinaCMS, content modelling is done within code. This means that you'll need to define your content models in a configuration file, and then import them into your CMS. The advantage of this approach is that it allows developers to have more control over their content models, and to easily reuse models, import models from other projects, add custom validation, and so on.

One specific example of this difference is the way that reusable field sets are handled. In Forestry, we have a field type called "Include Template" which allows you to include a pre-defined set of fields in your content model. In TinaCMS, this is done by simply separating a reusable field set into its own file, and then importing it into your desired collections.
