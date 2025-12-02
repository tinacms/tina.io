'use client';

import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useMemo, useState } from 'react';
import { BiChevronRightCircle } from 'react-icons/bi';
import type { PageBlocksMap } from 'tina/__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import { docAndBlogComponents } from '@/component/tinaMarkdownComponents/docAndBlogComponents';
import { allCountries } from './worldmapData';

dayjs.extend(utc);
dayjs.extend(timezone);

type Country = keyof typeof allCountries;

const SELECTED_COUNTRIES = ['Australia', 'China', 'France'] as const;

const DAY_KEYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

const WORKING_TIME = {
  Open: 9,
  Close: 18,
} as const;

type Office = {
  url: string;
  name: string;
  streetAddress: string;
  suburb?: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  postalCode: number;
  phone: string;
  hours: string;
  days: string;
};

const OFFICES: Office[] = [
  {
    url: '/offices/sydney',
    name: 'SSW Sydney Office',
    streetAddress: 'Level 1, 81-91 Military Road',
    suburb: 'Neutral Bay',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'Australia',
    postalCode: 2089,
    phone: '+61 2 9953 3000',
    hours: '9am - 6pm AEDT',
    days: 'Monday - Friday',
  },
  {
    url: '/offices/brisbane',
    name: 'SSW Brisbane Office',
    streetAddress: 'Level 1, 471 Adelaide Street',
    suburb: '',
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    addressCountry: 'Australia',
    postalCode: 4000,
    phone: '+61 7 3077 7081',
    hours: '9am - 6pm AEST',
    days: 'Monday - Friday',
  },
  {
    url: '/offices/melbourne',
    name: 'SSW Melbourne Office',
    streetAddress: 'Level 1, 370 Little Bourke Street',
    suburb: '',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'Australia',
    postalCode: 3000,
    phone: '+61 3 9005 2034',
    hours: '9am - 6pm AEDT',
    days: 'Monday - Friday',
  },
  {
    url: '/offices/newcastle',
    name: 'SSW Newcastle Office',
    streetAddress: '432 Hunter St',
    suburb: '',
    addressLocality: 'Newcastle',
    addressRegion: 'NSW',
    addressCountry: 'Australia',
    postalCode: 2300,
    phone: '+61 2 9953 3000',
    hours: '9am - 6pm AEDT',
    days: 'Monday - Friday',
  },
  {
    url: 'https://ssw.cn',
    name: 'SSW China Office',
    streetAddress:
      'Room 305, Building 2, Xingcheng Development Building, No. 406 Xintiandi Street',
    addressLocality: 'Hangzhou, China',
    addressRegion: 'Zheijang Province',
    addressCountry: 'China',
    postalCode: 310004,
    phone: '+86 571 8517 8910',
    hours: '9:00am - 6:00pm CST',
    days: 'Monday - Friday',
  },
  {
    url: 'https://ssw.fr',
    name: 'SSW Europe Office',
    streetAddress: 'Level 4–19 Rue du Fossé des Treize',
    addressLocality: 'Strasbourg, France',
    addressRegion: 'Strasbourg',
    addressCountry: 'France',
    postalCode: 67000,
    phone: '+33 3 67 39 05 39',
    hours: '9:00am - 6:00pm CET',
    days: 'Monday - Friday',
  },
];

// Map office countries to map country names
const OFFICE_COUNTRY_TO_MAP_COUNTRY: Record<string, Country> = {
  Australia: 'Australia',
  China: 'China',
  France: 'France',
} as const;

// Map office locations to their timezones
const OFFICE_TIMEZONES: Record<string, string> = {
  Sydney: 'Australia/Sydney',
  Brisbane: 'Australia/Brisbane',
  Melbourne: 'Australia/Melbourne',
  Newcastle: 'Australia/Sydney',
  'Hangzhou, China': 'Asia/Shanghai',
  'Strasbourg, France': 'Europe/Paris',
} as const;

type Status = 'Open' | 'Closed' | '';

