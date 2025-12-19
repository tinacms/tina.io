'use client';

import data from '@/content/navigationBar/navMenu.json';
import zhData from '@/content/navigationBar/navMenuZh.json';
import TinaIoLogoSvg from '@/public/svg/tinaio-logo.svg';
import '@/styles/tailwind.css';
import { DemoForm } from 'components/modals/BookDemo';
import LanguageSelect from 'components/modals/LanguageSelect';
import { DEFAULT_LOCALE, SupportedLocales } from 'middleware';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiLinkExternal, BiMenu } from 'react-icons/bi';
import { FaCalendarDay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { Modal } from 'react-responsive-modal';
import { getGitHubStarCount } from '@/utils/github-star-helper';
import { saveLocaleToCookie } from '@/utils/locale';
import 'react-responsive-modal/styles.css';
import { EmailForm } from '@/component/modals/EmailForm';
import { Button, LinkButton } from './ui/Button';

enum ValidColors {
  White = 'white',
  Blue = 'blue',
  Orange = 'orange',
  Seafoam = 'seafoam',
  Ghost = 'ghost',
}

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
const iconMapping = {
  MdEmail: MdEmail,
  FaCalendarDay: FaCalendarDay,
};

// Reusable components
const ExternalLinkIcon = () => (
  <BiLinkExternal className="text-blue-200 text-sm inline ml-1" />
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
  size: string;
  modal: string;
  icon2?: string;
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

const _navLinkClasses =
  'flex items-center py-2 text-blue-700 hover:text-blue-500 transition ease-out duration-150 drop-shadow-sm text-base font-medium';

interface MobileNavItemMapperContext {
  index: number;
  starCount: number;
  openDropdown: string | null;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  closeMenu: () => void;
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
            color={item.color as ValidColors}
            size="small"
            onClick={() => openModal(item.modal)}
          >
            {item.icon2 && iconMapping[item.icon2] && (
              <span className="mr-2">
                {iconMapping[item.icon2]({
                  className: 'w-5 h-5',
                })}
              </span>
            )}
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
    case groupOfStringItemsString:
      return (
        <li
          key={`${index}-${item.label}`}
          className={`group ${_navLinkClasses} w-fit  ${isRouteActive(pathName, item.items) ? 'bg-[#ECF7F8]' : 'bg-transparent'} transition-all duration-300 ease-out hover:bg-[#ECF7F8] rounded-xl pl-3 pr-2 cursor-pointer`}
          onMouseLeave={closeDropdownMenu}
        >
          <button
            type="button"
            className="relative flex items-center justify-center group cursor-pointer"
            onMouseEnter={(e: React.MouseEvent) =>
              openDropdownMenu(`${index}-${item.label}`, e)
            }
            onClick={(e) => openDropdownMenu(`${index}-${item.label}`, e)}
          >
            {item.label}
            <BiChevronDown className="w-4 h-4 ml-0.5" />
            {/* hover bridge that is invisible to user (maintains hover state) */}
            <div
              className="absolute left-0 top-full h-5 min-w-full"
              aria-hidden
            />
            <ul
              className={`absolute -left-[10px] top-full min-w-full mt-5 w-max bg-[#ECF7F8] shadow-lg rounded-xl p-2 transition-opacity duration-200 ease-in-out ${
                openDropdown === `${index}-${item.label}`
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              {item.items.map((subItem, subIndex) => (
                <li key={`${index}-${subIndex}-${subItem.href}`}>
                  <Link
                    href={subItem.href}
                    target={subItem.external ? '_blank' : '_self'}
                    rel={subItem.external ? 'noopener noreferrer' : undefined}
                    onClick={() => {
                      setOpenDropdown(null);
                    }}
                    className="touch-manipulation py-2 px-2 flex items-center group hover:bg-white/60  rounded-md transition duration-150 ease-out text-gray-600 hover:text-blue-500"
                  >
                    {subItem.label}
                    {subItem.href.startsWith('https://') && (
                      <BiLinkExternal className="text-blue-200 text-sm group-hover:text-blue-400 inline ml-1" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </button>
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
          >
            <span className="flex items-center">
              <GitHubIcon />
              {starCount > 0 && (
                <span className="text-sm font-medium">
                  {starCount.toLocaleString()}
                </span>
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
  const { index, starCount, closeMenu, openDropdown, setOpenDropdown } =
    context;
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
            className="flex items-center"
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
              isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            {item.items.map((subItem, subIndex) => (
              <li key={`${index}-${subIndex}-${subItem.href}`}>
                <Link
                  href={subItem.href}
                  target={subItem.external ? '_blank' : '_self'}
                  rel={subItem.external ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    setOpenDropdown(null);
                    closeMenu();
                  }}
                  className="py-2 px-2 flex items-center text-gray-600 hover:text-blue-500"
                >
                  {subItem.label}
                  {subItem.href.startsWith('https://') && <ExternalLinkIcon />}
                </Link>
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
                <span className="text-sm font-medium">
                  {starCount.toLocaleString()}
                </span>
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
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-linear-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } `}
      >
        <button
          type="button"
          className="absolute top-20 left-0 -translate-x-full transition duration-150 ease-out rounded-l-full flex items-center font-ibm-plex whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-linear-to-br from-white to-gray-50 pr-3 pl-4 pt-[8px] pb-[6px] text-sm font-medium cursor-pointer"
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

        <div className="h-full w-full absolute overflow-y-auto">
          <div className="flex py-4 px-6 relative z-20 justify-between items-center">
            <div className="pb-4 pt-2">
              <Link href={'/'}>
                <TinaIoLogoSvg
                  className={`flex items-center h-auto fill-orange-500`}
                />
              </Link>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className={`outline-hidden hover:animate-jelly duration-600`}
                onClick={() => openModal('LanguageSelect')}
              >
                {selectedFlag === 'en' ? (
                  <EnFlag className="w-8 h-8" />
                ) : (
                  <ZhFlag className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>
          <LinkButton
            link={'https://app.tina.io'}
            color="blue"
            size="medium"
            className="cursor-pointer outline-hidden w-fit ml-6 px-12"
          >
            {' '}
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
              }),
            )}
          </ul>
        </div>
      </div>

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
                  color={item.color as ValidColors}
                  size="extraSmall"
                  onClick={() => openModal(item.modal)}
                >
                  {item.icon2 && iconMapping[item.icon2] && (
                    <span className="mr-2">
                      {iconMapping[item.icon2]({ className: 'w-5 h-5' })}
                    </span>
                  )}
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
        <LinkButton
          link={'https://app.tina.io'}
          color="blue"
          size="medium"
          className="cursor-pointer outline-hidden"
        >
          {' '}
          My TinaCloud
        </LinkButton>
        <button
          type="button"
          className={`cursor-pointer outline-hidden hover:animate-jelly duration-600`}
          onClick={() => openModal('LanguageSelect')}
        >
          {selectedFlag === 'en' ? (
            <EnFlag className="w-8 h-8" />
          ) : (
            <ZhFlag className="w-8 h-8" />
          )}
        </button>
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
    const matchedLocale = Object.values(SupportedLocales).find((locale) =>
      pathName.startsWith(`/${locale}`),
    );
    setSelectedFlag(matchedLocale || SupportedLocales.EN);
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

  const handleLanguageChange = (code: string) => {
    saveLocaleToCookie(code);
    setSelectedFlag(code);
    closeModal();

    const localePattern = new RegExp(
      `^/(${Object.values(SupportedLocales).join('|')})(/|$)`,
    );
    const isRootOrLocale =
      pathName === '/' ||
      (localePattern.test(pathName) && !pathName.replace(localePattern, '$2'));

    if (isRootOrLocale) {
      router.push(`/?setLocale=${code}`);
      return;
    }

    const isEnglish = code === SupportedLocales.EN;
    const hasLocalePrefix = localePattern.test(pathName);

    let newPath: string;
    if (hasLocalePrefix) {
      newPath = isEnglish
        ? pathName.replace(localePattern, (_, __, slash) =>
            slash === '/' ? '/' : '',
          )
        : pathName.replace(localePattern, `/${code}$2`);
    } else {
      newPath = isEnglish ? pathName : `/${code}${pathName}`;
    }

    router.push(newPath === '' ? '/' : newPath);
  };

  return (
    <>
      <div ref={navRef} className={`relative w-full`}>
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
      </div>

      <Modal open={modalType === 'BookDemo'} onClose={closeModal} center>
        <DemoForm />
      </Modal>

      <Modal
        open={modalType === 'EmailForm'}
        onClose={closeModal}
        center
        classNames={{
          modal: 'email-and-demo-modal email-form-modal',
        }}
      >
        <EmailForm isFooter={false} />
      </Modal>

      <Modal open={modalType === 'LanguageSelect'} onClose={closeModal} center>
        <LanguageSelect
          onLanguageSelect={handleLanguageChange}
          currentLanguage={selectedFlag}
        />
      </Modal>
    </>
  );
}
