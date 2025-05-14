export const settingCollection = {
  name: 'settings',
  label: 'Settings',
  path: 'content/settings',
  format: 'json',
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
    },
    {
      name: 'sidebarTitle',
      label: 'Sidebar Title',
      type: 'string',
    },
    {
      name: 'seoDefaultTitle',
      label: 'SEO Default Title',
      type: 'string',
    },
    {
      name: 'publisher',
      label: 'Publisher',
      type: 'string',
    },
    {
      name: 'applicationName',
      label: 'Application Name',
      type: 'string',
    },
    {
      name: 'siteUrl',
      label: 'Site URL',
      type: 'string',
    },
    {
      name: 'roadmapUrl',
      label: 'Roadmap URL',
      type: 'string',
    },
    {
      name: 'licenseUrl',
      label: 'License URL',
      type: 'string',
    },
    {
      name: 'keywords',
      label: 'Keywords',
      type: 'string',
    },
    {
      name: 'docsHomepage',
      label: 'Docs Homepage',
      type: 'string',
    },
    {
      name: 'defaultOGImage',
      label: 'Default OG Image',
      type: 'image',
      uploadDir: () => 'og',
    },
    {
      name: 'social',
      label: 'Social',
      type: 'object',
      fields: [
        {
          name: 'twitterHandle',
          label: 'Twitter Handle',
          type: 'string',
        },
        {
          name: 'twitter',
          label: 'Twitter',
          type: 'string',
        },
        {
          name: 'github',
          label: 'GitHub',
          type: 'string',
        },
        {
          name: 'forum',
          label: 'Forum',
          type: 'string',
        },
      ],
    },
  ],
};
