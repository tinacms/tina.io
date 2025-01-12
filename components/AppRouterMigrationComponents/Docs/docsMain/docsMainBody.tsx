'use client';

import { Breadcrumbs } from '../DocumentationNavigation/Breadcrumbs';
import DocsMobileHeader from './docsMobileHeader';

const MainDocsBodyHeader = ({ DocumentTitle, NavigationDocsItems, allData, screenResizing }) => {
  
  return (
    <div>
      {screenResizing && (
        <DocsMobileHeader data={NavigationDocsItems}></DocsMobileHeader>
      )}

      <Breadcrumbs navItems={NavigationDocsItems} />
      <div className="pt-4 font-tuner text-4xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {DocumentTitle}
      </div>
    </div>
  );
};

export default MainDocsBodyHeader;
