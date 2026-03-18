import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-[5px] border-0 bg-white px-4 text-base font-ibm-plex text-[var(--color-secondary)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0px_2px_3px_rgba(0,0,0,0.12)] transition-all duration-[85ms] ease-out placeholder:text-gray-400 placeholder:text-base hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_0_0_3px_rgba(236,72,21,0.2),0_2px_3px_rgba(0,0,0,0.12)] focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_0_0_3px_rgba(236,72,21,0.7),0_2px_3px_rgba(0,0,0,0.12)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
