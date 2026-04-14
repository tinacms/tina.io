import Image from 'next/image';
import { cn } from '@/lib/utils';

type TerminalPanelProps = {
  secondaryImage?: string;
};

function TerminalOutput() {
  return (
    <div className="bg-white px-5 py-4 font-mono text-[13px] leading-[1.7] text-[#374151] space-y-3">
      <div>
        <p>
          <span className="text-[#9ca3af]">$</span>{' '}
          <span className="text-[#374151]">
            npx create-tina-app@latest my-blog
          </span>
        </p>
        <div className="mt-1 space-y-0.5">
          <p>
            <span className="text-[#19c332] mr-1.5">&#10003;</span>
            Creating your markdown repository...
          </p>
          <p>
            <span className="text-[#19c332] mr-1.5">&#10003;</span>
            Content ready for GEO optimization
          </p>
        </div>
      </div>
      <div>
        <p>
          <span className="text-[#9ca3af]">$</span>{' '}
          <span className="text-[#19c332]">echo</span>{' '}
          <span className="text-[#ec4815]">"GEO loves markdown"</span>
        </p>
        <div className="mt-1 space-y-0.5">
          <p>
            <span className="text-[#9ca3af]">&gt;</span> AI-powered search
            optimization
          </p>
          <p>
            <span className="text-[#9ca3af]">&gt;</span> No complex build steps
          </p>
          <p>
            <span className="text-[#9ca3af]">&gt;</span> LLM compatibility:
            {'    '}
            <span className="text-[#19c332] font-semibold">excellent</span>
          </p>
          <p>
            <span className="text-[#9ca3af]">&gt;</span> GEO readiness:
            {'        '}
            <span className="text-[#19c332] font-semibold">excellent</span>
          </p>
        </div>
      </div>
      <span className="inline-block w-2 h-4 bg-[#ec4815] animate-pulse" />
    </div>
  );
}

export function TerminalPanel({ secondaryImage }: TerminalPanelProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full pt-[145px] pb-4 overflow-visible">
      {secondaryImage && (
        <div className="absolute top-0 left-[65%] -translate-x-1/2 z-10">
          <Image
            src={secondaryImage}
            alt="Llama peeking"
            width={200}
            height={200}
            className="object-contain object-bottom"
          />
        </div>
      )}
      <div className="bg-white rounded-[18px] shadow-[0px_6px_24px_0px_rgba(0,0,0,0.07)] w-full max-w-[425px] overflow-hidden">
        <div className="bg-[#f9fafb] border-b border-black/10 flex gap-4 h-[38px] items-center px-4 shrink-0">
          <div className="flex gap-2 items-center p-1">
            <div className="size-3 rounded-full bg-[#ff736a] border border-black/10" />
            <div className="size-3 rounded-full bg-[#febc2e] border border-black/10" />
            <div className="size-3 rounded-full bg-[#19c332] border border-black/10" />
          </div>
          <span className="text-[#acb2bc] text-sm font-medium">
            ~/my-tina-site
          </span>
        </div>
        <TerminalOutput />
        <div className="bg-[#f9fafb] border-t border-black/10 flex items-center justify-center gap-5 h-[38px] px-10 shrink-0">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'size-2 rounded-full bg-[#19c332]',
                'border border-black/10',
              )}
            />
            <span className="text-[#19c332] text-xs font-semibold">
              Markdown in
            </span>
          </div>
          <svg
            width="19"
            height="10"
            viewBox="0 0 19 10"
            fill="none"
            className="text-gray-400"
            aria-hidden="true"
          >
            <path
              d="M1 5h17M14 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'size-2 rounded-full bg-[#ec4815]',
                'border border-black/10',
              )}
            />
            <span className="text-[#ec4815] text-xs font-semibold">
              AI + GEO ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
