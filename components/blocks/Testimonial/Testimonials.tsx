import Marquee from '@/components/ui/marquee';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from 'utils';
import { Container } from '../Container';

const TestimonialCard = ({ ...data }) => {
  const Elem = data?.link ? 'a' : 'div';

  return (
    <Elem href={data.link} data-tina-field={tinaField(data, 'name')}>
      <figure
        className={cn(
          'relative w-96 h-48 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col justify-between',
          'shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),_0_0_1px_1px_rgba(223,219,252,0.5)]',
          'bg-gradient-to-b from-white to-white/30 hover:to-white/40',
          'cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out'
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
            data.rhsImage ? 'flex-row-reverse justify-between' : 'flex-row'
          )}
        >
          <img
            className={cn(
              'w-12 h-12',
              data.imageBorder ? 'rounded-full' : 'rounded-sm'
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

export default function TestimonialsBlock({ data, index }) {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const titleRef = useRef(null);
  const firstRow = data.testimonials.slice(0, data.testimonials.length / 2);
  const secondRow = data.testimonials.slice(data.testimonials.length / 2);

  return (
    <div className="max-w-[1500px] m-auto">
      <h1
        className={`w-full font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center`}
        data-tina-field={tinaField(data, 'title')}
        ref={titleRef}
      >
        {data?.title || 'Loved by Developers'}
      </h1>

      <div className="mask-horizontal-fade relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden ">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((review, index) => (
            <div key={index} className="mr-4">
              <TestimonialCard key={review.username} {...review} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((review, index) => (
            <div key={index} className="mr-4">
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
            black 10%,
            black 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}
