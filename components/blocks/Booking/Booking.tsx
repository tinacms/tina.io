'use client';
import { useEffect, useState } from 'react';
import {
  LABEL,
  PAGE_TITLE,
  SECTION_TITLE,
  SUB_HEADING,
} from '@/component/styles/typography';
import { ChooserCard } from '@/component/ui/ChooserCard';

export type BookingItem = {
  name: string;
  description: string;
  image: string;
  url: string;
};

const isValidImage = (url: string) =>
  url && (url.startsWith('http') || url.startsWith('/'));

const BookingBlock = ({ data }) => {
  const [meetingPeople, setMeetingPeople] = useState<BookingItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/meeting-links', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch meeting links: ${response.status}`);
        }

        const json = await response.json();
        setMeetingPeople(json?.meetingPeople ?? []);
      } catch (err) {
        console.error('Failed to fetch meeting links:', err);
        setMeetingPeople([]);
      }
    };

    fetchData();
  }, []);

  if (!meetingPeople.length) {
    return null;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="lg:w-1/2 container mx-auto px-4">
        <div className="flex justify-center mb-6 step-indicator items-center">
          <div className="step flex flex-col items-center relative z-10">
            <div className="step-icon w-6 h-6 border-2 border-orange-300 flex items-center justify-center rounded-full"></div>
            <p
              className={`${LABEL} text-center absolute bottom-[-20px] whitespace-nowrap`}
            >
              CHOOSE LOCATION
            </p>
          </div>
          <div className="indicator-line h-0.5 w-20 md:w-40 bg-gray-300"></div>
          <div className="step flex flex-col items-center relative z-10">
            <div className="step-icon w-6 h-6 border-2 border-gray-300 flex items-center justify-center rounded-full"></div>
            <p
              className={`${LABEL} text-center absolute bottom-[-20px] whitespace-nowrap`}
            >
              CHOOSE TIME
            </p>
          </div>
          <div className="indicator-line h-0.5 w-20 md:w-40 bg-gray-300"></div>
          <div className="step flex flex-col items-center relative z-10">
            <div className="step-icon w-6 h-6 border-2 border-gray-300 flex items-center justify-center rounded-full"></div>
            <p
              className={`${LABEL} text-center absolute bottom-[-20px] whitespace-nowrap`}
            >
              YOUR INFO
            </p>
          </div>
        </div>
        <div className="grid gap-3 my-16 px-10 py-12 md:bg-linear-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid md:shadow-md rounded-lg">
          {/* The block's schema has no isHeadingOne field, so this was always
          undefined and the page shipped without an h1. It is only ever the
          first block on its page, so default to the page title. */}
          {data.isHeadingOne !== false ? (
            <h1 className={`${PAGE_TITLE} w-full text-center inline-block m-0`}>
              {data.title}
            </h1>
          ) : (
            <h2
              className={`${SECTION_TITLE} w-full text-center inline-block m-0 whitespace-nowrap`}
            >
              {data.title}
            </h2>
          )}
          <h3
            className={`${SUB_HEADING} w-full text-center mb-6 inline-block m-0 pb-4 md:whitespace-nowrap`}
          >
            {data.description}
          </h3>
          <div className="grid gap-7 pb-4">
            {meetingPeople.map((cardItem, index) => (
              <ChooserCard
                key={`booking-${cardItem.name}-${index}`}
                href={cardItem.url || '#'}
                name={cardItem.name}
                description={cardItem.description}
                image={
                  isValidImage(cardItem.image)
                    ? {
                        src: cardItem.image,
                        alt: `${cardItem.name} Portrait`,
                        kind: 'photo',
                      }
                    : undefined
                }
                stackOnMobile
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingBlock;
