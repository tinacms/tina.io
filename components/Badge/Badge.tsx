import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { EYEBROW, LABEL, SURFACE } from '@/component/styles/typography';
import { cn } from '@/lib/utils';

// Badge colours come from the CMS (BADGE_COLOR_OPTIONS): three looks, one
// option each, picked by design (Oct 2026). Orange is the solid “new” pill,
// Blue the light blue tint, Ghost Orange the light orange tint. blue and
// ghostBlue are retired CMS values, kept so older content still renders.
// Text takes LABEL in the banner-sized badge and EYEBROW (SLUB) in the small
// pills.
const INFO = SURFACE.info;

const badgeVariants = cva('flex gap-2 items-center w-fit rounded-full border', {
  variants: {
    size: {
      default: `px-3.5 py-1.5 ${LABEL}`,
      medium: `px-3 ${EYEBROW}`,
      small: `px-1 ${EYEBROW}`,
    },
    color: {
      blue: INFO,
      ghostBlue: INFO,
      blueSecondary: INFO,
      orange: SURFACE.brandSolid,
      ghostOrange: SURFACE.brand,
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'blueSecondary',
  },
});

export type BadgeColor =
  | 'blue'
  | 'ghostBlue'
  | 'orange'
  | 'ghostOrange'
  | 'blueSecondary';

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  dataTinaField?: string;
}

export const Badge = ({
  asChild = false,
  children,
  size,
  color,
  className,
  dataTinaField,
}: BadgeProps) => {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      className={cn(badgeVariants({ size, color }), className)}
      {...(dataTinaField ? { 'data-tina-field': dataTinaField } : {})}
    >
      {children}
    </Comp>
  );
};
