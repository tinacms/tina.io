import { blogsCollection } from './blogs';
export const blogsZhCollection = {
  ...blogsCollection,
  name: 'postZh',
  label: 'Chinese Blog Posts',
  path: 'content/blog-zh',
  fields: [
    ...blogsCollection.fields.filter(
      (field) => field.name !== 'next' && field.name !== 'prev'
    ),
    {
      name: 'next',
      label: 'Next Post',
      type: 'reference',
      description: '(Optional) link to a later post at the bottom of this one',
      collections: ['postZh', 'post'],
    },
    {
      name: 'prev',
      label: 'Previous Post',
      type: 'reference',
      description:
        '(Optional) link to an earlier post at the bottom of this one',
      collections: ['postZh', 'post'],
    },
  ],
};
