import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import css from 'styled-jsx/css';
import { tinaField } from 'tinacms/dist/react';
import { splitOneAndJoin } from './CompareBox.template';


//Function to use alpha values to create a background gradient with any input hex colour
function hexToRgba(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const commonHeightStyle = {
  height: '50px',
  marginBottom: '8px',
  lineHeight: '16px',
};

const CompanyItem = ({ company, onClick }) => {
  if (company.isHidden) {
    return null;
  }

  return (
    <div
      className={`flex items-center space-x-4 cursor-pointer ${
        company.active ? '' : 'opacity-25'
      }`}
      onClick={onClick}
    >
      {company.logoColour && <Image
        src={company.logoColour}
        alt={`${company.headline || "Unknown"} logo`}
        className="lg:h-10 lg:w-10 md:h-8 md:w-8 h-6 w-6 "
        width={40}
        height={40}
      />}
      <span
        className={`font-tuner  ${
          company.active
            ? 'bg-gradient-to-br text-black bg-clip-text'
            : 'text-gray-500'
        }`}
      >
        <div className="lg:text-xl md:text-sm text-xs">{company.headline}</div>
      </span>
    </div>
  );
};

const CriteriaCard = ({ criteriaItems }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="criteria-card rounded-lg relative">
      <div key={0} className="py-3 flex" style={commonHeightStyle} />
      {criteriaItems?.map((item, idx) => (
        <div key={idx} className="py-3 flex relative" style={commonHeightStyle}>
          <h3
            data-tina-field={tinaField(item, 'criteria')}
            className="sm:leading-[10px] md:font-semibold lg:font-semibold sm:font-normal lg:text-lg md:text-sm sm:text-xs flex items-center"
          >
            <span>{item.criteria}</span>
          </h3>
          <div className="relative content-center ml-auto lg:ml-0">
            <IoMdInformationCircleOutline
              className="ml-1 text-orange-500 text-xl"
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            />
            {hoveredItem === idx && (
              <div className="ml-0.5 shadow-[0px_0px_25px_10px_rgba(0,0,0,0.1)] absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white text-sm p-2 rounded-lg z-10 xl:w-[300px] w-[150px] break-words text-center">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const CompanyCard = ({ company, criteria }) => {

  const criterias = company.satisfiedCriteria?.map((item) => splitOneAndJoin(item, "-"));
  const baseColor = company.backgroundColor || '#000000';
  return (
    <div className="rounded-lg flex flex-col items-center w-full company-card">
      <div
        className="w-full flex justify-center items-center text-center px-2 py-4 opacity-100 rounded-t-lg"
        style={{
          ...commonHeightStyle,
          background: `linear-gradient(225deg, ${hexToRgba(
            baseColor,
            0.8
          )} 0%, ${hexToRgba(baseColor, 0.9)} 50%, ${hexToRgba(
            baseColor,
            1
          )} 100%)`,
        }}
      >
        {company.logoWhite && <Image
          src={company.logoWhite}
          alt={`${company.headline ?? "Unknown"} logo`}
          className="xl:h-10 xl:w-10 lg:h-7 lg:w-7 md:h-7 md:w-7 h-8 w-8 pr-1 filter-transparent"
          width={40}
          height={40}
        />}
        <h3 className="hidden sm:block xl:text-xl lg:text-lg md:text-md text-xs font-bold text-white whitespace-nowrap">
          {company.headline}
        </h3>
      </div>

      <div className="w-full">
        {Array.from({ length: criteria?.length ?? 0 }, (_, idx) => {
          const satisfied = criterias?.find((item) => item[1] === criteria[idx].criteria);

          return (
          <div key={idx} className="flex flex-col items-center w-full">
            <div
              className="flex items-center justify-center w-full"
              style={{
                ...commonHeightStyle,
                backgroundColor: company.backgroundColor
                  ? hexToRgba(company.backgroundColor, 0.2)
                  : 'transparent',
              }}
            >
              {satisfied?.[0] === "true" && (
                <FaCircle
                  style={{ color: company.backgroundColor }}
                  className="xl:h-5 xl:w-5 lg:h-5 lg:w-5 md:h-4 md:w-4 h-4 w-4"
                />
              )}
            </div>
            <div
              className="w-full"
              style={{ backgroundColor: 'transparent', height: '0px' }}
            ></div>
          </div>
        )})}
      </div>
    </div>
  );
};

interface CompareBoxBlockProps {
  data: any;
  index: number;
}

export function CompareBoxBlock({ data, index }: CompareBoxBlockProps) {
  const [companies, setCompanies] = useState([]);
  const [userInteracted, setUserInteracted] = useState(false);
  const [maxActive, setMaxActive] = useState(4);
  const sliderRef = useRef(null);

  useEffect(() => {
      setCompanies(data.companies);
    }, [data]);

  useEffect(() => {
    if (userInteracted) return;

    let currentIndex = 1;
    const interval = setInterval(() => {
      setCompanies((prevCompanies) => {
        const newCompanies = prevCompanies?.map((company, idx) => ({
          ...company,
          active: idx === 0 ? true : idx === currentIndex,
        }));
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(currentIndex - 1);
        }
        currentIndex = (currentIndex + 1) % (prevCompanies?.length ?? 1);
        if (currentIndex === 0) currentIndex = 1;
        return newCompanies;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [userInteracted]);

  useEffect(() => {
    const updateMaxActive = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setMaxActive(2);
      } else if (width < 1024) {
        setMaxActive(3);
      } else {
        setMaxActive(4);
      }
    };

    updateMaxActive();
    window.addEventListener('resize', updateMaxActive);

    return () => window.removeEventListener('resize', updateMaxActive);
  }, []);

  const toggleActive = (companyIdx) => {
    setUserInteracted(true);

    setCompanies((prevCompanies) => {
      const activeCompanies = prevCompanies.filter((company) => company.active);
      const activeCompaniesCount = activeCompanies.length;
      const company = prevCompanies[companyIdx];

      if (company.isHidden) {
        return prevCompanies;
      }

      if (!company.active && activeCompaniesCount >= maxActive) {
        const firstActiveIdx = prevCompanies.findIndex(
          (comp) => comp.active && !comp.isHidden && comp.headline !== 'TinaCMS'
        );
        if (firstActiveIdx !== -1) {
          prevCompanies[firstActiveIdx].active = false;
        }
      }

      return prevCompanies.map((company, idx) =>
        idx === companyIdx ? { ...company, active: !company.active } : company
      );
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="md:px-10 lg:px-10 rounded-lg">
      <div className="px-8 py-8 md:px-8 bg-gradient-to-br from-white/25 via-white/50 to-white/75  break-inside-avoid rounded-xl shadow-2xl">
        <h1 className="pl-3 font-tuner flex items-center text-center justify-center text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance px-2 mt-10 pb-8">
          Why Tina?
        </h1>
        <div
          className="items-center w-full"
          style={{ justifyContent: 'center' }}
        >
          <Slider
            ref={sliderRef}
            {...settings}
            className="pb-10 ml-4 mr-4 pl-4"
          >
            {companies?.map(
              (company, companyIdx) =>
                !company.isHidden && (
                  <div key={`company-${companyIdx}`}>
                    <CompanyItem
                      company={company}
                      onClick={() => toggleActive(companyIdx)}
                    />
                  </div>
                )
            )}
          </Slider>
        </div>

        <div className="flex justify-center">
          <div
            className="grid lg:gap-4 md:gap-2 gap-2"
            style={{
              gridTemplateColumns: `repeat(${
                companies?.filter((company) => company.active).length + 1
              }, minmax(0, 1fr))`,
              maxWidth: '100%',
            }}
          >
            <div className="col-span-1">
              <CriteriaCard criteriaItems={data.criteriaItems} />
            </div>
            {companies?.filter((company) => company.active)
              .map((company, idx) => (
                <CompanyCard key={`company-card-${idx}`} company={company} criteria={data.criteriaItems} />
              ))}
          </div>
        </div>

        <style jsx>{styles}</style>
        <style jsx global>{`
          .slick-next:before {
            color: black !important;
            content: '→' !important;
          }

          .slick-prev:before {
            color: black !important;
            content: '←' !important;
          }

          .slick-prev,
          .slick-next {
            top: 25%;
          }
        `}</style>
      </div>
    </div>
  );
}

const styles = css`
  .criteria-card {
    width: 300px;
  }

  .company-card {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.75s forwards;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default CompareBoxBlock;
