import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';
import { LocationField } from 'tina/customTinaFormFields/locationField';
import { TextField, wrapFieldsWithMeta } from 'tinacms';
import majorTimezones from '../../components/componentSuppliedData/EventsTimezones.json';
import { seoInformation } from './sharedFields/seoInformation';

type offset = { value: any; label: string };

//Basically the gist of most of this processing is to create the list of possible GMT offsets...
//then associate relevant cities to them via the moment-timezone library.

const dateFormat = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const _timeFormat = Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'UTC',
});

const positiveTimezoneList = Array.from(Array(29).keys())
  .map((value) => value / 2)
  .reverse();
const negativeTimezoneList = Array.from(Array(24).keys()).map(
  (value) => (value / 2 + 0.5) * -1,
);

const addCitiesAndPrefix = (offsets: number[], _prefix = '+'): offset[] => {
  const cityTimezoneMap = new Map();
  //Get the timezones of major cities
  majorTimezones.forEach((cityOffset) => {
    const zone = moment.tz(cityOffset.ianaName).utcOffset() / 60;
    return cityTimezoneMap.set(
      zone,
      cityTimezoneMap.get(zone)
        ? `${cityTimezoneMap.get(zone)}, ${cityOffset.city}`
        : cityOffset.city,
    );
  });
  //Concat the city names to the offset array
  return offsets.map((offset) => {
    const cities = cityTimezoneMap.get(offset);
    const displayOffset = Math.trunc(offset);
    return {
      value: offset,
      label:
        `GMT ${offset > 0 ? '+' : ''}${displayOffset}:${
          offset % 1 ? '3' : '0'
        }0` + `${cities ? `, ${cities}` : ''}`,
    };
  });
};

//Events schema
export const eventsCollection = {
  label: 'Events',
  name: 'events',
  path: 'content/events',
  format: 'json',
  ui: {
    //@ts-ignore need to investigate why this is not recognised
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      ...seoInformation,
      description:
        'Meta Information – if not set, the meta description will be set to the body content and title to "Title | TinaCMS Docs" as per the field below',
    },
    { name: 'title', label: 'Title', type: 'string' },
    {
      name: 'byLine',
      label: 'ByLine',
      type: 'string',
      ui: { component: 'textarea' },
    },
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
      //@ts-ignore https://tina.io/docs/reference/toolkit/fields/date/#datetimepickerprops and https://tina.io/docs/reference/toolkit/fields/number/
      // type error as utc, options and step fields aren't formally recognised but valid as per docs (linked above)
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'datetime',
          description: 'Enter date in the timezone of the event.',
          ui: {
            //@ts-ignore https://tina.io/docs/reference/toolkit/fields/date/#datetimepickerprops and https://tina.io/docs/reference/toolkit/fields/number/
            // type error as utc, options and step fields aren't formally recognised but valid as per docs (linked above)
            utc: true,
            format: (value, _name, _field) =>
              value && dateFormat.format(new Date(Date.parse(value))),
          },
        },
        {
          name: 'startTime',
          label: 'Start Time',
          type: 'string',
          description:
            "Enter start time in the timezone of the event. E.g. '9:00 AM' if the event starts at 9 in the location it's being held.",
          ui: {
            format: (value) => value,
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <input
                    type="time"
                    className="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md"
                    {...input}
                  />
                </div>
              );
            }),
          },
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'datetime',
          description:
            'Note this field is not mandatory. Leave blank for a 1 day event. Enter date in the timezone of the event.',
          ui: {
            //@ts-ignore https://tina.io/docs/reference/toolkit/fields/date/#datetimepickerprops and https://tina.io/docs/reference/toolkit/fields/number/
            // type error as utc, options and step fields aren't formally recognised but valid as per docs (linked above)
            utc: true,
            format: (value, _name, _field) =>
              value && dateFormat.format(new Date(Date.parse(value))),
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
            format: (_value) => '11:59 PM',
            component: (props) => {
              return (
                <div className="mb-4 relative">
                  <div className="z-50 absolute cursor-not-allowed w-full h-full top-0 left-0" />
                  <div className="opacity-50">{TextField(props)}</div>
                </div>
              );
            },
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
            //@ts-ignore
            options: [
              ...addCitiesAndPrefix(positiveTimezoneList),
              ...addCitiesAndPrefix(negativeTimezoneList, ''),
            ],
          },
        },
        { name: 'image', label: 'Image', type: 'image' },
        { name: 'link', label: 'URL', type: 'string' },
        {
          name: 'location',
          label: 'Location',
          type: 'string',
          ui: {
            component: LocationField,
          },
        },
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
};
