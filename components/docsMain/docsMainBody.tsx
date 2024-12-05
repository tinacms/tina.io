import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs';
import DocsMobileHeader from './docsMobileHeader';

const MainDocsBodyHeader = (docData) => {
  const DocumentTitle = docData.data.new.results.data.doc.title;

  return (
    <div>
      {docData.screenSizing && (
        <DocsMobileHeader data={docData}></DocsMobileHeader>
      )}

      <Breadcrumbs navItems={docData.data.navDocData.data} />
      <div className="pt-4 font-tuner text-4xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {DocumentTitle}
      </div>
    </div>
  );
};

export default MainDocsBodyHeader;
