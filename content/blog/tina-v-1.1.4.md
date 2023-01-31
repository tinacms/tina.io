---
title: TinaCMS V1.1.4
date: '2023-01-31T04:00:00.000Z'
last_edited: '2023-01-31T04:00:00.000Z'
author: James O'Halloran
---


TinaCMS Version `1.1.4` (and `@tinacms/cli@1.0.7`) adds the ability to store content in separate repo's, improvements to the rich-text field, adds the ability to rename documents, and several other bug fixes.

## Storing Content in a Separate Repo

Tina now supports sourcing content from a separate Git repo. With this approach you can continue to define your Tina config in your "website repo", but documents will be saved elsewhere.\
\
Read our guide for setting this up [here](https://tina.io/guides/tinacms/separate-content-repo/guide/ "Separate Content Repo Guide")

## Renaming Documents

Editors can now rename documents from the document list view

![Renaming Document](http://res.cloudinary.com/forestry-demo/image/upload/v1675179770/Screen_Shot_2023-01-31_at_11.13.32_AM_jnw3qo.png "Renaming Document")

## Rich-text editor improvements

Several improvements have been made to the rich-text editor to better safe-guard against MDX parsing errors.\
\- Form is blocked from saving when rich-text errors are introduced\
\- Line numbers added to raw-editor\
\- Errors easier to find in raw-editor\
\- Rich-text error links to raw-mode editor\
\- Fix bug where switching from raw-mode to rich-text editor with errors would lose unsaved changes.

![rich-text-error](http://res.cloudinary.com/forestry-demo/image/upload/v1675180829/Screen_Shot_2023-01-26_at_10.53.16_AM_v4lfjo.png "rich-text-error")

\- Forms can now be saved with ctrl/cmd-s (Thanks @Maxobat!)\
\- Fix issue where user could not save top level empty array\
\- Fix issue with billing warning showing when not logged in\
\- Don't clog CI logs with spinners\
\- More improvements to Foresry.io migration tool\
\- Fix bug where 2 versions of Graphql could be installed
