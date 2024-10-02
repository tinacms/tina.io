import moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import type { Template } from 'tinacms';
import { TextField, wrapFieldsWithMeta } from 'tinacms';
import majorTimezones from './EventsTimezones.json';

type offset = { value: any; label: string; };


//Basically the gist of most of this processing is to create the list of possible GMT offsets...
//then associate relevant cities to them via the moment-timezone library.


const offsetFormat = new Intl.NumberFormat("en-US", 
  // @ts-ignore: the below is used for showing offset hours and the linter is not recognising the roundingMode property that exists on the docs
  {
  maximumFractionDigits: 0,
  roundingMode: "trunc"
}
)

const dateFormat = Intl.DateTimeFormat('en-US', {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});

const timeFormat = Intl.DateTimeFormat('en-US', {
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC"
});

const positiveTimezoneList = Array.from(Array(29).keys()).map(value => value / 2).reverse();
const negativeTimezoneList = Array.from(Array(24).keys()).map(value => ((value / 2) + 0.5 ) * -1);

const addCitiesAndPrefix = (offsets: number[], prefix = "+"): offset[] => {
  const cityTimezoneMap = new Map();
  //Get the timezones of major cities
  majorTimezones.forEach(
    (cityOffset) => {
      const zone = moment.tz(cityOffset.ianaName).utcOffset() / 60
      return cityTimezoneMap.set(zone, cityTimezoneMap.get(zone) ? `${cityTimezoneMap.get(zone)}, ${cityOffset.city}` : cityOffset.city)
    });
  //Concat the city names to the offset array
  return offsets.map((offset) => {
    const cities = cityTimezoneMap.get(offset);
    const displayOffset = offsetFormat.format(offset);
    return {
      value: offset,
      label: `GMT ${offset > 0 ? "+" : ""}${displayOffset}:${offset % 1 ? "3" : "0"}0` + (`${cities ? `, ${cities}` : ''}`)
    }
  })
}

//Events schema
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
            format: (value, name, field) => value && dateFormat.format(new Date(Date.parse(value)))
          }, 
        },
        {
          name: 'startTime',
          label: 'Start Time',
          type: 'string',
          description:
            "Enter start time in the timezone of the event. (e.g. if the event starts at 9:00am, enter '9')",
          ui: {
            format: (value, name, field) => value && timeFormat.format(new Date(Date.parse(value))),
            component: wrapFieldsWithMeta(({ field, input, meta }) => {
              return <div>
                <Datetime dateFormat={false} {...input} utc={true}></Datetime>
                </div>

            })
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
            format: (value, name, field) => value && dateFormat.format(new Date(Date.parse(value)))
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
            format: (value) => "11:59 PM",
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
              ...addCitiesAndPrefix(positiveTimezoneList),
              ...addCitiesAndPrefix(negativeTimezoneList, "")
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
