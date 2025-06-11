import EmblaCarousel from 'components/ui/EmblaCarousel/EmblaCarousel';
import { tinaField } from 'tinacms/dist/react';
import { icons } from '../../ui/IconPickerIcons';
import { Actions } from '../ActionButton/ActionsButton';

function CarouselFeatureMobileItem(data) {
  const { headline, text, button, icon2, videoSrc } = data.data || {};

  const IconComponent = icons[icon2] || null;

  const actionsArray = button ? [button] : [];

  return (
    <div
      data-tina-field={tinaField(data, 'headline')}
      className="h-full w-full flex flex-col md:p-10 p-6 group bg-linear-to-br from-white/25 via-white/50 to-white/75 shadow-md pl-6 pr-8 md:py-9 md:pr-11 lg:pb-8 lg:pt-8 lg:pr-4 rounded-2xl"
    >
      <div className="flex mb-2 text-left">
        {headline && (
          <h3
            className={`md:text-2xl text-xl font-ibm-plex cursor-pointer text-transparent bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text`}
          >
            {headline}
          </h3>
        )}
      </div>
      {text && (
        <p
          className={`pl-[1px] lg:text-lg md:text-md text-sm font-medium slide-up mb-4`}
        >
          {text}
        </p>
      )}
      {button && (
        <div className={`pl-[1px] slide-up flex mt-auto`}>
          <Actions items={actionsArray} className="p-0!" />
        </div>
      )}
    </div>
  );
}

interface CarouselFeatureMobileProps {
  data: any;
}

export function CarouselFeatureMobile(props: CarouselFeatureMobileProps) {
  const { data } = props;
  const items = data.items.map((item, index) => (
    <CarouselFeatureMobileItem data={item} key={`carousel-feature-${index}`} />
  ));
  return items.length > 0 ? (
    <>
      <h2 className="text-center font-ibm-plex text-3xl md:text-4xl lg:text-5xl lg:leading-tight bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent">
        {data.blockHeadline}
      </h2>
      <EmblaCarousel slides={items} />
    </>
  ) : null;
}
