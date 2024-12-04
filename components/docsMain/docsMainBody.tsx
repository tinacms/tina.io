import { Breadcrumbs } from 'components/DocumentationNavigation/Breadcrumbs';

const MainDocsBodyHeader = (docData, doc_data) => {
  const DocumentTitle = docData.data.new.results.data.doc.title;
  return (
    <div>
      <Breadcrumbs navItems={docData.data.navDocData.data} />
      <div className="pt-4 font-tuner text-4xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {DocumentTitle}
      </div>
      <hr />
    </div>
  );
};

export default MainDocsBodyHeader;
