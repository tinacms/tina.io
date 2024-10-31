import React, { createContext } from 'react';
import styled, { css } from 'styled-components';
import { DocsNavProps } from './DocumentationNavigation';
import { useRouter } from 'next/router';
import { matchActualTarget } from 'utils';
import { DynamicLink } from '../../components/ui';
import docsLinks from '../../content/docs-navigation.json';
import { BiChevronRight } from 'react-icons/bi';
import AnimateHeight from 'react-animate-height';
import data from '../../content/siteConfig.json';

interface NavTitleProps {
  level: number;
  selected: boolean;
  childSelected?: boolean;
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
}

const NavTitle = ({
  children,
  level = 3,
  selected,
  childSelected,
  ...props
}: NavTitleProps) => {
  const headerLevelClasses = {
    0: 'opacity-100 font-tuner-light text-orange-500 text-xl pt-2',
    1: {
      default: 'text-base font-sans pt-1 text-gray-800',
      selected: 'text-base font-sans pt-1 font-bold text-blue-500',
      childSelected: 'text-base font-sans pt-1 font-[500] text-gray-800',
    },
    2: {
      default: 'text-[15px] font-sans opacity-80 pt-0.5 text-gray-700',
      selected: 'text-[15px] font-sans pt-0.5 font-bold text-blue-500',
      childSelected: 'text-[15px] font-sans pt-1 font-[500] text-gray-800',
    },
    3: {
      default: 'text-[15px] font-sans opacity-80 pt-0.5 text-gray-700',
      selected: 'text-[15px] font-sans pt-0.5 font-bold text-blue-500',
      childSelected: 'text-[15px] font-sans pt-1 font-[500] text-gray-800',
    },
  };

  const headerLevel = level > 3 ? 3 : level;
  const selectedClass = selected
    ? 'selected'
    : childSelected
    ? 'childSelected'
    : 'default';
  const classes =
    level < 1
      ? headerLevelClasses[headerLevel]
      : headerLevelClasses[headerLevel][selectedClass];

  return (
    <div
      className={`group flex items-center gap-1 transition duration-150 ease-out cursor-pointer hover:opacity-100 leading-tight pb-0.5 pl-4 ${classes}`}
      {...props}
    >
      {children}
    </div>
  );
};

const hasNestedSlug = (navItems = [], slug) => {
  for (let item of navItems) {
    if (matchActualTarget(item.slug || item.href, slug)) {
      return true;
    }
    if (item.items) {
      if (hasNestedSlug(item.items, slug)) {
        return true;
      }
    }
  }
  return false;
};

const NavLevel = ({
  navListElem,
  categoryData,
  level = 0,
}: {
  navListElem?: any;
  categoryData: any;
  level?: number;
}) => {
  const navLevelElem = React.useRef(null);
  const router = useRouter();
  const path = router.asPath;
  const slug = categoryData.slug;
  const [expanded, setExpanded] = React.useState(
    matchActualTarget(slug || categoryData.href, path) ||
      hasNestedSlug(categoryData.items, path) ||
      level === 0
  );

  const selected = path.split("#")[0] == slug || (slug == '/docs' && path == "/docs/")
  const childSelected = hasNestedSlug(categoryData.items, router.asPath)


  React.useEffect(() => {
    if (
      navListElem &&
      navLevelElem.current &&
      navListElem.current &&
      selected
    ) {
      const scrollOffset = navListElem.current.scrollTop;
      const navListOffset = navListElem.current.getBoundingClientRect().top;
      const navListHeight = navListElem.current.offsetHeight;
      const navItemOffset = navLevelElem.current.getBoundingClientRect().top;
      const elementOutOfView =
        navItemOffset - navListOffset > navListHeight + scrollOffset;

      if (elementOutOfView) {
        navLevelElem.current.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'nearest',
        });
      }
    }
  }, [navLevelElem.current, navListElem, selected]);

  return (
    <>
      <NavLabelContainer ref={navLevelElem} status={categoryData.status}>
        {categoryData.slug ? (
          <DynamicLink href={categoryData.slug} passHref>
            <NavTitle level={level} selected={selected && !childSelected}>
              <span className="pr-2 -mr-2">{categoryData.title}</span>
            </NavTitle>
          </DynamicLink>
        ) : (
          <NavTitle
            level={level}
            selected={selected && !childSelected}
            childSelected={childSelected}
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <span className=" pr-2 -mr-2">{categoryData.title}</span>
            {categoryData.items && !selected && (
              <BiChevronRight
                className={`${
                  level < 1
                    ? 'text-orange-100 group-hover:text-orange-300'
                    : 'text-blue-200 group-hover:text-blue-400'
                } group-hover:rotate-90 w-5 h-auto -my-2 transition ease-out duration-300 transform ${
                  expanded ? 'rotate-90' : ''
                }`}
              />
            )}
          </NavTitle>
        )}
      </NavLabelContainer>
      {categoryData.items && (
        <AnimateHeight duration={300} height={expanded ? 'auto' : 0}>
          <NavLevelChildContainer level={level}>
            {(categoryData.items || []).map((item) => (
              <NavLevel
                key={item.slug ? item.slug + level : item.title + level}
                navListElem={navListElem}
                level={level + 1}
                categoryData={item}
              />
            ))}
          </NavLevelChildContainer>
        </AnimateHeight>
      )}
    </>
  );
};

interface NavLevelChildContainerProps {
  level: number;
}

const NavLevelChildContainer = styled.div<NavLevelChildContainerProps>`
  position: relative;
  display: block;
  padding-left: 0.675rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;

  ${(props: any) =>
    props.level === 0 &&
    css`
      padding-left: 0.75rem;
      padding-top: 0.25rem;
      padding-bottom: 0.125rem;
    `}
`;

const NavLabelContainer = styled.div<{ status: string }>`
  position: relative;
  display: flex;

  &:last-child {
    margin-bottom: 0.375rem;
  }

  ${(props: { status: string }) =>
    props.status &&
    css`
      a::after {
        display: -ms-inline-flexbox;
        content: '${props.status.toLowerCase()}';
        text-transform: capitalize;
        font-size: 12px;
        font-weight: bold;
        background-color: #f9ebe6;
        border: 1px solid #edcdc4;
        width: fit-content;
        padding: 2px 5px;
        border-radius: 5px;
        letter-spacing: 0.25px;
        color: #ec4815;
        margin-right: 5px;
        margin-left: 5px;
        line-height: 1;
        vertical-align: middle;
        height: fit-content;
        align-self: center;
      }
    `}
`;

export const DocsNavigationList = ({ navItems }: DocsNavProps) => {
  const router = useRouter();
  const navListElem = React.useRef(null);

  return (
    <>
      <DocsNavigationContainer ref={navListElem}>
        {navItems.map((categoryData) => (
          <NavLevel
            key={
              'mobile-' +
              (categoryData.slug ? categoryData.slug : categoryData.title)
            }
            navListElem={navListElem}
            categoryData={categoryData}
          />
        ))}
      </DocsNavigationContainer>
    </>
  );
};


const DocsNavigationContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem 0 1.5rem 0;
  margin-right: -1px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  @media (min-width: 1600px) {
    padding: 1rem 1rem 2rem 1rem;
  }
`;

const AnchorIcon = styled.span`
  display: inline-block;
  position: relative;
  transform: translate3d(0, 0, 0);
  transition: all 150ms ease-out;
`;
