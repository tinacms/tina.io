import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export function RecentNewsBanner() {
  return (
    <div className="bg-[linear-gradient(90deg,white,#f2fdfc_33.3%,#e6faf8_100%)] border-b border-[#d1faf6] py-2 px-4 lg:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-xs font-bold uppercase">
          Recent News
        </span>
        <span className="text-blue-600">
          Check out our latest updates and announcements
        </span>
        <Link
          href="/whats-new"
          className="group flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-md text-blue-600 hover:text-blue-700 font-medium transition-all shadow-sm hover:shadow"
        >
          Learn More
          <ArrowUp className="w-4 h-4 group-hover:translate-x-1 transition-transform rotate-90" />
        </Link>
      </div>
    </div>
  );
}
