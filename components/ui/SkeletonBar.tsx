type SkeletonBarProps = {
  width: string;
  className?: string;
};

export function SkeletonBar({ width, className = '' }: SkeletonBarProps) {
  return (
    <span
      aria-hidden
      className={`inline-block h-5 align-middle rounded-md animate-shimmer bg-skeleton-shimmer bg-skeleton ${width} ${className}`}
    />
  );
}
