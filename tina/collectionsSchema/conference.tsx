export const conferenceTinaCMSCollection = {
  name: 'conference',
  label: 'Conference',
  path: 'content/conference',
  format: 'mdx',
  ui: {
    allowedActions: {
      delete: false,
      create: false,
    },
  },
  fields: [
    // Banner section
    {
      name: 'banner',
      label: 'Banner',
      type: 'object',
      fields: [
        {
          name: 'bannerTitle',
          label: 'Banner Title',
          type: 'string',
        },
        {
          name: 'bannerDescription',
          label: 'Banner Description',
          type: 'string',
        },
        {
          name: 'date',
          label: 'Date',
          type: 'string',
        },
        {
          name: 'time',
          label: 'Time',
          type: 'string',
        },
        {
          name: 'location',
          label: 'Location',
          type: 'string',
        },
        {
          name: 'actionButton',
          label: 'Action Button',
          type: 'object',
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
        },
      ],
    },
    // About section
    {
      name: 'about',
      label: 'About',
      type: 'object',
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'rich-text',
        },
        {
          name: 'keyHighlights',
          label: 'Key Highlights',
          type: 'object',
          fields: [
            {
              name: 'headerLeft',
              label: 'Header Left',
              type: 'string',
            },
            {
              name: 'descriptionLeft',
              label: 'Description Left',
              type: 'string',
            },
            {
              name: 'headerMiddle',
              label: 'Header Middle',
              type: 'string',
            },
            {
              name: 'descriptionMiddle',
              label: 'Description Middle',
              type: 'string',
            },
            {
              name: 'headerRight',
              label: 'Header Right',
              type: 'string',
            },
            {
              name: 'descriptionRight',
              label: 'Description Right',
              type: 'string',
            },
          ],
        },
      ],
    },
    // Speakers section (max 7)
    {
      name: 'speakers',
      label: 'Speakers',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.name,
          };
        },
        max: 7,
      },
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          name: 'position',
          label: 'Position',
          type: 'string',
        },
        {
          name: 'image',
          label: 'Image',
          type: 'image',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
        },
        {
          name: 'socialLink',
          label: 'Primary Social Link',
          type: 'string',
        },
      ],
    },
    // Workshops section (max 7)
    {
      name: 'workshops',
      label: 'Workshops',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.name };
        },
        max: 7,
      },
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
        },
        {
          name: 'workshopType',
          label: 'Workshop Type',
          type: 'string',
        },
        {
          name: 'workshopDuration',
          label: 'Workshop Duration',
          type: 'string',
        },
        {
          name: 'presenterName',
          label: 'Presenter Name',
          type: 'string',
        },
        {
          name: 'presenterImage',
          label: 'Presenter Image',
          type: 'image',
        },
        {
          name: 'presenterDescription',
          label: 'Presenter Description',
          type: 'string',
        },
        {
          name: 'presenterSocialLink',
          label: 'Presenter Social Link',
          type: 'string',
        },
        {
          name: 'workshopTimeStart',
          label: 'Workshop Time Start',
          type: 'datetime',
        },
        {
          name: 'workshopTimeEnd',
          label: 'Workshop Time End',
          type: 'datetime',
        },
      ],
    },
    // Schedule section
    {
      name: 'speakerSchedule',
      label: 'Speaker Schedule',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.speachTitle };
        },
      },
      fields: [
        {
          name: 'speachTitle',
          label: 'Speach Title',
          type: 'string',
        },
        {
          name: 'speachDescription',
          label: 'Speach Description',
          type: 'string',
        },
        {
          name: 'talkSpeakerName',
          label: 'Talk Speaker Name',
          type: 'string',
        },
        {
          name: 'talkSpeakerImage',
          label: 'Talk Speaker Image',
          type: 'image',
        },
        {
          name: 'talkTimeStart',
          label: 'Talk Time Start',
          type: 'datetime',
        },
        {
          name: 'talkTimeEnd',
          label: 'Talk Time End',
          type: 'datetime',
        },        
      ],
    },
  ],
};
