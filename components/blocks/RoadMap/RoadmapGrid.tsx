import Link from 'next/link';
import type { IconType } from 'react-icons';
import { FaHourglassHalf, FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import {
  BODY,
  BODY_SMALL,
  CARD_TITLE,
  LABEL,
  LINK,
  SECTION_TITLE,
  SURFACE,
} from '@/component/styles/typography';
import { isExternalLink } from '@/utils/isExternalLink';
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

const headlineComponents = {
  p: (props: any) => <>{props.children}</>,
  strikethrough: (props: any) => <s>{props.children}</s>,
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
              className={CARD_TITLE}
            >
              <TinaMarkdown
                content={data.heading}
                components={headlineComponents}
              />
            </h3>
          </div>
        )}
        {data.content && (
          <div
            className={`lg:max-w-prose ${BODY}`}
            data-tina-field={tinaField(data, 'content')}
          >
            <TinaMarkdown content={data.content} />
          </div>
        )}
        {data.status && (
          <span
            data-tina-field={tinaField(data, 'status')}
            className={`${SURFACE.info} ${LABEL} rounded-full w-auto grow-0 flex items-center whitespace-nowrap px-4 py-1.5 border`}
          >
            {data.status}
          </span>
        )}
        {/* Roadmap links are plain text links, not buttons (#4964). */}
        {data.actions?.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {data.actions.map((action, actionIndex) => {
              const external = isExternalLink(action?.url);
              return (
                <Link
                  key={`${action?.label}-${actionIndex}`}
                  href={action?.url || '#'}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={`${BODY_SMALL} ${LINK}`}
                  data-tina-field={tinaField(action, 'label')}
                >
                  {action?.label}
                </Link>
              );
            })}
          </div>
        )}
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
          className={`${SECTION_TITLE} inline-block mb-4`}
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
                key={`${itemData.icon}-${index}`}
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
