import type { Template } from 'tinacms';
import { cardTemplate } from '../blocks/Pricing/Pricing.template';

// Historical comparisons must not offer old checkout links or interactive add-ons.
const fields = cardTemplate.fields
  .filter((field) => field.name !== 'buttons' && field.name !== 'addOn')
  .map((field): Template['fields'][number] => {
    if (field.name !== 'cardItem' || field.type !== 'object' || !field.fields) {
      return field;
    }
    return {
      type: 'object',
      name: field.name,
      label: field.label,
      list: true,
      fields: field.fields.filter((item) => item.name !== 'link'),
      ui: { itemProps: (item) => ({ key: item.id, label: item.name }) },
    };
  });

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
