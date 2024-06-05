import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AutoPlaySettings = { 
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 10000,
  autoplaySpeed: 100,
  arrows: false,
  cssEase: 'linear'
};

const Logo = ({ data, windowWidth = 1000 }) => {
  const scaleFactor = windowWidth > 1200 ? 1 : windowWidth > 600 ? 0.75 : 0.5;

  return (
    <a
      href={data.link}
      title={data.name}
      target="_blank"
      className="block flex-none transition duration-150 hover:brightness-0 cursor-pointer"
      style={{
        width: data.size ? data.size * scaleFactor : 200 * scaleFactor,
      }}
    >
      <img
        src={data.logo}
        className="block w-full h-auto m-0"
        alt={data.name}
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

    if (!window) return;

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        .slick-track {
          animation: logoloop linear infinite !important;
        }

        @keyframes logoloop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
      <section
        key={'feature-grid-' + index}
        className="relative z-10 py-16 lg:pb-20 lg:pt-16 w-full"
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-col items-center w-full">
          {data.title && (
            <h1 
              className="pl-3 font-tuner inline-block text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10 pb-8">
              Trusted By
            </h1>
          )}
          <Slider {...AutoPlaySettings} className="w-full flex items-center flex-wrap justify-center gap-10 md:gap-16 lg:gap-20 brightness-[.15]">
            {data.items && data.items.map((item, index) => (
              <div key={index} style={{ minWidth: '33.333%' }}>
                <Logo data={item} windowWidth={windowSize.width} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}
