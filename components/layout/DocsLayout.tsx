'use client';

import { LeftHandSideParentContainer } from 'components/docsSearch/SearchNavigation';
import { DefaultSeo } from 'next-seo';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';
import { Overlay } from '../ui';
import { DocsTextWrapper } from './DocsTextWrapper';
import { Footer } from './Footer';
import { Layout } from './Layout';
import { Navbar } from './Navbar';

interface DocsLayoutProps {
  navItems: any;
  children: any;
}

export const DocsLayout = React.memo(
  ({ children, navItems }: DocsLayoutProps) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
      <>
        <DefaultSeo openGraph={{ url: 'https://tina.io' + pathname }} />
        <Layout sticky={false}>
          <DocsLayoutGrid>
            <Sidebar>
              <LeftHandSideParentContainer tableOfContents={navItems} />
            </Sidebar>
            <DocsMain>
              <DocsTextWrapper>{children}</DocsTextWrapper>
            </DocsMain>
            <DocsFooterWrapper></DocsFooterWrapper>
          </DocsLayoutGrid>
        </Layout>
      </>
    );
  }
);

const DocsLayoutGrid = styled.div`
  padding-bottom: 2rem;
  display: grid;
  min-height: 100vh; /* Ensure grid stretches to viewport height */
  grid-template-columns: min(33vw, 20rem) minmax(0, 1fr);
  grid-template-rows: auto 1fr auto; /* Header, main, footer */
  grid-template-areas:
    'sidebar header'
    'sidebar main'
    'sidebar footer';
  overflow: visible;

  @media (min-width: 1200px) {
    grid-template-columns: 20rem minmax(0, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: 22rem minmax(0, 1fr);
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  position: sticky;
  top: 1rem;
  padding-left: 1rem;
  align-self: start;
  overflow: visible;
  margin-top: 4rem;
`;

const DocsMain = styled.div`
  grid-area: main;
  place-self: stretch;
  margin-left: 30px;
`;

const DocsFooterWrapper = styled.div`
  grid-area: footer;
  z-index: 1;
  position: relative;
  margin-top: auto;
`;
