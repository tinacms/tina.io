import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-[5px] border-0 bg-white px-4 text-base font-ibm-plex text-[var(--color-secondary)] shadow-input transition-shadow duration-[85ms] ease-out placeholder:text-gray-400 hover:shadow-input-hover focus:shadow-input-focus outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50',
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
