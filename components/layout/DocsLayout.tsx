import React from 'react';
import styled from 'styled-components';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { DocumentationNavigation } from 'components/DocumentationNavigation';
import { Footer } from './Footer'; 
import { DocsTextWrapper } from './DocsTextWrapper';
import { Overlay } from '../ui';
import { Navbar } from './Navbar';
import { Layout } from './Layout';

interface DocsLayoutProps {
  navItems: any;
  children: any;
}

export const DocsLayout = React.memo(({ children, navItems }: DocsLayoutProps) => {
  const router = useRouter();
  return (
    <>
      <DefaultSeo openGraph={{ url: 'https://tina.io' + router.asPath }} />
      <Layout sticky={false}>
        <DocsLayoutGrid>
        <DocumentationNavigation navItems={navItems} />
        <DocsMain>
          <DocsTextWrapper>{children}</DocsTextWrapper>
        </DocsMain>
        <DocsFooterWrapper>
        </DocsFooterWrapper>
      </DocsLayoutGrid>
      </Layout>
      
    </>
  );
});

const DocsLayoutGrid = styled.div`
  @media (min-width: 840px) {
    width: 100%;
    display: grid;
    grid-template-columns: min(33vw, 20rem) minmax(0, 1fr);
    grid-template-rows: auto auto 1fr auto; 
    grid-template-areas:
      'navbar navbar'
      'sidebar header'
      'sidebar main'
      'sidebar footer';

    ${Overlay} {
      display: none;
    }
  }

  @media (min-width: 1200px) {
    grid-template-columns: 20rem minmax(0, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: 22rem minmax(0, 1fr);
  }
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
`;
