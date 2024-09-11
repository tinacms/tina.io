/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { defineSchema } from 'tinacms'
import type { Collection, Template } from 'tinacms'
import { submenuTemplate } from '../components/toc/toc-submenu.template'
import { itemTemplate } from '../components/toc/toc-item.template'
import { pagesCollection } from './collectionsSchema/pages'
import { docsCollection } from './collectionsSchema/docs'
import { blogsCollection } from './collectionsSchema/blogs'
import { examplesCollection } from './collectionsSchema/examples'
import { meetingLinksCollection } from './collectionsSchema/meetingLinks'
import { whatsNewTinaCMSCollection } from './collectionsSchema/whatsNewTinaCMS'
import { whatsNewTinaCloudCollection } from './collectionsSchema/whatsNewTinaCloud'
import { navigationBarCollection } from './collectionsSchema/navigationBar'


export const schema = defineSchema({
  collections: [
    pagesCollection as Collection,
    docsCollection as Collection,
    blogsCollection as Collection,
    examplesCollection as Collection,
    meetingLinksCollection as Collection,
    whatsNewTinaCMSCollection as Collection,
    whatsNewTinaCloudCollection as Collection,
    navigationBarCollection as Collection,
    {
      name: 'docsTableOfContents',
      label: 'Docs - Table of Contents',
      path: 'content/docs-toc',
      format: 'json',
      fields: [
        {
          name: 'supermenuGroup',
          label: 'Supermenu Group',
          type: 'object',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: '🗂️ ' + (item?.title ?? "Unnamed Menu Group") };
            },
          },
          fields: [
            {name: 'title', label: "Name", type: 'string'},
            {
              name: 'items',
              label: 'Page or Submenu',
              type: 'object',
              list: true,
              templates: [
                submenuTemplate as Template,
                itemTemplate as Template
              ]
            }
          ]
        },
      ]
    },
  ],
})
