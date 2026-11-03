'use client';

import { useEffect, useState } from 'react';
import { BODY_MUTED, CARD_TITLE } from '@/component/styles/typography';
import { DemoFormClient } from './BookDemoClient';

export function DemoForm() {
  const [meetingPeople, setMeetingPeople] = useState<
    Array<{
      name: string;
      description: string;
      image: string;
      url: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/meeting-links');
        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Failed to fetch meeting links');
        }

        setMeetingPeople(data.meetingPeople || []);
      } catch (err) {
        console.error('Failed to fetch meeting links:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load meeting links. Please try again later.',
        );
        setMeetingPeople([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-10 h-full !w-full flex flex-col">
        <div className="flex justify-center pb-8">
          <h2 className={`inline-block m-0 ${CARD_TITLE}`}>
            Choose your location
          </h2>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className={BODY_MUTED}>Loading...</p>
        </div>
      </div>
    );
  }

  return <DemoFormClient meetingPeople={meetingPeople} error={error} />;
}
