'use client';

import { useDocsNavigation } from 'components/AppRouterMigrationComponents/Docs/DocsNavigationContext';
import MainDocsBodyHeader from 'components/AppRouterMigrationComponents/Docs/docsMain/docsMainBody';
import TocOverflowButton from 'components/AppRouterMigrationComponents/Docs/docsMain/tocOverflowButton';
import ToC from 'components/AppRouterMigrationComponents/Docs/toc';
import { useTocListener } from 'components/AppRouterMigrationComponents/Docs/toc_helper';
import { formatDate } from 'components/AppRouterMigrationComponents/utils/formatDate';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useNavigationData } from '../toc-layout-client';

export default function DocsClient({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // Get the navigation data from context instead of props
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();
  const { PageTableOfContents } = props;
  const DocumentationData = data.docZh;
  const _pathname = usePathname();

  const { learnActive, setLearnActive } = useDocsNavigation();
  const [_isLearnDocument, setIsLearnDocument] = useState(learnActive);

  const { activeIds, contentRef } = useTocListener(DocumentationData);
  const processPageLink = (pageId) => {
    if (!pageId) {
      return '';
    }

    const slug = pageId.slice(7, -4).replace('docs-zh', 'zh/docs');

    if (slug.endsWith('/index')) {
      return slug.substring(0, slug.length - 6);
    }
    return slug;
  };

  const previousPage = {
    slug: processPageLink(DocumentationData?.previous?.id),
    title: DocumentationData?.previous?.title,
  };

  const nextPage = {
    slug: processPageLink(DocumentationData?.next?.id),
    title: DocumentationData?.next?.title,
  };
  const checkLearn = useCallback(
    (callback: (value: boolean) => void) => {
      const filepath = DocumentationData?.id;
      if (filepath) {
        const slug = `${filepath.substring(7, filepath.length - 4)}/`;
        const recurseItems = (items: any[]) => {
          items?.forEach((item) => {
            if (item.items) {
              recurseItems(item.items);
            } else if (item.slug === slug) {
              callback(true);
            }
          });
        };
        recurseItems(NavigationLearnData?.data);
      }
    },
    [DocumentationData?.id, NavigationLearnData?.data],
  );

  useEffect(() => {
    checkLearn(setIsLearnDocument);
  }, [checkLearn]);

  useEffect(() => {
    checkLearn(setLearnActive);
  }, [checkLearn, setLearnActive]);

  const lastEdited = DocumentationData?.last_edited;
  const formattedDate = formatDate(lastEdited);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_0.5fr] xl:grid-cols-[3fr_0.25fr]">
      {/* MIDDLE COLUMN */}
      <div
        className={`mx-1 md:mx-8 max-w-full overflow-hidden break-words px-1 col-span-2 ${
          !DocumentationData?.tocIsHidden ? 'xl:col-span-1' : ''
        }`}
      >
        <MainDocsBodyHeader
          DocumentTitle={DocumentationData?.title}
          NavigationDocsItems={NavigationDocsData.data}
          learnActive={learnActive}
          setLearnActive={setLearnActive}
          NavigationLearnItems={NavigationLearnData?.data}
        />
        <div className="block xl:hidden">
          <TocOverflowButton tocData={PageTableOfContents} />
        </div>{' '}
        <div
          ref={contentRef}
          className="pb-6 leading-7 text-slate-800 max-w-full space-y-3 mt-6 text-lg"
        >
          {' '}
          <TinaMarkdown
            content={DocumentationData?.body}
            components={docAndBlogComponents}
          />
        </div>
        {formattedDate && (
          <span className="text-slate-500 text-md">
            {' '}
            上次编辑: {formattedDate}
          </span>
        )}
        <DocsPagination prevPage={previousPage} nextPage={nextPage} />
      </div>
      {/* RIGHT COLUMN */}
      {DocumentationData?.tocIsHidden ? null : (
        <div className={`sticky top-32 h-[calc(100vh)] hidden xl:block`}>
          <ToC
            tocItems={PageTableOfContents}
            activeId={activeIds[activeIds.length - 1] || ''}
          />
        </div>
      )}
    </div>
  );
}
