'use client';

import data from '@/content/navigationBar/navMenu.json';
import zhData from '@/content/navigationBar/navMenuZh.json';
import TinaCmsPng from '@/public/img/tinacms-logo.png';
import TinaLogoSvg from '@/public/svg/tina-extended-logo.svg';
import TinaIconSvg from '@/public/svg/tina-icon.svg';
import '@/styles/tailwind.css';
import { getGitHubStarCount } from '@/utils/github-star-helper';
import { saveLocaleToCookie } from '@/utils/locale';
import { DemoForm } from 'components/modals/BookDemo';
import LanguageSelect from 'components/modals/LanguageSelect';
import { DEFAULT_LOCALE, SupportedLocales } from 'middleware';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BiChevronDown, BiLinkExternal, BiMenu } from 'react-icons/bi';
import { FaCalendarDay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { EmailForm } from '../modals/AppRouterEmailForm';
import { Button } from '../ui/Button';

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
const iconMapping = {
  MdEmail: MdEmail,
  FaCalendarDay: FaCalendarDay,
};

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
}

interface GroupOfStringItems extends NavItemBase {
  _template: typeof groupOfStringItemsString;
  items: Array<{
    label: string;
    href: string;
  }>;
}

interface GitHubStarButton extends NavItemBase {
  _template: typeof GitHubStarButton;
  owner: string;
  repo: string;
}

type NavItem =
  | ModalButtonItem
  | StringItem
  | GroupOfStringItems
  | GitHubStarButton;

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
    }

    // Default case for any other template type
    console.warn(
      `Unknown nav item template: ${item._template}. Falling back to string item.`
    );
    return {
      _template: stringItemString,
      label: item.label,
      href: item.href || '/',
    } as StringItem;
  });
}

