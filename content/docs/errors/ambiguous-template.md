---
title: Ambiguous Template
last_edited: '2023-10-23T04:00:00.000Z'
---

This error happens when a collection uses templates and there is no template key found in the document. It is common for this to happen when migrating from fields to templates or during forestry migration.\
\
 This error can be fixed by adding a root level field of \_template to every document with this error.  Unfortunately,  we do not have anyway to automatically migrate the content. It will have to be done manually or with custom scripts. 

 
