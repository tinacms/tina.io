'use client';
import { useEffect, useState } from 'react';
import { ARTICLE_TITLE, BODY, EYEBROW } from '@/component/styles/typography';
import { ChooserCard } from '@/component/ui/ChooserCard';

export type BookingItem = {
  name: string;
  description: string;
  image: string;
  url: string;
};

// The booking flow. Only the first step happens on this page; the other two
// happen in the booking tool, so the stepper always shows step 1. The current
// step is a filled brand-orange circle (3.8:1 on white) and its label reads in
// ink (aria-current, see styles/tailwind.css). Picked by design (Oct 2026).
// Kept short so each label fits its column on a phone without wrapping.
const BOOKING_STEPS = ['Location', 'Time', 'Your info'];
const CURRENT_STEP = 0;

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
        {/* Three equal columns, so labels can wrap instead of colliding on
            phones. Each step draws the half-lines either side of its circle;
            the outer halves are transparent, so the line runs circle to
            circle. SLUB uppercases the copy, which stays in sentence case. */}
        <ol
          aria-label="Booking steps"
          className="grid grid-cols-3 w-full max-w-lg mx-auto mb-6"
        >
          {BOOKING_STEPS.map((step, index) => (
            <li
              key={step}
              aria-current={index === CURRENT_STEP ? 'step' : undefined}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="flex w-full items-center" aria-hidden="true">
                <span
                  className={`h-0.5 grow ${index === 0 ? 'bg-transparent' : 'bg-neutral-border'}`}
                />
                <span
                  className={`size-6 shrink-0 rounded-full border-2 ${index === CURRENT_STEP ? 'border-brand-primary bg-brand-primary' : 'border-neutral-border'}`}
                />
                <span
                  className={`h-0.5 grow ${index === BOOKING_STEPS.length - 1 ? 'bg-transparent' : 'bg-neutral-border'}`}
                />
              </span>
              <span className={`${EYEBROW} px-1`}>{step}</span>
            </li>
          ))}
        </ol>
        <div className="grid gap-3 my-16 px-10 py-12 md:bg-linear-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid md:shadow-md rounded-lg">
          {/* The block's schema has no isHeadingOne field and the block is
          only ever the first on its page, so its title is the page's h1. It
          sits in a narrow card, so it takes ARTICLE_TITLE, a step below
          PAGE_TITLE (picked by design, Oct 2026). */}
          <h1
            className={`${ARTICLE_TITLE} w-full text-center inline-block m-0`}
          >
            {data.title}
          </h1>
          <p className={`${BODY} w-full text-center mb-6 m-0 pb-4`}>
            {data.description}
          </p>
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