const OpenStatus = ({ office }: { office: Office }) => {
  const [status, setStatus] = useState<Status>('');
  const timeZone = OFFICE_TIMEZONES[office.addressLocality];

  useEffect(() => {
    if (!timeZone) return;

    const updateStatus = () => {
      const now = dayjs.utc().tz(timeZone);
      const isWeekend =
        DAY_KEYS.Saturday === now.day() || DAY_KEYS.Sunday === now.day();
      const currentHour = now.hour();

      if (
        !isWeekend &&
        currentHour >= WORKING_TIME.Open &&
        currentHour < WORKING_TIME.Close
      ) {
        setStatus('Open');
      } else {
        setStatus('Closed');
      }
    };

    updateStatus();
    // Update every minute
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [timeZone]);

  if (!status) return null;

  return (
    <span
      className={clsx(
        {
          'bg-green-500/20 text-green-800 border-green-800': status === 'Open',
          'bg-[#ea6d43]/20 text-[#ea6d43] border-[#ea6d43]':
            status === 'Closed',
        },
        'text-xs ml-2 p-1 uppercase rounded-md border',
      )}
    >
      {status}
    </span>
  );
};

const AccordionItem = ({
  office,
  selectedOffice,
  setSelectedOffice,
  children,
}: {
  office: Office;
  selectedOffice: Office | null;
  setSelectedOffice: (office: Office | null) => void;
  children: React.ReactNode;
}) => {
  const currentlySelected =
    office.addressLocality === selectedOffice?.addressLocality;

  const handleSelectOffice = () => {
    if (office.addressLocality === selectedOffice?.addressLocality) {
      setSelectedOffice(null);
    } else {
      setSelectedOffice(office);
    }
  };

  return (
    <li>
      <div
        className={
          'group flex flex-col cursor-pointer p-2 transition-all duration-300 rounded-md shadow-md border border-white/30 bg-gradient-to-br from-white/10 to-white/40 hover:from-gray-300/10 hover:to-gray-300/40'
        }
        onClick={handleSelectOffice}
      >
        <div className="group flex cursor-pointer pl-2 justify-between w-full">
          <div className="uppercase text-black font-mono">
            {office.addressLocality}
          </div>
          <div className="flex items-center justify-center text-black">
            <BiChevronRightCircle
              className={`transition-transform duration-300 ${currentlySelected ? 'rotate-90' : ''}`}
            />
          </div>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            currentlySelected ? 'max-h-52 mb-2' : 'max-h-0'
          }`}
        >
          {children}
        </div>
      </div>
    </li>
  );
};

export const Map = ({ data }: { data: PageBlocksMap }) => {
  const { heading, content } = data || {};
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);

  const filteredOffices = useMemo(() => {
    return OFFICES.filter((office) =>
      SELECTED_COUNTRIES.includes(
        office.addressCountry as (typeof SELECTED_COUNTRIES)[number],
      ),
    );
  }, []);

  const selectedCountriesSet = useMemo(() => {
    return new Set<Country>(SELECTED_COUNTRIES as readonly Country[]);
  }, []);

  const highlightedCountry = useMemo(() => {
    if (!selectedOffice) return null;
    return OFFICE_COUNTRY_TO_MAP_COUNTRY[selectedOffice.addressCountry] || null;
  }, [selectedOffice]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center p-10 max-w-7xl mx-auto relative">
      {heading && (
        <h2 className={` font-ibm-plex ${H1_HEADINGS_SIZE}`}>{heading}</h2>
      )}
      {content && (
        <div className="text-neutral-text-secondary">
          <TinaMarkdown content={content} components={docAndBlogComponents} />
        </div>
      )}
      <div className="flex gap-8 w-full">
        {/* Accordion */}
        <div className="w-80 flex-shrink-0 z-10">
          <ul className="space-y-2">
            {filteredOffices.map((office) => (
              <AccordionItem
                key={office.addressLocality}
                office={office}
                selectedOffice={selectedOffice}
                setSelectedOffice={setSelectedOffice}
              >
                <div className="text-sm pl-2 pt-2">
                  <div className="font-semibold mb-2">{office.name}</div>
                  <div className="space-y-1 text-gray-700">
                    <div>{office.streetAddress}</div>
                    {office.suburb && <div>{office.suburb}</div>}
                    <div>
                      {office.addressLocality}, {office.addressRegion}
                    </div>
                    <div>
                      {office.addressCountry} {office.postalCode}
                    </div>
                    <div className="mt-2">
                      <a
                        href={`tel:${office.phone}`}
                        className="text-[#ea6d43] hover:underline"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="text-gray-600">
                      Hours: {office.hours}
                      <OpenStatus office={office} />
                      <br />
                      {office.days}
                    </div>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </ul>
        </div>
        {/* Map */}
        <div className="flex-1">
          <svg
            viewBox="0 0 895.92 471.76"
            preserveAspectRatio="xMinYMin"
            className="relative w-full"
          >
            <defs>
              <filter
                x="-0.05"
                y="-0.05"
                width="1.1"
                height="1.1"
                id="notSelected"
              >
                <feFlood floodColor="#414141" result="bg" />
                <feMerge>
                  <feMergeNode in="bg" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                x="-0.05"
                y="-0.05"
                width="1.1"
                height="1.1"
                id="selected"
              >
                <feFlood floodColor="#c43f3e" result="bg" />
                <feMerge>
                  <feMergeNode in="bg" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {Object.entries(allCountries).map(([countryKey, pathData]) => {
              const isSelected = selectedCountriesSet.has(
                countryKey as Country,
              );
              const country = countryKey as Country;
              const isHighlighted = highlightedCountry === country;
              const isBaseSelected = isSelected && !isHighlighted;

              return (
                <path
                  key={countryKey}
                  id={countryKey}
                  d={pathData}
                  className={
                    isHighlighted
                      ? 'fill-[#ea6d43] cursor-pointer'
                      : isBaseSelected
                        ? 'fill-[#ea6d43] cursor-pointer opacity-50'
                        : 'fill-[#afafaf]'
                  }
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
