import React from 'react'
import Link from 'next/link'
import GitHubButton from 'react-github-btn'
import data from '../../content/navigation.json'
import { Button, LinkButton } from '../../components/ui/Button'
import {
  BiChevronRight,
  BiMenu,
  BiRightArrowAlt,
  BiLinkExternal,
} from 'react-icons/bi'
import { TinaIcon } from '../../components/logo'
import { useInView } from 'react-intersection-observer'
import TinaIconSvg from '../../public/svg/tina-icon.svg'
import { IoMdClose } from 'react-icons/io'
import Divider from '../../public/svg/hr.svg'
import { useComponentSize } from 'react-use-size'

export function Navbar({}) {
  const [open, setOpen] = React.useState(false)
  const [stuck, setStuck] = React.useState(false)
  const { ref, inView, entry } = useInView({
    rootMargin: '128px 0px',
    initialInView: true,
  })
  const { ref: navRef, height, width } = useComponentSize()

  React.useEffect(() => {
    if (inView) {
      setStuck(false)
    } else {
      setStuck(true)
    }
  }, [inView])

  return (
    <>
      <div ref={ref}>
        <div className="flex min-[1135px]:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
          <div
            className={`fixed top-0 right-0 h-full w-3/4 bg-gradient-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button
              className="absolute top-6 left-0 -translate-x-full transition duration-150 ease-out rounded-l-full flex items-center font-tuner whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-gradient-to-br from-white to-gray-50 pr-3 pl-4 pt-[8px] pb-[6px] text-sm font-medium cursor-pointer"
              onClick={() => {
                setOpen(!open)
              }}
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
                  <a
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <h1 className="flex items-center">
                      <TinaIconSvg className={`w-7 h-auto fill-orange-500`} />
                    </h1>
                  </a>
                </Link>
              </li>
              {data.map((item) => {
                const navLinkClasses =
                  'flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium'
                if (item.href) {
                  const { id, href, label, external } = item
                  return (
                    <li key={id} className={`group ${navLinkClasses}`}>
                      <Link href={href}>
                        <a
                          className="py-2"
                          onClick={() => {
                            setOpen(false)
                          }}
                        >
                          {label}{' '}
                          {external ? (
                            <BiLinkExternal
                              className={`text-blue-200 group-hover:text-blue-400 inline`}
                            />
                          ) : null}
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
                          <Link href={href}>
                            <a
                              className="py-2"
                              onClick={() => {
                                setOpen(false)
                              }}
                            >
                              {label}{' '}
                              {external ? (
                                <BiLinkExternal
                                  className={`text-blue-200 group-hover:text-blue-400 inline`}
                                />
                              ) : null}
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
            onClick={() => {
              setOpen(false)
            }}
          ></div>
          <Link href={'/'}>
            <a>
              <h1 className="flex items-center">
                <TinaIconSvg className={`w-10 h-auto fill-orange-500`} />
              </h1>
            </a>
          </Link>
          <div className="w-full flex justify-end items-center gap-4">
            <LinkButton
              link="https://app.tina.io/signin"
              color="white"
              size="small"
            >
              Log In
            </LinkButton>
            <LinkButton
              link="https://app.tina.io/register"
              color="blue"
              size="small"
            >
              Sign Up
            </LinkButton>
          </div>
        </div>
        <div
          ref={navRef}
          className={`absolute ${
            stuck
              ? `min-[1135px]:fixed shadow-sm bg-gradient-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur animate-slide-in top-0 p-4`
              : `translate-y-2 px-4 pt-4 pb-6`
          } z-40 w-full min-[1135px]:px-10 hidden min-[1135px]:flex items-center justify-between gap-6`}
        >
          <Link href={'/'}>
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
                const navLinkClasses =
                  'flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium'
                if (item.href) {
                  const { id, href, label, external } = item
                  return (
                    <li key={id} className={`group ${navLinkClasses}`}>
                      <Link href={href}>
                        <a className="py-2">
                          {label}{' '}
                          {external ? (
                            <BiLinkExternal
                              className={`text-blue-200 group-hover:text-blue-400 inline`}
                            />
                          ) : null}
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
                                <Link href={href}>
                                  <a className="block px-2 py-1.5 text-gray-600 hover:text-blue-500">
                                    {label}{' '}
                                    {external ? (
                                      <BiLinkExternal
                                        className={`text-blue-200 group-hover:text-blue-400 inline`}
                                      />
                                    ) : null}
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
              <div className="github flex-none h-[27px] drop-shadow">
                {/* @ts-ignore */}
                <GitHubButton
                  href="https://github.com/tinacms/tinacms"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star TinaCMS on GitHub"
                >
                  Star
                </GitHubButton>
              </div>
              <div className="w-full flex justify-start items-center gap-4">
                <LinkButton
                  link="https://app.tina.io/signin"
                  color="white"
                  size="small"
                >
                  Log In
                </LinkButton>
                <LinkButton
                  link="https://app.tina.io/register"
                  color="blue"
                  size="small"
                >
                  Sign Up
                </LinkButton>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className={`relative w-full`} style={{ height: height }}></div>
    </>
  )
}
