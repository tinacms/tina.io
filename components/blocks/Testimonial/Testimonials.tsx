import Image from 'next/image'
import { tinaField } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { formatDate } from 'utils'

const Testimonial = ({ data, ...props }) => {
  const Elem = data.link ? 'a' : 'div'

  return (
    <Elem
      className={`group px-7 lg:px-8 py-6 lg:py-7 mb-6 break-inside-avoid rounded-md bg-gradient-to-b from-white to-white/30 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),_0_0_1px_1px_rgba(223,219,252,0.5)] flex flex-col gap-5 text-gray-700 ${data.link
        ? 'cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out'
        : ''
        }`}
      href={data.link}
      {...props}
      data-tina-field={tinaField(data, 'name')}
    >
      {data.testimonial && (
        <div className="text-base lg:text-md">
          <TinaMarkdown
            // components={contentComponents}
            content={data.testimonial}
          />
        </div>
      )}
      <div className="flex gap-4 items-center">
        {data.avatar && (
          <div className={`relative shrink-0 w-14 h-14 overflow-hidden ${data.imageBorder ? "rounded-full shadow-[0_1px_3px_1px_rgba(66,_153,_225,0.3)]" : "rounded-sm"} ${data.rhsImage ? "order-1 ml-auto" : ""}`}>
            <Image
              alt="Testimonial avatar"
              width={56}
              height={56}
              className={`block absolute w-full h-full top-0 left-0 object-fill ${data.link
                ? 'group-hover:scale-105 transition-all duration-300 ease-in-out'
                : ''
                }`}
              src={data.avatar}
            />
            <div className="block absolute w-full h-full top-0 left-0 rounded-full"></div>
          </div>
        )}
        <div className="flex flex-col">
          {data.name && (
            <h4 className="text-lg lg:text-xl font-tuner text-blue-800 font-medium">
              {data.name}
            </h4>
          )}
          {(data.username || data.date) && (
            <p className="text-base font-medium text-blue-700">
              {data.username && <>@{data.username}</>}
              {data.username && data.date && (
                <span className="mx-1.5 opacity-30">&ndash;</span>
              )}
              {data.date && (
                <span className="opacity-70 text-blue-600">
                  {formatDate(data.date)}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </Elem>
  )
}

export function TestimonialsBlock({ data, index }) {
  return (
    <>
      <h1
        className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center mt-20`}
        data-tina-field={tinaField(data, 'title')}
      >
        {data?.title || 'Loved by Developers'}
      </h1>
      <section
        key={index}
        className={`relative px-8 py-12 lg:py-16 columns-md gap-6`}
        style={{
          columnFill: 'balance-all',
        }}
      >
        {data.testimonials &&
          data.testimonials.map((testimonial, index) => {
            return <Testimonial data={testimonial} key={index} />
          })}
      </section>
    </>
  )
}
