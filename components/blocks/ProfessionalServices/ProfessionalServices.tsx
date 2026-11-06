import type { PageBlocksProfessionalServices } from 'tina/__generated__/types';
import { IconOptions } from '@/component/forms/IconPicker';
import {
  BODY,
  BODY_SMALL,
  CARD_TITLE,
  EYEBROW,
  LABEL,
  SECTION_TITLE,
  SURFACE,
} from '@/component/styles/typography';
import { TextLink } from '@/component/ui/TextLink';
import Container from '@/component/util/Container';

function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const IconSVG = IconOptions[name];
  if (!IconSVG) {
    return null;
  }
  return <IconSVG className={className} />;
}

export function ProfessionalServices({
  data,
}: {
  data: PageBlocksProfessionalServices;
}) {
  const { eyebrow, title, description, services } = data;

  return (
    <Container size="medium" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3.5">
        {eyebrow && <p className={`${EYEBROW} text-center`}>{eyebrow}</p>}
        {title && <h2 className={`${SECTION_TITLE} text-center`}>{title}</h2>}
        {description && (
          <p className={`${BODY} max-w-[62ch] text-center`}>{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
        {services?.map((service, index) => (
          <div
            key={service?.title || `service-${index}`}
            className="h-full flex flex-col bg-gradient-to-br from-white/10 to-white/40 shadow-md rounded-lg p-6"
          >
            {service?.icon && (
              <ServiceIcon
                name={service.icon}
                className="text-orange-500 w-12 h-12"
              />
            )}
            <h3 className={`${CARD_TITLE} mt-3`}>{service?.title}</h3>
            <p className={`${BODY_SMALL} mt-4 min-h-[90px]`}>
              {service?.description}
            </p>
            {service?.features && service.features.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {service.features.map((feature, idx) => (
                  <div
                    key={`${service?.title}-${feature}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`${SURFACE.neutralSolid} ${LABEL} w-6 h-6 rounded flex items-center justify-center flex-shrink-0`}
                    >
                      {idx + 1}
                    </span>
                    <span className={BODY_SMALL}>{feature}</span>
                  </div>
                ))}
              </div>
            )}
            {service?.link && (
              <TextLink href={service.link} className="mt-auto pt-6">
                Read more
                <span className="sr-only">about {service.title}</span>
              </TextLink>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
