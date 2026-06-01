'use client';

import { TinaClient } from 'app/tina-client';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import DocsClient from './DocsClient';
import { useNavigationData } from './DocsLayoutClient';

export default function MainDocClient({
  props,
  locale,
}: {
  props: any;
  locale: Locale;
}) {
  // The main page component gets navigation data from the layout context
  // This way it stays consistent between page changes.
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();

  // TinaClient renders `<Component tinaProps={{ data }} props={props} />` — it
  // does not spread `props` nor forward any extra (e.g. `locale`) prop. Our
  // shared DocsClient expects a top-level `{ props, locale }` signature, so we
  // hand TinaClient a thin adapter that re-shapes the forwarded `props` into
  // DocsClient's contract and closes over `locale`.
  const DocsClientAdapter = ({ props: forwarded }: { props: any }) => (
    <DocsClient props={forwarded} locale={locale} />
  );

  return (
    <TinaClient
      Component={DocsClientAdapter}
      props={{ ...props, NavigationDocsData, NavigationLearnData }}
    />
  );
}