export function AppNavBar({ sticky = true }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [starCount, setStarCount] = useState<number>(0);

  const [selectedFlag, setSelectedFlag] = useState(DEFAULT_LOCALE);
  const [animateFlag, setAnimateFlag] = useState(false);
  const [modalClass, setModalClass] = useState('language-select-modal');

  const navRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();

  const navLinkClasses =
    'flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium';

  const handleScroll = () => {
    if (sticky && navRef.current) {
      setStuck(window.scrollY > 50);
    }
  };

  useEffect(() => {
    if (sticky) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [sticky]);

  useEffect(() => {
    const updateModalClass = () => {
      setModalClass(
        window.innerWidth < 540
          ? 'mobile-language-select-modal'
          : 'language-select-modal'
      );
    };

    updateModalClass();
    window.addEventListener('resize', updateModalClass);
    return () => {
      window.removeEventListener('resize', updateModalClass);
    };
  }, []);

  const [navItems, setNavItems] = useState<NavItem[]>(
    Array.isArray(data.navItem) ? parseNavItems(data.navItem) : []
  );
  const toggleMenu = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    if (newOpenState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  const openModal = (modal) => setModalType(modal);
  const closeModal = () => setModalType(null);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, [pathName]);

  useEffect(() => {
    const matchedLocale = Object.values(SupportedLocales).find((locale) =>
      pathName.startsWith(`/${locale}`)
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
        : []
    );
  }, [pathName, selectedFlag]);

  useEffect(() => {
    const fetchStarCount = async () => {
      const githubButton = navItems.find(
        (item) => item._template === GitHubStarButton
      );
      if (githubButton && isGitHubStarButton(githubButton)) {
        const count = await getGitHubStarCount(
          githubButton.owner,
          githubButton.repo
        );
        setStarCount(count);
      }
    };
    fetchStarCount();
  }, [navItems]);

  const handleLanguageChange = (code: string) => {
    saveLocaleToCookie(code);
    setSelectedFlag(code);
    setOpen(false);
    closeModal();

    setTimeout(() => {
      setAnimateFlag(true);
      setTimeout(() => setAnimateFlag(false), 600);
    }, 20);

    const localePattern = new RegExp(
      `^/(${Object.values(SupportedLocales).join('|')})(\/|$)`
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

    let newPath;
    if (hasLocalePrefix) {
      newPath = isEnglish
        ? pathName.replace(localePattern, (_, __, slash) =>
            slash === '/' ? '/' : ''
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
        <div className="flex lg:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
          {/* Start of sm and md view */}
          <div
            className={`fixed top-0 right-0 h-full w-3/4 bg-linear-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
              open ? 'translate-x-0' : 'translate-x-full'
            } `}
          >
            <button
              className="absolute top-20 left-0 -translate-x-full transition duration-150 ease-out rounded-l-full flex items-center font-tuner whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-linear-to-br from-white to-gray-50 pr-3 pl-4 pt-[8px] pb-[6px] text-sm font-medium cursor-pointer"
              onClick={toggleMenu}
            >
              <BiMenu
                className={`h-6 w-auto transition ease-out duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <IoMdClose
                className={`absolute h-6 w-auto transition ease-out duration-150 ${
                  open ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>

            <div className="h-full w-full absolute overflow-y-auto">
              <div className="flex py-4 px-6 relative z-20 justify-between items-center">
                <div className="pb-4 pt-2">
                  <Link href={'/'}>
                    <TinaLogoSvg
                      className={`flex items-center w-36 h-auto fill-orange-500`}
                    />
                  </Link>
                </div>
                <div className="flex items-center">
                  <button
                    className={`outline-hidden hover:animate-jelly ${
                      animateFlag ? 'animate-bounce' : ''
                    } hidden max-[1023px]:block`}
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
              <ul className="flex flex-col py-4 px-6 relative z-20">
                {navItems.map((item, index) =>
                  'items' in item ? (
                    (item.items as any[]).map((subItem, subIndex) =>
                      subItem.href ? (
                        <li
                          key={`${index}-${subIndex}`}
                          className={`group ${navLinkClasses} py-2`}
                        >
                          <Link href={subItem.href} onClick={toggleMenu}>
                            <span className="">
                              {subItem.label}
                              {subItem.href.startsWith('https://') && (
                                <BiLinkExternal className="text-blue-200 text-sm inline ml-1" />
                              )}
                            </span>
                          </Link>
                        </li>
                      ) : null
                    )
                  ) : 'href' in item ? (
                    <li key={index} className={`group ${navLinkClasses}`}>
                      <Link
                        href={item.href}
                        className="py-2"
                        onClick={toggleMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ) : item._template === GitHubStarButton ? (
                    <li
                      key={index}
                      className={`group ${navLinkClasses} py-2 flex items-center`}
                    >
                      <Link
                        href={`https://github.com/${item.owner}/${item.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                        onClick={toggleMenu}
                      >
                        <span className="flex items-center">
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
                          {starCount > 0 && (
                            <span className="text-sm font-medium">
                              {starCount.toLocaleString()}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>

          <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-900/70 z-30 ${
              open
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleMenu}
          ></div>
          <Link href={'/'}>
            <TinaIconSvg
              className={`flex items-center w-9 h-auto fill-orange-500`}
            />
          </Link>
          {pathName.includes('/docs') && (
            <Image src={TinaCmsPng} alt="TinaCMS Logo" className="w-44" />
          )}
          <div className="flex space-x-2 gap-2 cursor-pointer">
            {navItems
              .filter((item) => item._template === modalButtonString)
              .map(
                (item, index) =>
                  isModalButtonItem(item) && (
                    <Button
                      key={index}
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
                  )
              )}

            <button
              className={`outline-hidden hover:animate-jelly ${
                animateFlag ? 'animate-bounce' : ''
              } hidden min-[1024px]:block`}
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
        {/* Start of large (desktop +) view */}
        <div
          className={`absolute ${
            stuck && sticky
              ? `xl:fixed shadow-sm bg-linear-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur-sm animate-slide-in top-0 p-4`
              : `translate-y-2 px-4 pt-4 pb-6`
          } z-40 w-full lg:px-10 hidden lg:flex items-center justify-between`}
        >
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <Link href={'/'}>
              <TinaLogoSvg
                className={`w-40 flex items-center h-auto fill-orange-500 mb-4`}
              />
            </Link>
            <nav className="flex-1 flex flex-wrap-reverse justify-end items-end xl:items-center gap-2 xl:gap-x-12">
              <ul className="flex gap-4">
                {navItems.map((item, index) => {
                  switch (item._template) {
                    case modalButtonString:
                      return (
                        <li
                          key={index}
                          className={`group ${navLinkClasses} py-2 flex items-center`}
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
                        <li key={index} className={`group ${navLinkClasses}`}>
                          <Link
                            href={item.href}
                            className="py-2 w-max"
                            onClick={toggleMenu}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    case groupOfStringItemsString:
                      return (
                        <li key={index} className={`group ${navLinkClasses}`}>
                          <div className="relative group">
                            <span
                              className="flex items-center cursor-pointer"
                              onClick={toggleMenu}
                            >
                              {item.label}
                              <BiChevronDown
                                className={`ml-1 text-blue-200 group-hover:text-blue-400`}
                              />
                            </span>
                            <ul
                              className={`absolute left-0 top-full mt-2 min-w-full w-max bg-white shadow-lg rounded-md p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-500 ease-in-out`}
                            >
                              {item.items.map((subItem, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="py-2 px-2 flex items-center"
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={toggleMenu}
                                  >
                                    <span className="text-gray-600 hover:text-blue-500 transition text-md ease-out duration-150">
                                      {subItem.label}
                                      {subItem.href.startsWith('https://') && (
                                        <BiLinkExternal className="text-blue-200 text-sm group-hover:text-blue-400 inline ml-1" />
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      );
                    case GitHubStarButton:
                      return (
                        <li
                          key={index}
                          className={`group ${navLinkClasses} py-2 flex items-center`}
                        >
                          <Link
                            href={`https://github.com/${item.owner}/${item.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                            onClick={toggleMenu}
                          >
                            <span className="flex items-center">
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
                })}
                <li className="group flex items-center cursor-pointer">
                  <button
                    className={`outline-hidden hover:animate-jelly ${
                      animateFlag ? 'animate-bounce' : ''
                    }`}
                    onClick={() => openModal('LanguageSelect')}
                  >
                    {selectedFlag === 'en' ? (
                      <EnFlag className="w-8 h-8" />
                    ) : (
                      <ZhFlag className="w-8 h-8" />
                    )}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
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

      <Modal
        open={modalType === 'LanguageSelect'}
        onClose={closeModal}
        center
        classNames={{
          modal: modalClass,
        }}
      >
        <LanguageSelect
          onLanguageSelect={handleLanguageChange}
          currentLanguage={selectedFlag}
        />
      </Modal>
    </>
  );
}
