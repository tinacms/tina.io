import { DemoForm } from 'components/modals/BookDemo';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
  BiChevronDown,
  BiChevronRight,
  BiLinkExternal,
  BiMenu,
} from 'react-icons/bi';
import { FaCalendarDay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Button } from '../../components/ui/Button';
import navData from '../../content/navigationBar/navMenu.json';
import TinaLogoSvg from '../../public/svg/tina-extended-logo.svg';
import TinaIconSvg from '../../public/svg/tina-icon.svg';
import { EmailForm } from '../modals/EmailForm';

enum ValidColors {
  White = 'white',
  Blue = 'blue',
  Orange = 'orange',
  Seafoam = 'seafoam',
  Ghost = 'ghost',
}

const modalButtonString = 'modalButton';

const iconMapping = {
  MdEmail: MdEmail,
  FaCalendarDay: FaCalendarDay,
};

type NavItemBase = {
  label: string;
  _template: string;
};

type NavItemLink = NavItemBase & {
  href: string;
  _template: 'stringItem';
  items?: never;
  owner?: never;
  repo?: never;
};

type NavItemGroup = NavItemBase & {
  items: Array<{
    label: string;
    href: string;
  }>;
  _template: 'groupOfStringItems';
  href?: never;
  owner?: never;
  repo?: never;
};

type NavItemGitHub = NavItemBase & {
  owner: string;
  repo: string;
  _template: 'GitHubStarButton';
  href?: never;
  items?: never;
};

type NavItemModal = NavItemBase & {
  color: ValidColors;
  modal: string;
  icon2?: keyof typeof iconMapping;
  _template: typeof modalButtonString;
  href?: never;
  items?: never;
  owner?: never;
  repo?: never;
};

type NavItem = NavItemLink | NavItemGroup | NavItemGitHub | NavItemModal;

type NavData = {
  navigationBar: string;
  navItem: Array<{
    label: string;
    _template: string;
    href?: string;
    items?: Array<{
      label: string;
      href: string;
    }>;
    owner?: string;
    repo?: string;
    color?: ValidColors;
    modal?: string;
    icon2?: keyof typeof iconMapping;
  }>;
};

const data = navData as NavData;

