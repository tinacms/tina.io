import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

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
        <Image
          src={logoSrc}
          alt={name}
          width={150}
          height={150}
          
        />
      </div>
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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <section
      key={`feature-grid-${index}`}
      className="relative z-10 pt-10 lg:pb-20 lg:pt-16 w-full overflow-hidden"
    >
      <div className="flex flex-col items-center w-full justify-center">
        <h1 className="pl-3 font-tuner inline w-fit m-auto text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-center mt-10">
          {data.title || 'Trusted By'}
        </h1>
        <div className="w-full pt-10">
          <Slider {...settings}>
            {data.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-40 px-4"
              >
                <Logo data={item} windowWidth={windowSize.width} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
