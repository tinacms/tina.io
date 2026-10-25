import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Jest 25 cannot load Tina's ESM bundle. Exercise its anchor override contract.
jest.doMock('tinacms/dist/rich-text', () => ({
  TinaMarkdown: ({ components }) =>
    React.createElement(
      components.a || 'a',
      { href: 'https://example.com/checkout' },
      'Linked description',
    ),
}));
jest.doMock('../Table/table', () => ({ LINK_CLASSES: 'underline' }));
jest.doMock('utils/renderButtonArrayHelper', () => ({
  __esModule: true,
  default: () => {
    throw new Error('Historical comparisons must not render checkout buttons');
  },
}));

const { PlanCard } = require('./PlanCard') as typeof import('./PlanCard');

it('renders historical pricing without links, buttons or add-on controls', () => {
  const data = {
    name: 'Historical plan',
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: {
      type: 'root',
      children: [
        {
          type: 'p',
          children: [
            {
              type: 'a',
              url: 'https://example.com/checkout',
              children: [{ type: 'text', text: 'Linked description' }],
            },
          ],
        },
      ],
    },
    buttons: [{ label: 'Buy now', url: 'https://example.com/checkout' }],
    addOn: { isEnabled: true, name: 'SSO', monthlyPrice: 180 },
    cardItem: [
      { name: 'Linked feature', link: 'https://example.com/checkout' },
    ],
  } as unknown as Parameters<typeof PlanCard>[0]['data'];
  const element = document.createElement('div');
  element.innerHTML = renderToStaticMarkup(
    <PlanCard data={data} isMonthly comparison />,
  );

  expect(element.textContent).toContain('Linked description');
  expect(element.textContent).toContain('Linked feature');
  expect(element.textContent).toContain('$29');
  expect(element.querySelector('a, button, input[type="checkbox"]')).toBeNull();
});
