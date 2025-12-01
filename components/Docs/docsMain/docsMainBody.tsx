'use client';

import DocsMobileHeader from './docsMobileHeader';

const MainDocsBodyHeader = ({
  DocumentTitle,
  NavigationDocsItems,
  NavigationLearnItems,
  learnActive,
  setLearnActive,
}) => {
  return (
    <div>
      <div className="block md:hidden">
        <DocsMobileHeader
          docsData={NavigationDocsItems}
          learnActive={learnActive}
          setLearnActive={setLearnActive}
          learnData={NavigationLearnItems}
        ></DocsMobileHeader>
      </div>
      <h1
        className={`pt-4 font-ibm-plex text-4xl bg-linear-to-r from-orange-500 via-orange-500 to-orange-600 bg-clip-text text-transparent`}
      >
        {DocumentTitle}
      </h1>
    </div>
  );
};

export default MainDocsBodyHeader;
