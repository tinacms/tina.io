export const testCollection = {
  name: 'test',
  label: 'Test Collection',
  path: 'content/test',
  format: 'json',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
    },
    {
      type: 'boolean',
      name: 'isActive',
      label: 'Active',
    },
  ],
};
