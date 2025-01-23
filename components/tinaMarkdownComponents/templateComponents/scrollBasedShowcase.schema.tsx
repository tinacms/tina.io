import { Template } from 'tinacms';

const ScrollBasedShowcase: Template = {
  label: 'Scroll Based Showcase',
  name: 'scrollBasedShowcase',
  fields: [
    {
      type: 'object',
      label: 'Showcase Items',
      name: 'showcaseItems',
      list: true,
      ui: {
        defaultItem: {
          title: 'Title',
          image: '/img/placeholder.png',
          content: {
            type: 'root',
            children: [
              {
                type: 'p',
                children: [
                  {
                    type: 'text',
                    text: 'Default Text. Edit me!',
                  },
                ],
              },
            ],
          },
          useAsSubsection: false,
        },
        itemProps: (item) => {
          return {
            label: item.title,
          };
        },
      },
      fields: [
        {
          type: 'image',
          label: 'Image',
          name: 'image',
        },
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'boolean',
          label: 'Use as Subsection',
          name: 'useAsSubsection',
        },
        {
          type: 'rich-text',
          label: 'Content',
          name: 'content',
        },
      ],
    },
  ],
};

export default ScrollBasedShowcase;
