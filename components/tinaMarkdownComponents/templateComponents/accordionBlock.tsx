/** biome-ignore-all lint/performance/noImgElement: <TODO> */
/** biome-ignore-all lint/a11y/noRedundantAlt: <TODO> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <TODO> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <TODO> */
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { type Components, TinaMarkdown } from 'tinacms/dist/rich-text';

interface AccordionItem {
  heading?: string;
  docText: string;
  image?: string;
}

interface AccordionBlockProps {
  accordionItems: AccordionItem[];
  fullWidth?: boolean;
  // Passed in so nested rich-text renders with the same component map,
  // avoiding a circular import with docAndBlogComponents.
  components?: Components<Record<string, unknown>>;
}

export const AccordionBlock = ({
  accordionItems,
  fullWidth = false,
  components,
}: AccordionBlockProps) => {
  const [expanded, setExpanded] = useState<boolean[]>(
    accordionItems?.map(() => false) || [],
  );

  useEffect(() => {
    setExpanded(
      (prev) =>
        accordionItems?.map((_, i) => (i < prev.length ? prev[i] : false)) ||
        [],
    );
  }, [accordionItems]);

  const toggleExpand = (index: number) => {
    setExpanded((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  if (!accordionItems || accordionItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center rounded-lg bg-white/40 shadow-sm mb-5 p-4 border border-gray-200">
        No accordion items
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex flex-col justify-center items-center rounded-lg bg-white shadow-sm mb-5 border border-gray-200 ${
        fullWidth ? 'w-full' : 'w-3/4'
      }`}
    >
      {accordionItems.map((item, index) => {
        const image = item.image || null;

        return (
          <div key={`accordion-${index}`} className="w-full my-4">
            <div
              className="flex cursor-pointer items-center justify-between px-6 py-6"
              onClick={() => toggleExpand(index)}
            >
              <h4 className="text-gray-900 text-lg font-ibm-plex mt-0.5">
                {item.heading || 'Click to expand'}
              </h4>
              <div>
                {expanded[index] ? (
                  <FaMinus className="text-blue-800 size-3" />
                ) : (
                  <FaPlus className="text-gray-500 size-3" />
                )}
              </div>
            </div>
            <div
              className={`grid grid-cols-1 gap-4 transition-all duration-700 ease-in-out ${
                expanded[index]
                  ? 'max-h-[2000px] opacity-100'
                  : 'max-h-0 overflow-hidden opacity-0'
              } ${image ? 'sm:grid-cols-2' : ''}`}
            >
              <div className="min-w-0 px-4 pb-4 break-words">
                <TinaMarkdown
                  content={item.docText as any}
                  components={components}
                />
              </div>
              {image && (
                <div className="p-4">
                  <img
                    src={image}
                    alt={item.heading || 'image'}
                    className="w-full rounded-lg"
                  />
                </div>
              )}
            </div>
            {index < accordionItems.length - 1 && (
              <hr className="w-full h-0.5 border-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AccordionBlock;
