import type { Template } from 'tinacms';

export const videoEmbedTemplate: Template = {
  label: 'Video Embed',
  name: 'videoEmbed',
  fields: [
    { name: 'altText', label: 'Alt Text', type: 'string' },
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'externalVideoLink', type: 'string', label: 'External Video Link' },
    { name: 'figureCaption', label: 'Figure Caption', type: 'string' },
  ],
};
