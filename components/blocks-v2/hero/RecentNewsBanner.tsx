import { Badge } from '@/component/blocks/RecentNewsBanner/Badge';
import { IconOptions } from '@/component/forms/IconPicker';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { tinaField } from 'tinacms/dist/react';

type RecentNewsBannerProps = {
  recentNewsBanner: RecentNewsBannerType;
};

type RecentNewsBannerBadge = {
  text?: string;
  icon?: string;
  position?: string;
  color?: string;
};

type RecentNewsBannerType = {
  title?: string;
  link?: string;
  openInNewTab?: boolean;
  badge?: RecentNewsBannerBadge;
  titleIcon?: string;
  backgroundColor?: string;
};

type BadgePositionType = 'inline' | 'top';

export const RecentNewsBanner = ({ recentNewsBanner }: RecentNewsBannerProps) => {
  const BadgeIconComponent = recentNewsBanner?.badge?.icon ? IconOptions[recentNewsBanner.badge.icon] : null;
  const TitleIconComponent = recentNewsBanner?.titleIcon ? IconOptions[recentNewsBanner.titleIcon] : null;
  console.log("RecentNewsBanner props:", recentNewsBanner?.badge?.position);
  const badgePositionType: BadgePositionType = 
    (recentNewsBanner.badge?.position === 'top left' || recentNewsBanner.badge?.position === 'top right') 
      ? 'top' 
      : 'inline';
  const getTextColorClass = (bgColor?: string) => {
    switch (bgColor) {
      case 'blue':
        return 'text-transparent from-white via-brand-secondary bg-white to-white';
      case 'orange':
        return 'text-transparent from-white via-brand-primary-light bg-white to-white';
      case 'ghostBlue':
        return 'text-transparent bg-brand-secondary from-brand-secondary via-brand-secondary-light to-brand-secondary';
      case 'ghostOrange':
        return 'text-transparent bg-brand-primary from-brand-primary via-brand-primary-light to-brand-primary';
      case 'blueSecondary':
      default:
        return "text-transparent bg-brand-secondary-gradient-start from-brand-secondary-gradient-start via-brand-secondary to-brand-secondary-gradient-start";
    }
  };

  return (
    <Badge
      color={recentNewsBanner.backgroundColor as 'blue' | 'ghostBlue' | 'orange' | 'ghostOrange' | 'blueSecondary' || 'blueSecondary'}
      className={cn(
        'mb-2 px-1 py-1',
        badgePositionType === 'top' && 'relative',
      )} 
      asChild={true}
    >
      <Link 
        href={recentNewsBanner.link || '#'}
        data-tina-field={tinaField(recentNewsBanner, 'title')}
        {...(recentNewsBanner.openInNewTab && {
          target: "_blank",
          rel: "noopener noreferrer"
        })}
        className="flex items-center gap-2"
      >
        {recentNewsBanner.badge?.text &&   badgePositionType === 'top' && (
            <Badge
              size='small'
              color={recentNewsBanner.badge?.color as 'blue' | 'ghostBlue' | 'orange' | 'ghostOrange' | 'blueSecondary' || 'orange'}
              className={cn(
                "uppercase absolute text-[10px] -top-3 flex items-center gap-1",
                recentNewsBanner.badge?.position === 'top left' ? '-left-2.5' : '-right-2.5'
              )}
              dataTinaField={tinaField(recentNewsBanner?.badge, 'text')}
            >
              {BadgeIconComponent && <BadgeIconComponent className="w-3 h-3" />}
              {recentNewsBanner.badge?.text}
            </Badge>
        )}
        
        <div className={cn(
          "flex items-center gap-2",
          recentNewsBanner.badge?.position === 'right' && 'flex-row-reverse'
        )}>
          {recentNewsBanner.badge?.text && recentNewsBanner.badge?.position && badgePositionType === 'inline' && (
            <Badge
              color={recentNewsBanner.badge?.color as 'blue' | 'ghostBlue' | 'orange' | 'ghostOrange' | 'blueSecondary' || 'orange'}
              size='medium'
              className="uppercase text-xs self-center flex items-center gap-1"
              dataTinaField={tinaField(recentNewsBanner?.badge, 'text')}
            >
              {BadgeIconComponent && <BadgeIconComponent className="w-5 h-5" />}
              {recentNewsBanner.badge?.text}
            </Badge>
          )}
          
          {TitleIconComponent && (
            <TitleIconComponent className="size-5 ml-2" />
          )}
          
          <AnimatedShinyText className={cn(
            'flex items-center @max-lg:text-xs gap-2 text-sm',
            badgePositionType === 'inline' && recentNewsBanner.badge?.position === 'left' && 'pr-2',
            badgePositionType === 'inline' && recentNewsBanner.badge?.position === 'right' && 'pl-2',
            (badgePositionType === 'top' || !recentNewsBanner.badge?.position) && 'px-2',
            getTextColorClass(recentNewsBanner.backgroundColor)
          )}>
            <span className="inline-flex gap-2 text-nowrap items-center">
              {BadgeIconComponent && !recentNewsBanner.badge?.text && <BadgeIconComponent className="size-5" />}
              {recentNewsBanner.title}
            </span>
          </AnimatedShinyText>
        </div>
      </Link>
    </Badge>
  );
};
