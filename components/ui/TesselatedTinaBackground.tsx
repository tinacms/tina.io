'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface CustomShapeMaskProps {
  width?: number;
  height?: number;
  shapePath: string;
  shapeSize?: number;
  gradientColors?: string[];
}

const CustomShapeMask: React.FC<CustomShapeMaskProps> = ({
  width = 800,
  height = 600,
  shapePath,
  gradientColors = ['white', 'white', '#E9FBF4'],
}) => {
  // Calculate the spacing of shapes
  const horizontalSpacing = 90;
  const verticalSpacing = 60;

  // Generate the shape pattern
  const generateShapePattern = () => {
    let pattern = '';
    for (let row = 0; row < height / verticalSpacing + 1; row++) {
      for (let col = 0; col < width / horizontalSpacing + 1; col++) {
        const x = col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
        const y = row * verticalSpacing;
        pattern += `<path d="${shapePath}" transform="translate(${x}, ${y}) scale(${0.12}) rotate(45)" />`;
      }
    }
    return pattern;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          {gradientColors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (gradientColors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
        <mask id="shapeMask">
          <rect width={width} height={height} fill="white" />
          <g
            fill="black"
            dangerouslySetInnerHTML={{ __html: generateShapePattern() }}
          />
        </mask>
      </defs>
      <rect
        width={width}
        height={height}
        fill="url(#gradient)"
        mask="url(#shapeMask)"
      />
    </svg>
  );
};

const SVGFileMask: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [svgPath, setSvgPath] = useState<string>('');
  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/svg/logos/tina.svg')
      .then((response) => response.text())
      .then((svgContent) => {
        // Extract the path data from the SVG content
        const pathMatch = svgContent.match(/<path[^>]*d="([^"]*)"[^>]*>/);
        if (pathMatch && pathMatch[1]) {
          setSvgPath(pathMatch[1]);
        }
      })
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (container.current) {
        setSvgWidth(container.current.offsetWidth);
        setSvgHeight(container.current.offsetHeight);
      }
    };

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    // Initial measurement
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, [svgPath]); // Empty dependency array for mount/unmount

  if (!svgPath) {
    return <div>{children}</div>;
  }

  return (
    <div className="relative w-full h-screen" ref={container}>
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <CustomShapeMask
          width={svgWidth}
          height={svgHeight}
          shapePath={svgPath}
          shapeSize={40}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default SVGFileMask;
