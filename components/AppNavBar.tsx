'use client';

import data from '@/content/navigationBar/navMenu.json';
import zhData from '@/content/navigationBar/navMenuZh.json';
import TinaIoLogoSvg from '@/public/svg/tinaio-logo.svg';
import '@/styles/tailwind.css';
import { DEFAULT_LOCALE, SupportedLocales } from 'middleware';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiLinkExternal, BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { FOCUS_RING, levelOf } from '@/component/styles/buttons';
import {
  MENU_ITEM,
  MENU_PANEL,
  MENU_REVEAL,
  MENU_TRIGGER_ACTIVE,
  MENU_TRIGGER_HOVER,
} from '@/component/styles/menu';
import { LABEL, NAV_LINK, NAV_MENU_LINK } from '@/component/styles/typography';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { closeOnEscape } from '@/utils/closeOnEscape';
import { getGitHubStarCount } from '@/utils/github-star-helper';
import {
  hasZhPrefix,
  isEnHost,
  isZhHost,
  originForLocale,
  stripZhPrefix,
} from '@/utils/i18n/domains';
import { saveLocaleToCookie } from '@/utils/locale';
import { shouldPrefetchLink } from '@/utils/shouldPrefetchLink';
import AdminLink from './AdminLink';
import { Button, LinkButton } from './ui/Button';

// Dynamic imports for modals - only loaded when modal is opened
const DemoForm = dynamic(
  () => import('components/modals/BookDemo').then((mod) => mod.DemoForm),
  { ssr: false },
);
const EmailForm = dynamic(
  () => import('@/component/modals/EmailForm').then((mod) => mod.EmailForm),
  { ssr: false },
);

import { ContactForm } from 'components/modals/ContactForm';

const LanguageSelect = dynamic(
  () => import('components/modals/LanguageSelect'),
  { ssr: false },
);

const EnFlag = ({ className }) => (
  <Image
    src="/flags/en.png"
    alt="English Flag"
    width={20}
    height={12}
    className={className}
  />
);

const ZhFlag = ({ className }) => (
  <Image
    src="/flags/zh.png"
    alt="Chinese Flag"
    width={20}
    height={12}
    className={className}
  />
);

const modalButtonString = 'modalButton';
const stringItemString = 'stringItem';
const groupOfStringItemsString = 'groupOfStringItems';
const GitHubStarButton = 'GitHubStarButton';
const doubleNavItemDropDownString = 'doubleNavItemDropDown';

// Reusable components
const ExternalLinkIcon = () => (
  <BiLinkExternal
    aria-hidden="true"
    className="text-blue-200 text-sm group-hover:text-blue-400 inline ml-1"
  />
);

const GitHubIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

interface NavItemBase {
  label: string;
  _template: string;
}

interface ModalButtonItem extends NavItemBase {
  _template: typeof modalButtonString;
  color: string;
  modal: string;
}

interface StringItem extends NavItemBase {
  _template: typeof stringItemString;
  href: string;
  external?: boolean;
}

interface GroupOfStringItems extends NavItemBase {
  _template: typeof groupOfStringItemsString;
  items: Array<{
    label: string;
    href: string;
    external?: boolean;
    modal?: string;
  }>;
}

interface GitHubStarButton extends NavItemBase {
  _template: typeof GitHubStarButton;
  owner: string;
  repo: string;
}

interface DoubleNavItemDropDown extends NavItemBase {
  _template: typeof doubleNavItemDropDownString;
  label: string;
  items: Array<{
    labelLeft: string;
    hrefLeft: string;
    labelRight: string;
    hrefRight: string;
  }>;
}

type NavItem =
  | ModalButtonItem
  | StringItem
  | GroupOfStringItems
  | GitHubStarButton
  | DoubleNavItemDropDown;

function isModalButtonItem(item: any): item is ModalButtonItem {
  return item._template === modalButtonString;
}

function isStringItem(item: any): item is StringItem {
  return item._template === stringItemString;
}

function isGroupOfStringItems(item: any): item is GroupOfStringItems {
  return item._template === groupOfStringItemsString;
}

function isGitHubStarButton(item: any): item is GitHubStarButton {
  return item._template === GitHubStarButton;
}

function isDoubleNavItemDropDown(item: any): item is DoubleNavItemDropDown {
  return item._template === doubleNavItemDropDownString;
}

