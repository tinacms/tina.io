import { type Template, wrapFieldsWithMeta } from 'tinacms';

import IconSelector from '../../forms/IconSelector';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '../CodeButton/CodeButton.template';
import { modalButtonTemplate } from '../ModalButton/ModalButton.template';
import { tableTemplate } from '../Table/table.template';

export const cardTemplate: Template = {
  name: 'card',
  label: 'Card',
  //@ts-expect-error
  type: 'object',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'rich-text',
    },
    {
      name: 'price',
      label: 'Monthly Price',
      type: 'string',
    },
    {
      name: 'annualPrice',
      label: 'Annual Price',
      type: 'string',
    },
    {
      name: 'annualDescription',
      label: 'Annual Description',
      type: 'string',
    },
    {
      name: 'interval',
      label: 'Interval',
      type: 'string',
    },
    {
      name: 'featuresHeading',
      label: 'Features Heading',
      type: 'string',
      description:
        'Shown above the card items, e.g. "Everything in Free, plus:". Leave empty to show "Includes:"',
    },
    {
      name: 'cardItem',
      label: 'Card Item',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
      },
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'string',
          description:
            "Can't find the icon you want? ask a developer to add it",
          ui: {
            component: wrapFieldsWithMeta(IconSelector),
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
        },
        {
          name: 'annualDescription',
          label: 'Annual Description',
          type: 'string',
          description:
            '⚠️ If this field is empty, it will show the normal description for both annual and monthly',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
          description: 'Optional URL that turns the item name into a link',
        },
      ],
    },
    {
      name: 'addOn',
      label: 'Add-on',
      type: 'object',
      description:
        'Optional add-on with a checkbox on the card. Ticking it adds its price to the price and annual total shown on the card',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'string',
          description: 'e.g. "Add SSO"',
        },
        {
          name: 'monthlyPrice',
          label: 'Monthly Price (USD)',
          type: 'number',
        },
      ],
    },
    {
      label: 'Buttons',
      list: true,
      name: 'buttons',
      type: 'object',
      ui: {
        visualSelector: true,
      },
      templates: [
        actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
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
  ],
};

export const pricingTemplate: Template = {
  name: 'pricing',
  label: 'Pricing',
  ui: {
    previewSrc: '/img/blocks/pricing.png',
    defaultItem: {
      intro:
        '**No surprises. **Predictable pricing for every project. Complete control of your content, forever.\n\nTina’s source code is open-source. Your content lives in accessible formats right in your Git repository.\n',
    },
  },
  fields: [
    {
      name: 'headline',
      label: 'Headline',
      type: 'string',
    },
    {
      name: 'freeTier',
      label: 'Free Tier',
      type: 'object',
      description: 'Shown as the first card in the row of pricing plans',
      fields: cardTemplate.fields as any,
    },
    {
      name: 'intro',
      label: 'Intro Text',
      type: 'rich-text',
    },
    {
      name: 'pillSwitchVisibileText',
      label: 'Pill Switch Visible Text',
      type: 'rich-text',
      description: 'this is the text displayed regardless of the switch',
    },
    {
      name: 'pillSwitchToggleText',
      label: 'Pill Switch Toggle Text',
      type: 'rich-text',
      description: 'this is the text displayed depending on the toggle',
    },
    {
      name: 'plans',
      label: 'Pricing Plans',
      // @ts-expect-error
      type: cardTemplate.type,
      list: true,
      fields: cardTemplate.fields as any,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
        defaultItem: {
          name: 'Pricing Tier',
          price: '$99',
          interval: 'month',
        },
      },
    },
    {
      name: 'comparisonTable',
      label: 'Plan Comparison Table',
      type: 'object',
      fields: tableTemplate.fields,
    },
  ],
};