export function Navbar({ sticky = true }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [modalType, setModalType] = useState(null);
  const navRef = useRef(null);

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

  const toggleMenu = () => setOpen((prev) => !prev);
  const openModal = (modal) => setModalType(modal);
  const closeModal = () => setModalType(null);

  const navItems = Array.isArray(data.navItem)
    ? data.navItem.filter((item): item is NavItem => {
        if (item._template === 'stringItem' && item.href) {
          return true;
        }
        if (item._template === 'groupOfStringItems' && item.items) {
          return true;
        }
        if (item._template === 'GitHubStarButton' && item.owner && item.repo) {
          return true;
        }
        if (item._template === modalButtonString && item.color && item.modal) {
          return true;
        }
        return false;
      })
    : [];

  return (
    <>
      <div ref={navRef} className={`relative w-full`}>
        <div className="flex xl:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
          {/* Start of sm and md view */}
          <div
            className={`fixed top-0 right-0 h-full w-3/4 bg-gradient-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button
              className="absolute top-6 left-0 -translate-x-full transition duration-150 ease-out rounded-l-full flex items-center font-tuner whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-gradient-to-br from-white to-gray-50 pr-3 pl-4 pt-[8px] pb-[6px] text-sm font-medium cursor-pointer"
              onClick={toggleMenu}
            >
              <BiMenu
                className={`h-6 w-auto transition ease-out duration-200 ${
                  open ? 'rotate-90 opacity-0' : ''
                }`}
              />
              <IoMdClose
                className={`absolute h-6 w-auto transition ease-out duration-150 ${
                  open ? '' : '-rotate-90 opacity-0'
                }`}
              />
            </button>
            <ul className="flex flex-col py-4 px-6 relative z-20">
              <li className="pb-4 pt-2">
                <Link href={'/'}>
                  <TinaLogoSvg
                    className={`flex items-center w-36 h-auto fill-orange-500`}
                  />
                </Link>
              </li>
              {navItems.map((item, index) =>
                item._template === 'groupOfStringItems' ? (
                  item.items.map((subItem, subIndex) =>
                    subItem.href ? (
                      <li
                        key={`${index}-${subIndex}`}
                        className={`group ${navLinkClasses} py-2`}
                      >
                        <Link href={subItem.href}>
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
                ) : item._template === 'stringItem' && item.href ? (
                  <li key={index} className={`group ${navLinkClasses}`}>
                    <Link href={item.href} className="py-2">
                      {item.label}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
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
          <div className="flex space-x-2 gap-2 cursor-pointer">
            {navItems
              .filter((item) => item._template === modalButtonString)
              .map((item, index) => (
                <Button
                  key={index}
                  color={item.color as ValidColors}
                  size="small"
                  onClick={() => openModal(item.modal)}
                >
                  {item.icon2 && iconMapping[item.icon2] && (
                    <span className="mr-2">
                      {iconMapping[item.icon2]({ className: 'w-5 h-5' })}
                    </span>
                  )}
                  {item.label}
                </Button>
              ))}
          </div>
        </div>
        {/* Start of large (desktop +) view */}
        <div
          className={`absolute ${
            stuck && sticky
              ? `xl:fixed shadow-sm bg-gradient-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur animate-slide-in top-0 p-4`
              : `translate-y-2 px-4 pt-4 pb-6`
          } z-40 w-full xl:px-10 hidden xl:flex items-center justify-between gap-6`}
        >
          <Link href={'/'}>
            <TinaLogoSvg
              className={`w-40 flex items-center h-auto fill-orange-500 mb-4`}
            />
          </Link>
          <nav className="flex-1 flex flex-wrap-reverse justify-end items-end xl:items-center gap-2 xl:gap-x-12">
            <ul className="flex gap-6 xl:gap-8 xl:gap-12 relative z-20">
              {navItems.map((item, index) =>
                item._template === modalButtonString ? (
                  <li key={index} className={`group ${navLinkClasses} py-2`}>
                    <Button
                      color={(item as NavItemModal).color}
                      size="small"
                      onClick={() => openModal((item as NavItemModal).modal)}
                    >
                      {(item as NavItemModal).icon2 &&
                        iconMapping[(item as NavItemModal).icon2] && (
                          <span className="mr-2">
                            {iconMapping[(item as NavItemModal).icon2]({
                              className: 'w-5 h-5',
                            })}
                          </span>
                        )}
                      {item.label}
                    </Button>
                  </li>
                ) : item._template === 'groupOfStringItems' ? (
                  <li key={index} className={`group ${navLinkClasses}`}>
                    <div className="relative group">
                      <span className="flex items-center cursor-pointer">
                        {item.label}
                        <BiChevronRight
                          className={`ml-1 text-blue-200 group-hover:text-blue-400 transition-transform duration-200 group-hover:rotate-90`}
                        />
                      </span>
                      <ul
                        className={`absolute left-0 top-full mt-2 min-w-full w-max bg-white shadow-lg rounded-md p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-500 ease-in-out`}
                      >
                        {(item as NavItemGroup).items.map((subItem, subIndex) =>
                          subItem.href ? (
                            <li
                              key={subIndex}
                              className="py-2 px-2 flex items-center"
                            >
                              <Link href={subItem.href}>
                                <span className="text-gray-600 hover:text-blue-500 transition text-md ease-out duration-150">
                                  {subItem.label}
                                  {subItem.href.startsWith('https://') && (
                                    <BiLinkExternal className="text-blue-200 text-sm group-hover:text-blue-400 inline ml-1" />
                                  )}
                                </span>
                              </Link>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </li>
                ) : item._template === 'stringItem' ? (
                  <Link
                    href={(item as NavItemLink).href}
                    className="py-2 w-max"
                  >
                    {item.label}
                  </Link>
                ) : null
              )}
            </ul>
          </nav>
        </div>
      </div>

      <Modal open={modalType === 'BookDemo'} onClose={closeModal} center>
        <DemoForm />
      </Modal>

      <Modal open={modalType === 'EmailForm'} onClose={closeModal} center>
        <EmailForm isFooter={false} />
      </Modal>
    </>
  );
}
