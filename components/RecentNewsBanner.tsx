'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
        <Link
          href={link}
          className="flex group items-center gap-2"
        >
          {/* Badge */}
          <div className="bg-[#0574E4] flex items-center gap-1 text-white px-2 shadow-lg rounded-md text-sm font-bold transition-opacity">
            {updateCategory}
          </div>

          <span className="text-slate-700 transition-colors group-hover:text-slate-950 gap-1 items-center flex">
            {description}
            <ArrowRight className="w-4 stroke-3 h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
