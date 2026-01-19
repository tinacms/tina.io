import { ArrowRight } from 'lucide-react';
import { LinkButton } from './ui/Button';

interface RecentNewsBannerProps {
  updateCategory: string;
  description: string;
  linkTitle: string;
  link: string;
}

export function RecentNewsBanner({
  updateCategory,
  description,
  linkTitle,
  link,
}: RecentNewsBannerProps) {
  return (
    <div className="bg-(image:--gradient-banner) z-10 shadow-[0_0_8px_2px_rgba(0,0,0,0.03)] relative border-b border-[#d1faf6] py-2 px-4 lg:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-base">
        <span className="bg-[#0574E4] text-white px-2 shadow-lg rounded-md text-sm font-bold">
          {updateCategory}
        </span>
        <span className="text-slate-700 hover:text-slate-950 transition-colors duration-200">
          {description}
        </span>
        <LinkButton
          link={link}
          color="blueOutline"
          size="extraSmall"
          className="group gap-1"
        >
          {linkTitle}
          <ArrowRight className="w-4 h-4" />
        </LinkButton>
      </div>
    </div>
  );
}
