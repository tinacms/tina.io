import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';
import { RenderMedia } from '../Features/Features';

export function HeroBlock({ data, index }) {
  return (
    <section
      key={index}
      className={`relative overflow-visible z-10 text-center ${
        data.margin ? data.margin : 'px-8 pb-12 lg:pb-16'
      }`}
    >
      <Container width="narrow" center>
        <HeroFeature item={data} spacing={data.spacing}>
          {data.media && <RenderMedia data={data} />}
        </HeroFeature>
      </Container>
    </section>
  );
}

export const HeroFeature = ({ item, spacing, children }) => {
  return (
    <>
      <div className={`flex flex-col ${spacing ? spacing : 'gap-6'}`}>
        <div className="flex flex-col gap-2">
          {item.headline && (
            <h2
              className="heading"
              data-tina-field={tinaField(item, 'headline')}
            >
              {item.headline}
            </h2>
          )}
          {item.headline2 && (
            <h2
              className="heading"
              data-tina-field={tinaField(item, 'headline2')}
            >
              {item.headline2}
            </h2>
          )}
        </div>
        {item.text && (
          <p
            className={item.mobileTextSize ? 'text-lg lg:text-xl' : 'text-xl'}
            data-tina-field={tinaField(item, 'text')}
          >
            {item.text}
          </p>
        )}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-center items-start lg:items-center gap-10 pb-10">
          {item.buttons?.map((button, index) => (
            <div
              key={index}
              className={`flex items-start lg:items-center ${
                index === 2 ? 'md:col-span-2 md:justify-center' : ''
              }`}
            >
              <RenderButton button={button} index={index} />
            </div>
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
  );
};

export const Video = ({ src, className }) => {
  return (
    <video
      className={className}
      autoPlay={true}
      loop
      muted
      playsInline
      poster={`${src}`}
    >
      <source src={`${src}`} type="video/webm" />
      <source src={`${src}`} type="video/mp4" />
    </video>
  );
};
