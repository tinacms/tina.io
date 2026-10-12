import { type Template, wrapFieldsWithMeta } from 'tinacms';
import RoadmapIconSelector from '../../forms/RoadmapIconSelector';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';

export const roadmapGridTemplate: Template = {
  label: 'Roadmap Grid',
  name: 'roadmapGrid',
  ui: {
    previewSrc: '/img/blocks/roadmap.png',
    itemProps: (item) => ({
      label: item.headline,
      key: item.id,
    }),
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'items',
      label: 'Roadmap Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          // `heading` is rich-text — its admin value is an AST object, so pull
          // the first line of text for a readable sidebar label.
          label:
            item.heading?.children?.[0]?.children?.[0]?.text || 'Roadmap Item',
        }),
      },
      fields: [
        {
          name: 'icon',
          label: 'Status Icon',
          type: 'string',
          description:
            'Status marker shown before the headline: done, in progress, or coming soon.',
          ui: {
            component: wrapFieldsWithMeta(RoadmapIconSelector),
          },
        },
        {
          // Named `heading` (not `headline`) to avoid a GraphQL fragment
          // type-conflict: sibling blocks (FeatureGrid, Showcase, etc.) expose
          // a String `items.headline`, which clashes with this rich-text field.
          name: 'heading',
          label: 'Headline',
          type: 'rich-text',
          description:
            'Supports inline formatting. Use strikethrough (~~text~~) to cross out completed or dropped items.',
        },
        { name: 'status', label: 'Status', type: 'string' },
        {
          name: 'content',
          label: 'Content',
          type: 'rich-text',
        },
        actionsButtonTemplate as any,
      ],
    },
    {
      name: 'options',
      label: 'Options',
      description: 'LEGACY. DO NOT USE ⚠️.',
      type: 'object',
      fields: [
        { name: 'paddingTop', label: 'Top Padding', type: 'boolean' },
        { name: 'paddingBottom', label: 'Bottom Padding', type: 'boolean' },
      ],
    },
  ],
};
