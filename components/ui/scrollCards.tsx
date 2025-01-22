'use client';

import { Container } from 'components/blocks';
import React, { useEffect, useRef, useState } from 'react';
import './scrollCards.css'; // Import CSS for styling

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
    <div className="scroll-cards-container" ref={containerRef}>
      {props.content?.map((child, index) => (
        <div
          ref={(el) => (childRefs.current[index] = el)}
          key={index}
          className="w-full"
        >
          <Container>
            <div
              key={index}
              className={`scroll-card bg-white ${
                index === activeIndex ? 'active' : ''
              }`}
            >
              {child}
            </div>
          </Container>
        </div>
      ))}
    </div>
  );
};

export default ScrollCards;
