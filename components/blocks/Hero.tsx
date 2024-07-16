import RenderButton from 'utils/renderButtonArrayHelper'
import { Actions } from './ActionsButton'
import { Container } from './Container'
import { tinaField } from 'tinacms/dist/react'
import Image from 'next/image'

export function HeroBlock({ data, index }) {
  return (
    <section
      key={index}
      className={`relative overflow-visible z-10 text-center ${
        data.margin ? data.margin : 'px-8 py-12 lg:py-16'
      }`}
    >
      <Container width="narrow" center>
        <HeroFeature item={data} spacing={data.spacing}>
          {data.media && data.media[0] && (
            <div
              className={`mt-6 min-w-0 w-full ${
                (data.media[0].image || data.media[0].src) &&
                'rounded-lg shadow-panel overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900'
              }`}
            >
              {data.media && data.media[0].image && (
                <Image
                  src={data.media[0].image}
                  alt={data.headline}
                  className="w-full h-auto"
                  width={1200}
                  height={1200}
                />
              )}
              {data.media && data.media[0].src && (
                <Video className="w-full h-auto" src={data.media[0].src} />
              )}
            </div>
          )}
        </HeroFeature>
      </Container>
    </section>
  )
}

export const HeroFeature = ({ item, spacing, children }) => {
  return (
    <>
      <div className={`flex flex-col ${spacing ? spacing : 'gap-6'}`}>
        {item.headline && (
          <h2 className="heading" data-tina-field={tinaField(item, 'headline')}>
            {item.headline}
          </h2>
        )}
        {item.text && (
          <p className="text-xl" data-tina-field={tinaField(item, 'text')}>
            {item.text}
          </p>
        )}
        <div className="flex justify-center items-center gap-10">
          {item.buttons &&
            item.buttons.map((button, index) => (
              <RenderButton key={index} button={button} index={index} />
            ))}
        </div>
        {children}
      </div>
      <style jsx>{`
        .heading {
          font-family: var(--font-tuner);
          font-weight: bold;
          font-style: normal;
          font-size: 2.5rem;
          line-height: 1.3;
          letter-spacing: 0.1px;
          display: inline-block;
          color: transparent;
          background: linear-gradient(
            to right,
            var(--color-orange-light),
            var(--color-orange),
            var(--color-orange-dark)
          );
          -webkit-background-clip: text;
          background-clip: text;
          text-align: center;
          margin: 0 auto;
          max-width: 12em;

          @media (min-width: 800px) {
            font-size: 3rem;
          }

          @media (min-width: 1200px) {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </>
  )
}

export const Video = ({ src, className }) => {
  return (
    <video
      className={className}
      autoPlay={true}
      loop
      muted
      playsInline
      poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
    >
      <source
        src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_562/${src}.webm`}
        type="video/webm"
      />
      <source
        src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_562/${src}.mp4`}
        type="video/mp4"
      />
    </video>
  )
}
