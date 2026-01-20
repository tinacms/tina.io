import { Slot } from "@radix-ui/react-slot";
import { MdSmartDisplay } from "react-icons/md";

interface RecentNewsBannerProps {
  asChild?: boolean;
  children?: React.ReactNode;
}

export const RecentNewsBanner = ({ 
  asChild = false, 
  children,
}: RecentNewsBannerProps) => {
  const Comp = asChild ? Slot : "span";
  
  return (
    <Comp
      className="border-brand-secondary self-start flex gap-1 items-center px-3 py-1 w-fit text-base text-blue-800 bg-brand-secondary/10 font-ibm-plex-medium rounded-full border"
    >
      {children}
    </Comp>
  );
}
