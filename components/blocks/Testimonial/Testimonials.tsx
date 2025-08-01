import { useRef, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from 'utils';
import Marquee from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

const TestimonialCard = ({ ...data }) => {
  const Elem = data?.link ? 'a' : 'div';

  return (
    <Elem href={data.link} data-tina-field={tinaField(data, 'name')}>
      <figure
        className={cn(
          'relative w-96 h-48 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col justify-between',
          'shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),0_0_1px_1px_rgba(223,219,252,0.5)]',
          'bg-linear-to-b from-white to-white/30 hover:to-white/40',
          'cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out',
        )}
      >
        <blockquote className="text-sm text-gray-700 leading-relaxed">
          {data.testimonial && (
            <div className="text-base lg:text-md line-clamp-3">
              <TinaMarkdown content={data.testimonial} />
            </div>
          )}
        </blockquote>
        <div
          className={cn(
            'flex items-center gap-3',
            data.rhsImage ? 'flex-row-reverse justify-between' : 'flex-row',
          )}
        >
          {/** biome-ignore lint/performance/noImgElement: <TODO> */}
          <img
            className={cn(
              'w-12 h-12',
              data.imageBorder ? 'rounded-full' : 'rounded-sm',
            )}
            alt="Testimonial avatar"
            width={48}
            height={48}
            src={data.avatar}
          />
          <div className="flex flex-col">
            {data.name && (
              <h4 className="text-lg font-medium text-blue-800">{data.name}</h4>
            )}
            {(data.username || data.date) && (
              <p className="text-sm text-blue-600">
                {data.username && <>@{data.username}</>}
                {data.username && data.date && (
                  <span className="mx-1.5 text-gray-400">&ndash;</span>
                )}
                {data.date && (
                  <span className="text-blue-500">{formatDate(data.date)}</span>
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
  const firstRow = data.testimonials.slice(0, data.testimonials.length / 2);
  const secondRow = data.testimonials.slice(data.testimonials.length / 2);

  return (
    <div className="max-w-[1500px] m-auto">
      <div className="flex flex-col items-center justify-center">
        <h2
          className="m-auto inline-block font-ibm-plex text-3xl md:text-4xl pb-8 lg:text-5xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center lg:text-left"
          data-tina-field={tinaField(data, 'title')}
          ref={titleRef}
        >
          {data?.title || 'Loved by Developers'}
        </h2>
      </div>

      <div className="mask-horizontal-fade relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden ">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((review) => (
            <div key={review.id} className="mr-4">
              <TestimonialCard key={review.username} {...review} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((review) => (
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
