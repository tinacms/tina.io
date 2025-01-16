'use client';

import { Button } from 'components/ui';
import { DynamicLink } from 'components/ui/DynamicLink';
import Image from 'next/image';
import React from 'react';

export default function NotFoundClient() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      <div className="flex flex-col justify-center">
        <div className="mb-7">
          <h2 className="font-tuner text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500">
            Sorry, Friend.
          </h2>
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
          <p className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-1">
            We couldn't find what you were looking for.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <DynamicLink href="/docs" passHref>
            <Button>Documentation</Button>
          </DynamicLink>
          <DynamicLink href="/docs/guides" passHref>
            <Button>Guides</Button>
          </DynamicLink>
          <DynamicLink href="/" passHref>
            <Button>Home</Button>
          </DynamicLink>
        </div>
      </div>
      <div className="max-w-[65vw] mx-auto md:max-w-none">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
          <Image
            src="/img/rico-replacement.jpg"
            alt="404 Llama"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
