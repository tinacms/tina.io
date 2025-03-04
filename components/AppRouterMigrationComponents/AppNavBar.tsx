'use client';

import { DemoForm } from 'components/modals/BookDemo';
import LanguageSelect from 'components/modals/LanguageSelect';
import { DEFAULT_LOCALE, SupportedLocales } from 'middleware';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BiChevronRight, BiLinkExternal, BiMenu } from 'react-icons/bi';
import { FaCalendarDay } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import data from '../../content/navigationBar/navMenu.json';
import TinaLogoSvg from '../../public/svg/tina-extended-logo.svg';
import TinaIconSvg from '../../public/svg/tina-icon.svg';
import '../../styles/tailwind.css';
import { EmailForm } from '../modals/EmailForm';
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

const iconMapping = {
  MdEmail: MdEmail,
  FaCalendarDay: FaCalendarDay,
};

export function AppNavBar({ sticky = true }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [selectedFlag, setSelectedFlag] = useState(DEFAULT_LOCALE);
  const [animateFlag, setAnimateFlag] = useState(false);
  const [modalClass, setModalClass] = useState('language-select-modal');
  const [hideZh, setHideZh] = useState(false);

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

  useEffect(() => {
    const pathLocale = pathName.split('/')[1];
    if (
      pathLocale === SupportedLocales.EN ||
      pathLocale === SupportedLocales.ZH
    ) {
      setHideZh(false);
      setSelectedFlag(pathLocale);
    } else {
      setHideZh(true);
      setSelectedFlag(DEFAULT_LOCALE);
    }
  }, [pathName]);

  const toggleMenu = () => setOpen((prev) => !prev);
  const openModal = (modal) => setModalType(modal);
  const closeModal = () => setModalType(null);

  const navItems = Array.isArray(data.navItem) ? data.navItem : [];

  const handleLanguageChange = (code) => {
    setSelectedFlag(code);
    setOpen(false);
    closeModal();
    setTimeout(() => {
      setAnimateFlag(true);
      setTimeout(() => setAnimateFlag(false), 600);
    }, 20);

    router.push(pathName.replace(/^\/(en|zh)/, `/${code}`));
  };

  return (
    <>
      <div ref={navRef} className={`relative w-full`}>
        <div className="flex min-[1300px]:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
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
                  className={`outline-none hover:animate-jelly ${
                    animateFlag ? 'animate-bounce' : ''
                  } hidden max-[639px]:block`} // Adjust breakpoint as needed
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
                item.items ? (
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
                ) : item.href ? (
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
              ))}

            <button
              className={`outline-none hover:animate-jelly ${
                animateFlag ? 'animate-bounce' : ''
              } hidden min-[640px]:block`}
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
              ? `min-[1300px]:fixed shadow-sm bg-gradient-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur animate-slide-in top-0 p-4`
              : `translate-y-2 px-4 pt-4 pb-6`
          } z-40 w-full min-[1300px]:px-10 hidden min-[1300px]:flex items-center justify-between `}
        >
          <Link href={'/'}>
            <TinaLogoSvg
              className={`w-40 flex items-center h-auto fill-orange-500 mb-4`}
            />
          </Link>
          <nav className="flex-1 flex flex-wrap-reverse justify-end items-end min-[1300px]:items-center gap-2 min-[1300px]:gap-x-12">
            <ul className="flex gap-4 ">
              {navItems.map((item, index) =>
                item._template === modalButtonString ? (
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
                          {iconMapping[item.icon2]({ className: 'w-5 h-5' })}
                        </span>
                      )}
                      {item.label}
                    </Button>
                  </li>
                ) : (
                  <li key={index} className={`group ${navLinkClasses}`}>
                    {item.items ? (
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
                          {item.items.map((subItem, subIndex) =>
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
                    ) : item.href ? (
                      <Link href={item.href} className="py-2 w-max">
                        {item.label}
                      </Link>
                    ) : null}
                  </li>
                )
              )}
              <li className="group flex items-center cursor-pointer">
                <button
                  className={`outline-none hover:animate-jelly ${
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

      <Modal open={modalType === 'BookDemo'} onClose={closeModal} center>
        <DemoForm />
      </Modal>

      <Modal open={modalType === 'EmailForm'} onClose={closeModal} center>
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
          hideZh={hideZh}
        />
      </Modal>
    </>
  );
}
