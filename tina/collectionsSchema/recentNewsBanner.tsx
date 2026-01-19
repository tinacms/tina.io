export const recentNewsBannerCollection = {
  name: 'recentNewsBanner',
  label: 'Recent News Banner',
  path: 'content/recent-news-banner',
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
      name: 'updateCategory',
      label: 'Update Category',
      type: 'string',
      description: 'Text displayed in the badge (e.g., "New Video", "Recent News")',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      description: 'Main message text displayed between the badge and button',
    },
    {
      name: 'linkTitle',
      label: 'Link Title',
      type: 'string',
      description: 'Text displayed on the button (e.g., "Watch Now", "Learn More")',
    },
    {
      name: 'link',
      label: 'Link',
      type: 'string',
      description: 'URL destination for the button',
    },
  ],
};
