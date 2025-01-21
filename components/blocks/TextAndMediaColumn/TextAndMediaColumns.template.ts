import { Template } from 'tinacms';
import { cloudinaryMediaComponent } from '../../sharedTemplates/CloudinaryMedia.template';
import { youtubeMediaTemplate } from '../../sharedTemplates/YoutubeMediaTemplate';

export const textAndMediaColumnsComponentTemplate: Template = {
  label: 'Text and Media Column Component',
  name: 'textMediaColumnComponent',
  ui: {
    previewSrc: '/img/blocks/text-and-media-column.png',
  },
  fields: [
    {
      name: 'isVideoOnLeft',
      label: 'Video on Left?',
      type: 'boolean',
      ui: { component: 'toggle' },
    },
    { name: 'body', label: 'Body', type: 'rich-text', isBody: true },
    {
      name: 'mediaColumnItem',
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
