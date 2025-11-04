export const blockSettings = {
  name: 'blockSettings',
  label: 'Block Settings',
  type: 'object',
  fields: [
    {
      type: 'boolean',
      name: 'isFullscreen',
      label: 'Fullscreen Height',
      component: 'toggle',
    },
    {
      name: 'isHeadingOne',
      label: 'Is it the page H1?',
      description:
        'If true, the block will be styled as the page H1, using the H1_HEADINGS_SIZE class. NOTE: Only 1 block per page should be set to true.',
      type: 'boolean',
      component: 'toggle',
    },
  ],
};
