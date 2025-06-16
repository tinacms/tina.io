import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import type { Template } from 'tinacms';
import { TextField, wrapFieldsWithMeta } from 'tinacms';
import majorTimezones from '../../components/componentSuppliedData/EventsTimezones.json';
import { seoInformation } from './sharedFields/seoInformation';

export const countryCoordinates = [
  { location: 'Copenhagen, Denmark', lat: 0, lng: 0 },
  { location: 'Porto, Portugal', lat: 0, lng: 0 },
  { location: 'London, England', lat: 7, lng: 52 },
  { location: 'Melbourne, Australia', lat: -27.81015, lng: 220.9541 },
  { location: 'Newcastle, Australia', lat: -27.81015, lng: 210 },
  { location: 'Oslo Spektrum', lat: 59, lng: 10 },
  { location: 'Oslo, Norway', lat: -1, lng: 59 },
];

type offset = { value: any; label: string };

const LocationField = ({ input, field, form }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(input.value || '');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filteredSuggestions = countryCoordinates.filter((coord) =>
        coord.location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (location) => {
    setInputValue(location);
    setShowSuggestions(false);
    input.onChange(location);

    const coordinates = countryCoordinates.find(
      (coord) => coord.location.toLowerCase() === location.toLowerCase()
    );

    if (coordinates) {
      const fullPath = input.name;
      const basePath = fullPath.replace(/\.location$/, '');
      form.change(`${basePath}.markerLAT`, coordinates.lat);
      form.change(`${basePath}.markerLONG`, coordinates.lng);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="mb-4 relative z-[999]">
      <label className="block font-sans text-xs font-semibold text-gray-700 whitespace-normal mb-2">
        {field.label}
      </label>
      <input
        type="text"
        className="shadow-inner focus:shadow-outline focus:border-blue-500 focus:outline-none block text-base placeholder:text-gray-300 px-3 py-2 text-gray-600 w-full bg-white border border-gray-200 transition-all ease-out duration-150 focus:text-gray-900 rounded-md"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Enter location"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => handleSuggestionClick(suggestion.location)}
            >
              {suggestion.location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

//Basically the gist of most of this processing is to create the list of possible GMT offsets...
//then associate relevant cities to them via the moment-timezone library.

const dateFormat = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const timeFormat = Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'UTC',
});

const positiveTimezoneList = Array.from(Array(29).keys())
  .map((value) => value / 2)
  .reverse();
const negativeTimezoneList = Array.from(Array(24).keys()).map(
  (value) => (value / 2 + 0.5) * -1
);

const addCitiesAndPrefix = (offsets: number[], prefix = '+'): offset[] => {
  const cityTimezoneMap = new Map();
  //Get the timezones of major cities
  majorTimezones.forEach((cityOffset) => {
    const zone = moment.tz(cityOffset.ianaName).utcOffset() / 60;
    return cityTimezoneMap.set(
      zone,
      cityTimezoneMap.get(zone)
        ? `${cityTimezoneMap.get(zone)}, ${cityOffset.city}`
        : cityOffset.city
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
            format: (value, name, field) =>
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
            format: (value, name, field) =>
              value && timeFormat.format(new Date(Date.parse(value))),
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return (
                <div>
                  <Datetime dateFormat={false} {...input} utc={true}></Datetime>
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
            format: (value, name, field) =>
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
            format: (value) => '11:59 PM',
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
        {
          name: 'location',
          label: 'Location',
          type: 'string',
          ui: {
            component: LocationField,
          },
        },
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
};
