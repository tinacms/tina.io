import { type Template, wrapFieldsWithMeta } from 'tinacms';
import IconSelector from '../forms/IconSelector';

// Keep historical content fields independent of the live pricing-page schema.
const fields: Template['fields'] = [
  { name: 'name', label: 'Name', type: 'string' },
  { name: 'description', label: 'Description', type: 'rich-text' },
  {
    name: 'monthlyPrice',
    label: 'Monthly Price (USD)',
    type: 'number',
    description: 'Leave empty to show the Custom Price instead',
  },
  {
    name: 'yearlyPrice',
    label: 'Yearly Price (USD)',
    type: 'number',
    description:
      'Billed once a year. When billed annually, the card shows it per month, plus the total and the saving',
  },
  {
    name: 'customPrice',
    label: 'Custom Price',
    type: 'string',
    description: 'Shown when there is no Monthly Price, e.g. "Custom"',
  },
  { name: 'interval', label: 'Interval', type: 'string' },
  {
    name: 'featuresHeading',
    label: 'Features Heading',
    type: 'string',
    description:
      'Shown above the card items, e.g. "Everything in Free, plus:". Leave empty to show "Includes:"',
  },
  {
    type: 'object',
    name: 'cardItem',
    label: 'Card Item',
    list: true,
    fields: [
      { name: 'name', label: 'Name', type: 'string' },
      {
        name: 'icon',
        label: 'Icon',
        type: 'string',
        description: "Can't find the icon you want? ask a developer to add it",
        ui: { component: wrapFieldsWithMeta(IconSelector) },
      },
      { name: 'description', label: 'Description', type: 'string' },
      {
        name: 'annualDescription',
        label: 'Annual Description',
        type: 'string',
        description:
          '⚠️ If this field is empty, it will show the normal description for both annual and monthly',
      },
    ],
    ui: { itemProps: (item) => ({ key: item.id, label: item.name }) },
  },
  {
    name: 'isStarred',
    label: 'Is Starred?',
    type: 'boolean',
    description: 'Enabling this will add a star to the pricing block',
  },
  {
    name: 'isMuted',
    label: 'Is Muted?',
    type: 'boolean',
    description:
      'Greys out the card so the paid plans stand out, e.g. for the Free plan',
  },
];

export const pricingComparisonTemplate: Template = {
  name: 'PricingComparison',
  label: 'Pricing Before / After',
  fields: [
    {
      name: 'labels',
      label: 'Labels and billing text',
      type: 'object',
      description:
        'Optional translations. Empty fields use the English defaults.',
      fields: [
        ...[
          ['comparison', 'Comparison accessible label'],
          ['version', 'Version control accessible label'],
          ['billingPeriod', 'Billing control accessible label'],
          ['before', 'Before button'],
          ['after', 'After button'],
          ['monthly', 'Monthly button'],
          ['annually', 'Annually button'],
          ['note', 'Pricing note'],
        ].map(([name, label]) => ({ name, label, type: 'string' as const })),
        {
          name: 'annualBillingText',
          label: 'Annual billing text',
          type: 'string',
          description:
            'Use {total} for the annual charge and {saving} for the saving.',
        },
      ],
    },
    ...['before', 'after'].map((name) => ({
      type: 'object' as const,
      name,
      label: name === 'before' ? 'Before' : 'After',
      list: true,
      fields,
      ui: { itemProps: (item) => ({ label: item.name || 'Plan' }) },
    })),
  ],
};
