import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { TinaTemplate } from '@tinacms/cli';
import { Container } from './Container';
import GradGlow from '../../public/svg/grad-glow.svg';
import { tinaField } from 'tinacms/dist/react';
import { sanitizeLabel } from 'utils/sanitizeLabel';
import { Actions } from './ActionsButton';
import {
  FaClock,
  FaUnlock,
  FaCodeBranch,
  FaCloudDownloadAlt,
  FaPuzzlePiece,
  FaMarkdown,
  FaGithub,
  FaFileAlt,
} from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBadge } from 'react-icons/bi';
import { BiSupport } from 'react-icons/bi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { CgCrown } from 'react-icons/cg';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { TbPlugConnected } from 'react-icons/tb';
import { SlLock } from 'react-icons/sl';
import { FaStar } from 'react-icons/fa';
import { icons } from '../ui/IconPickerIcons';

const CarouselItem = ({
  data,
  index,
  id,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isSmallOrMediumScreen,
  renderMedia,
}) => {
  const { headline, text, button, icon2, videoSrc } = data || {};

  const IconComponent = icons[icon2] || null;

  const commonStyles =
    'transition-all delay-[50] duration-500 hover:scale-105 hover:z-20';
  const nonHoveredStyles = 'pl-4';

  const actionsArray = button ? [button] : [];

  const textDisplayCondition =
    (!isSmallOrMediumScreen && isHovered && text) ||
    (isSmallOrMediumScreen && text);

  const buttonDisplayCondition =
    (!isSmallOrMediumScreen && isHovered && button) ||
    (isSmallOrMediumScreen && button);

  return (
    <div
      className={`${
        isHovered && !isSmallOrMediumScreen
          ? 'group block bg-gradient-to-br from-white/25 via-white/50 to-white/75 shadow-2xl pl-6 pr-8 md:py-9 md:pr-11 lg:pb-5 lg:pt-8 lg:pr-14 rounded-2xl'
          : nonHoveredStyles
      } ${commonStyles}`}
      onMouseEnter={!isSmallOrMediumScreen ? onMouseEnter : null}
      onMouseLeave={!isSmallOrMediumScreen ? onMouseLeave : null}
      style={{ textDecoration: 'none', overflow: 'visible' }}
    >
      <div
        data-tina-field={tinaField(data, 'headline')}
        className="flex flex-col"
      >
        <div className="block lg:hidden pb-5">
          {renderMedia && renderMedia(index)}
        </div>
        <div className="flex items-center mb-2 pl-1">
          {IconComponent && (
            <IconComponent
              className={`text-xl md:text-3xl ${
                isHovered && !isSmallOrMediumScreen
                  ? 'text-orange-500/90'
                  : 'text-black'
              }`}
            />
          )}
          {headline && (
            <h3
              className={`text-xl md:text-3xl font-tuner leading-tight pl-4 ${
                isHovered && !isSmallOrMediumScreen
                  ? 'text-transparent bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text'
                  : 'text-black'
              }`}
            >
              {headline}
            </h3>
          )}
        </div>
        <div
          className={`transition-all duration-500 delay-200 ${
            textDisplayCondition
              ? 'scale-y-100 opacity-100'
              : 'scale-y-75 opacity-0'
          }`}
        >
          {textDisplayCondition && (
            <p className={`md:pl-12 lg:pl-9 md:ml-4 text-lg font-medium slide-up`}>
              {text}
            </p>
          )}
          {buttonDisplayCondition && (
            <div className={`md:pl-11 lg:pl-7 slide-up`}>
              <Actions items={actionsArray} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function CarouselFeatureBlock({ data, index }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);
  const intervalRef = useRef(null);

  // Set up media queries to detect screen size changes and adjust carousel behavior accordingly.
  // Automatically cycle through items on large screens, while disabling auto-cycle on smaller screens.a
  useEffect(() => {
    const mediaQueryLarge = window.matchMedia('(min-width: 1024px)');
    const mediaQuerySmallOrMedium = window.matchMedia('(max-width: 1023px)');

    setIsLargeScreen(mediaQueryLarge.matches);
    setIsSmallOrMediumScreen(mediaQuerySmallOrMedium.matches);

    const handleMediaChange = (e) => {
      setIsLargeScreen(mediaQueryLarge.matches);
      setIsSmallOrMediumScreen(mediaQuerySmallOrMedium.matches);
      if (!e.matches) {
        clearInterval(intervalRef.current);
        setHoveredIndex(null);
      } else if (mediaQueryLarge.matches) {
        intervalRef.current = setInterval(() => {
          setHoveredIndex((prevIndex) => {
            if (prevIndex === null || prevIndex === data?.items?.length - 1) {
              return 0;
            }
            return prevIndex + 1;
          });
        }, 3000);
      }
    };

    mediaQueryLarge.addEventListener('change', handleMediaChange);
    mediaQuerySmallOrMedium.addEventListener('change', handleMediaChange);

    return () => {
      mediaQueryLarge.removeEventListener('change', handleMediaChange);
      mediaQuerySmallOrMedium.removeEventListener('change', handleMediaChange);
    };
  }, [data?.items?.length]);

  useEffect(() => {
    if (!isPaused && isLargeScreen && data?.items?.length > 0) {
      intervalRef.current = setInterval(() => {
        setHoveredIndex((prevIndex) => {
          if (prevIndex === null || prevIndex >= data.items.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, isLargeScreen, data?.items?.length]);

  const handleMouseEnter = (index) => {
    setIsPaused(true);
    setHoveredIndex(index);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const renderMedia = (index) => {
    if (index === null) return null;

    const item = data?.items?.[index];
    if (!item || !item.videoSrc) return null;

    const fullVideoUrl = item.videoSrc;
    const fileExtension = fullVideoUrl.split('.').pop();

    if (fileExtension === 'gif') {
      return (
        <img
          key={index}
          src={fullVideoUrl}
          alt={`Media item ${index}`}
          className="w-full h-auto mt-6 lg:mt-0 rounded-xl shadow-lg"
        />
      );
    }

    return (
      <video
        key={index}
        autoPlay
        muted
        loop
        className="w-full h-auto mt-6 lg:mt-0 rounded-xl shadow-lg"
      >
        <source src={fullVideoUrl} type="video/webm" />
        <source src={fullVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <section
      key={'feature-grid-' + index}
      className={'relative z-0 py-20 lg:py-28'}
      style={{ overflow: 'visible' }}
    >
      <Container width="wide">
        <div className="flex flex-col lg:flex-row gap-6 w-full rounded-xl overflow-visible">
          <div className="flex flex-col order-2 lg:order-1 w-full lg:w-2/5 gap-4 auto-rows-auto rounded-xl overflow-visible">
            <h1
              className={`pl-3 font-tuner inline-block text-4xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10 pb-3`}
            >
              {data.blockHeadline}
            </h1>
            {data?.items?.length > 0 &&
              data.items.map((item, index) => (
                <div key={Object.values(item).join('')} className="pt-4">
                  <CarouselItem
                    data={item}
                    index={index}
                    id={sanitizeLabel(item.headline)}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    isSmallOrMediumScreen={isSmallOrMediumScreen}
                    renderMedia={renderMedia}
                  />
                </div>
              ))}
          </div>
          <div className="hidden lg:flex flex-col order-1 lg:order-2 w-full lg:w-3/5 gap-4 auto-rows-auto rounded-xl overflow-visible mt-10 lg:mt-0 justify-center items-center">
            {renderMedia(hoveredIndex)}
          </div>
        </div>
      </Container>
      <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" />
    </section>
  );
}
