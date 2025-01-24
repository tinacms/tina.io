'use client';

import { Container } from 'components/blocks';
import React, { useEffect, useRef, useState } from 'react';

const ScrollCards = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<HTMLDivElement[]>([]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.children.length > 0) {
      const cards = Array.from(container.children) as HTMLElement[];
      const windowHeight = window.innerHeight;
      const centerY = window.scrollY + windowHeight / 2;

      // Find the card closest to the center of the viewport
      let closestCard = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenterY - windowHeight / 2);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = index;
        }

        if (index < activeIndex + 1 && cardCenterY - windowHeight / 2 < 0) {
          childRefs.current[index].style.marginBottom = `max(-${
            distance / 3
          }px, -8rem)`;
        } else {
          childRefs.current[index].style.marginBottom = '0';
        }
      });

      if (closestCard !== activeIndex) {
        setActiveIndex(closestCard);
      }
    }
  };

  useEffect(() => {
    const handleScrollThrottled = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScrollThrottled);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScrollThrottled);
  }, [activeIndex]);

  return (
    <>
      <div className="scroll-cards-container" ref={containerRef}>
        {props.content?.map((child, index) => (
          <div
            ref={(el) => (childRefs.current[index] = el)}
            key={index}
            className="w-full"
          >
            <Container width="wide">
              <div
                key={`scroll-card-${index}`}
                className={`scroll-card bg-gradient-to-br ${
                  index % 2 == 0
                    ? 'from-white via-slate-50 to-blue-50'
                    : 'from-white via-slate-50 to-slate-100'
                } ${index === activeIndex ? 'active' : ''}`}
              >
                {child}
              </div>
            </Container>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .scroll-cards-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            padding: 0 2rem;
            padding-bottom: 8rem;
          }

          .scroll-card {
            width: 100%;
            min-height: 10rem; /* Reduced height */
            margin: 2rem 0; /* Reduced margin further */
            border-radius: 10px;
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            transform-style: preserve-3d;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          /* Active card */
          .scroll-card.active {
            transform: translateZ(0) scale(1);
            z-index: 10;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }

          .scroll-card.active h3 {
            background: linear-gradient(
              to bottom right,
              #fb923c,
              #f97316,
              #ea580c
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          /* Non-active cards */
          .scroll-card:not(.active) h3 {
            background: none;
            -webkit-background-clip: initial;
            background-clip: initial;
            color: #000000;
          }

          /* All cards after the active one */
          .scroll-card:not(.active) {
            transform: translateZ(-100px) scale(0.95);
            z-index: 1;
          }
        `}
      </style>
    </>
  );
};

export default ScrollCards;
