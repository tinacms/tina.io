import { Slot } from "@radix-ui/react-slot";
import { MdSmartDisplay } from "react-icons/md";

interface BadgeProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Badge = ({ 
  asChild = false, 
  children,
}: BadgeProps) => {
  const Comp = asChild ? Slot : "span";
  
  return (
    <Comp
      className="border-brand-secondary self-start flex gap-2 items-center px-3 py-1 w-fit text-base text-blue-800 bg-brand-secondary/10 font-ibm-plex-medium rounded-full border"
    >
      {children}
    </Comp>
  );
}
