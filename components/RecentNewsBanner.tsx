import { ArrowRight, ArrowUp } from 'lucide-react';
import { LinkButton } from './ui/Button';

export function RecentNewsBanner() {
  return (
    <div className="bg-[linear-gradient(90deg,white,#f2fdfc_33.3%,#e6faf8_100%)] border-b border-[#d1faf6] py-2 px-4 lg:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-base">
        <span className="bg-[#0574E4] text-white px-2 py-0.5 rounded-md text-xs font-bold uppercase">
          New Video
        </span>
        <span className="text-slate-700 hover:text-slate-950 transition-colors duration-200">
          TinaCMS for GitHub - The SSW Rules Migration
        </span>
        <LinkButton
          link="/whats-new"

          color='ghostOutline'
          size="extraSmall"
          
          className="group gap-1"
        >
          Watch Now
          <ArrowRight className="w-4 h-4" />
        </LinkButton>
      </div>
    </div>
  );
}
