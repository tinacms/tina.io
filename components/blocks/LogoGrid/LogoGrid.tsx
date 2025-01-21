import Image from 'next/image';

import { useWindowSize } from 'components/hooks/UseWindowSize';
import React, { useEffect, useRef, useState } from 'react';
import { Slider } from './CustomSlider';

const Logo = ({ data, windowWidth = 1000 }) => {
  if (!data) return null;

  const scaleFactor = windowWidth > 1200 ? 1 : windowWidth > 600 ? 1 : 1;
  const logoSrc = data.logo ? data.logo : '/images/unknown-logo.png';
  const link = data.link ? data.link : '#';
  const name = data.name ? data.name : 'Unknown Logo';

  return (
    <a
      href={link}
      title={name}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full h-full transition duration-150 hover:brightness-90 cursor-pointer"
      style={{
        width: data.size ? data.size * scaleFactor : 200 * scaleFactor,
        height: 200 * scaleFactor,
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Image src={logoSrc} alt={name} width={150} height={150} />
      </div>
    </a>
  );
};

export function LogoGridBlock({ data, index }) {
  const windowSize = useWindowSize();
  const slidesToShow = windowSize.width > 1024 ? 5 : 3;

  if (!data || !data.items) return null;

  return (
    <section
      key={`feature-grid-${index}`}
      className="relative z-10 w-full overflow-hidden"
    >
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="pl-3 font-tuner inline w-fit m-auto text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-center mt-10">
          {data.title || 'Trusted By'}
        </h1>
        <div className="w-full pt-10">
          <Slider
            speed={1}
            slidesToShow={slidesToShow}
            items={data.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-center h-40">
                <Logo data={item} windowWidth={windowSize.width} />
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
