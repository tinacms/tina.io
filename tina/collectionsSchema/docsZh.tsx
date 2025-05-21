import { docsCollection } from './docs';

export const docsZhCollection = {
  ...docsCollection,
  name: 'docZh',
  label: 'Chinese Docs',
  path: 'content/docs-zh',
  fields: [
    ...docsCollection.fields.filter(
      (field) => field.name !== 'next' && field.name !== 'previous'
    ),
    {
      name: 'next',
      label: 'Next page',
      type: 'reference',
      collections: ['docZh', 'doc'],
    },
    {
      name: 'previous',
      label: 'Previous page',
      type: 'reference',
      collections: ['docZh', 'doc'],
    },
  ],
};
