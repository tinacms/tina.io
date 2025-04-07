'use client';

import { Breadcrumbs } from '../DocumentationNavigation/Breadcrumbs';
import DocsMobileHeader from './docsMobileHeader';

const MainDocsBodyHeader = ({
  DocumentTitle,
  NavigationDocsItems,
  NavigationLearnItems,
  screenResizing,
  learnActive,
  setLearnActive,
}) => {
  return (
    <div>
      {screenResizing && (
        <DocsMobileHeader
          docsData={NavigationDocsItems}
          learnActive={learnActive}
          setLearnActive={setLearnActive}
          learnData={NavigationLearnItems}
        ></DocsMobileHeader>
      )}
      <Breadcrumbs
        navItems={[...NavigationLearnItems, ...NavigationDocsItems]}
      />
      <div className="pt-4 font-tuner text-4xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {DocumentTitle}
      </div>
    </div>
  );
};

export default MainDocsBodyHeader;
