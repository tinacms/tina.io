import type { Template } from 'tinacms'
import { NumberField, NumberFieldPlugin, NumberInput, TextField, wrapFieldsWithMeta } from 'tinacms'
import React from 'react'

const formatTimezoneOption = (value, prefix = "+") => {
  return { value: value, label: `GMT ${prefix}${Math.floor(value)}:${value % 1 ? "3" : "0"}0` }
}

const positiveTimezoneList = Array.from(Array(29).keys()).map(value => formatTimezoneOption(value / 2)).reverse()
const negativeTimezoneList = Array.from(Array(24).keys()).map(value => 
  {
  const tempOption = formatTimezoneOption((value / 2) + 0.5, '-')
    return {value: tempOption.value * -1, label: tempOption.label}
  })

const timeFormat = Intl.DateTimeFormat('en-US', {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});

const timezoneValidation = (value, data) => {
  if (value > 23 || value < 0) {
    return "The time should be between 0 (00:00) and 23 (23:00)"
  }
  if (value && value % 1 != 0) {
    return "Only whole numbers should be used."
  }
}

export const eventsTemplate: Template = {
  label: 'Events',
  name: 'events',
  ui: {
    previewSrc: '/img/blocks/events.png',
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
      // https://tina.io/docs/reference/toolkit/fields/date/#datetimepickerprops and https://tina.io/docs/reference/toolkit/fields/number/
      // @ts-ignore: type error as utc, options and step fields aren't formally recognised but valid as per docs (linked above)
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'startDate', 
          label: 'Start Date', 
          type: 'datetime', 
          description:
            'Enter date in the timezone of the event.',
          ui: {
            utc: true,
            format: (value, name, field) => value && timeFormat.format(new Date(Date.parse(value)))
          }, 
        },
        {
          name: 'startTime',
          label: 'Start Time',
          type: 'number',
          description:
            'Enter start time in the timezone of the event.',
          ui: {
            step: 1,
            validate: timezoneValidation
          },
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'datetime',
          description:
            'Note this field is not mandatory. Leave blank for a 1 day event. Enter date in the timezone of the event.',
          ui: {
            utc: true,
            format: (value, name, field) => value && timeFormat.format(new Date(Date.parse(value)))
          }, 
        },
        {
          //Note the below is just a UI aspect for clarity on how a new event can be specified
          name: 'endTime',
          label: 'End Time',
          type: 'string',
          description:
            'This is locked to midnight on the end date of the event.',
          ui: {
            format: (value) => "11:59pm",
            component: (props) => {
              return <div className="mb-4 relative">
                <div className="z-50 absolute cursor-not-allowed w-full h-full top-0 left-0"/>
                <div className="opacity-50">
                  {TextField(props)}
                </div>
              </div>
            }
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
