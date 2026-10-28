import type { ComponentPropsWithoutRef, CSSProperties, FC } from 'react';

import { SHIMMER } from '@/component/styles/typography';
import { cn } from '@/lib/utils';

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
      // SHIMMER takes its colours from the surface the text sits on.
      className={cn('mx-auto max-w-md', SHIMMER, className)}
      {...props}
    >
      {children}
    </span>
  );
};
