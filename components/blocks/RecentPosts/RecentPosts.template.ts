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
          description: 'Time doesnt matter we only use day, month and year',
        },
        { name: 'title', label: 'Title', type: 'string' },
        { name: 'authorName', label: 'Author Name', type: 'string' },
        {
          name: 'authorUrl',
          label: 'Author URL',
          type: 'string',
          description: 'The SSW People URL of the author',
        },
        {
          name: 'thumbnailImage',
          label: 'Thumbnail Image',
          type: 'image',
        },
      ],
    },
  ],
};
