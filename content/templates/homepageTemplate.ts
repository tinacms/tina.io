export const FeaturedItemsFields = [
  {
    label: 'Headline',
    name: 'headline',
    component: 'text'
  },
  {
    label: 'Subline',
    name: 'subline',
    component: 'text'
  },
  {
    label: 'Media',
    name: 'media',
    component: 'group',
    fields: [
      {
        label: 'Media Source',
        name: 'src',
        component: 'text'
      }
    ]
  }
]

export const CallToActionFields = [
  {
    label: 'Headline',
    name: 'headline',
    component: 'text'
  },
  {
    label: 'Subline',
    name: 'subline',
    component: 'text'
  },
  {
    label: 'Action Items',
    name: 'actionItems',
    component: 'group-list',
    fields: [
      {
        label: 'Action Label',
        name: 'label',
        component: 'text'
      },
      {
        label: 'Action Variant',
        name: 'variant',
        component: 'select',
        options: [ 'button', 'link' ]
      },
      {
        label: 'Action URL',
        name: 'url',
        component: 'text',
        //TO DO: Determine why validate blows up application
        // validate: (value: string) => {
        //   console.log(typeof value)
        //   if (!value?.startsWith('http')) {
        //     return 'Not a valid URL, try again'
        //   }
        //   return undefined
        // }
      },
      {
        label: 'Action Icon',
        name: 'icon',
        component: 'select',
        options: ['', 'arrowRight']
      }
    ],
    itemProps: (item: any) => ({
      key: item.name,
      label: `Action: ${item.label || 'New Action'}`,
    }),
  },
]

const HomePageTemplate = {
  label: 'Home Page',
  defaultItem: {},
  fields: [
    // TODO: refacor to SEO atom
    { name: 'title', label: 'Page Title', component: 'text' },
    { name: 'description', label: 'Page Description', component: 'textarea' },
    {
      label: 'Page Hero',
      name: 'hero',
      description: 'Update content for the page hero',
      component: 'group',
      fields: [
        ...CallToActionFields,
        {
          label: 'Hero Video',
          name: 'video',
          component: 'group',
          fields: [
            {
              label: 'Video sources',
              name: 'videoSources',
              component: 'group-list',
              fields: [
                { label: 'source', name: 'vSrc', component: 'text'},
                { label: 'type', name: 'vType', component: 'select', options: ['mp4', 'webm']}
              ]
            },
            {
              label: 'Video Thumbnail',
              name: 'thumbnail',
              component: 'text'
            }
          ]
        }
      ]
    },
    {
      label: "Value Props",
      name: "valueProps",
      description: "Update the value props for the page",
      component: "group",
      fields: [
        {
          label: 'Headline',
          name: 'headline',
          component: 'markdown'
        },
        {
          label: 'Subline',
          name: 'subline',
          component: 'text'
        },
        {
          label: "Tina Value Props",
          name: "valueItems",
          component: 'group-list',
          fields: [FeaturedItemsFields],
          itemProps: (item: any) => ({
            key: item.name,
            label: `Value Prop: ${item.headline || 'New Value Prop'}`,
          }),
        }
      ]
    },
    {
      label: 'Page Demo',
      name: 'demo',
      description: "Update the Tina Demo",
      component: 'group',
      fields: [
        {
          label: 'Headline',
          name: 'headline',
          component: 'markdown'
        },
        {
          label: 'Subline',
          name: 'subline',
          component: 'text'
        },
        {
          label: 'CodeSandbox URL',
          name: 'codeSandbox',
          component: 'text'
        }
      ]
    },
    {
      label: 'Page Features',
      name: 'features',
      description: 'Update the features of Tina',
      component: 'group',
      fields: [
        {
          label: 'Headline',
          name: 'headline',
          component: 'markdown'
        },
        {
          label: 'Subline',
          name: 'subline',
          component: 'text'
        },
        {
          label: 'Featured Items',
          name: 'items',
          component: 'group-list',
          fields: [
            {
              label: 'Headline',
              name: 'headline',
              component: 'text'
            },
            {
              label: 'Subline',
              name: 'subline',
              component: 'text'
            },
            {
              label: 'Featured Item',
              name: 'isFeatured',
              component: 'toggle'
            },
            {
              label: 'Item Icon',
              name: 'icon',
              component: 'select',
              options: ['', 'arrowRight']
            },
            {
              label: 'Media',
              name: 'media',
              component: 'group',
              fields: [
                {
                  label: 'Media Source',
                  name: 'src',
                  component: 'text'
                }
              ]
            }
          ]
        }
      ],
      itemProps: (item: any) => ({
        key: item.name,
        label: `Feature: ${item.label || 'New Feature'}`,
      }),
    },
    {
      label: "Ecosystem",
      name: "ecosystem",
      description: "Update the ecosystem features",
      component: "group",
      fields: [
        {
          label: 'Headline',
          name: 'headline',
          component: 'markdown'
        },
        {
          label: 'Subline',
          name: 'subline',
          component: 'text'
        },
        {
          label: "Tina Ecosystem Features",
          name: "valueItems",
          component: 'group-list',
          fields: [
            ...FeaturedItemsFields,
            {
              label: 'Link URL',
              name: 'url',
              component: 'text'
            }
          ],
          itemProps: (item: any) => ({
            key: item.name,
            label: `Ecosystem Prop: ${item.headline || 'New Ecosystem Prop'}`,
          }),
        }
      ]
    },
    {
      label: 'Call To Action',
      name: 'cta',
      description: 'Update the call to action',
      component: 'group',
      fields: CallToActionFields
    }
  ],
}

export default HomePageTemplate
