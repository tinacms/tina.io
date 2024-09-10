import type { Template } from 'tinacms'

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
            'Hours field for more accurate "Live"/"Done" chips on the event card. 24 hours time, ex. 14 = 2:00pm',
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
            'Note this field is not mandatory. Leave blank if no end time specified (or only 1 day event). End time calculated as midnight.',
          ui: {
            utc: true,
            format: (value, name, field) => value && timeFormat.format(new Date(Date.parse(value)))
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
