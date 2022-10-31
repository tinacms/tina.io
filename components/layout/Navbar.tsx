import React from 'react'
import Link from 'next/link'
import { Container } from '../blocks'
import GitHubButton from 'react-github-btn'
import data from '../../content/navigation.json'
import { Button, ButtonGroup } from 'components/ui/Button'
import { BiChevronRight } from 'react-icons/bi'
import { TinaIcon } from 'components/logo'

export function Navbar({}) {
  return (
    <div className="absolute z-40 w-full p-4 lg:py-6 lg:px-10 flex items-center justify-between gap-6">
      <Link href="/">
        <a className="">
          <TinaIcon color="orange" />
        </a>
      </Link>
      <nav className="flex-1 flex flex-wrap-reverse justify-end items-end md:items-center gap-2 md:gap-x-6 lg:gap-x-10">
        <ul className="flex gap-6 lg:gap-10 relative z-20">
          {data.map(item => {
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
                  <ul className="absolute origin-top-left transition duration-300 ease-out opacity-0 group-hover:opacity-100 scale-95 group-hover:100 pointer-events-none group-hover:pointer-events-auto -translate-y-2 group-hover:translate-y-0 z-50 top-full -mt-0.5 -left-2 bg-white shadow-lg rounded-md px-4 py-3">
                    {item.items &&
                      item.items.map(child => {
                        const { id, href, label } = child
                        return (
                          <li
                            key={id}
                            className={`${navLinkClasses} whitespace-nowrap`}
                          >
                            <Link href={href}>
                              <a className="p-1 text-gray-600 hover:text-blue-500">
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
            <Button className="" color="white" size="small">
              Log In
            </Button>
            <Button className="" color="blue" size="small">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
