'use client';

import { Section, Wrapper } from 'components/layout';
import React from 'react';
import styled from 'styled-components';
import InfoContent, { InfoImage } from './not-found-client';

export const metadata = {
  title: '404',
  description: '404',
};

export default function Page404() {
  return (
    <div>
      <Section>
        <Wrapper>
          <InfoLayout>
            <InfoContent />
            <InfoImage src="/img/rico-replacement.jpg" />
          </InfoLayout>
        </Wrapper>
      </Section>
    </div>
  );
}

const InfoLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: auto;
  grid-gap: 2rem;
  grid-template-areas: 'image' 'content';

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: stretch;
    grid-template-areas: 'content image';
  }
`;
