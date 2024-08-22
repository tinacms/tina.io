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
import type { Template, TinaField } from 'tinacms'

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
import { testimonialsTemplate } from '../components/blocks/Testimonials.template'
import { quoteTemplate } from '../components/blocks/Quote.template'
import { eventsTemplate } from '../components/blocks/Events.template'
import { compareBoxTemplate } from '../components/blocks/CompareBox.template'
import { bookingTemplate } from '../components/blocks/Booking.template'
import { mediaComponentTemplate } from '../components/blocks/MediaComponent.template'
import { textAndMediaColumnsComponentTemplate } from '../components/blocks/TextAndMediaColumns.template'
import { imageRowTemplate } from '../components/blocks/ImageRow.template'
import { iconBannerTemplate } from '../components/blocks/IconBanner.template'

const WhatsNewFields: TinaField[] = [
  { name: 'versionNumber', label: 'Version Number', type: 'string' },
  { name: 'dateReleased', label: 'Date Released', type: 'datetime' },
  {
    name: 'body',
    label: 'Body',
    type: 'rich-text',
    isBody: true,
    description:
      'The content of the release notes. Note that h1-h5 are the same size (i.e text-lg in tailwind).',
  },
]

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
            {
              type: 'string',
              label: 'Title',
              name: 'title',
              description:
                "' | Tina' will be appended to the end of the value. If no title is provided, the default title in siteConfig.tsx is used.",
            },
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
            testimonialsTemplate as Template,
            quoteTemplate as Template,
            eventsTemplate as Template,
            compareBoxTemplate as Template,
            bookingTemplate as Template,
            mediaComponentTemplate as Template,
            textAndMediaColumnsComponentTemplate as Template,
            imageRowTemplate as Template,
            iconBannerTemplate as Template
          ],
        },
      ],
    },
    {
      name: 'doc',
      label: 'Docs',
      path: 'content/docs',
      format: 'mdx',
      ui: {
        beforeSubmit: async ({ values, cms, form }) => {
          return {
            ...values,
            last_edited: new Date().toISOString(),
          }
        },
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          type: 'string',
          name: 'last_edited',
          label: 'Last Edited',
          ui: {
            component: 'hidden',
          },
        },
        {
          name: 'next',
          label: 'Next page',
          type: 'reference',
          collections: ['doc', 'examples'],
        },
        {
          name: 'previous',
          label: 'Previous page',
          type: 'reference',
          collections: ['doc', 'examples'],
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Body',
          isBody: true,
          templates: [
            {
              name: 'Youtube',
              label: 'Youtube Embed',
              fields: [
                {
                  type: 'string',
                  name: 'embedSrc',
                  label: 'Embed URL',
                  description:
                    '⚠︎ Only YouTube embed URLs work - they look like this https://www.youtube.com/embed/Yoh2c5RUTiY',
                },
              ],
            },
            {
              name: 'GraphQLCodeBlock',
              label: 'GraphQL Code Block',
              fields: [
                {
                  type: 'string',
                  name: 'query',
                  label: 'Query',
                  description:
                    'Paste GraphQL query here. "#" are auto-inserted as spacing placeholders and should not be used.',
                  ui: {
                    /* TODO - remove as per https://github.com/tinacms/tina.io/issues/2047 */
                    component: 'textarea',
                    format: (val?: string) => val && val.replaceAll('#', ' '),
                    parse: (val?: string) => val && val.replaceAll(' ', '#'),
                  },
                },
                {
                  type: 'string',
                  name: 'response',
                  label: 'Response',
                  description:
                    'Paste GraphQL response data here. "#" are auto-inserted as spacing placeholders and should not be used.',
                  ui: {
                    /* TODO - remove as per https://github.com/tinacms/tina.io/issues/2047 */
                    component: 'textarea',
                    format: (val?: string) => val && val.replaceAll('#', ' '),
                    parse: (val?: string) => val && val.replaceAll(' ', '#'),
                  },
                },
              ],
            },
            {
              name: 'WarningCallout',
              label: 'Warning Callout',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'string',
                  ui: {
                    component: 'textarea',
                  },
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
              name: 'CloudinaryVideo',
              label: 'Cloudinary Video',
              fields: [
                {
                  type: 'string',
                  name: 'src',
                  label: 'Cloudinary URL',
                  description: 'Full URL with no file extension',
                },
              ],
            },
            {
              name: 'ImageAndText',
              label: 'Image and Text',
              fields: [
                {
                  name: 'docText',
                  label: 'docText',
                  isBody: true,
                  type: 'rich-text',
                  description:
                    'DO NOT USE THIS TEMPLATE WHILST YOU SEE THIS MESSAGE //TODO: #1967',
                },
                {
                  name: 'image',
                  label: 'image',
                  type: 'image',
                },
              ],
            },
            {
              name: 'SummaryTab',
              label: 'Summary Tab',
              fields: [
                {
                  name: 'heading',
                  label: 'Heading',
                  type: 'string',
                  description:
                    'DO NOT USE THIS TEMPLATE WHILST YOU SEE THIS MESSAGE //TODO: #1967',
                },
                {
                  name: 'text',
                  label: 'text',
                  isBody: true,
                  type: 'rich-text',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'post',
      label: 'Blog Posts',
      path: 'content/blog',
      format: 'mdx',
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
              name: 'WarningCallout',
              label: 'Warning Callout',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'string',
                  ui: {
                    component: 'textarea',
                  },
                },
              ],
            },
            {
              name: 'Youtube',
              label: 'Youtube Embed',
              fields: [
                {
                  type: 'string',
                  name: 'embedSrc',
                  label: 'Embed URL',
                  description:
                    '⚠︎ Only YouTube embed URLs work - they look like this https://www.youtube.com/embed/Yoh2c5RUTiY',
                },
              ],
            },
            {
              name: 'GraphQLCodeBlock',
              label: 'GraphQL Code Block',
              fields: [
                {
                  type: 'rich-text',
                  name: 'request',
                  label: 'Request',
                  description: 'Paste GraphQL request code here.',
                },
                {
                  type: 'rich-text',
                  name: 'response',
                  label: 'Response',
                  description: 'Paste GraphQL response data here.',
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
            {
              name: 'CloudinaryVideo',
              label: 'Cloudinary Video',
              fields: [
                {
                  type: 'string',
                  name: 'src',
                  label: 'Cloudinary URL',
                  description: 'Full URL with no file extension',
                },
              ],
            },
            {
              name: 'Button',
              label: 'Button',
              fields: [
                {
                  type: 'string',
                  name: 'label',
                  label: 'Label',
                },
                {
                  type: 'string',
                  name: 'link',
                  label: 'Link',
                },
              ],
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
    {
      name: 'examples',
      label: 'Examples',
      path: 'content/examples',
      format: 'json',
      match: {
        include: 'index',
      },
      fields: [
        {
          type: 'object',
          name: 'examples',
          label: 'Examples',
          list: true,
          ui: {
            defaultItem: {
              label: 'Tina Tailwind Starter',
              description: {
                type: 'root',
                children: [
                  {
                    type: 'p',
                    children: [
                      {
                        type: 'text',
                        text: 'A full featured starter that uses tailwind and Tinacms',
                      },
                    ],
                  },
                ],
              },
              image:
                'https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif',
              link: 'https://github.com/tinacms/tina-cloud-starter',
            },
            itemProps: (item) => {
              // Field values are accessed by title?.<Field name>
              return { label: item.label }
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Label',
              name: 'label',
            },
            {
              type: 'rich-text',
              label: 'Description',
              name: 'description',
            },
            {
              type: 'image',
              label: 'Image',
              name: 'image',
            },
            {
              type: 'string',
              label: 'Link',
              name: 'link',
            },
          ],
        },
      ],
    },
    {
      name: 'meetingLinks',
      label: 'Meeting Links',
      path: 'content/meeting-links',
      format: 'json',
      fields: [
        {
          name: 'bookingCard',
          label: 'Booking Card',
          type: 'object',
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item.name,
            }),
          },
          fields: [
            { name: 'name', label: 'Name', type: 'string' },
            { name: 'description', label: 'Description', type: 'string' },
            {
              name: 'image',
              label: 'Image',
              type: 'image',
              description: 'Image headshot for a meeting card',
            },
            {
              name: 'url',
              label: 'URL',
              type: 'string',
              description: 'URL to a meeting link (i.e HubSpot)',
            },
          ],
        },
      ],
    },
    {
      name: 'WhatsNewTinaCMS',
      label: 'Whats new - TinaCMS',
      path: 'content/whats-new-tinacms',
      format: 'mdx',
      fields: WhatsNewFields,
    },
    {
      name: 'WhatsNewTinaCloud',
      label: 'Whats new - TinaCloud',
      path: 'content/whats-new-tinacloud',
      format: 'mdx',
      fields: WhatsNewFields,
    },
  ],
})
