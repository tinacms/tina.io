import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import Container from '@/component/util/Container';

function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: icon name is configured via Tina CMS
  const IconSVG = MdIcons[name];
  if (!IconSVG) {
    return null;
  }
  return <IconSVG className={className} />;
}

export function ProfessionalServices({ data }: { data: any }) {
  const { eyebrow, title, description, services } = data || {};

  return (
    <Container size="medium" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3.5">
        {eyebrow && (
          <p className="text-center text-orange-400 text-lg font-semibold font-ibm-plex leading-7">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold font-ibm-plex">
            {title}
          </h2>
        )}
        {description && (
          <p className="max-w-[62ch] text-center text-neutral-text-secondary font-light leading-relaxed text-lg">
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-9">
        {Array.isArray(services) &&
          services.map((service, index) => (
            <div
              key={service.title || `service-${index}`}
              className="h-full flex flex-col bg-gradient-to-br from-white/10 to-white/40 shadow-md rounded-lg p-6"
            >
              {service.icon && (
                <ServiceIcon
                  name={service.icon}
                  className="text-orange-500 w-12 h-12"
                />
              )}
              <h3 className="mt-3 text-2xl font-semibold font-ibm-plex">
                {service.title}
              </h3>
              <p className="mt-4 text-sm text-neutral-text-secondary min-h-[90px]">
                {service.description}
              </p>
              {Array.isArray(service.features) &&
                service.features.length > 0 && (
                  <div className="mt-4 flex flex-col gap-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={`${service.title}-${feature}`}
                        className="flex items-center gap-2"
                      >
                        <span className="w-6 h-6 bg-slate-400 text-zinc-50 rounded flex items-center justify-center flex-shrink-0 text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-neutral-text-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              {service.link && (
                <Link
                  href={service.link}
                  className="mt-auto pt-6 inline-flex items-center gap-2 py-2 text-sm text-neutral-text-secondary hover:text-orange-500 transition-colors duration-150"
                >
                  READ MORE
                  <FaArrowRight className="text-xs" />
                </Link>
              )}
            </div>
          ))}
      </div>
    </Container>
  );
}
