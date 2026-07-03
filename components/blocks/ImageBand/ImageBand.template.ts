import type { Template } from 'tinacms';

export const imageBandTemplate: Template = {
  label: 'Image Band',
  name: 'imageBand',
  fields: [
    { name: 'image', label: 'Image', type: 'image' },
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers.',
    },
    { name: 'caption', label: 'Caption', type: 'string' },
  ],
};
