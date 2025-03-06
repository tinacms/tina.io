import { Template } from 'tinacms';
import { cloudinaryMediaComponent } from '../../sharedTemplates/CloudinaryMedia.template';
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
      templates: [
        cloudinaryMediaComponent as Template,
        youtubeMediaTemplate as Template,
      ],
    },
  ],
};
