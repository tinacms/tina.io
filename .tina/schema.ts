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

import { defineSchema } from '@tinacms/cli'
import {
  heroTemplate,
  flyingTemplate,
  featuresTemplate,
} from '../components/blocks'

export default defineSchema({
  collections: [
    {
      label: 'Pages',
      name: 'page',
      path: 'content/pages',
      fields: [
        { type: 'string', name: 'title' },
        {
          type: 'object',
          name: 'seo',
          label: 'SEO',
          fields: [
            { type: 'string', name: 'title' },
            { type: 'string', name: 'description' },
          ],
        },
        {
          label: 'Blocks',
          name: 'blocks',
          type: 'object',
          list: true,
          templates: [heroTemplate, featuresTemplate, flyingTemplate],
        },
      ],
    },
    //   We can use this collection when we want to add tina to the blog page
    // {
    //   name: 'blog',
    //   path: 'content/blog',
    //   label: 'Blog Posts',
    //   format: 'mdx',
    //   fields: [
    //     {
    //       type: 'string',
    //       label: 'Title',
    //       description: 'Title of the blog post',
    //       name: 'title',
    //     },
    //     {
    //       type: 'datetime',
    //       name: 'date',
    //     },
    //     {
    //       type: 'datetime',
    //       name: 'last_edited',
    //     },
    //     {
    //       type: 'string',
    //       name: 'author',
    //     },
    //     {
    //       name: 'body',
    //       label: 'Main Content',
    //       type: 'rich-text',
    //       isBody: true,
    //     },
    //   ],
    // },
  ],
})
