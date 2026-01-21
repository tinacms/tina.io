import { cn } from "@/lib/utils";
import {Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "self-start flex gap-2 items-center w-fit font-ibm-plex-medium rounded-full border",
  {
    variants: {
      size: {
        default: "px-3.5 py-1.5 text-base",
        medium: "px-3 text-sm",
        small: "px-1 text-[10px]",
      },
      color: {
        blue: "text-blue-800 bg-brand-secondary/10 border-brand-secondary",
        orange: "bg-orange-500 text-white border-orange-500",
      },
    },
    defaultVariants: {
      size: "default",
      color: "blue",
    },
  }
);

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
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(badgeVariants({ size, color }), className)}
      {...(dataTinaField ? { 'data-tina-field': dataTinaField } : {})}
    >
      {children}
    </Comp>
  );
}
