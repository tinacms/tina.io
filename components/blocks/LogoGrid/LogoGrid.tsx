import { useWindowSize } from 'components/hooks/UseWindowSize';
import Image from 'next/image';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { Slider } from './CustomSlider';

const Logo = ({ data, windowWidth = 1000 }) => {
  if (!data) {
    return null;
  }

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
        <Image
          src={logoSrc}
          alt={name}
          width={150}
          height={150}
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </a>
  );
};

export function LogoGridBlock({ data, index }) {
  const windowSize = useWindowSize();
  const slidesToShow = windowSize.width > 1024 ? 5 : 3;

  if (!data || !data.items) {
    return null;
  }

  return (
    <section
      key={`feature-grid-${index}`}
      className="relative z-10 w-full overflow-hidden max-w-[1500px] m-auto"
    >
      <div className="flex flex-col items-center w-full justify-center">
        {data.title && <h1 className="pl-3 font-ibm-plex inline w-fit m-auto text-3xl lg:text-5xl lg:leading-tight bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-center mt-10">
          {data.title}
        </h1>}
        <div className="w-full mask-horizontal-fade">
          <Slider
            speed={0.5}
            slidesToShow={slidesToShow}
            items={data.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center h-40"
              >
                <Logo data={item} windowWidth={windowSize.width} />
              </div>
            ))}
          />
        </div>
      </div>
      <style jsx>{`
        .mask-horizontal-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 2%,
            black 98%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 2%,
            black 98%,
            transparent
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </section>
  );
}
