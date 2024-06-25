import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronRight } from "react-icons/fa";
import JeanCircle from '../../public/img/people/jean-circle.png';
import LeviCircle from '../../public/img/people/levi-circle.png';
import ScottImage from '../../public/img/people/scottImage.jpg';

const DemoForm = () => {
  return (
    <>
      <div className="py-10">
        <div className="flex justify-center pb-8">
          <h1 className="inline-block m-0 md:text-4xl font-tuner lg:text-3xl md:text-2xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Choose your location
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-3 px-6 md:px-0 lg:px-6">
          <div className="flex justify-center w-full items-center h-full">
            <div className="w-full max-w-sm h-full">
              <Link
                href="https://meetings-eu1.hubspot.com/scott15"
                className="flex flex-col md:flex-row lg:flex-row w-full h-full items-center justify-between rounded-lg border border-input bg-background p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700"
                prefetch={false}
              >
                <Image
                  src={ScottImage.src}
                  alt="North America Portrait"
                  className="hidden md:block w-18 h-18 rounded-full lg:mr-4 md:mr-4"
                  width={72}
                  height={72}
                />
                <div className="flex-grow text-center md:text-left lg:text-left">
                  <div className="font-medium text-lg">Americas</div>
                  <div className="text-muted-foreground text-xs">
                    Meet with Scott (English)
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <FaChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-full items-center h-full">
            <div className="w-full max-w-sm h-full">
              <Link
                href="https://meetings-eu1.hubspot.com/jean-thirion"
                className="flex flex-col md:flex-row lg:flex-row w-full h-full items-center justify-between rounded-lg border border-input bg-background p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700"
                prefetch={false}
              >
                <Image
                  src={JeanCircle.src}
                  alt="Europe Portrait"
                  className="hidden md:block w-18 h-18 rounded-full lg:mr-4 md:mr-4"
                  width={72}
                  height={72}
                />
                <div className="flex-grow text-center md:text-left lg:text-left">
                  <div className="font-medium text-lg">Europe</div>
                  <div className="text-muted-foreground text-xs">
                    Meet with Jean (English and French)
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <FaChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-full items-center h-full">
            <div className="w-full max-w-sm h-full">
              <Link
                href="https://meetings-eu1.hubspot.com/levi-jackson"
                className="flex flex-col md:flex-row lg:flex-row w-full h-full items-center justify-between rounded-lg border border-input bg-background p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700"
                prefetch={false}
              >
                <Image
                  src={LeviCircle.src}
                  alt="Oceania and Asia Portrait"
                  className="hidden md:block w-18 h-18 rounded-full lg:mr-4 md:mr-4"
                  width={72}
                  height={72}
                />
                <div className="flex-grow text-center md:text-left lg:text-left">
                  <div className="font-medium text-lg">Oceania and Asia</div>
                  <div className="text-muted-foreground text-xs">
                    Meet with Levi (English)
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <FaChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoForm;
