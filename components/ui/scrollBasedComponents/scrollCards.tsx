// thanks to oliver: https://www.youtube.com/@olivierlarose1
'use client';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

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
    Math.floor(scrollProgress * (length - 1)),
    length - 1
  );

  if (currentIndex - 2 <= index) {
    return 1;
  }

  if (currentIndex - 3 > index) {
    return 0;
  }

  return 0.5;
}

export default function index(props): JSX.Element {
  const container = useRef(null);
  const [endPoint, setEndPoint] = useState(0);
  useEffect(() => {
    setEndPoint(container.current.scrollHeight + window.innerHeight * 0.6);
    window.addEventListener('resize', () => {
      setEndPoint(container.current.scrollHeight + window.innerHeight * 0.6);
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, [container]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', `${endPoint}px end`],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);
  return (
    <ReactLenis root>
      <main ref={container} className="min-h-screen my-30">
        <motion.div
          className="sticky top-[8%] mb-8 w-full flex justify-center"
          style={{ opacity }}
        >
          <h2 className="font-tuner inlinetext-3xl md:text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent lg:text-left">
            {props.title}
          </h2>
        </motion.div>

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
                range={[i * 0.12, Math.min(1, i * 0.12 + 0.5)]}
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
  const top = useTransform(progress, (value) => {
    return `${25 * (1 - value * 0.5)}%`;
  });

  useEffect(() => {}, [scale]);

  return (
    <motion.div
      ref={container}
      className="py-16 h-30 flex items-center justify-center sticky"
      style={{
        top: top,
      }}
    >
      <motion.div
        style={{
          backgroundColor: 'white',
          scale,
          opacity,
          top: `calc(-${5 + i}vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] w-full max-w-42 mx-16 h-52 rounded-2xl origin-top shadow-lg overflow-hidden`}
      >
        {item}
      </motion.div>
    </motion.div>
  );
};
