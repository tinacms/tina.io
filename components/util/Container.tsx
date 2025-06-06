import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  size?: "small" | "medium";
  className?: string;
};

const sizeClasses = {
  small: "max-w-[43.75rem] small:px-0",
  medium: "max-w-[75rem] md:px-12 sm:px-8 medium:px-0",
};

const Container = ({
  children,
  size = "medium",
  className,
}: ContainerProps) => {
  return (
    <section className={cn(className, "px-4 mx-auto", sizeClasses[size])}>
      {children}
    </section>
  );
};

export default Container;
