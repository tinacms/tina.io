import type { Template } from 'tinacms';

export const faqTemplate: Template = {
  label: 'FAQ',
  name: 'faq',
  ui: {
    previewSrc: '/img/blocks/faq.png',
    defaultItem: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What is Tina?',
          answer:
            'Tina is a Git-backed headless content management system that enables developers and content creators to collaborate seamlessly. With Tina, developers can create a custom visual editing experience that is perfectly tailored to their site.\n',
        },
      ],
      color: 'seafoam',
    },
  },
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    {
      name: 'intro',
      label: 'Introduction',
      type: 'rich-text',
    },
    {
      name: 'questions',
      label: 'Questions',
      type: 'object',
      list: true,
      fields: [
        { name: 'question', label: 'Question', type: 'string' },
        {
          name: 'answer',
          label: 'Answer',
          type: 'rich-text',
        },
      ],
    },
    {
      name: 'color',
      label: 'Color',
      type: 'string',
      options: [
        {
          label: 'Gradient',
          value: 'gradient',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
    },
  ],
};
