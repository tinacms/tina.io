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
      ui: { itemProps: (item) => ({ label: item.name }) },
    };
  });

export const pricingComparisonTemplate: Template = {
  name: 'PricingComparison',
  label: 'Pricing Before / After',
  fields: ['before', 'after'].map((name) => ({
    type: 'object',
    name,
    label: name === 'before' ? 'Before' : 'After',
    list: true,
    fields,
    ui: { itemProps: (item) => ({ label: item.name || 'Plan' }) },
  })),
};
