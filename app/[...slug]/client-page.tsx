"use client";

import { BlocksPage } from "components/blocks/BlocksPage";
import { FooterLinkPage } from "components/blocks/FooterLinkPage";
import { useTina } from "tinacms/dist/react";

interface ClientPageProps {
  query: string;
  data: any;
  variables: {
    relativePath: string;
  };
}

const FOOTER_LINK_PAGES = [
  "security.json",
  "telemetry.json",
  "terms-of-service.json",
  "privacy-notice.json",
];

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const tinaData = useTina({
    query,
    data,
    variables,
  });

  const isFooterLinkPage = FOOTER_LINK_PAGES.includes(variables.relativePath);

  if (isFooterLinkPage) {
    return <FooterLinkPage data={tinaData.data.page} />;
  }

  return (
    <BlocksPage
      data={tinaData.data.page}
      recentPosts={tinaData.data.recentPosts}
    />
  );
}
