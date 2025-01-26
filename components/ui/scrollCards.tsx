// thanks to oliver: https://www.youtube.com/@olivierlarose1
'use client';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

/**
 * Computes the scaling factor based on scroll progress, index, and list length.
 *
 * @param scrollProgress - Current scroll progress (0 to 1).
 * @param index - Index of the current item.
 * @param length - Total number of items.
 * @returns A scaling factor between 0 and 1.
 */
function computeOpacity(
  scrollProgress: number,
  index: number,
  length: number
): number {
  // Calculate the current index based on scroll progress
  const currentIndex = Math.min(
    Math.floor(scrollProgress * length),
    length - 1
  );

  if (
    index > currentIndex ||
    (index >= currentIndex - 2 && index <= currentIndex)
  ) {
    // Maintain full opacity for current, up to 2 before, and after indices
    return 1;
  } else if (index < currentIndex - 2) {
    // Rapidly decrease opacity for indices before up to 2 before current index
    const distance = currentIndex - 2 - index;
    // Adjust opacity decrement for a quicker drop
    const opacity = 1 - distance * 0.5; // Increased decrement rate
    return Math.max(0, Math.min(opacity, 1));
  }

  return 1;
}

export default function index(props): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  return (
    <ReactLenis root>
      <main ref={container} className="min-h-screen my-24">
        <section className="w-full">
          {props.content?.map((item, i) => {
            const targetScale = 1 - (props.content?.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                length={props.content?.length}
                item={item}
                progress={scrollYProgress}
                range={[i * 0.15, Math.min(1, i * 0.15 + 0.5)]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
interface CardProps {
  i: number;
  item: ReactNode;
  length: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  item,
  progress,
  range,
  targetScale,
  length,
}) => {
  const container = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, (value) => {
    return computeOpacity(value, i, length);
  });

  useEffect(() => {}, [scale]);

  return (
    <div
      ref={container}
      className="py-16 h-[20vh] flex items-center justify-center sticky top-20"
    >
      <motion.div
        style={{
          backgroundColor: 'white',
          scale,
          opacity,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] w-full max-w-42 mx-16 h-52 rounded-2xl origin-top shadow-lg overflow-hidden`}
      >
        {item}
      </motion.div>
    </div>
  );
};
