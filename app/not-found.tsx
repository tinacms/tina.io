'use client';

import React from 'react';
import styled from 'styled-components';
import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  HeroTitle,
} from 'components/layout';
import { NextSeo } from 'next-seo';
import { Button, ButtonGroup } from 'components/ui';
import { DynamicLink } from 'components/ui/DynamicLink';
import Image from 'next/image';

function Page404() {
  return (
    <div>
      {' '}
      <NextSeo title={'404'} description={'404'} />
      <div className='className="relative overflow-visible z-10 text-center px-8 py-12 lg:py-16'>
        <h1 className='font-tuner font-semibold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500'>
          404
        </h1>
      </div>
      <Section>
        <Wrapper>
          <InfoLayout>
            <InfoContent>
              <InfoText>
                <h2 className='font-tuner text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500'>Sorry, Friend.</h2>
                <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
                <p className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-1">
                  We couldn't find what you were looking for.
                </p>
              </InfoText>
              <ButtonGroup>
                <DynamicLink href={'/docs'} passHref>
                  <Button>Documentation</Button>
                </DynamicLink>
                <DynamicLink href={'/docs/guides'} passHref>
                  <Button>Guides</Button>
                </DynamicLink>
                <DynamicLink href={'/'} passHref>
                  <Button>Home</Button>
                </DynamicLink>
              </ButtonGroup>
            </InfoContent>
            <InfoImage src="/img/rico-replacement.jpg" />
          </InfoLayout>
        </Wrapper>
      </Section>
    </div>
  );
}

export default Page404;

/*
 ** STYLES ------------------------------------------------------
 */

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

const InfoContent = styled.div`
  grid-area: content;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const InfoText = styled.div`
  margin-bottom: 1.75rem;
  h1,
  h2,
  h3,
  .h1,
  .h2,
  .h3 {
    text-align: center;
  }
  hr {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 800px) {
    h1,
    h2,
    h3,
    .h1,
    .h2,
    .h3 {
      text-align: left;
    }
    hr {
      margin-left: 0;
      margin-right: 0;
    }
  }
`;

const InfoImage = styled(({ src, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <Image src={src} alt="404 Llama" width={600} height={600} />
    </div>
  );
})`
  display: block;
  grid-area: image;
  max-width: 65vw;
  margin: 0 auto;
  border-radius: 2rem;
  overflow: hidden;
  max-height: 25rem;

  img {
    display: block;
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
