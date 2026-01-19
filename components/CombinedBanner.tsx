'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { getGitHubStarCount } from '@/utils/github-star-helper';
import { cn } from '@/lib/utils';

const formatStarCount = (count: number) => {
  const rounded = Math.round(count / 100) * 100;
  return `${(rounded / 1000).toFixed(1)}k`;
};

interface CombinedBannerProps {
  showNewsBanner: boolean;
  updateCategory?: string;
  description?: string;
  linkTitle?: string;
  link?: string;
}

export function CombinedBanner({
  showNewsBanner,
  updateCategory,
  description,
  linkTitle,
  link,
}: CombinedBannerProps) {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    const fetchStarCount = async () => {
      const count = await getGitHubStarCount('tinacms', 'tinacms');
      setStarCount(count);
    };
    fetchStarCount();
  }, []);

  return (
    <div className="bg-(image:--gradient-banner) z-10 shadow-[0_0_8px_2px_rgba(0,0,0,0.03)] flex-col relative border-b border-[#d1faf6] py-3 px-4 lg:px-10">
      {/* <div className="max-w-7xl mx-auto max-lg:flex-col flex items-center justify-center gap-2 text-base"> */}
      <div className="max-w-7xl mx-auto max-lg:flex-col flex items-center justify-center gap-2 text-base">
        {showNewsBanner && updateCategory && description && link && (
          <Link
            href={link}
            className="flex group items-center gap-2  "
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
        )}

        {/* GitHub Star Section */}
        <Link
          className={cn("text-slate-700 flex max-lg:hidden hover:text-slate-950 transition-colors duration-200  items-center gap-1 max-lg:mr-auto ml-auto", !showNewsBanner && "mr-auto")}
          href="https://github.com/tinacms/tinacms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Loving Tina?{' '}
          <FaStar className="ml-1" />{' '}
          us on GitHub
          <span className="flex items-center">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium ml-1">
              {formatStarCount(starCount)}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
