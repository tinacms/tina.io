import Image from 'next/image';
import type { PageBlocksHeroV2 } from 'tina/__generated__/types';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { tinaField } from 'tinacms/dist/react';

import { Badge } from '@/component/blocks/RecentNewsBanner/Badge';
import { Icon, IconOptions } from '@/component/forms/IconPicker';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const { title, subtext, buttons, image, buttonHorizontalAlignment, recentNewsBanner } =
    data.data || {};
  const alignment = buttonHorizontalAlignment ?? 'center';

  const bannerFilled = recentNewsBanner && (recentNewsBanner.title || recentNewsBanner.link);
  
  // Get the icon component if an icon is selected
  const BadgeIconComponent = recentNewsBanner?.badge?.icon && IconOptions[recentNewsBanner.badge.icon] 
    ? IconOptions[recentNewsBanner.badge.icon] 
    : null;

  return (
    <Container
      size="medium"
      className="min-h-[50vh] grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className={cn("flex items-center flex-col gap-8  border-red-500 py-10",bannerFilled && "pt-0" )}>
        
        <div className='flex flex-col gap-3'>
          {/* Banner */}
        {bannerFilled && (
          <Badge
          
          color='blueSecondary'
          className={cn(
            'mb-2 px-1 py-1',
            (recentNewsBanner.badge?.position === 'top left' || recentNewsBanner.badge?.position === 'top right') && 'relative',
            recentNewsBanner.badge?.text &&
              (recentNewsBanner.badge?.position === 'left' || recentNewsBanner.badge?.position === 'right')
              
          )} asChild={true}>
            <Link 
              href={recentNewsBanner.link || '#'}
              data-tina-field={tinaField(data.data.recentNewsBanner, 'title')}
              {...(recentNewsBanner.openInNewTab && {
                target: "_blank",
                rel: "noopener noreferrer"
              })}
              className="flex  items-center gap-2"
            >
              {/* New badge (conditionally rendered) */}
              {recentNewsBanner.badge?.text && (
                (recentNewsBanner.badge?.position === 'top left' || recentNewsBanner.badge?.position === 'top right') ? (
                  <Badge
                    size='small'
                    color="orange"
                    className={cn(
                      "uppercase absolute text-[10px] text-white -top-3 flex items-center gap-1",
                      recentNewsBanner.badge?.position === 'top left' ? '-left-2.5' : '-right-2.5'
                    )}
                    dataTinaField={tinaField(data.data.recentNewsBanner?.badge, 'text')}
                  >
                    {BadgeIconComponent && <BadgeIconComponent className="w-3 h-3" />}
                    {recentNewsBanner.badge?.text}
                  </Badge>
                ) : null
              )}
              <AnimatedShinyText className='flex items-center gap-2 text-blue-800/70 text-sm via-blue-950'>
                <span className={cn(
                  "inline-flex items-center gap-2",
                  recentNewsBanner.badge?.position === 'right' && recentNewsBanner.badge?.text && 'flex-row-reverse'
                )}>
                  {recentNewsBanner.badge?.text && (recentNewsBanner.badge?.position === 'left' || recentNewsBanner.badge?.position === 'right') && (
                    <Badge
                      color="orange"
                      size='medium'
                      className="uppercase text-white text-xs self-center flex items-center gap-1"
                      dataTinaField={tinaField(data.data.recentNewsBanner?.badge, 'text')}
                    >
                      {BadgeIconComponent && <BadgeIconComponent className="w-5 h-5" />}
                      {recentNewsBanner.badge?.text}
                    </Badge>
                  )}
                  
                  <span className="inline-flex gap-2 items-center">
                    {BadgeIconComponent && !recentNewsBanner.badge?.text && <BadgeIconComponent className="size-5" />}
                    {/* Title Icon (from recentNewsBanner.titleIcon) */}
                    {recentNewsBanner.titleIcon && IconOptions[recentNewsBanner.titleIcon] && (
                      <span className="ml-1 flex items-center">
                        {IconOptions[recentNewsBanner.titleIcon]({ className: "size-5" })}
                      </span>
                    )}
                    {recentNewsBanner.title}
                  </span>
                </span>
              </AnimatedShinyText>
            </Link>
          </Badge>
        )}
        {title && (
          <h2
            className={`${H1_HEADINGS_SIZE} max-w-md md:max-w-none font-ibm-plex`}
          >
            {curlyBracketFormatter(title)}
          </h2>
        )}
        {subtext && (
          <p className="text-neutral-text-secondary duration-75 md:max-w-[62ch] font-normal leading-relaxed text-lg max-w-md">
            {subtext}
          </p>
        )}
        </div>
        {buttons && buttons.length > 0 && (
          <div
            className={`flex ${alignment === 'left' ? 'justify-center md:justify-start' : 'justify-center'} w-full flex-row flex-wrap gap-2 max-w-[62ch]`}
          >
            {buttons.map((button, index) => (
              <RenderButton
                key={`button-${button?.label || index}`}
                button={button}
                className="py-3"
              />
            ))}
          </div>
        )}
      </div>
      {image && (
        <div className="relative w-[250px] h-[300px] md:w-[450px] md:h-[500px] mx-auto">
          <Image
            src={image}
            alt={title || 'Hero image'}
            fill={true}
            sizes="(max-width: 768px) 250px, 450px"
            quality={60}
            priority={true}
            fetchPriority="high"
            className="object-contain"
          />
        </div>
      )}
    </Container>
  );
}
