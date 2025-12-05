import { useEffect, useRef, useState } from 'react';

export const Slider = ({ items, speed = 0.05, slidesToShow = 5 }) => {
  // Handle both old format (React elements) and new format (objects with id and element)
  const normalizedItems = items.map((item, idx) => {
    if (item && typeof item === 'object' && 'element' in item && 'id' in item) {
      return { id: item.id, element: item.element };
    }
    // Fallback for old format - use index as id
    return { id: `item-${idx}`, element: item };
  });
  const sliderRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  // Current scroll position in pixels (negative means moving left).
  const scrollPosition = useRef(0);

  // The width of one “set” of items. We render 2 sets total in a row.
  const [oneSetWidth, setOneSetWidth] = useState(0);
  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const measureId = requestAnimationFrame(() => {
      const totalWidth = sliderRef.current.scrollWidth;

      setOneSetWidth(totalWidth / 2);
    });

    return () => cancelAnimationFrame(measureId);
  }, []);

  useEffect(() => {
    let rafId: number;

    function tick() {
      if (!isPaused && oneSetWidth && sliderRef.current) {
        // Move left by `speed` pixels per frame
        scrollPosition.current -= speed;

        // If we've scrolled left past the entire width of one set,
        // jump forward by that width to create a seamless loop
        if (scrollPosition.current <= -oneSetWidth) {
          scrollPosition.current += oneSetWidth;
        }

        sliderRef.current.style.transform = `translateX(${scrollPosition.current}px)`;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, speed, oneSetWidth]);

  /**
   * 3) Pick the correct width class:
   *    - 5 => `w-1/5`
   *    - 3 => `w-1/3`
   */
  const widthClass = slidesToShow === 5 ? 'w-1/5' : 'w-1/3';

  return (
    <div
      className="overflow-hidden relative w-full h-40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap subpixel-antialiased backface-hidden"
      >
        {normalizedItems.map((item) => (
          <div
            key={`original-${item.id}`}
            // Ensure each item is exactly 1/5 or 1/3 of the container for even horiz spacing
            className={`flex-none box-border px-2 ${widthClass}`}
          >
            {item.element}
          </div>
        ))}

        {/* Duplicate items for the seamless loop */}
        {normalizedItems.map((item) => (
          <div
            key={`clone-${item.id}`}
            className={`flex-none box-border px-2 ${widthClass}`}
          >
            {item.element}
          </div>
        ))}
      </div>
    </div>
  );
};
