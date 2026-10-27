import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { EYEBROW, LABEL, SURFACE } from '@/component/styles/typography';
import { cn } from '@/lib/utils';

// Badge colours come from the CMS (BADGE_COLOR_OPTIONS). The five options
// collapse onto three surfaces, so every badge reads as a chip: Orange is the
// solid “new” pill; Blue, Blue Secondary and Ghost Blue are the light blue
// tint; Ghost Orange is the light orange tint. The CMS keeps all five values so
// existing content still renders. Text takes LABEL in the banner-sized badge and
// EYEBROW (SLUB) in the small pills.
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
      orange: `${SURFACE.brandSolid} border-transparent`,
      ghostOrange: SURFACE.brand,
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'blue',
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
