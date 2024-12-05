import { LeftHandSideHeader } from 'components/docsSearch/SearchNavigation';
import { useState } from 'react';
import {  FaChevronRight } from 'react-icons/fa';
import DirectoryOverflowButton from './directoryOverflowButton';

export const MobileVersionSelect = () => {
  const versions = ['v.Latest', 'v.0.68.13', 'v.0.67.3', 'v.Pre-Beta'];
  const [versionSelected, setVersionSelected] = useState(versions[0]);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);

  const handleVersionClick = (version) => {
    setVersionSelected(version); 
    setIsOverflowOpen(false); 
  };

  return (
    <div className="relative">
      {/* VERSION SELECT PILL BUTTON */}
      <div
        className="bg-white cursor-pointer px-4 py-1 rounded-2xl shadow-sm flex justify-center text-center items-center text-stone-600"
        onClick={() => setIsOverflowOpen(!isOverflowOpen)}
      >
        <div>{versionSelected}</div>
        <div>
          <FaChevronRight
            className={`ml-2 transform transition-transform duration-300 ${
              isOverflowOpen ? 'rotate-90' : ''
            }`}
          />
        </div>
      </div>
      {/* VERSION SELECT OVERFLOW */}
      {isOverflowOpen && (
        <div className="absolute bg-white shadow-lg mt-2 right-1 rounded-lg w-full z-10 animate-fade-down animate-duration-300">
          {versions.map((version, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-stone-100 cursor-pointer text-stone-600"
              onClick={() => handleVersionClick(version)}
            >
              {version}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DocsMobileHeader = (data) => {
  
  return (
    <div className='relative pb-20'>
      <LeftHandSideHeader paddingGlobal='pb-6' headerColour='orange'/>
      <DirectoryOverflowButton tocData={data.data.data.navDocData.data}/>
    </div>
  );
};

export default DocsMobileHeader;
