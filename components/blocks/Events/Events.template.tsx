import React, { useEffect, useState } from 'react';

import 'react-datetime/css/react-datetime.css';
import type { Template } from 'tinacms';

export const eventsTemplate: Template = {
  label: '<⭐> Events – prepopulated ✨',
  name: 'events',
  ui: {
    previewSrc: '/img/blocks/events.png',
  },
  fields: [
    {
      type: 'string',
      name: 'tip',
      label: 'Tip',
      ui: {
        component: () => {
          return (
            <div className="">
              Edit Events in the NEW{' '}
              <a
                className="underline text-red-600"
                href="/admin/index.html#/collections/edit/events/master-events"
              >
                events collection
              </a>
            </div>
          );
        },
      },
    },
  ],
};
