import React from 'react';

export const CodeBlockSkeleton = ({ hasTabs = false }) => {
  const skeletonLines = React.useMemo(() => {
    const lines: Array<{ width: string; delay: string }> = [];
    const widths = ['35%', '45%', '50%', '60%', '65%', '75%', '80%'];
    const numberOfLines = 6; 

    for (let i = 0; i < numberOfLines; i++) {
      const widthIndex = i % widths.length;
      lines.push({
        width: widths[widthIndex],
        delay: `${i * 0.1}s`,
      });
    }
    return lines;
  }, []);

  const secondaryLines = [
    { width: '30%', delay: '0.05s' },
    { width: '25%', delay: '0.15s' },
    { width: '35%', delay: '0.25s' },
    { width: '20%', delay: '0.35s' },
  ];

  return (
    <div className={`relative w-full ${hasTabs ? '' : 'my-2'}`}>
      {!hasTabs && <InlineCopyButton />}
      <div
        className={`shiki w-full overflow-x-auto bg-background-brand-code py-4 px-2 text-sm shadow-sm rounded-lg ${
          hasTabs ? '' : 'border border-neutral-border-subtle'
        }`}
      >
        <div className="space-y-2">
          {skeletonLines.map((line, index) => (
            <div
              key={`skeleton-line-${index}-${line.width}-${line.delay}`}
              className="flex items-center space-x-4"
            >
              <div className="w-8 h-4 bg-neutral-border-subtle rounded animate-pulse flex-shrink-0" />

              <div className="flex-1 space-y-1">
                <div
                  className="h-4 bg-neutral-border-subtle rounded animate-pulse"
                  style={{
                    width: line.width,
                    animationDelay: line.delay,
                  }}
                />
                {index % 3 === 0 && (
                  <div
                    className="h-4 bg-neutral-border-subtle rounded animate-pulse"
                    style={{
                      width:
                        secondaryLines[
                          Math.floor(index / 3) % secondaryLines.length
                        ]?.width || '25%',
                      animationDelay:
                        secondaryLines[
                          Math.floor(index / 3) % secondaryLines.length
                        ]?.delay || '0.05s',
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InlineCopyButton = () => {
  return (
    <div className="absolute top-0 right-0 z-10 px-4 py-1 text-xs font-mono text-neutral-text-secondary">
      <div className="w-8 h-3 bg-neutral-border-subtle rounded animate-pulse" />
    </div>
  );
};
