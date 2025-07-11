'use client';

import { Button } from 'components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaRegCalendar, FaRegMap, FaRegStar } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { GoPeople } from 'react-icons/go';
import { IoMdBook } from 'react-icons/io';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

//TODO: Remove once TinaCon is over
const _TopBanner = ({ tinaData }: { tinaData: any }) => {
  return (
    <div className="w-full flex justify-center relative px-10 lg:h-52">
      <div className="absolute left-[38%] -top-11 z-10 hidden lg:block">
        <Image
          src="/svg/llama-mic.svg"
          alt="Microphone Icon"
          width={200}
          height={200}
          className="text-white"
        />
      </div>
      <div className="w-full relative rounded-t-xl overflow-hidden">
        <div className="absolute inset-0 bg-orange-500"></div>
        <div
          className="absolute inset-0 bg-blue-900 hidden lg:block"
          style={{
            clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 35% 100%)',
          }}
        ></div>
        <div className="relative hidden lg:flex items-center justify-between px-8 py-6 lg:h-52">
          <div className="w-[4rem]">
            <Image
              src="/svg/logos/tina-white.svg"
              alt="Tina Logo"
              width={100}
              height={100}
              className="w-[100px] h-auto"
            />
          </div>
          <div className="w-[40%] text-white mt-6">
            <div className="font-ibm-plex text-4xl">
              <span className="font-bold">tina</span>con 2025
            </div>
            <div className="font-ibm-plex text-2xl mt-4">
              Herding the Future
            </div>
          </div>
          <div className="w-[50%] text-white">
            <div className="flex flex-wrap justify-center items-center gap-4 font-ibm-plex text-lg mt-6 ml-8">
              <span>May 2</span>
              <span>|</span>
              <span>9AM - 6PM</span>
              <span>|</span>
              <Link
                href="https://www.ssw.com.au/offices/melbourne"
                target="_blank"
                className="underline"
              >
                SSW Melbourne, Australia
              </Link>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <Link href={tinaData?.rightButton?.link} target="_blank">
                <Button color="blue" size="medium">
                  <span className="mr-2">Join us</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="relative lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="w-[2rem]">
              <Image
                src="/svg/logos/tina-white.svg"
                alt="Tina Logo"
                width={100}
                height={100}
                className="w-full h-auto"
              />
            </div>
            <div className="w-[85%] text-white">
              <div className="font-ibm-plex text-2xl text-left">
                <span className="font-bold">tina</span>con 2025
              </div>
              <div className="font-ibm-plex text-xl text-left">
                Herding the Future
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 bg-blue-900"
            style={{
              clipPath: 'polygon(0% 35%, 100% 45%, 100% 100%, 0% 100%)',
              borderRadius: '0 0 0.75rem 0.75rem',
            }}
          ></div>
          <div className="relative px-6 py-4 text-white">
            <div className="flex items-center gap-4 font-ibm-plex text-base mb-2">
              <span>May 2</span>
              <span>|</span>
              <span>9AM - 6PM</span>
            </div>
            <div className="mb-4">
              <Link
                href="https://www.ssw.com.au/offices/melbourne"
                target="_blank"
                className="underline"
              >
                SSW Melbourne, Australia
              </Link>
            </div>
            <div>
              <Link href={tinaData?.rightButton?.link} target="_blank">
                <Button color="blue" size="medium">
                  <span className="mr-2">Join us</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute right-2 bottom-3 w-[17%]">
            <Image
              src="/svg/llama-mic.svg"
              alt="Microphone Icon"
              width={200}
              height={200}
              className="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderBanner = ({
  tinaData,
  scrollToAgenda,
}: {
  tinaData: any;
  scrollToAgenda: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center text-center lg:p-16 p-10 bg-linear-to-br from-seafoam-100 to-seafoam-200 text-black">
      <h1 className="font-ibm-plex text-4xl pb-4 text-orange-500">
        {tinaData.bannerTitle}
      </h1>
      <h2 className="text-2xl max-w-4xl text-orange-500 font-ibm-plex pb-4">
        {tinaData.bannerTagline}
      </h2>
      <h3 className="text-2xl max-w-4xl">{tinaData.bannerDescription}</h3>
      <div className="flex flex-col md:flex-row py-6 gap-6  md:gap-10">
        <div className="flex gap-2 items-center">
          <FaRegCalendar /> <span>{tinaData.date}</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaRegClock /> <span>{tinaData.time}</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaRegMap />{' '}
          <Link
            href="https://www.ssw.com.au/offices/melbourne "
            target="_blank"
            className="underline"
          >
            {tinaData.location}
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button color="white" size="medium" onClick={scrollToAgenda}>
          <span className="mr-2">{tinaData.actionButton.title}</span>
        </Button>
        <Link href={tinaData?.rightButton?.link} target="_blank">
          <Button color="blue" size="medium">
            <span className="mr-2">{tinaData?.rightButton?.title}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const icons = {
  FaRegStar: (
    <FaRegStar
      size={40}
      className="text-white bg-linear-to-br from-orange-400 to-orange-600 p-2 mb-4 rounded-full"
    />
  ),
  IoMdBook: (
    <IoMdBook
      size={40}
      className="text-white bg-linear-to-br from-blue-400 to-blue-600 p-2 mb-4 rounded-full"
    />
  ),
  GoPeople: (
    <GoPeople
      size={40}
      className="text-white bg-linear-to-br from-seafoam-500 to-seafoam-700 p-2 mb-4 rounded-full"
    />
  ),
};

interface KeyHighlightsProps {
  highlights: {
    headerLeft: string;
    descriptionLeft: string;
    iconLeft: keyof typeof icons;
    headerMiddle: string;
    descriptionMiddle: string;
    iconMiddle: keyof typeof icons;
    headerRight: string;
    descriptionRight: string;
    iconRight: keyof typeof icons;
  };
}
const KeyHighlights = ({ highlights }: KeyHighlightsProps) => {
  return (
    <div className="flex flex-col md:flex-row py-12 gap-10 max-w-4xl text-lg">
      {[
        ['headerLeft', 'descriptionLeft', 'iconLeft'],
        ['headerMiddle', 'descriptionMiddle', 'iconMiddle'],
        ['headerRight', 'descriptionRight', 'iconRight'],
      ].map(([header, description, icon]) => (
        <div
          key={header}
          className="flex flex-col gap-2 items-center w-full md:w-1/3"
        >
          {icons[highlights[icon as keyof typeof highlights]]}
          <h3 className="font-bold">
            {highlights[header as keyof typeof highlights]}
          </h3>
          <p>{highlights[description as keyof typeof highlights]}</p>
        </div>
      ))}
    </div>
  );
};

const conferenceMarkdownComponents = {
  a: ({ children, url }: { children: React.ReactNode; url: string }) => (
    <Link href={url} target="_blank" className="underline">
      {children}
    </Link>
  ),
};

interface Speaker {
  name: string;
  position: string;
  image: string;
  socialLink: string;
}

interface Session {
  talkSpeakerName: string;
  talkSpeakerImage: string;
  speechTitle: string;
  speechDescription: string;
  talkTimeStart: number;
  talkTimeEnd?: number;
  sessionType: 'Talk' | 'Workshop' | 'Break';
}

const OpenSourceExpertSpeakers = ({ speakers }: { speakers: Speaker[] }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 md:p-16">
      <h2 className="text-3xl font-bold py-16 bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text">
        Open Source Expert Speakers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-14">
        {speakers.map((speaker) => (
          <div
            key={speaker.name}
            className="col-span-1 flex flex-col items-center"
          >
            <Link href={speaker.socialLink} target="_blank">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={150}
                height={150}
                className="rounded-full shadow-xl"
              />
            </Link>
            <h3 className="font-bold text-lg pt-5">{speaker.name}</h3>
            <h4 className="text-slate-500 text-lg pb-2 -pt-1">
              {speaker.position}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

function formatTime(time: number) {
  const hours = Math.floor(time);
  const minutes = (time - hours) * 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHour}:${formattedMinutes} ${ampm}`;
}

function Agenda({
  filteredSessions,
  agendaRef,
}: {
  filteredSessions: Session[];
  agendaRef: React.RefObject<HTMLDivElement>;
}) {
  // Group sessions by start time
  const sessionsByTime = filteredSessions.reduce(
    (acc, session) => {
      const timeKey = session.talkTimeStart.toString();
      if (!acc[timeKey]) {
        acc[timeKey] = {
          timeStart: session.talkTimeStart,
          timeEnd: session.talkTimeEnd,
          talks: [],
          workshops: [],
          breaks: [],
        };
      }

      if (session.sessionType === 'Break') {
        acc[timeKey].breaks.push(session);
      } else if (session.sessionType === 'Talk') {
        acc[timeKey].talks.push(session);
      } else if (session.sessionType === 'Workshop') {
        acc[timeKey].workshops.push(session);
      }

      return acc;
    },
    {} as Record<
      string,
      {
        timeStart: number;
        timeEnd?: number;
        talks: Session[];
        workshops: Session[];
        breaks: Session[];
      }
    >,
  );

  // Sort by time
  const timeSlots = Object.values(sessionsByTime).sort(
    (a, b) => a.timeStart - b.timeStart,
  );

  return (
    <div className="flex flex-col items-center" ref={agendaRef}>
      <h2
        id="agenda"
        className="text-3xl font-bold pt-16 pb-8 bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text"
      >
        Agenda
      </h2>

      {/* Desktop view (table) */}
      <div className="w-full max-w-5xl overflow-x-auto hidden md:block rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-4 w-1/6 text-left">Time</th>
              <th className="border p-4 w-4/5 text-center">Talks</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.timeStart}>
                <td className="border p-4 align-top text-left">
                  <div className="font-bold leading-6">
                    {formatTime(slot.timeStart)} -
                    <br />
                    {slot.timeEnd ? formatTime(slot.timeEnd) : ''}
                  </div>
                </td>

                {slot.breaks.length > 0 ? (
                  <td className="border p-4 text-center">
                    {slot.breaks.map((breakSession) => (
                      <div
                        key={breakSession.speechTitle}
                        className="mb-4 last:mb-0"
                      >
                        <h3 className="text-lg font-bold">
                          {breakSession.speechTitle}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {breakSession.speechDescription}
                        </p>
                      </div>
                    ))}
                  </td>
                ) : (
                  <td className="border p-4 align-top text-left">
                    {slot.talks.map((talk) => (
                      <div
                        key={talk.speechTitle}
                        className="mb-4 last:mb-0 flex"
                      >
                        <div>
                          <h3 className="text-lg leading-6 font-bold">
                            {talk.speechTitle}
                          </h3>
                          {talk.talkSpeakerName && (
                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                              <div className="w-6 h-6 overflow-hidden rounded-full flex items-center justify-center">
                                <Image
                                  src={talk.talkSpeakerImage}
                                  alt={talk.talkSpeakerName || 'Speaker'}
                                  width={100}
                                  height={100}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm">
                                {talk.talkSpeakerName}
                              </span>
                            </div>
                          )}
                          <p className="text-gray-600 text-sm pt-2">
                            {talk.speechDescription}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view (cards) */}
      <div className="w-full max-w-6xl md:hidden text-left">
        {timeSlots.map((slot, _slotIndex) => (
          <div key={slot.timeStart} className="mb-8">
            <div className="bg-blue-100 py-3 px-4 rounded-t-lg font-bold">
              {formatTime(slot.timeStart)} -{' '}
              {slot.timeEnd ? formatTime(slot.timeEnd) : ''}
            </div>

            {/* Break sessions */}
            {slot.breaks.length > 0 && (
              <div className="border border-t-0 p-4">
                {slot.breaks.map((breakSession) => (
                  <div
                    key={breakSession.speechTitle}
                    className="mb-4 last:mb-0"
                  >
                    <div className="bg-orange-100 text-orange-500 text-sm rounded-full px-2 w-14 mb-2">
                      Break
                    </div>
                    <h3 className="text-lg leading-5 font-bold">
                      {breakSession.speechTitle}
                    </h3>
                    <p className="text-gray-600 text-sm pt-1">
                      {breakSession.speechDescription}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Talks and Workshops */}
            {slot.breaks.length === 0 && (
              <div className="border border-t-0 p-4 space-y-6">
                {/* Talks */}
                {slot.talks.map((talk) => (
                  <div
                    key={talk.speechTitle}
                    className="pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="bg-blue-100 text-blue-500 text-sm rounded-full px-2 w-11 mb-2">
                      Talk
                    </div>
                    <h3 className="text-lg font-bold leading-5">
                      {talk.speechTitle}
                    </h3>
                    {talk.talkSpeakerName && (
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <div className="w-6 h-6 overflow-hidden rounded-full flex items-center justify-center">
                          <Image
                            src={talk.talkSpeakerImage}
                            alt={talk.talkSpeakerName || 'Speaker'}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{talk.talkSpeakerName}</span>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm pt-2">
                      {talk.speechDescription}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConferencePage({
  query,
  data,
  vars,
}: {
  query: string;
  data: any;
  vars: any;
}) {
  const tinaData = useTina({
    query,
    data,
    variables: vars,
  });

  const speakerSchedule = (
    tinaData.data?.conference?.speakerSchedule || []
  ).map((session: any) => ({
    speechTitle: session.speechTitle || 'TBD',
    speechDescription: session.speechDescription || 'TBD',
    talkSpeakerName:
      session.sessionType === 'Break' ? null : session.talkSpeakerName,
    talkSpeakerImage:
      session.sessionType === 'Break'
        ? null
        : session.talkSpeakerImage || '/img/people/Mystery.png',
    talkTimeStart: session.talkTimeStart || 0,
    talkTimeEnd:
      session.talkTimeEnd !== undefined ? session.talkTimeEnd : undefined,
    sessionType:
      (session.sessionType as 'Talk' | 'Workshop' | 'Break') || 'Break',
  }));

  const [filter, _setFilter] = useState<'all' | 'Talk' | 'Workshop'>('all');
  const filteredSessions = speakerSchedule
    .filter((session) => filter === 'all' || session.sessionType === filter)
    .sort((a, b) => a.talkTimeStart - b.talkTimeStart);

  const agendaRef = useRef<HTMLDivElement>(null);
  const scrollToAgenda = () => {
    if (agendaRef.current) {
      const offset = 30;
      ``;
      const top =
        agendaRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-6">
      {/* <TopBanner tinaData={tinaData.data?.conference?.banner} /> */}
      <HeaderBanner
        tinaData={tinaData.data?.conference?.banner}
        scrollToAgenda={scrollToAgenda}
      />
      <div className="flex flex-col justify-center items-center text-center p-16">
        <h2 className="text-3xl font-bold pb-4 bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text">
          {tinaData.data?.conference?.about?.heading}
        </h2>
        <div className="text-lg max-w-4xl">
          <TinaMarkdown
            content={tinaData.data?.conference?.about?.description}
            components={conferenceMarkdownComponents}
          />
        </div>
        <KeyHighlights
          highlights={tinaData.data?.conference?.about?.keyHighlights}
        />
        <OpenSourceExpertSpeakers
          speakers={tinaData.data?.conference?.speakers || []}
        />
        <Agenda filteredSessions={filteredSessions} agendaRef={agendaRef} />
      </div>
    </div>
  );
}

export default ConferencePage;
