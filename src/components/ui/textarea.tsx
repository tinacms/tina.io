import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[60px] w-full rounded-[5px] border-0 bg-white px-4 py-3 text-base font-ibm-plex text-[var(--color-secondary)] shadow-input transition-shadow duration-[85ms] ease-out placeholder:text-gray-400 hover:shadow-input-hover focus:shadow-input-focus outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
