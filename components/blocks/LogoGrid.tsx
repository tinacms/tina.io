import Image from 'next/image';
import React from 'react';
import Slider from 'react-infinite-logo-slider';

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
      className="flex items-center justify-center transition duration-150 hover:brightness-0 cursor-pointer"
      style={{
        width: data.size ? data.size * scaleFactor : 200 * scaleFactor,
        display: 'flex',
        padding: '0 8px',
      }}
    >
      <Image
        src={logoSrc}
        className="block w-full h-auto m-0"
        alt={name}
        width={150}
        height={150}
      />
    </a>
  );
};

function getWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 1000, height: 800 };
  }
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
}

export function LogoGridBlock({ data, index }) {
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    setWindowSize(getWindowSize());

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    if (typeof window === 'undefined') return;

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (!data || !data.items) return null;

  return (
    <>
      <section
        key={'feature-grid-' + index}
        className="relative z-10 pt-10 lg:pb-20 lg:pt-16 w-full"
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-col items-center w-full">
          {data.title && (
            <h1 className="pl-3 font-tuner flex items-center justify-center text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10">
              Trusted By
            </h1>
          )}
          <Slider
            width="250px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBoderColor={'#fff'}
            className="justify-center"
          >
            {data.items.map((item, index) => (
              <Slider.Slide key={index} className="flex justify-center">
                <Logo data={item} windowWidth={windowSize.width} />
              </Slider.Slide>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
