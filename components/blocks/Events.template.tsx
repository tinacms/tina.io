import type { Template } from 'tinacms'
import { NumberField, wrapFieldsWithMeta } from 'tinacms'
import React from 'react'

const convertAndFormat = (value, prefix) => {
  return { value: prefix + value, label: `GMT ${prefix}${Math.floor(value)}:${value % 1 ? "3" : "0"}0` }
}
const positiveTimezoneList = Array.from(Array(29).keys()).map(value => convertAndFormat(value / 2, '+')).reverse()
const negativeTimezoneList = Array.from(Array(24).keys()).map(value => convertAndFormat((value / 2) + 0.5, '-'))

export const eventsTemplate: Template = {
  label: 'Events',
  name: 'events',
  ui: {
    previewSrc: '',
  },
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    {
      name: 'cardItems',
      label: 'Card Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'startDate', 
          label: 'Start Date', 
          type: 'datetime', 
          description:
            'Enter date & time in the timezone of the event.',
          ui: {
            component: 'date',
            timeFormat: true,
            utc: true
          }, 
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'datetime',
          description:
            'Note this field is not mandatory. Leave blank if no end date specified (or only 1 day event).',
          ui: {
            timeFormat: true,
          },
        },
        {
          name: 'timezone',
          label: 'Timezone',
          type: 'number',
          description:
            'Please select the timezone the event is being held in. GMT and UTC are analagous.',
          ui: {
            parse: (value) => Number(value),
            component: 'select',
            options: [
              ...positiveTimezoneList,
              ...negativeTimezoneList
            ]
          }
        },
        { name: 'location', label: 'Location', type: 'string' },
        { name: 'image', label: 'Image', type: 'image' },
        { name: 'link', label: 'URL', type: 'string' },
        {
          name: 'markerLAT',
          label: 'Marker Latitude',
          type: 'number',
          description:
            'Note this field corresponds to the Latitude position of the marker on the globe.',
        },
        {
          name: 'markerLONG',
          label: 'Marker Longitude',
          type: 'number',
          description:
            'Note this field corresponds to the Longitude position of the marker on the globe.',
        },
      ],
    },
  ],
}
