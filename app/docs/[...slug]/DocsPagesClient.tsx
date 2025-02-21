'use client';

import MainDocsBodyHeader from 'components/AppRouterMigrationComponents/Docs/docsMain/docsMainBody';
import TocOverflowButton from 'components/AppRouterMigrationComponents/Docs/docsMain/tocOverflowButton';
import { LeftHandSideParentContainer } from 'components/AppRouterMigrationComponents/Docs/docsSearch/SearchNavigation';
import ToC from 'components/AppRouterMigrationComponents/Docs/toc';
import { useTocListener } from 'components/AppRouterMigrationComponents/Docs/toc_helper';
import { formatDate } from 'components/AppRouterMigrationComponents/utils/formatDate';
import { screenResizer } from 'components/hooks/ScreenResizer';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function DocsClient({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { PageTableOfContents, NavigationDocsData } = props;
  const DocumentationData = data.doc;

  const allData = [DocumentationData, PageTableOfContents, NavigationDocsData];

  const isScreenSmallerThan1200 = screenResizer().isScreenSmallerThan1200;
  const isScreenSmallerThan840 = screenResizer().isScreenSmallerThan840;
  const { activeIds, contentRef } = useTocListener(DocumentationData);

  

  const previousPage = {
    slug: DocumentationData?.previous?.id.slice(7, -4),
    title: DocumentationData?.previous?.title,
  };

  const nextPage = {
    slug: DocumentationData?.next?.id.slice(7, -4),
    title: DocumentationData?.next?.title,
  };

  const lastEdited = DocumentationData?.last_edited;
  const formattedDate = formatDate(lastEdited);
  const gridClass = isScreenSmallerThan840
    ? 'grid-cols-1'
    : isScreenSmallerThan1200
    ? 'grid-cols-[1.25fr_3fr]'
    : 'grid-cols-[1.25fr_3fr_0.75fr]';

  return (
    <div className="relative my-6 lg:my-16 flex justify-center items-start">
      <div className={`lg:px-16 px-3 w-full max-w-[2000px] grid ${gridClass}`}>
        {/* LEFT COLUMN */}
        <div
          className={`block sticky top-32 h-[calc(100vh)] ${
            isScreenSmallerThan840 ? 'hidden' : 'block'
          }`}
        >
          <LeftHandSideParentContainer
            tableOfContents={NavigationDocsData?.data}
          />
        </div>
        {/* MIDDLE COLUMN */}
        <div
          className={`mx-8 max-w-full overflow-hidden break-words px-2 ${
            DocumentationData?.tocIsHidden && !isScreenSmallerThan1200
              ? 'col-span-2'
              : ''
          }`}
        >
          <MainDocsBodyHeader
            allData={allData}
            DocumentTitle={DocumentationData?.title}
            screenResizing={isScreenSmallerThan840}
            NavigationDocsItems={NavigationDocsData.data}
          />
          {isScreenSmallerThan1200 && !DocumentationData?.tocIsHidden && (
            <TocOverflowButton tocData={PageTableOfContents} />
          )}
          <div ref={contentRef} className="pb-6">
            {' '}
            <TinaMarkdown
              content={DocumentationData?.body}
              components={docAndBlogComponents}
            />
          </div>

          {formattedDate && (
            <span className="text-slate-500 text-md">
              {' '}
              Last Edited: {formattedDate}
            </span>
          )}
          <DocsPagination prevPage={previousPage} nextPage={nextPage} />
        </div>
        {/* RIGHT COLUMN */}
        {DocumentationData?.tocIsHidden ? null : (
          <div
            className={`block sticky top-32 h-[calc(100vh)] ${
              isScreenSmallerThan1200 ? 'hidden' : 'block'
            }`}
          >
            <ToC tocItems={PageTableOfContents} activeIds={activeIds} />
          </div>
        )}
      </div>
    </div>
  );
}
