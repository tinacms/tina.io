'use client';

import React from 'react';
import { Button, ButtonGroup } from 'components/ui';
import { DynamicLink } from 'components/ui/DynamicLink';
import Image from 'next/image';
import { styled } from 'styled-components';

function InfoContent() {
  return (
    <div className="grid-area content">
      <div className="mb-7">
        <h2 className="font-tuner text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500">
          Sorry, Friend.
        </h2>
        <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
        <p className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-1">
          We couldn't find what you were looking for.
        </p>
      </div>
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
    </div>
  );
}

export default InfoContent;


export const InfoImage = styled(({ src, ...styleProps }) => {
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