import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';
import {
  BLOCK_HEADINGS_SIZE,
  H1_HEADINGS_SIZE,
} from '@/component/styles/typography';
import { Container } from '../Container';
import { RenderMedia } from '../Features/Features';

export function HeroBlock({ data, index }) {
  return (
    <section
      key={index}
      id={data.anchorId || undefined}
      className={`relative overflow-visible z-10 text-center scroll-mt-24 ${
        data.margin ? data.margin : 'px-8 pt-8 lg:pt-32'
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
    <div className={`flex flex-col ${spacing ? spacing : 'gap-6'}`}>
      <div className="flex flex-col gap-2">
        {item.headline && item.blockSettings?.isHeadingOne ? (
          <h1
            className={`${H1_HEADINGS_SIZE} font-ibm-plex  text-center font-bold`}
            data-tina-field={tinaField(item, 'headline')}
          >
            {item.headline}
          </h1>
        ) : (
          <h2
            className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex text-black text-center font-bold`}
            data-tina-field={tinaField(item, 'headline')}
          >
            {item.headline}
          </h2>
        )}
        {item.headline2 && (
          <h2
            className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex text-black text-center font-bold`}
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
      {/* Skipped entirely when there are no buttons — the row's own pb-10 would
          otherwise leave a dead gap under a text-only hero. */}
      {item.buttons?.length > 0 && (
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row justify-center items-start lg:items-center gap-10 pb-10">
          {/* Tina's button objects have no `id`, so key on the label. */}
          {item.buttons.map((button, index) => (
            <div
              key={`heroButton-${button.label}`}
              className={`flex items-start lg:items-center ${
                index === 2 ? 'md:col-span-2 md:justify-center' : ''
              }`}
            >
              <RenderButton button={button} />
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
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
