// components/docs/DocsClient.tsx
'use client';

import { useDocsNavigation } from 'components/Docs/DocsNavigationContext';
import MainDocsBodyHeader from 'components/Docs/docsMain/docsMainBody';
import TocOverflowButton from 'components/Docs/docsMain/tocOverflowButton';
import ToC from 'components/Docs/toc';
import { useTocListener } from 'components/Docs/toc_helper';
import { GitHubMetadata } from 'components/PageMetadata';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from '@/utils/formatDate';
import { buildDocLinkSlug } from 'utils/i18n/buildLinkSlug';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import { getUiStrings } from 'utils/i18n/uiStrings';
import { useNavigationData } from './DocsLayoutClient';

export default function DocsClient({
  props,
  locale,
}: {
  props: any;
  locale: Locale;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();
  const { PageTableOfContents } = props;
  const DocumentationData = locale === 'zh' ? data.docZh : data.doc;
  const strings = getUiStrings(locale);

  const { learnActive, setLearnActive } = useDocsNavigation();
  const [_isLearnDocument, setIsLearnDocument] = useState(learnActive);

  const { activeIds, contentRef } = useTocListener(DocumentationData);

  const previousPage = {
    slug: buildDocLinkSlug(DocumentationData?.previous?.id, locale),
    title: DocumentationData?.previous?.title,
  };

  const nextPage = {
    slug: buildDocLinkSlug(DocumentationData?.next?.id, locale),
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
        <GitHubMetadata path={DocumentationData?.id} className="mt-2" />
        <div className="block xl:hidden">
          <TocOverflowButton tocData={PageTableOfContents} />
        </div>
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
            {strings.docs.lastEdited}: {formattedDate}
          </span>
        )}
        <DocsPagination prevPage={previousPage} nextPage={nextPage} />
      </div>
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
