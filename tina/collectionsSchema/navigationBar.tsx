const modals = ['BookDemo', 'EmailForm'];
const iconOptions = ['FaCalendarDay', 'MdEmail'];

import { modalButtonTemplateFields } from '../../components/blocks/ModalButton/ModalButton.template';

export const navigationBarCollection = {
  label: 'Navigation Bar',
  name: 'navigationBar',
  path: 'content/navigationBar',
  format: 'json',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      name: 'navItem',
      label: 'Navigation Item',
      list: true,
      type: 'object',
      templates: [
        {
          name: 'GitHubStarButton',
          label: 'GitHub Star Button',
          description:
            'Values are inserted in a GET request to the GitHub API via api.github.com/repos/{owner}/{repo}',
          ui: {
            itemProps: (item) => {
              return { label: '⭐️ ' + item?.owner + '/' + item?.repo };
            },
          },
          fields: [
            {
              name: 'owner',
              label: 'Project Owner',
              type: 'string',
            },
            {
              name: 'repo',
              label: 'Repository Name',
              type: 'string',
            },
          ],
        },
        {
          name: 'stringItem',
          label: 'String Item',
          ui: {
            itemProps: (item) => {
              return { label: '🔗 ' + item?.label };
            },
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'string',
            },
            {
              name: 'href',
              label: 'href',
              type: 'string',
            },
          ],
        },
        {
          name: 'groupOfStringItems',
          label: 'Group Of String Items',
          list: true,
          type: 'object',
          ui: {
            itemProps: (item) => {
              return { label: '🗂️ ' + item?.label };
            },
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'string',
            },
            {
              name: 'items',
              label: 'Page or Submenu',
              type: 'object',
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
              },
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'string',
                },
                {
                  name: 'href',
                  label: 'href',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          label: 'Modal Button',
          name: 'modalButton',
          type: 'object',
          ui: {
            itemProps: (item) => {
              return { label: '🍌 ' + item?.label };
            },
            defaultItem: {
              variant: 'default',
              label: 'Secondary Action',
              icon: false,
              size: 'medium',
            },
          },
          fields: [
            ...modalButtonTemplateFields,
            {
              name: 'icon2',
              label: 'Icon',
              type: 'string',
              options: iconOptions,
              description:
                'If you want a new icon added please ask a developer :)',
            },
          ],
        },
      ],
    },
  ],
};
