import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { fetchMeetingLinks } from 'utils/getMeetingLinks';

export const DemoForm = () => {
  const [meetingPeople, setMeetingPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const meetingPeopleData = await fetchMeetingLinks();
      setMeetingPeople(meetingPeopleData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="py-10 h-full flex flex-col">
        <div className="flex justify-center pb-8">
          <h1 className="inline-block m-0 font-ibm-plex lg:text-3xl md:text-2xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Choose your location
          </h1>
        </div>
        <div className="grid lg:grid-cols-3 gap-3 px-6 md:px-0 lg:px-6 grow">
          {meetingPeople.map((person, idx) => (
            <div
              key={idx}
              className="flex justify-center w-full items-center h-full"
            >
              <div className="w-full max-w-sm h-full">
                <Link
                  href={person.url}
                  className="flex flex-col md:flex-row lg:flex-row w-full h-full items-center justify-between rounded-lg border border-input bg-background p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700"
                  prefetch={false}
                >
                  {person.image && (
                    <Image
                      src={person.image}
                      alt={`${person.name} Portrait`}
                      className="hidden md:block w-18 h-18 rounded-full lg:mr-4 md:mr-4"
                      width={72}
                      height={72}
                    />
                  )}
                  <div className="grow text-center md:text-left lg:text-left">
                    <div className="font-medium text-lg">{person.name}</div>
                    <div className="text-muted-foreground text-md">
                      {person.description}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <FaChevronRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
