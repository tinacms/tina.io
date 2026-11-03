'use client';

/* biome-ignore lint/correctness/noUnusedImports: may need to use React for future compatibility */
import React from 'react';
import { BODY_MUTED, CARD_TITLE } from '@/component/styles/typography';
import { ChooserCard } from '@/component/ui/ChooserCard';
import { StatusMessage } from '@/component/ui/StatusMessage';

// Client component that renders the UI
export function DemoFormClient({
  meetingPeople,
  error,
}: {
  meetingPeople: Array<{
    name: string;
    description: string;
    image: string;
    url: string;
  }>;
  error: string | null;
}) {
  return (
    <div className="py-10 h-full flex flex-col !w-full">
      <div className="flex justify-center pb-8">
        <h2 className={`inline-block m-0 ${CARD_TITLE}`}>
          Choose your location
        </h2>
      </div>
      {error && (
        <div className="flex justify-center items-center py-10">
          <StatusMessage type="error">{error}</StatusMessage>
        </div>
      )}
      {!error && meetingPeople.length === 0 && (
        <div className="flex justify-center items-center py-10">
          <p className={BODY_MUTED}>No meeting links available.</p>
        </div>
      )}
      {!error && meetingPeople.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-3 px-6 md:px-0 lg:px-6 grow">
          {meetingPeople.map((person, index) => (
            <div
              key={`person-${person.name}-${index}`}
              className="flex justify-center w-full items-center h-full"
            >
              <div className="w-full max-w-sm h-full">
                <ChooserCard
                  href={person.url}
                  prefetch={false}
                  name={person.name}
                  description={person.description}
                  image={
                    person.image
                      ? {
                          src: person.image,
                          alt: `${person.name} Portrait`,
                          kind: 'photo',
                        }
                      : undefined
                  }
                  stackOnMobile
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
