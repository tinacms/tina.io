export const socialTemplate = {
  name: 'social',
  label: 'Social Links',
  ui: {
    defaultItem: {
      tina: 'https://github.com/tinacms/tinacms/discussions',
      discord: 'https://discord.com/invite/zumN63Ybpf',
      github: 'https://github.com/tinacms/tinacms',
      twitter: 'https://twitter.com/tinacms',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'tina',
      label: 'Tina',
    },
    {
      type: 'string',
      name: 'discord',
      label: 'Discord',
    },
    {
      type: 'string',
      name: 'github',
      label: 'Github',
    },
    {
      type: 'string',
      name: 'twitter',
      label: 'Twitter',
    },
  ],
}
