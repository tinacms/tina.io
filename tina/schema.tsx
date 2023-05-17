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
import React from 'react'

import { defineSchema } from 'tinacms'
import type { Template } from 'tinacms'

import { heroTemplate } from '../components/blocks/Hero.template'
import { featuresTemplate } from '../components/blocks/Features.template'
import { flyingTemplate } from '../components/blocks/Flying.template'
import { pricingTemplate } from '../components/blocks/Pricing.template'
import { faqTemplate } from '../components/blocks/FAQ.template'
import { contentTemplate } from '../components/blocks/Content.template'
import { columnsTemplate } from '../components/blocks/Columns.template'
import { showcaseTemplate } from '../components/blocks/Showcase.template'
import { storyTemplate } from '../components/blocks/Story.template'
import { featureGridTemplate } from '../components/blocks/FeatureGrid.template'
import { logoGridTemplate } from '../components/blocks/LogoGrid.template'
import { roadmapGridTemplate } from '../components/blocks/RoadmapGrid.template'
import { recentPostsTemplate } from '../components/blocks/RecentPosts.template'

export const schema = defineSchema({
  collections: [
    {
      label: 'Pages',
      name: 'page',
      path: 'content/blocksPages',
      format: 'json',
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === 'home') {
            return `/`
          }
          return `/${document._sys.filename}`
        },
      },
      fields: [
        {
          type: 'object',
          name: 'seo',
          label: 'SEO Information',
          fields: [
            { type: 'string', label: 'Title', name: 'title' },
            {
              type: 'string',
              label: ' Description',
              name: 'description',
              ui: {
                component: 'textarea',
              },
            },
          ],
        },
        {
          label: 'Page Sections',
          name: 'blocks',
          type: 'object',
          list: true,
          ui: {
            visualSelector: true,
          },
          templates: [
            heroTemplate as Template,
            featuresTemplate as Template,
            flyingTemplate as Template,
            pricingTemplate as Template,
            faqTemplate as Template,
            contentTemplate as Template,
            showcaseTemplate as Template,
            columnsTemplate as Template,
            storyTemplate as Template,
            featureGridTemplate as Template,
            logoGridTemplate as Template,
            roadmapGridTemplate as Template,
            recentPostsTemplate as Template,
          ],
        },
      ],
    },
    {
      name: 'doc',
      label: 'Docs',
      path: 'content/docs',
      format: 'md',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          // note: this should be a hidden field that auto-updates
          type: 'string',
          name: 'last_edited',
          label: 'Last Edited',
          ui: {
            component: 'date',
          },
        },
        {
          name: 'prev',
          label: 'Prev',
          type: 'string',
        },
        {
          name: 'next',
          label: 'Next',
          type: 'string',
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Body',
          isBody: true,
        },
      ],
    },
    {
      name: 'post',
      label: 'Blog Posts',
      path: 'content/blog',
      format: 'md',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          isTitle: true,
          required: true,
          list: false,
          ui: {
            validate: (value) => {
              if (value?.length > 70) {
                return 'Title can not be more then 70 characters long'
              }
            },
          },
        },
        {
          // note: default to current date/time
          type: 'string',
          name: 'date',
          label: 'Date Created',
          ui: {
            component: 'date',
          },
        },
        {
          // note: this should be a hidden field that auto-updates
          type: 'string',
          name: 'last_edited',
          label: 'Last Edited',
          ui: {
            component: 'date',
          },
        },
        {
          // TODO create an authors collection and make this a relation field
          type: 'string',
          name: 'author',
          label: 'Author',
        },
        {
          type: 'reference',
          name: 'prev',
          label: 'Previous Post',
          description:
            '(Optional) link to an earlier post at the bottom of this one',
          collections: ['post'],
        },
        {
          type: 'reference',
          name: 'next',
          label: 'Next Post',
          description:
            '(Optional) link to a later post at the bottom of this one',
          collections: ['post'],
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Body',
          isBody: true,
          parser: {
            type: 'mdx',
          },
          templates: [
            {
              name: 'Youtube',
              label: 'Youtube Embed',
              fields: [
                {
                  type: 'string',
                  name: 'embedSrc',
                  label: 'Embed URL',
                  description: 'Looks like this https://www.youtube.com/embed/Yoh2c5RUTiY',
                },
              ],
            },
            {
              name: 'Iframe',
              label: 'Embeded an Iframe',
              fields: [
                { name: 'iframeSrc', type: 'string' },
                {
                  name: 'height',
                  type: 'number',
                  label: 'Height',
                  description: 'The hight of the iframe (in px) ',
                },
              ],
            },
            {
              name: 'CreateAppCta',
              label: '"Create Tina App" Call-to-action',
              fields: [
                {
                  type: 'string',
                  name: 'ctaText',
                  label: 'Button Text',
                },
                {
                  type: 'string',
                  name: 'cliText',
                  label: 'CLI Command Example',
                },
              ],
            },
            {
              name: 'Callout',
              label: 'Callout',
              fields: [
                {
                  type: 'string',
                  name: 'title',
                  label: 'Title',
                },
                {
                  type: 'string',
                  name: 'description',
                  label: 'Description',
                },
                {
                  type: 'string',
                  name: 'url',
                  label: 'URL',
                },
                {
                  type: 'string',
                  name: 'buttonText',
                  label: 'Button Text',
                },
              ],
            },
            {
              name: 'Codesandbox',
              label: 'Codesandbox embed',
              fields: [
                {
                  type: 'string',
                  name: 'embedSrc',
                  label: 'Embed URL',
                },
                {
                  type: 'string',
                  name: 'title',
                  label: 'A11y Title',
                },
              ],
            },
            {
              name: 'Diagram',
              label: 'Diagram',
              fields: [
                {
                  type: 'string',
                  name: 'src',
                },
                {
                  type: 'string',
                  name: 'alt',
                },
              ],
            },
            {
              name: 'WideImage',
              label: 'Wide Image',
              fields: [
                {
                  type: 'image',
                  name: 'src',
                },
                {
                  type: 'string',
                  name: 'alt',
                },
              ],
            },
            {
              name: 'CustomFieldComponentDemo',
              label: 'Field Component Demo [do not use]',
              fields: [{ type: 'string', name: 'test' }],
            },
          ],
        },
      ],
    },
    {
      label: 'AB Test',
      name: 'abtest',
      path: 'content/ab-tests',
      format: 'json',
      fields: [
        {
          type: 'object',
          label: 'tests',
          name: 'tests',
          list: true,
          ui: {
            itemProps: (item) => {
              // Field values are accessed by title?.<Field name>
              return { label: item.testId }
            },
          },
          fields: [
            { type: 'string', label: 'Id', name: 'testId' },
            {
              type: 'string',
              label: 'Page',
              name: 'href',
              description:
                'This is the root page that will be conditionally swapped out',
            },
            {
              type: 'object',
              name: 'variants',
              label: 'Variants',
              list: true,
              fields: [
                { type: 'string', label: 'Id', name: 'testId' },
                {
                  type: 'string',
                  label: 'Page',
                  name: 'href',
                  description:
                    'This is the variant page that will be conditionally used instead of the original',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})
