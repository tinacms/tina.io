import Image from 'next/image';
import Link from 'next/link';
import { CiCalendar } from 'react-icons/ci';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { GoPeople } from 'react-icons/go';
import { IoIosInformationCircleOutline, IoMdBook } from 'react-icons/io';

function ConferencePage() {
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
            <FaLocationDot /> <span>SSW Melbourne Office</span>
          </div>
        </div>
        <button className="bg-white text-orange-500 px-5 py-3 rounded-2xl font-tuner shadow-2xl relative top-0 hover:-top-1 transition-all ease-in-out duration-300">
          Agenda
        </button>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-3xl font-bold pb-4 bg-gradient-to-br from-blue-500 to-blue-700 text-transparent bg-clip-text">
          About the Conference
        </h2>
        <p className="text-lg max-w-4xl">
          TinaCon brings together industry leaders, innovators, and enthusiasts
          for a day packed with cutting-edge insights, hands-on workshops, and
          unparalleled networking opportunities. Whether you're a seasoned
          professional or just starting your journey, our carefully curated
          program offers something valuable for everyone
        </p>
        <div className="flex py-12 gap-10 max-w-4xl">
          <div className="flex flex-col gap-2 items-center">
            <IoIosInformationCircleOutline
              size={40}
              className="text-orange-500 bg-orange-200 p-2 rounded-full"
            />{' '}
            <h3 className="font-bold">7 Experts Speakers</h3>{' '}
            <p>
              Learn form industry-leading experts who are shaping the future
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <IoMdBook
              size={40}
              className="text-blue-500 bg-blue-200 p-2 rounded-full"
            />{' '}
            <h3 className="font-bold">7 Experts Speakers</h3>{' '}
            <p>
              Learn form industry-leading experts who are shaping the future
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <GoPeople
              size={40}
              className="text-orange-500 bg-orange-200 p-2 rounded-full"
            />{' '}
            <h3 className="font-bold">7 Experts Speakers</h3>{' '}
            <p>
              Learn form industry-leading experts who are shaping the future
            </p>
          </div>
        </div>
        <h2 className="text-3xl font-bold py-4 bg-gradient-to-br from-blue-500 to-blue-700 text-transparent bg-clip-text">
          Our Speakers
        </h2>
        <div className="grid grid-cols-3 gap-10 gap-x-10 px-20">
          <div className="col-span-3 flex flex-col gap-2 items-center">
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
            <div className="max-w-[33%] text-center">
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
          <div className="col-span-3 m-5 flex flex-col gap-2 items-center">
            <h3 className="font-bold text-3xl">More coming soon...</h3>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConferencePage;
