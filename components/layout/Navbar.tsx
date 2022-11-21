import React from 'react'
import Link from 'next/link'
import GitHubButton from 'react-github-btn'
import data from '../../content/navigation.json'
import { Button } from 'components/ui/Button'
import { BiChevronRight, BiMenu, BiRightArrowAlt } from 'react-icons/bi'
import { useInView } from 'react-intersection-observer'
import TinaIconSvg from '../../public/svg/tina-icon.svg'
import { IoMdClose } from 'react-icons/io'
import Divider from '../../public/svg/hr.svg'

const LaunchBanner = () => {
  return (
    <div className="w-full h-12 px-4 lg:px-8 text-lg bg-gradient-to-r from-seafoam-50 to-blue-50 font-sans text-blue-700 flex items-center justify-center gap-4 whitespace-nowrap">
      <p className="font-medium">
        <span className="font-tuner text-orange-600">Tina</span> v1.0 is live!
      </p>
      <Divider className="flex-shrink" />
      <Link href="/blog/tina-1-0-announcement/">
        <a className="font-tuner text-blue-600 hover:text-blue-400 transition ease-out duration-150 underline decoration-blue-100 flex items-center gap-1">
          Read More <BiRightArrowAlt className="h-5 w-auto -mt-0.5" />
        </a>
      </Link>
    </div>
  )
}

export function Navbar({}) {
  const [open, setOpen] = React.useState(false)
  const [stuck, setStuck] = React.useState(false)
  const { ref, inView, entry } = useInView({
    rootMargin: '128px 0px',
    initialInView: true,
  })

  React.useEffect(() => {
    if (inView) {
      setStuck(false)
    } else {
      setStuck(true)
    }
  }, [inView])

  return (
    <div ref={ref}>
      <LaunchBanner />
      <div className="flex lg:hidden w-full py-4 pr-4 pl-18 items-center justify-between gap-6">
        <div
          className={`fixed top-0 left-0 h-full w-3/4 bg-gradient-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            className="absolute mt-12 top-6 right-0 translate-x-full transition duration-150 ease-out rounded-r-full flex items-center font-tuner whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-gradient-to-br from-white to-gray-50 pl-3 pr-4 pt-[8px] pb-[6px] text-sm font-medium cursor-pointer"
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
            <li className="pb-3">
              <Link href={'/'}>
                <a>
                  <h1 className="flex items-center">
                    <TinaIconSvg className={`w-8 h-auto fill-orange-500`} />
                  </h1>
                </a>
              </Link>
            </li>
            {data.map((item) => {
              const navLinkClasses =
                'flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium'
              if (item.href) {
                const { id, href, label } = item
                return (
                  <li key={id} className={`group ${navLinkClasses}`}>
                    <Link href={href}>
                      <a className="py-1">{label}</a>
                    </Link>
                  </li>
                )
              } else {
                return (
                  item.items &&
                  item.items.map((child) => {
                    const { id, href, label } = child
                    return (
                      <li key={id} className={`group ${navLinkClasses}`}>
                        <Link href={href}>
                          <a className="py-1">{label}</a>
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
          <Link href="https://app.tina.io/signin">
            <Button color="white" size="small">
              Log In
            </Button>
          </Link>
          <Link href="https://app.tina.io/register">
            <Button color="blue" size="small">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={`absolute ${
          stuck
            ? `lg:fixed shadow-sm bg-gradient-to-r from-[rgba(216,251,248,0.6)] to-[rgba(215,233,255,0.6)] backdrop-blur animate-slide-in top-0`
            : `translate-y-2`
        } z-40 w-full p-4 lg:px-10 hidden lg:flex items-center justify-between gap-6`}
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
        <nav className="flex-1 flex flex-wrap-reverse justify-end items-end lg:items-center gap-2 lg:gap-x-6 lg:gap-x-10">
          <ul className="flex gap-6 lg:gap-10 relative z-20">
            {data.map((item) => {
              const navLinkClasses =
                'flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium'
              if (item.href) {
                const { id, href, label } = item
                return (
                  <li key={id} className={`group ${navLinkClasses}`}>
                    <Link href={href}>
                      <a className="py-2">{label}</a>
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
                    <ul className="absolute origin-top-right lg:origin-top-left transition duration-300 ease-out opacity-0 group-hover:opacity-100 scale-95 group-hover:100 pointer-events-none group-hover:pointer-events-auto -translate-y-2 group-hover:translate-y-0 z-50 top-full -mt-0.5 right-0 lg:right-auto lg:-left-2 text-right lg:text-left bg-white shadow-lg rounded-md px-4 py-3">
                      {item.items &&
                        item.items.map((child) => {
                          const { id, href, label } = child
                          return (
                            <li
                              key={id}
                              className={`${navLinkClasses} w-full whitespace-nowrap`}
                            >
                              <Link href={href}>
                                <a className="block p-1 text-gray-600 hover:text-blue-500">
                                  {label}
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
          <div className="flex items-center gap-6 lg:gap-10">
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
              <Link href="https://app.tina.io/signin">
                <Button color="white" size="small">
                  Log In
                </Button>
              </Link>
              <Link href="https://app.tina.io/register">
                <Button color="blue" size="small">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
