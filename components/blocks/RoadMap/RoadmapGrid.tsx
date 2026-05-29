import type { IconType } from 'react-icons';
import { FaHourglassHalf, FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { BLOCK_HEADINGS_SIZE } from '@/component/styles/typography';
import { Actions } from '../ActionButton/ActionsButton';
import { Container } from '../Container';

// The status icons the roadmap supports. Kept in sync with the picker in
// components/forms/RoadmapIconSelector.tsx.
const icons: Record<string, IconType> = {
  FaRegCheckCircle,
  FaHourglassHalf,
  FaRegClock,
};

// Semantic colour per status icon — green for done, amber for in progress,
// blue for upcoming. Falls back to brand blue for anything unexpected.
const iconColorClasses: Record<string, string> = {
  FaRegCheckCircle: 'text-success',
  FaHourglassHalf: 'text-warning',
  FaRegClock: 'text-blue-500',
};

// The headline uses a gradient `bg-clip-text` fill, which renders text (and a
// strikethrough line) transparent. Restore a visible fill on struck text so
// crossed-out items read clearly.
const headlineComponents = {
  p: (props: any) => <>{props.children}</>,
  strikethrough: (props: any) => (
    <s className="[-webkit-text-fill-color:#144696] decoration-blue-800">
      {props.children}
    </s>
  ),
};

// biome-ignore lint/correctness/noUnusedFunctionParameters: <TODO>
const Roadmap = ({ data, last = false, index }) => {
  const Icon = data.icon ? icons[data.icon] : null;
  const iconColor =
    (data.icon && iconColorClasses[data.icon]) || 'text-blue-700';
  return (
    <div className="px-6 flex items-stretch w-full gap-8">
      <div className="flex-0 flex flex-col items-center">
        <div className="shrink-0 w-[2px] h-12 bg-linear-to-t from-blue-700 to-blue-400"></div>
        <div className="shrink-0 relative w-4 h-4 rounded-full border-2 border-blue-700">
          <div className="h-[2px] w-6 absolute top-1/2 left-full -translate-y-1/2 bg-linear-to-r from-blue-700 to-blue-400"></div>
        </div>
        {!last && (
          <div className="w-[2px] h-full bg-linear-to-b from-blue-700 to-blue-400"></div>
        )}
        {last && (
          <div className="w-[2px] h-2/3 bg-linear-to-b from-blue-600 via-blue-500/30 to-blue-400/0"></div>
        )}
      </div>
      <div className="flex-1 pt-10 pb-4 flex flex-col items-start gap-4">
        {data.heading && (
          <div className="flex items-start gap-3">
            {Icon && (
              <Icon
                data-tina-field={tinaField(data, 'icon')}
                className={`shrink-0 text-2xl lg:text-3xl ${iconColor} mt-px`}
              />
            )}
            <h3
              data-tina-field={tinaField(data, 'heading')}
              className="text-2xl lg:text-3xl font-ibm-plex lg:leading-tight bg-linear-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text text-transparent"
            >
              <TinaMarkdown
                content={data.heading}
                components={headlineComponents}
              />
            </h3>
          </div>
        )}
        {data.content && (
          <div className='max-w-prose' data-tina-field={tinaField(data, 'content')}>
            <TinaMarkdown content={data.content} />
          </div>
        )}
        {data.status && (
          <span
            data-tina-field={tinaField(data, 'status')}
            className="rounded-full w-auto grow-0 flex items-center font-ibm-plex whitespace-nowrap leading-snug text-blue-800 px-4 pt-[7px] pb-[5px] text-sm font-medium border border-blue-100 bg-linear-to-br from-white to-blue-50"
          >
            {data.status}
          </span>
        )}
        {data.actions && <Actions items={data.actions} />}
      </div>
    </div>
  );
};

export function RoadmapGridBlock({ data, index }) {
  return (
    <section key={`roadmap-grid-${index}`} className={`w-full`}>
      <Container width="medium">
        <h2
          data-tina-field={tinaField(data, 'headline')}
          className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex inline-block lg:leading-tight  mb-4`}
        >
          {data.headline}
        </h2>
        <div className="">
          {data.items?.map((itemData, index) => {
            const last = data.items.length - 1 === index;
            return (
              <Roadmap
                data={itemData}
                last={last}
                key={itemData.id}
                index={index}
              />
            );
          })}
        </div>
      </Container>
      {/* <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" /> */}
    </section>
  );
}
