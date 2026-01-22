export const recentPostsTemplate = {
  name: 'recentPosts',
  label: 'Recent Posts',
  ui: {
    previewSrc: '/img/blocks/recent-posts.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'featuredHeading',
      label: 'Featured Heading',
      type: 'string',
      description: 'Heading for the featured post section',
    },
    {
      name: 'featuredPost',
      label: 'Featured Post',
      type: 'object',
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
          ui: {
            component: 'textarea',
          },
        },
        {
          name: 'url',
          label: 'URL',
          type: 'string',
          description: 'Link URL for the post title',
        },
        {
          name: 'datePosted',
          label: 'Date Posted',
          type: 'datetime',
        },
        {
          name: 'authorName',
          label: 'Author Name',
          type: 'string',
        },
        {
          name: 'authorUrl',
          label: 'Author URL',
          type: 'string',
          description: 'The SSW People URL of the author',
        },
        {
          name: 'imageUrl',
          label: 'Image',
          type: 'image',
          description: 'use an image with a 16:9 aspect ratio for best results',
        },
      ],
    },
    {
      name: 'youtubeVideos',
      label: 'YouTube Videos',
      type: 'object',
      list: true,
      ui: {
        min: 0,
        max: 2,
        itemProps: (item) => ({
          label: item.title,
        }),
      },
      fields: [
        {
          name: 'embedUrl',
          label: 'YouTube Embed URL',
          type: 'string',
          description:
            'The YouTube Embed URL of the video, formatted like https://www.youtube.com/embed/<id>',
        },
        {
          name: 'dateReleased',
          label: 'Date Released',
          type: 'datetime',
        },
        { name: 'title', label: 'Title', type: 'string' },
        { name: 'authorName', label: 'Author Name', type: 'string' },
        {
          name: 'authorUrl',
          label: 'Author URL',
          type: 'string',
          description: 'The SSW People URL of the author',
        },
      ],
    },
  ],
};
