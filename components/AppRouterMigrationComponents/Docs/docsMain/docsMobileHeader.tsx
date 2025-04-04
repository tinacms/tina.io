import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { DocsSearchBarHeader } from '../docsSearch/SearchNavigation';
import DirectoryOverflowButton from './directoryOverflowButton';

export const MobileVersionSelect = () => {
  const versions = [
    ['v.Latest', ''],
    [
      'v.0.68.13',
      'https://tinacms-site-next-i08bcbicy-tinacms.vercel.app/docs/',
    ],
    ['v.0.67.3', 'https://tinacms-site-next-pu1t2v9y4-tinacms.vercel.app/'],
    ['v.Pre-Beta', 'https://pre-beta.tina.io/'],
  ];
  const [versionSelected, setVersionSelected] = useState(versions[0][0]);
  const [isOverflowOpen, setIsOverflowOpen] = useState(false);

  const handleVersionClick = (version) => {
    setVersionSelected(version[0]);
    setIsOverflowOpen(false);

    if (version[0] !== 'v.Latest') {
      window.location.href = version[1];
    }
  };

  return (
    <div className="relative">
      {/* VERSION SELECT PILL BUTTON */}
      <div
        className="bg-white cursor-pointer px-4 py-1 rounded-lg shadow-md flex justify-center text-center items-center text-stone-600"
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
              {version[0]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DocsMobileHeader = (props) => {
  const { docsData, learnData, learnActive, setLearnActive } = props;

  return (
    <div className="relative pb-20">
      <DocsSearchBarHeader
        paddingGlobal="pb-4"
        headerPadding=""
        searchMargin=""
        searchBarPadding="py-3"
        learnActive={learnActive}
        setLearnActive={setLearnActive}
      />
      <DirectoryOverflowButton
        tocData={learnActive ? learnData : docsData}
        label={learnActive ? 'Learn' : 'Documentation'}
        color={learnActive ? 'blue' : 'orange'}
      />
    </div>
  );
};

export default DocsMobileHeader;
