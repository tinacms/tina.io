import type { TinaField } from 'tinacms';

const changesObjectFields: TinaField[] = [
  { name: 'gitHubName', label: 'GitHub Name', type: 'string' },
  { name: 'gitHubLink', label: 'GitHub Link', type: 'string' },
  { name: 'pull_request_number', label: 'Pull Request Number', type: 'string' },
  { name: 'pull_request_link', label: 'Pull Request Link', type: 'string' },
  { name: 'commit_hash', label: 'Commit Hash', type: 'string' },
  { name: 'commit_link', label: 'Commit Link', type: 'string' },
  {
    name: 'changesDescription',
    label: 'Changes Description',
    type: 'string',
  },
];

export const WhatsNewFields: TinaField[] = [
  { name: 'versionNumber', label: 'Version Number', type: 'string' },
  { name: 'dateReleased', label: 'Date Released', type: 'datetime' },
  {
    name: 'changesObject',
    label: 'Changes Object',
    type: 'object',
    list: true,
    fields: [
      { name: 'changesTitle', label: 'Changes Title', type: 'string' },
      {
        name: 'changesList',
        label: 'Changes List',
        type: 'object',
        list: true,
        fields: changesObjectFields,
        ui: {
          itemProps: (item) => {
            return {
              label: `🗂️ ${item?.changesDescription?.substring(0, 50) ?? 'Unnamed Change'}`,
            };
          },
        },
      },
    ],
    ui: {
      itemProps: (item) => {
        return { label: `📋 ${item?.changesTitle ?? 'Unnamed Section'}` };
      },
    },
  },
];
