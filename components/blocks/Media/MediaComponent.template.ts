import type { Template } from 'tinacms';
import { youtubeMediaTemplate } from '../../sharedTemplates/YoutubeMediaTemplate';

export const mediaComponentTemplate: Template = {
  label: 'Media Grid',
  name: 'mediaComponent',
  ui: {
    previewSrc: '/img/blocks/media.png',
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'mediaItem',
      label: 'Media Item',
      type: 'object',
      list: true,
      templates: [youtubeMediaTemplate as Template],
    },
  ],
};
