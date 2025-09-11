import Image from 'next/image';
import { useRef, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from 'utils';
import { BLOCK_HEADINGS } from '@/component/styles/typography';
import Marquee from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

const TestimonialCard = ({ ...data }) => {
  const Elem = data?.link ? 'a' : 'div';
  const [imageError, setImageError] = useState(false);

  return (
    <Elem href={data.link} data-tina-field={tinaField(data, 'name')}>
      <figure
        className={cn(
          'relative w-96 h-72 cursor-pointer overflow-hidden rounded-xl p-8 flex flex-col gap-4',
          'shadow-md',
          'bg-gradient-to-br from-white/10 to-white/40 hover:to-white/40',
          'cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out',
        )}
      >
        <Image src="/quotation.svg" alt="quotation" width={24} height={24} />
        <blockquote className="text-sm text-black leading-relaxed">
          {data.testimonial && (
            <div className="text-base lg:text-md line-clamp-3">
              <TinaMarkdown content={data.testimonial} />
            </div>
          )}
        </blockquote>
        <div
          className={cn(
            'flex items-center gap-3 absolute bottom-8',
            data.rhsImage ? 'flex-row-reverse justify-between' : 'flex-row',
          )}
        >
          <Image
            className={cn(
              'w-12 h-12',
              data.imageBorder ? 'rounded-full' : 'rounded-sm',
            )}
            width={48}
            height={48}
            src={imageError || !data.avatar ? '/default-user.svg' : data.avatar}
            alt={`${data.name} avatar`}
            onError={() => setImageError(true)}
          />
          <div className="flex flex-col">
            {data.name && (
              <h4 className="text-lg text-orange-500">
                {data.name}
              </h4>
            )}
            {(data.username || data.date) && (
              <p className="text-sm text-black">
                {data.username && <>@{data.username}</>}
                {data.username && data.date && (
                  <span className="mx-1.5 text-neutral-text-secondary">
                    &ndash;
                  </span>
                )}
                {data.date && (
                  <span className="text-neutral-text-secondary">
                    {formatDate(data.date)}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </figure>
    </Elem>
  );
};

export default function TestimonialsBlock({ data }) {
  const [_isShowingAll, _setIsShowingAll] = useState(false);
  const titleRef = useRef(null);
  const testimonialItems = data.testimonials;

  return (
    <div className="max-w-[1500px] m-auto">
      <div className="flex flex-col items-center justify-center">
        <h2
          className={`${BLOCK_HEADINGS} font-ibm-plex m-auto inline-block pb-8 lg:leading-tight text-black text-balance text-center lg:text-left`}
          data-tina-field={tinaField(data, 'title')}
          ref={titleRef}
        >
          {data?.title || 'Loved by Developers'}
        </h2>
      </div>

      <div className="mask-horizontal-fade relative flex w-full flex-col items-center justify-center overflow-hidden ">
        <Marquee pauseOnHover className="[--duration:80s]">
          {testimonialItems.map((review) => (
            <div key={review.id} className="mr-4">
              <TestimonialCard key={review.username} {...review} />
            </div>
          ))}
        </Marquee>
      </div>
      <style jsx>{`
        .mask-horizontal-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 2%,
            black 98%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 2%,
            black 98%,
            transparent
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}
