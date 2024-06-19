import React, { useState, useEffect } from 'react'
import { FaCircle } from 'react-icons/fa'

function hexToRgba(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const commonHeightStyle = {
  height: '60px',
  marginBottom: '2px',
}

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
        <div key={idx} className="py-5 flex items-center" style={commonHeightStyle}>
          <h3 className="font-normal">{item.criteria}</h3>
        </div>
      ))}
    </div>
  )
}

const CompanyCard = ({ company }) => {
  const baseColor = company.backgroundColor || '#000000'
  return (
    <div className="rounded flex flex-col items-center w-full">
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
        <h3 className="text-2xl font-bold text-white">{company.headline}</h3>
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
  )
}

export function CompareBoxBlock({ data, index }) {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (data && data.companies) {
      const updatedCompanies = data.companies.map((company) => {
        const updatedCompany = { ...company }
        data.criteriaItems.forEach((criteria, idx) => {
          updatedCompany[`criteria${idx + 1}`] =
            updatedCompany[`criteria${idx + 1}`] || false
        })
        return updatedCompany
      })
      setCompanies(updatedCompanies)
    }
  }, [data])

  const toggleActive = (companyIdx) => {
    const activeCompanies = companies.filter(company => company.active);
    const activeCompaniesCount = activeCompanies.length;
    const company = companies[companyIdx];
    
    if (company.isHidden) {
      return;
    }

    if (!company.active && activeCompaniesCount >= 4) {
      const firstActiveIdx = companies.findIndex(comp => comp.active && !comp.isHidden);
      if (firstActiveIdx !== -1) {
        companies[firstActiveIdx].active = false;
      }
    }

    const updatedCompanies = companies.map((company, idx) =>
      idx === companyIdx ? { ...company, active: !company.active } : company
    )
    setCompanies([...updatedCompanies])
  }

  return (
    <div className="px-12">
      <h1 className="pl-3 font-tuner flex items-center justify-center text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left px-2 mt-10 pb-8">
        Why you should use TinaCMS
      </h1>
      <div className="flex justify-center flex-wrap space-x-4 mb-8">
        {companies.map((company, companyIdx) => (
          <div
            key={`company-${companyIdx}`}
            className="flex flex-col items-center"
          >
            <CompanyItem
              company={company}
              onClick={() => toggleActive(companyIdx)}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
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
  )
}
