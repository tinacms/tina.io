import Image from 'next/image';
// biome-ignore lint/correctness/noUnusedImports: React is required for JSX
import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { Container } from '../Container';

export function ImageBandBlock({ data, index }) {
  if (!data.image) {
    return null;
  }

  return (
    <section key={`image-band-${index}`} className="w-full">
      <Container width="wide">
        <figure className="w-full">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-lg md:aspect-[16/9]">
            <Image
              src={data.image}
              alt={data.alt || 'TinaCMS'}
              fill
              sizes="(max-width: 1024px) 100vw, 1500px"
              className="object-cover"
              data-tina-field={tinaField(data, 'image')}
            />
          </div>
          {data.caption && (
            <figcaption
              className="mt-3 text-center text-sm text-neutral-text-secondary"
              data-tina-field={tinaField(data, 'caption')}
            >
              {data.caption}
            </figcaption>
          )}
        </figure>
      </Container>
    </section>
  );
}
