'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaRegCalendar, FaRegMap, FaRegUser } from 'react-icons/fa';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { GoPeople } from 'react-icons/go';
import { IoIosInformationCircleOutline, IoMdBook } from 'react-icons/io';
import { useTina } from 'tinacms/dist/react';

import { Button } from 'components/ui';
import { FaRegStar } from 'react-icons/fa';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const TopBanner = ({ tinaData }: { tinaData: any }) => {
  return (
    <div className="w-full relative py-4">
      <div className="absolute inset-0 bg-orange-500"></div>
      <div
        className="absolute inset-0 bg-blue-900"
        style={{
          clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 35% 100%)',
        }}
      ></div>
      <div className="relative flex justify-between items-center px-8">
        <div className="w-[40%] text-white">
          <div className="font-tuner text-4xl">
            <span className="font-bold">tina</span>con 2025
          </div>
          <div className="font-tuner text-2xl">Herding the Future</div>
        </div>
        <div className="w-[60%] text-white">
          <div className="flex items-center gap-4 font-tuner text-lg">
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
          <div className="mt-4">
            <Link href={tinaData?.rightButton?.link} target="_blank">
              <Button color="blue" size="medium">
                <span className="mr-2">Join us</span>
              </Button>
            </Link>
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
  console.log(tinaData);
  return (
    <div className="flex flex-col justify-center items-center text-center lg:p-16 p-10 bg-gradient-to-br from-seafoam-100 to-seafoam-200 text-black">
      <h1 className="font-tuner text-4xl pb-4 text-orange-500">
        {tinaData.bannerTitle}
      </h1>
      <h2 className="text-2xl max-w-4xl">{tinaData.bannerDescription}</h2>
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
      className="text-white bg-gradient-to-br from-orange-400 to-orange-600 p-2 mb-4 rounded-full"
    />
  ),
  IoMdBook: (
    <IoMdBook
      size={40}
      className="text-white bg-gradient-to-br from-blue-400 to-blue-600 p-2 mb-4 rounded-full"
    />
  ),
  GoPeople: (
    <GoPeople
      size={40}
      className="text-white bg-gradient-to-br from-seafoam-500 to-seafoam-700 p-2 mb-4 rounded-full"
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
      ].map(([header, description, icon], index) => (
        <div
          key={index}
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
      <h2 className="text-3xl font-bold py-16 bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text">
        Open Source Expert Speakers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-14">
        {speakers.map((speaker, index) => (
          <div key={index} className="col-span-1 flex flex-col items-center">
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

function SessionCard({ session }: { session: Session }) {
  return (
    <div className="border p-5 rounded-xl shadow-xl flex w-full max-w-2xl text-start">
      <div className="flex flex-col sm:flex-row" style={{ width: '100%' }}>
        {session.talkSpeakerImage && (
          <div
            className="hidden sm:flex flex-col pr-4"
            style={{ flex: '0 0 20%' }}
          >
            <Image
              src={session.talkSpeakerImage}
              alt={session.talkSpeakerName || 'Unknown Speaker'}
              width={1000}
              height={1000}
              className="rounded-full w-full h-auto"
            />
          </div>
        )}
        <div className="flex flex-col" style={{ flex: '0 0 80%' }}>
          <span
            className={`text-sm rounded-full text-center px-2 mb-2 -ml-1 ${
              session.sessionType === 'Break'
                ? 'bg-gradient-to-br from-orange-100 to-orange-100 w-14 text-orange-500'
                : session.sessionType === 'Workshop'
                ? 'bg-gradient-to-br from-seafoam-200 to-seafoam-200 w-[5.5rem] text-seafoam-700'
                : session.sessionType === 'Talk'
                ? 'bg-gradient-to-br from-blue-100 to-blue-100 w-11 text-blue-500'
                : 'text-gray-700'
            }`}
          >
            {session.sessionType}
          </span>
          <h3 className="text-lg font-bold">{session.speechTitle || 'TBD'}</h3>
          {session.talkSpeakerName && (
            <span className="flex items-center gap-2 text-gray-600">
              <FaRegUser />
              <p className="text-sm text-gray-600 text-center flex items-center">
                {session.talkSpeakerName}
              </p>
            </span>
          )}
          <span className="flex items-center gap-2 text-gray-600">
            <FaRegClock />
            <p className="text-sm">
              {formatTime(session.talkTimeStart)}
              {session?.talkTimeEnd && ` - ${formatTime(session.talkTimeEnd)}`}
            </p>
          </span>
          <p className="text-gray-600 text-sm pt-2">
            {session.speechDescription || 'TBD'}
          </p>
        </div>
      </div>
    </div>
  );
}

function Agenda({
  filteredSessions,
  filter,
  setFilter,
  agendaRef,
}: {
  filteredSessions: Session[];
  filter: 'all' | 'Talk' | 'Workshop';
  setFilter: (filter: 'all' | 'Talk' | 'Workshop') => void;
  agendaRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="flex flex-col items-center p-10" ref={agendaRef}>
      <h2
        id="agenda"
        className="text-3xl font-bold pt-16 pb-8 bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text"
      >
        Agenda
      </h2>
      <div className="relative bg-gradient-to-br from-white/25 via-white/50 to-white/75 shadow-md rounded-full flex w-full">
        <div className="relative flex z-10 w-full">
          <div
            className={`absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 rounded-full transition-transform duration-500 border-4 border-white ${
              // For some reason the translate-x-1/3, 2/3, etc doesnt work so we have full and 200% which is just full x 2
              filter === 'all'
                ? 'translate-x-0'
                : filter === 'Talk'
                ? 'translate-x-full'
                : 'translate-x-[200%]'
            }`}
          ></div>
          <button
            className={`flex-1 px-10 py-4 z-20 transition-colors duration-500 ${
              filter === 'all' ? 'text-white' : 'text-blue-500'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`flex-1 px-10 py-4 z-20 transition-colors duration-500 ${
              filter === 'Talk' ? 'text-white' : 'text-blue-500'
            }`}
            onClick={() => setFilter('Talk')}
          >
            Talks
          </button>
          <button
            className={`flex-1 px-10 py-4 z-20 transition-colors duration-500 ${
              filter === 'Workshop' ? 'text-white' : 'text-blue-500'
            }`}
            onClick={() => setFilter('Workshop')}
          >
            Workshops
          </button>
        </div>
      </div>
      <div className="pt-10 flex flex-col gap-6 w-full max-w-3xl">
        {filteredSessions.map((session, index) => (
          <SessionCard key={index} session={session} />
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
    talkSpeakerName: session.talkSpeakerName,
    talkSpeakerImage: session.talkSpeakerImage || '/img/people/Mystery.png',
    talkTimeStart: session.talkTimeStart || 0,
    talkTimeEnd:
      session.talkTimeEnd !== undefined ? session.talkTimeEnd : undefined,
    sessionType:
      (session.sessionType as 'Talk' | 'Workshop' | 'Break') || 'Break',
  }));

  const [filter, setFilter] = useState<'all' | 'Talk' | 'Workshop'>('all');
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
      <TopBanner tinaData={tinaData.data?.conference?.banner} />
      <HeaderBanner
        tinaData={tinaData.data?.conference?.banner}
        scrollToAgenda={scrollToAgenda}
      />
      <div className="flex flex-col justify-center items-center text-center p-16">
        <h2 className="text-3xl font-bold pb-4 bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text">
          {tinaData.data?.conference?.about?.heading}
        </h2>
        <p className="text-lg max-w-4xl">
          <TinaMarkdown
            content={tinaData.data?.conference?.about?.description}
            components={conferenceMarkdownComponents}
          />
        </p>
        <KeyHighlights
          highlights={tinaData.data?.conference?.about?.keyHighlights}
        />
        <OpenSourceExpertSpeakers
          speakers={tinaData.data?.conference?.speakers || []}
        />
        <Agenda
          filteredSessions={filteredSessions}
          filter={filter}
          setFilter={setFilter}
          agendaRef={agendaRef}
        />
      </div>
    </div>
  );
}

export default ConferencePage;
