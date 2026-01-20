import { Template } from "tinacms";

export const recentNewsBannerTemplate: Template = {
  name: 'recentNewsBanner',
  label: 'Recent News Banner',
  ui: {
    previewSrc: '/img/blocks/recent-news-banner.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'link',
      label: 'Link',
      type: 'string',
    },
  ],
};