function parseNavItems(items: any[]): NavItem[] {
  return items.map((item) => {
    if (isModalButtonItem(item)) {
      return item as ModalButtonItem;
    } else if (isStringItem(item)) {
      return item as StringItem;
    } else if (isGroupOfStringItems(item)) {
      return item as GroupOfStringItems;
    } else if (isGitHubStarButton(item)) {
      return item as GitHubStarButton;
    } else if (isDoubleNavItemDropDown(item)) {
      return item as DoubleNavItemDropDown;
    }

    // Default case for any other template type
    console.warn(
      `Unknown nav item template: ${item._template}. Falling back to string item.`,
    );
    return {
      _template: stringItemString,
      label: item.label,
      href: item.href || '/',
    } as StringItem;
  });
}

interface MobileNavMenuProps {
  navItems: NavItem[];
  openModal: (modal: string) => void;
  selectedFlag: string;
  starCount: number;
}

function isRouteActive(
  pathname: string,
  list: GroupOfStringItems['items'],
): boolean {
  return list.some((listItem) => listItem.href === pathname);
}

interface DesktopNavMenuProps {
  navItems: NavItem[];
  openModal: (modal: string) => void;
  selectedFlag: string;
  starCount: number;
  openDropdown: string | null;
  openDropdownMenu: (dropdownId: string, event?: React.MouseEvent) => void;
  closeDropdownMenu: () => void;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  pathName: string;
}

interface NavItemMapperContext {
  index: number;
  openModal: (modal: string) => void;
  openDropdown: string | null;
  openDropdownMenu: (dropdownId: string, event?: React.MouseEvent) => void;
  closeDropdownMenu: () => void;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  starCount: number;
}

const _navLinkClasses = `flex items-center py-2 transition ease-out duration-150 drop-shadow-sm ${NAV_LINK}`;

interface MobileNavItemMapperContext {
  index: number;
  starCount: number;
  openDropdown: string | null;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  closeMenu: () => void;
  openModal: (modal: string) => void;
}

