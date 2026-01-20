import { Slot } from "@radix-ui/react-slot";
import { MdSmartDisplay } from "react-icons/md";

interface BadgeProps {
  asChild?: boolean;
  children?: React.ReactNode;
  small?: boolean;
  color?: 'default' | 'orange';
}

export const Badge = ({ 
  asChild = false, 
  children,
  small = false,
  color = 'default',
}: BadgeProps) => {
  const Comp = asChild ? Slot : "span";
  let base = "self-start flex gap-2 items-center w-fit font-ibm-plex-medium rounded-full border";
  let size = small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-base";
  let colorClass = color === 'orange'
    ? "bg-orange-500 text-white border-orange-500"
    : "text-blue-800 bg-brand-secondary/10 border-brand-secondary";
  return (
    <Comp
      className={`${base} ${size} ${colorClass}`}
    >
      {children}
    </Comp>
  );
}
