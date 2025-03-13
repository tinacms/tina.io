'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { GoPeople } from 'react-icons/go';
import { IoIosInformationCircleOutline, IoMdBook } from 'react-icons/io';
import sessionData from './conferenceData.json';

interface Session {
  talkSpeakerName: string;
  talkSpeakerImage: string;
  speachTitle: string;
  speachDescription: string;
  talkTimeStart: string;
  talkTimeEnd: string;
  sessionType: 'Talk' | 'Workshop' | 'Break';
}

const sessions: Session[] = sessionData.speakerSchedule.map((session) => ({
  ...session,
  sessionType: session.sessionType as 'Talk' | 'Workshop' | 'Break',
}));

function formatTime(time: string) {
  const date = new Date(time);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHour}:${formattedMinutes} ${ampm}`;
}

function SessionCard({ session }: { session: Session }) {
  return (
    <div
      className={`border p-5 rounded-xl shadow-2xl flex w-full max-w-2xl text-start ${
        session.sessionType === 'Workshop'
          ? 'bg-gradient-to-br from-orange-50 to-orange-200'
          : session.sessionType === 'Talk'
          ? 'bg-gradient-to-br from-blue-50 to-blue-100'
          : session.sessionType === 'Break'
          ? 'bg-gradient-to-br from-gray-50 to-gray-200'
          : 'bg-white/10'
      }`}
    >
      <div className="flex flex-col sm:flex-row" style={{ width: '100%' }}>
        <div className="flex flex-col sm:hidden">
          <p className="text-black text-md text-start font-semibold">
            {session.talkSpeakerName}
          </p>
        </div>
        <div className="hidden sm:flex flex-col" style={{ flex: '0 0 20%' }}>
          <Image
            src={session.talkSpeakerImage}
            alt={session.talkSpeakerName}
            width={80}
            height={80}
            className="rounded-full h-full object-cover"
          />
          <p className="text-black text-md text-start font-semibold mt-2">
            {session.talkSpeakerName}
          </p>
          <p
            className={`text-sm font-bold text-start ${
              session.sessionType === 'Break'
                ? 'text-gray-400'
                : session.sessionType === 'Workshop'
                ? 'text-orange-500'
                : session.sessionType === 'Talk'
                ? 'text-blue-500'
                : 'text-gray-700'
            }`}
          >
            {session.sessionType}
          </p>
        </div>
        <div className="flex flex-col" style={{ flex: '0 0 80%' }}>
          <h3 className="text-lg font-bold">{session.speachTitle}</h3>
          <p className="text-sm text-gray-500">
            {formatTime(session.talkTimeStart)} -{' '}
            {formatTime(session.talkTimeEnd)}
          </p>
          <p className="text-gray-600 text-lg pt-2">
            {session.speachDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

function ConferencePage() {
  const [filter, setFilter] = useState<'all' | 'Talk' | 'Workshop'>('all');
  const filteredSessions = sessions
    .filter((session) => filter === 'all' || session.sessionType === filter)
    .sort(
      (a, b) =>
        new Date(a.talkTimeStart).getTime() -
        new Date(b.talkTimeStart).getTime()
    );

  const agendaRef = useRef<HTMLDivElement>(null);

  const scrollToAgenda = () => {
    if (agendaRef.current) {
      const offset = 30;
      const top =
        agendaRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center text-center p-10 bg-gradient-to-br from-orange-400 to-orange-600 text-white">
        <h1 className="font-tuner text-4xl pb-4">TinaCon 2025</h1>
        <h2 className="text-2xl max-w-4xl">
          Join us for transformative day of learning, networking and inspiration
        </h2>
        <div className="flex py-6 gap-10">
          <div className="flex gap-2 items-center">
            <CiCalendar /> <span>May 2, 2025</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaRegClock /> <span>9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex gap-2 items-center">
            <FaLocationDot />{' '}
            <Link
              href="https://www.ssw.com.au/offices/melbourne "
              target="_blank"
              className="underline"
            >
              SSW Melbourne Office
            </Link>
          </div>
        </div>
        <button
          className="bg-white text-orange-500 px-5 py-3 rounded-2xl font-tuner shadow-2xl relative top-0 hover:-top-1 transition-all ease-in-out duration-300"
          onClick={scrollToAgenda}
        >
          Agenda
        </button>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-3xl font-bold pb-4 bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text">
          About the Conference
        </h2>
        <p className="text-lg max-w-4xl">
          Join us for an exciting and hands-on mini conference at{' '}
          <Link
            href="https://www.ssw.com.au/offices/melbourne"
            target="_blank"
            className="underline"
          >
            SSW Melbourne
          </Link>
          ! This event will bring together developers, content creators, and
          tech enthusiasts for an afternoon filled with inspiring talks,
          practical workshops, and networking opportunities. With topics ranging
          from GitHub tips with MishManners, to creating documentation sites
          with TinaCMS, this is the perfect chance to deepen your knowledge,
          learn new skills, and connect with like-minded individuals
        </p>
        <div className="flex py-12 gap-10 max-w-4xl">
          <div className="flex flex-col gap-2 items-center">
            <IoIosInformationCircleOutline
              size={40}
              className="text-orange-500 bg-orange-200 p-2 rounded-full"
            />{' '}
            <h3 className="font-bold">7 Experts Speakers</h3>{' '}
            <p>
              Learn from industry-leading experts who are shaping the future
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <IoMdBook
              size={40}
              className="text-blue-500 bg-blue-200 p-2 rounded-full"
            />{' '}
            <h3 className="font-bold">7 Interactive Workshops</h3>{' '}
            <p>
              Gain practical insights and hands-on experience from experts in
              their fields
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <GoPeople
              size={40}
              className="text-orange-500 bg-orange-200 p-2 rounded-full"
            />{' '}
            <h3 className="font-bold">Premium Networking</h3>{' '}
            <p>
              Connect with industry leaders and innovators in a relaxed and
              friendly environment
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-bold py-4 bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text">
          Open Source Expert Speakers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 gap-x-10 lg:px-20">
          <div className="col-span-1 md:col-span-3 flex flex-col gap-2 items-center">
            <Link
              href="https://www.ssw.com.au/people/adam-cogan/"
              target="_blank"
            >
              <Image
                src="/img/people/Adam-Cogan-Profile.jpg"
                alt="Adam Cogan"
                width={150}
                height={150}
                className="rounded-full shadow-xl border border-orange-600 hover:scale-105 hover:border-4 transition-all"
              />
            </Link>
            <h3 className="font-bold">Adam Cogan</h3>{' '}
            <h4 className="text-orange-500">SSW Chief Architect</h4>
            <div className="md:max-w-[33%] text-center">
              <p>
                Chief Architect at SSW, a Microsoft Solutions Partner
                specializing in custom enterprise .NET and Azure solutions
                mostly using Blazor, Angular, and React.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Link
              href="https://www.ssw.com.au/people/matt-wicks/"
              target="_blank"
            >
              <Image
                src="/img/people/Matt-Wicks-Profile.jpg"
                alt="Matt Wicks"
                width={150}
                height={150}
                className="rounded-full shadow-xl border border-orange-600 hover:scale-105 hover:border-orange-600 hover:border-4 transition-all"
              />
            </Link>
            <h3 className="font-bold">Matt Wicks</h3>{' '}
            <h4 className="text-orange-500">Solution Architect</h4>
            <p>
              Matt is an elite SSW Solution Architect who runs the Newcastle
              office. Matt stands out in the tech landscape as a certified Scrum
              Master, an Octopus Insider, and is GitHub accredited.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Link
              href="https://www.ssw.com.au/people/michelle-duke/"
              target="_blank"
            >
              <Image
                src="/img/people/Michelle-Duke-Profile.jpg"
                alt="Michelle Duke"
                width={150}
                height={150}
                className="rounded-full shadow-xl border border-orange-600 hover:scale-105 hover:border-orange-600 hover:border-4 transition-all"
              />
            </Link>
            <h3 className="font-bold">Michelle Duke</h3>{' '}
            <h4 className="text-orange-500">Senior Developer Advocate</h4>
            <p>
              Mish is the Senior Developer Advocate at SSW, coming to you from
              the Melbourne office. She loves creating content and connecting
              with the developer community.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Link
              href="https://www.ssw.com.au/people/hajir-lesani/"
              target="_blank"
            >
              <Image
                src="/img/people/Hajir-Lesani-Profile.jpg"
                alt="Hajir Lesani"
                width={150}
                height={150}
                className="rounded-full shadow-xl border border-orange-600 hover:scale-105 hover:border-orange-600 hover:border-4 transition-all"
              />
            </Link>
            <h3 className="font-bold">Hajir Lesani</h3>{' '}
            <h4 className="text-orange-500">Solution Architect</h4>
            <p>
              Hajir is an SSW Solution Architect and Team Lead with over 14
              years of experience across diverse sectors including government
              organizations, United Nations, logistics and supply chain
              technology, and financial technology.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center p-10" ref={agendaRef}>
          <h2
            id="agenda"
            className="text-3xl font-bold py-4 bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 text-transparent bg-clip-text"
          >
            Agenda
          </h2>
          <div className="relative w-full max-w-2xl">
            <div className="flex justify-between items-center text-center bg-gray-200 p-2 rounded-2xl w-full gap-1">
              <button
                className={`px-4 py-2 rounded-lg w-full font-bold ${
                  filter === 'all' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setFilter('all')}
              >
                All Sessions
              </button>
              <button
                className={`px-4 py-2 rounded-lg w-full font-bold ${
                  filter === 'Talk' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setFilter('Talk')}
              >
                Talks Only
              </button>
              <button
                className={`px-4 py-2 rounded-lg w-full font-bold ${
                  filter === 'Workshop' ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={() => setFilter('Workshop')}
              >
                Workshops Only
              </button>
            </div>
            <div
              className={`absolute top-0 left-0 h-full w-1/3 bg-blue-500 rounded-2xl transition-transform duration-300 ease-in-out opacity-50 ${
                filter === 'all'
                  ? 'translate-x-0'
                  : filter === 'Talk'
                  ? 'translate-x-full'
                  : 'translate-x-[200%]'
              }`}
            ></div>
          </div>
          <div className="pt-10 flex flex-col gap-6 w-full max-w-3xl">
            {filteredSessions.map((session, index) => (
              <SessionCard key={index} session={session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferencePage;
