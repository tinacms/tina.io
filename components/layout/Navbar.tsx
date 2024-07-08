import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import data from '../../content/navigation.json'
import { Button, LinkButton } from '../../components/ui/Button'
import {
  BiChevronRight,
  BiMenu,
  BiRightArrowAlt,
  BiLinkExternal,
} from 'react-icons/bi'
import { TinaIcon } from '../../components/logo'
import TinaIconSvg from '../../public/svg/tina-icon.svg'
import { IoMdClose } from 'react-icons/io'
import { FaCalendarDay } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Modal } from 'react-responsive-modal'
import { EmailForm } from '../modals/EmailForm'
import 'react-responsive-modal/styles.css'
import { DemoForm } from 'components/modals/BookDemo'

export function Navbar({}) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const navRef = useRef(null)

  const navLinkClasses =
    'flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium'

  const handleScroll = () => {
    if (navRef.current) {
      setStuck(window.scrollY > 50)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => setOpen((prev) => !prev)
  const openEmailModal = () => setIsEmailModalOpen(true)
  const openDemoModal = () => setIsDemoModalOpen(true)
  const closeEmailModal = () => setIsEmailModalOpen(false)
  const closeDemoModal = () => setIsDemoModalOpen(false)

  return (
    <>
      <div ref={navRef} className={`relative w-full`}>
        <div className="flex min-[1135px]:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
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
                <Link legacyBehavior href={'/'}>
                  <a onClick={toggleMenu}>
                    <h1 className="flex items-center">
                      <TinaIconSvg className={`w-7 h-auto fill-orange-500`} />
                    </h1>
                  </a>
                </Link>
              </li>
              {data.map((item) => {
                if (item.href) {
                  const { id, href, label, external } = item
                  return (
                    <li key={id} className={`group ${navLinkClasses}`}>
                      <Link legacyBehavior href={href}>
                        <a className="py-2" onClick={toggleMenu}>
                          {label}{' '}
                          {external && (
                            <BiLinkExternal
                              className={`text-blue-200 group-hover:text-blue-400 inline`}
                            />
                          )}
                        </a>
                      </Link>
                    </li>
                  )
                } else {
                  return (
                    item.items &&
                    item.items.map((child) => {
                      const { id, href, label, external } = child
                      return (
                        <li key={id} className={`group ${navLinkClasses}`}>
                          <Link legacyBehavior href={href}>
                            <a className="py-2" onClick={toggleMenu}>
                              {label}{' '}
                              {external && (
                                <BiLinkExternal
                                  className={`text-blue-200 group-hover:text-blue-400 inline`}
                                />
                              )}
                            </a>
                          </Link>
                        </li>
                      )
                    })
                  )
                }
              })}
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
          <Link legacyBehavior href={'/'}>
            <a>
              <h1 className="flex items-center">
                <TinaIconSvg className={`w-10 h-auto fill-orange-500`} />
              </h1>
            </a>
          </Link>
          <div className="w-full flex justify-end items-center gap-4">
            <Button color="white" size="small" onClick={openEmailModal}>
              <MdEmail className="mr-2" />
              Subscribe
            </Button>
            <Button color="orange" size="small" onClick={openDemoModal}>
              <FaCalendarDay className="mr-2" />
              Book a Demo
            </Button>
          </div>
        </div>
        <div
          className={`absolute ${
            stuck
              ? `min-[1135px]:fixed shadow-sm bg-gradient-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur animate-slide-in top-0 p-4`
              : `translate-y-2 px-4 pt-4 pb-6`
          } z-40 w-full min-[1135px]:px-10 hidden min-[1135px]:flex items-center justify-between gap-6`}
        >
          <Link legacyBehavior href={'/'}>
            <a>
              <h1 className="flex items-center">
                <TinaIconSvg
                  className={`${stuck ? 'w-8' : 'w-10'} h-auto fill-orange-500`}
                />
              </h1>
            </a>
          </Link>
          <nav className="flex-1 flex flex-wrap-reverse justify-end items-end min-[1135px]:items-center gap-2 min-[1135px]:gap-x-12">
            <ul className="flex gap-6 min-[1135px]:gap-8 min-[1135px]:gap-12 relative z-20">
              {data.map((item) => {
                if (item.href) {
                  const { id, href, label, external } = item
                  return (
                    <li key={id} className={`group ${navLinkClasses}`}>
                      <Link legacyBehavior href={href}>
                        <a className="py-2">
                          {label}{' '}
                          {external && (
                            <BiLinkExternal
                              className={`text-blue-200 group-hover:text-blue-400 inline`}
                            />
                          )}
                        </a>
                      </Link>
                    </li>
                  )
                } else {
                  const { id, label } = item
                  return (
                    <li key={id} className={`group ${navLinkClasses} relative`}>
                      <span className="py-2">{label}</span>
                      <BiChevronRight
                        className={`text-blue-200 group-hover:text-blue-400 group-hover:rotate-90 w-6 h-auto transition ease-out duration-300 transform`}
                      />
                      <ul className="absolute origin-top-right min-[1135px]:origin-top-left transition duration-300 ease-out opacity-0 group-hover:opacity-100 scale-95 group-hover:100 pointer-events-none group-hover:pointer-events-auto -translate-y-2 group-hover:translate-y-0 z-50 top-full -mt-0.5 right-0 min-[1135px]:right-auto min-[1135px]:-left-2 text-right min-[1135px]:text-left bg-white shadow-lg rounded-md px-4 py-3">
                        {item.items &&
                          item.items.map((child) => {
                            const { id, href, label, external } = child
                            return (
                              <li
                                key={id}
                                className={`${navLinkClasses} w-full whitespace-nowrap`}
                              >
                                <Link legacyBehavior href={href}>
                                  <a className="block px-2 py-1.5 text-gray-600 hover:text-blue-500">
                                    {label}{' '}
                                    {external && (
                                      <BiLinkExternal
                                        className={`text-blue-200 group-hover:text-blue-400 inline`}
                                      />
                                    )}
                                  </a>
                                </Link>
                              </li>
                            )
                          })}
                      </ul>
                    </li>
                  )
                }
              })}
            </ul>
            <div className="flex items-center gap-6 min-[1135px]:gap-10">
              <div className="w-full flex justify-start items-center gap-4">
                <Button color="white" size="small" onClick={openEmailModal}>
                  <MdEmail className="mr-2" />
                  Subscribe
                </Button>
                <Button color="orange" size="small" onClick={openDemoModal}>
                  <FaCalendarDay className="mr-2" />
                  Book a Demo
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <Modal open={isDemoModalOpen} onClose={closeDemoModal} center>
        <DemoForm />
      </Modal>

      <Modal open={isEmailModalOpen} onClose={closeEmailModal} center>
        <EmailForm isFooter={false} />
      </Modal>
    </>
  )
}