function desktopNavItemMapper(
  item: NavItem,
  pathName: string,
  context: NavItemMapperContext,
): React.ReactNode {
  const {
    index,
    openModal,
    openDropdown,
    openDropdownMenu,
    closeDropdownMenu,
    setOpenDropdown,
    starCount,
  } = context;

  switch (item._template) {
    case modalButtonString:
      return (
        <li
          key={`${index}-${item.modal}`}
          className={`group ${_navLinkClasses}`}
        >
          <Button
            level={levelOf(item.color)}
            onClick={() => openModal(item.modal)}
          >
            {item.label}
          </Button>
        </li>
      );
    case stringItemString:
      return (
        <li
          key={`${index}-${item.href}`}
          className={`group ${_navLinkClasses} border-blue-500`}
        >
          <Link
            href={item.href}
            target={item.external ? '_blank' : '_self'}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className=""
          >
            {item.label}
          </Link>
        </li>
      );
    case groupOfStringItemsString: {
      const dropdownKey = `${index}-${item.label}`;
      return (
        <li
          key={dropdownKey}
          className={`relative group ${_navLinkClasses} w-fit  ${isRouteActive(pathName, item.items) ? MENU_TRIGGER_ACTIVE : 'bg-transparent'} transition-all duration-300 ease-out ${MENU_TRIGGER_HOVER} rounded-xl pl-3 pr-2 cursor-pointer`}
          onMouseLeave={closeDropdownMenu}
          // Escape closes the menu and returns focus to its trigger.
          onKeyDown={closeOnEscape(openDropdown === dropdownKey, (e) => {
            closeDropdownMenu();
            e.currentTarget.querySelector('button')?.focus();
          })}
        >
          <button
            type="button"
            className="flex items-center justify-center group cursor-pointer"
            aria-expanded={openDropdown === dropdownKey}
            onMouseEnter={(e: React.MouseEvent) =>
              openDropdownMenu(dropdownKey, e)
            }
            onClick={(e) => openDropdownMenu(dropdownKey, e)}
          >
            {item.label}
            <BiChevronDown className="w-4 h-4 ml-0.5" />
          </button>
          {/* The gap under the trigger is padding inside the hover area, so
              the menu stays open while the pointer crosses it. Closed, the
              menu is hidden from the keyboard too. */}
          <div
            data-state={openDropdown === dropdownKey ? 'open' : 'closed'}
            className={`${MENU_REVEAL} absolute -left-2.5 top-full min-w-full w-max pt-5`}
          >
            <ul className={MENU_PANEL}>
              {item.items.map((subItem, subIndex) => (
                <li
                  key={`${index}-${subIndex}-${subItem.modal || subItem.href}`}
                >
                  {subItem.modal ? (
                    <button
                      type="button"
                      onClick={() => {
                        setOpenDropdown(null);
                        openModal(subItem.modal);
                      }}
                      className={`${MENU_ITEM} group w-full text-left cursor-pointer ${NAV_MENU_LINK}`}
                    >
                      {subItem.label}
                    </button>
                  ) : (
                    <Link
                      href={subItem.href}
                      prefetch={shouldPrefetchLink(subItem.href)}
                      target={
                        subItem.href.startsWith('https') ? '_blank' : undefined
                      }
                      rel={
                        subItem.href.startsWith('https')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      onClick={() => {
                        setOpenDropdown(null);
                      }}
                      className={`${MENU_ITEM} group ${NAV_MENU_LINK}`}
                    >
                      {subItem.label}
                      {subItem.href.startsWith('https') && <ExternalLinkIcon />}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    }
    case GitHubStarButton:
      return (
        <li
          key={`${index}-${item.owner}-${item.repo}`}
          className={`group ${_navLinkClasses} py-2 flex items-center`}
        >
          <Link
            href={`https://github.com/${item.owner}/${item.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <span className="flex items-center">
              <GitHubIcon />
              {starCount > 0 && (
                <span className={LABEL}>{starCount.toLocaleString()}</span>
              )}
            </span>
          </Link>
        </li>
      );
    default:
      return null;
  }
}

function mobileNavItemMapper(
  item: NavItem,
  context: MobileNavItemMapperContext,
): React.ReactNode {
  const {
    index,
    starCount,
    closeMenu,
    openDropdown,
    setOpenDropdown,
    openModal,
  } = context;
  const dropdownId = `mobile-${index}-${item.label}`;
  const isOpen = openDropdown === dropdownId;

  switch (item._template) {
    case groupOfStringItemsString:
      return (
        <li
          key={`${index}-${item.label}`}
          className={`group ${_navLinkClasses} flex flex-col items-start`}
        >
          <button
            type="button"
            className="flex items-center cursor-pointer"
            onClick={() => setOpenDropdown(isOpen ? null : dropdownId)}
          >
            {item.label}
            <BiChevronDown
              className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <ul
            className={`flex flex-col pl-4 overflow-hidden transition-all duration-200 ease-in-out ${
              isOpen
                ? 'max-h-96 opacity-100 mt-2'
                : 'invisible max-h-0 opacity-0'
            }`}
          >
            {item.items.map((subItem, subIndex) => (
              <li key={`${index}-${subIndex}-${subItem.modal || subItem.href}`}>
                {subItem.modal ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      closeMenu();
                      openModal(subItem.modal);
                    }}
                    className={`py-2 px-2 flex items-center w-full text-left cursor-pointer ${NAV_MENU_LINK}`}
                  >
                    {subItem.label}
                  </button>
                ) : (
                  <Link
                    href={subItem.href}
                    prefetch={shouldPrefetchLink(subItem.href)}
                    target={subItem.external ? '_blank' : '_self'}
                    rel={subItem.external ? 'noopener noreferrer' : undefined}
                    onClick={() => {
                      setOpenDropdown(null);
                      closeMenu();
                    }}
                    className={`py-2 px-2 flex items-center ${NAV_MENU_LINK}`}
                  >
                    {subItem.label}
                    {subItem.href.startsWith('https://') && (
                      <ExternalLinkIcon />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </li>
      );

    case stringItemString:
      return (
        <li
          key={`${index}-${item.href}`}
          className={`group ${_navLinkClasses}`}
        >
          <Link
            href={item.href}
            target={item.external ? '_blank' : '_self'}
            className="py-2"
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        </li>
      );

    case GitHubStarButton:
      return (
        <li
          key={`${index}-${item.owner}-${item.repo}`}
          className={`group ${_navLinkClasses} py-2 flex items-center`}
        >
          <Link
            href={`https://github.com/${item.owner}/${item.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            onClick={closeMenu}
          >
            <span className="flex items-center">
              <GitHubIcon />
              {starCount > 0 && (
                <span className={LABEL}>{starCount.toLocaleString()}</span>
              )}
            </span>
          </Link>
        </li>
      );

    case modalButtonString:
      // Modal buttons are handled separately in the bottom bar
      return null;

    default:
      return null;
  }
}

const MobileNavMenu = ({
  navItems,
  openModal,
  selectedFlag,
  starCount,
}: MobileNavMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuTabRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    const newMenuOpen = !menuOpen;
    setMenuOpen(newMenuOpen);
    document.body.style.overflow = newMenuOpen ? 'hidden' : 'auto';
    // Reset dropdown when closing menu
    if (!newMenuOpen) {
      setOpenDropdown(null);
    }
  };

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        // Escape closes the menu and returns focus to the tab that opens it.
        onKeyDown={closeOnEscape(menuOpen, () => {
          toggleMenu();
          menuTabRef.current?.focus();
        })}
        className={`fixed top-0 right-0 h-full w-[300px] bg-linear-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } `}
      >
        <button
          ref={menuTabRef}
          type="button"
          // Agreed exception (#4964): the menu tab keeps its own deliberate style.
          className={`absolute top-20 left-0 -translate-x-full transition duration-150 ease-out rounded-l-full flex items-center font-ibm-plex whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-linear-to-br from-white to-gray-50 pr-3 pl-4 pt-[8px] pb-[6px] text-sm font-medium cursor-pointer ${FOCUS_RING}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <BiMenu
            className={`h-6 w-auto transition ease-out duration-200 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <IoMdClose
            className={`absolute h-6 w-auto transition ease-out duration-150 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </button>

        {/* Closed, the off-canvas menu is hidden from the keyboard too; only
            the tab that opens it stays reachable. */}
        <div
          className={`h-full w-full absolute overflow-y-auto transition-[visibility] duration-200 ${
            menuOpen ? 'visible' : 'invisible'
          }`}
        >
          <div className="flex py-4 px-6 relative z-20 justify-between items-center">
            <div className="pb-4 pt-2">
              <Link href={'/'}>
                <TinaIoLogoSvg
                  className={`flex items-center h-auto fill-orange-500`}
                />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Change language"
                className={`hover:animate-jelly duration-600 rounded-md ${FOCUS_RING}`}
                onClick={() => openModal('LanguageSelect')}
              >
                {selectedFlag === 'en' ? (
                  <EnFlag className="w-8 h-8" />
                ) : (
                  <ZhFlag className="w-8 h-8" />
                )}
              </button>
              <AdminLink />
            </div>
          </div>
          <LinkButton
            link={'https://app.tina.io'}
            level="secondary"
            className="mx-6"
          >
            My TinaCloud
          </LinkButton>
          <ul className="flex flex-col py-4 px-6 relative z-20">
            {navItems.map((item, index) =>
              mobileNavItemMapper(item, {
                index,
                starCount,
                openDropdown,
                setOpenDropdown,
                closeMenu: toggleMenu,
                openModal,
              }),
            )}
          </ul>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-900/70 z-30 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>
      <Link href={'/'}>
        <TinaIoLogoSvg className={`flex items-center h-auto fill-orange-500`} />
      </Link>
      <div className="flex space-x-2 gap-2 cursor-pointer">
        {navItems
          .filter((item) => item._template === modalButtonString)
          .map(
            (item, index) =>
              isModalButtonItem(item) && (
                <Button
                  key={`${index}-${item.modal}`}
                  level={levelOf(item.color)}
                  onClick={() => openModal(item.modal)}
                >
                  {item.label}
                </Button>
              ),
          )}
      </div>
    </>
  );
};

const DesktopNavMenu = ({
  navItems,
  openModal,
  selectedFlag,
  starCount,
  openDropdown,
  openDropdownMenu,
  closeDropdownMenu,
  setOpenDropdown,
  pathName,
}: DesktopNavMenuProps) => {
  return (
    <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
      <Link href={'/'}>
        <TinaIoLogoSvg className={`flex items-center h-auto fill-orange-500`} />
      </Link>
      <ul className="flex gap-4 items-end justify-center mt-2">
        {navItems.map((item, index) => {
          return desktopNavItemMapper(item, pathName, {
            index,
            openModal,
            openDropdown,
            openDropdownMenu,
            closeDropdownMenu,
            setOpenDropdown,
            starCount,
          });
        })}
      </ul>
      <li className="flex items-center gap-4">
        <LinkButton link={'https://app.tina.io'} level="secondary">
          My TinaCloud
        </LinkButton>
        <button
          type="button"
          aria-label="Change language"
          className={`cursor-pointer hover:animate-jelly duration-600 rounded-md ${FOCUS_RING}`}
          onClick={() => openModal('LanguageSelect')}
        >
          {selectedFlag === 'en' ? (
            <EnFlag className="w-8 h-8" />
          ) : (
            <ZhFlag className="w-8 h-8" />
          )}
        </button>
        <AdminLink />
      </li>
    </nav>
  );
};

export function AppNavBar({ sticky = true }) {
  const [stuck, setStuck] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [starCount, setStarCount] = useState<number>(0);

  const [selectedFlag, setSelectedFlag] = useState(DEFAULT_LOCALE);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [navItems, setNavItems] = useState<NavItem[]>(
    Array.isArray(data.navItem) ? parseNavItems(data.navItem) : [],
  );

  const navRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!sticky) {
      return;
    }
    const onScroll = () => {
      if (navRef.current) {
        setStuck(window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [sticky]);

  // Functions to control dropdown state
  const openDropdownMenu = (dropdownId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setOpenDropdown(dropdownId);
  };

  const closeDropdownMenu = () => {
    setOpenDropdown(null);
  };

  const openModal = (modal) => setModalType(modal);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    // On the Chinese domain the URL is prefix-free, so the path alone cannot
    // identify the locale — the hostname decides. The `/zh` prefix is still
    // honoured for local development, where there is no Chinese hostname.
    const isChinese = isZhHost(window.location.host) || hasZhPrefix(pathName);
    setSelectedFlag(isChinese ? SupportedLocales.ZH : SupportedLocales.EN);
  }, [pathName]);

  useEffect(() => {
    setNavItems(
      selectedFlag === SupportedLocales.ZH
        ? zhData && Array.isArray(zhData.navItem)
          ? parseNavItems(zhData.navItem)
          : []
        : data && Array.isArray(data.navItem)
          ? parseNavItems(data.navItem)
          : [],
    );
  }, [selectedFlag]);

  useEffect(() => {
    const fetchStarCount = async () => {
      const githubButton = navItems.find(
        (item) => item._template === GitHubStarButton,
      );
      if (githubButton && isGitHubStarButton(githubButton)) {
        const count = await getGitHubStarCount(
          githubButton.owner,
          githubButton.repo,
        );
        setStarCount(count);
      }
    };
    fetchStarCount();
  }, [navItems]);

  /**
   * Each locale lives on its own domain and the two sites share one path
   * shape, so switching language keeps the current page and only swaps the
   * origin. That is a cross-origin navigation, hence window.location rather
   * than the router.
   *
   * Locally there is no Chinese hostname, so fall back to same-origin routing
   * with the `/zh` prefix that the physical routes still use.
   */
  const handleLanguageChange = (code: string) => {
    saveLocaleToCookie(code);
    setSelectedFlag(code);
    closeModal();

    // The path without any locale prefix — shared by both sites.
    const basePath = stripZhPrefix(pathName) || '/';
    const targetOrigin = originForLocale(code);

    if (typeof window === 'undefined') {
      return;
    }

    // Compare by hostname, not origin, so the `www.` forms of both sites are
    // recognised too. Anywhere else (localhost, a preview deployment) there is
    // no second domain to cross to.
    const host = window.location.host;
    const onLocaleDomain = isZhHost(host) || isEnHost(host);

    if (!onLocaleDomain) {
      const isChinese = code === SupportedLocales.ZH;
      router.push(
        isChinese
          ? `/zh${basePath === '/' ? '' : basePath}` || '/zh'
          : basePath,
      );
      return;
    }

    window.location.href = `${targetOrigin}${basePath}`;
  };

  return (
    <>
      <header ref={navRef} className={`relative w-full`}>
        <div className="flex xl:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
          <MobileNavMenu
            navItems={navItems}
            openModal={openModal}
            selectedFlag={selectedFlag}
            starCount={starCount}
          />
        </div>
        <div
          className={`absolute ${
            stuck && sticky
              ? `xl:fixed shadow-sm bg-linear-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur-sm animate-slide-in top-0 p-4`
              : `translate-y-2 px-4 pt-4 pb-6`
          } z-40 w-full lg:px-10 hidden xl:flex items-center justify-between`}
        >
          <DesktopNavMenu
            navItems={navItems}
            openModal={openModal}
            selectedFlag={selectedFlag}
            starCount={starCount}
            openDropdown={openDropdown}
            openDropdownMenu={openDropdownMenu}
            closeDropdownMenu={closeDropdownMenu}
            setOpenDropdown={setOpenDropdown}
            pathName={pathName}
          />
        </div>
      </header>

      <Dialog
        open={modalType === 'BookDemo'}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-5xl w-[90vw]">
          <DemoForm />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalType === 'EmailForm'}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-5xl w-[90vw]">
          <EmailForm isFooter={false} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalType === 'ContactForm'}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="!max-w-2xl w-[90vw] !max-h-[90vh] !p-0 !duration-0">
          <ContactForm />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalType === 'LanguageSelect'}
        onOpenChange={(open) => !open && closeModal()}
      >
        {/* 90vw on phones like the other dialogs; without it the dialog
            shrinks to its content and the language cards overflow. */}
        <DialogContent className="w-[90vw] sm:max-w-md">
          <LanguageSelect
            onLanguageSelect={handleLanguageChange}
            currentLanguage={selectedFlag}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
