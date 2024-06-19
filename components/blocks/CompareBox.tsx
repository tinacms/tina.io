import React, { useState, useEffect, useRef } from 'react';
import { FaCircle } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from 'styled-jsx/css';

function hexToRgba(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const commonHeightStyle = {
  height: '60px',
  marginBottom: '2px',
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
      <img
        src={company.logo}
        alt={`${company.headline} logo`}
        className="h-10 w-10"
      />
      <span
        className={`font-tuner ${
          company.active
            ? 'text-transparent bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text'
            : 'text-gray-500'
        }`}
      >
        {company.headline}
      </span>
    </div>
  );
};

const CriteriaCard = ({ criteriaItems }) => {
  return (
    <div className="rounded">
      {criteriaItems.map((item, idx) => (
        <div
          key={idx}
          className="py-5 flex items-center"
          style={commonHeightStyle}
        >
          <h3 className="font-normal md:text-sm sm:text-xs">{item.criteria}</h3>
        </div>
      ))}
    </div>
  );
};

const CompanyCard = ({ company }) => {
  const baseColor = company.backgroundColor || '#000000';
  return (
    <div className="rounded flex flex-col items-center w-full company-card">
      <div
        className="w-full flex justify-center items-center text-center py-4 opacity-100"
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
        <img src={company.logo} alt={`${company.headline} logo`} className="h-10 w-10 mr-2" />
        <h3 className="lg:text-2xl md:text-xl sm:text-lg font-bold text-white">{company.headline}</h3>
      </div>

      <div className="w-full">
        {Array.from({ length: 9 }, (_, idx) => (
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
              {company[`criteria${idx + 1}`] && (
                <FaCircle style={{ color: company.backgroundColor }} />
              )}
            </div>
            <div
              className="w-full"
              style={{ backgroundColor: 'transparent', height: '1px' }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};


export function CompareBoxBlock({ data }) {
  const [companies, setCompanies] = useState([]);
  const [userInteracted, setUserInteracted] = useState(false);
  const [maxActive, setMaxActive] = useState(4);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (data && data.companies) {
      const updatedCompanies = data.companies.map((company, idx) => {
        const updatedCompany = {
          ...company,
          isHidden: company.headline === 'TinaCMS',
          active: idx === 0 ? true : company.active,
        };
        data.criteriaItems.forEach((criteria, idx) => {
          updatedCompany[`criteria${idx + 1}`] =
            updatedCompany[`criteria${idx + 1}`] || false;
        });
        return updatedCompany;
      });
      setCompanies(updatedCompanies);
    }
  }, [data]);

  useEffect(() => {
    if (userInteracted) return;

    let currentIndex = 1;
    const interval = setInterval(() => {
      setCompanies((prevCompanies) => {
        const newCompanies = prevCompanies.map((company, idx) => ({
          ...company,
          active: idx === 0 ? true : idx === currentIndex,
        }));
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(currentIndex - 1);
        }
        currentIndex = (currentIndex + 1) % prevCompanies.length;
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
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '40px',
    responsive: [
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
    <div className="px-8 md:px-24">
      <h1 className="pl-3 font-tuner flex items-center justify-center text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left px-2 mt-10 pb-8">
        Why you should use TinaCMS
      </h1>
      <div className="items-center w-full" style={{justifyContent: "center" }}>
        <Slider ref={sliderRef} {...settings} className="pb-10 ml-4 mr-4 pl-4">
          {companies.map(
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
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${
              companies.filter((company) => company.active).length + 1
            }, minmax(0, 1fr))`,
            maxWidth: '100%',
          }}
        >
          <div className="col-span-1">
            <CriteriaCard criteriaItems={data.criteriaItems} />
          </div>
          {companies
            .filter((company) => company.active)
            .map((company, idx) => (
              <CompanyCard key={`company-card-${idx}`} company={company} />
            ))}
        </div>
      </div>

      <style jsx>{styles}</style>
      <style jsx global>{`
        .slick-next:before {
          color: black !important;
          content: "→" !important; 
        }

        .slick-prev:before {
          color: black !important;
          content: "←" !important;
        }
      `}</style>
    </div>
  );
}

const styles = css`
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
