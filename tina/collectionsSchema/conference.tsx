import IconSelector from "components/forms/IconSelector";
import { wrapFieldsWithMeta } from "tinacms";

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
          ui: {
            component: 'textarea',
          },
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
          label: 'Left Button',
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
        {
          name: 'rightButton',
          label: 'right Button',
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
              ui: {
                component: 'textarea',
              },
            },
            {
              name: 'iconLeft',
              label: 'Icon Left',
              type: 'string',
              description:
                "Can't find the icon you want? ask a developer to add it",
              ui: {
                component: wrapFieldsWithMeta(IconSelector),
              },
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
              ui: {
                component: 'textarea',
              },
            },
            {
              name: 'iconMiddle',
              label: 'Icon Middle',
              type: 'string',
              description:
                "Can't find the icon you want? ask a developer to add it",
              ui: {
                component: wrapFieldsWithMeta(IconSelector),
              },
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
              ui: {
                component: 'textarea',
              },
            },
            {
              name: 'iconRight',
              label: 'Icon Right',
              type: 'string',
              description:
                "Can't find the icon you want? ask a developer to add it",
              ui: {
                component: wrapFieldsWithMeta(IconSelector),
              },
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
          ui: {
            component: 'textarea',
          },
        },
        {
          name: 'socialLink',
          label: 'Primary Social Link',
          type: 'string',
        },
      ],
    },
    
    {
      name: 'speakerSchedule',
      label: 'Speaker Schedule',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item.talkSpeakerName && `${item.talkSpeakerName} -`} ${item.speechTitle}` };
        },
      },
      fields: [
        {
          name: 'speechTitle',
          label: 'speech Title',
          type: 'string',
        },
        {
          name: 'speechDescription',
          label: 'speech Description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
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
          type: 'number',
          description: 'Enter in 24 hour format',
        },
        {
          name: 'talkTimeEnd',
          label: 'Talk Time End',
          type: 'number',
          description: 'Enter in 24 hour format',
        },
        {
          name: 'sessionType',
          label: 'Session Type',
          type: 'string',
          options: ['Talk', 'Workshop', 'Break'],
        },
      ],
    },
  ],
};
