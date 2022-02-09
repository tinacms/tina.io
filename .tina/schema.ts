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

const ACTIONS = {
  name: 'actions' as const,
  type: 'object' as const,
  list: true,
  fields: [
    { name: 'label', type: 'string' as const },
    { name: 'icon', type: 'string' as const },
    { name: 'variant', type: 'string' as const },
    { name: 'url', type: 'string' as const },
  ],
}
import { defineSchema } from '@tinacms/cli'

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
          templates: [
            {
              label: 'Hero',
              name: 'hero',
              fields: [
                { name: 'headline', type: 'string' },
                { name: 'subline', type: 'string' },
                ACTIONS,
                { name: 'videoSrc', type: 'string' },
              ],
            },
            {
              label: 'Features',
              name: 'features',
              fields: [
                { name: 'headline', type: 'string' },
                { name: 'subline', type: 'string' },
                {
                  name: 'items',
                  type: 'object',
                  list: true,
                  templates: [
                    {
                      label: 'Feature',
                      name: 'feature',
                      fields: [
                        { name: 'headline', type: 'string' },
                        { name: 'subline', type: 'string' },
                        {
                          name: 'media',
                          type: 'object',
                          fields: [
                            { name: 'src', type: 'string' },
                            { name: 'videoSrc', type: 'string' },
                            { name: 'cli', type: 'boolean' },
                          ],
                        },
                        ACTIONS,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'flying',
              label: 'Flying',
              fields: [
                { name: 'headline', type: 'string' },
                { name: 'subline', type: 'string' },
                ACTIONS,
                {
                  name: 'items',
                  type: 'object',
                  list: true,
                  fields: [
                    { name: 'headline', type: 'string' },
                    { name: 'subline', type: 'string' },
                    {
                      name: 'cli',
                      type: 'boolean',
                      ui: { defaultValue: false },
                    },
                  ],
                },
              ],
            },
          ],
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
