import { cn } from "@/lib/utils";
import {Slot } from "@radix-ui/react-slot";

interface BadgeProps {
  asChild?: boolean;
  children?: React.ReactNode;
  small?: boolean;
  color?: 'default' | 'orange';
  className?: string;
  dataTinaField?: string;
}

export const Badge = ({ 
  asChild = false, 
  children,
  small = false,
  color = 'default',
  className,
  dataTinaField,
}: BadgeProps) => {
  const Comp = asChild ? Slot : "span";
  let base = "self-start flex gap-2 items-center w-fit font-ibm-plex-medium rounded-full border";
  let size = small ? "px-1" : "px-3.5 py-1.5 text-base";
  let colorClass = color === 'orange'
    ? "bg-orange-500 text-white border-orange-500"
    : "text-blue-800 bg-brand-secondary/10 border-brand-secondary";
  return (
    <Comp
      className={cn(base, size, colorClass, className)}
      {...(dataTinaField ? { 'data-tina-field': dataTinaField } : {})}
    >
      {children}
    </Comp>
  );
}
