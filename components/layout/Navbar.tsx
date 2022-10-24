import React from 'react'
import Link from 'next/link'
import { Container } from '../blocks'
import TinaIcon from '../../public/svg/tina-icon.svg'
import GitHubButton from 'react-github-btn'
import data from '../../content/navigation.json'
import { Button, ButtonGroup } from 'components/ui/Button'
import { BiChevronRight } from 'react-icons/bi'

export function Navbar({}) {
  return (
    <div className="w-full p-4 lg:py-6 lg:px-10 flex items-center justify-between">
      <Link href="/">
        <a className="">
          <TinaIcon className="w-10 h-auto block fill-orange-500" />
        </a>
      </Link>
      <nav className="flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 sm:gap-6 lg:gap-10">
        <ul className="flex gap-6 lg:gap-10">
          {data.map(item => {
            const navLinkClasses =
              'flex items-center text-blue-700 drop-shadow-sm text-base font-medium'
            if (item.href) {
              const { id, href, label } = item
              return (
                <li key={id} className={navLinkClasses}>
                  <Link href={href}>{label}</Link>
                </li>
              )
            } else {
              const { id, label } = item
              return (
                <li key={id} className={navLinkClasses}>
                  {label}{' '}
                  <BiChevronRight
                    className={`text-blue-200 hover:text-blue-400 w-6 h-auto transition ease-out duration-200 transform`}
                  />
                </li>
              )
            }
          })}
        </ul>
        <div className="flex items-center gap-6 lg:gap-10">
          <div className="github flex-none h-[27px] drop-shadow">
            <GitHubButton
              href="https://github.com/tinacms/tinacms"
              data-size="large"
              data-show-count="true"
              aria-label="Star TinaCMS on GitHub"
            >
              Star
            </GitHubButton>
          </div>
          <ButtonGroup>
            <Button className="" color="white">
              Log In
            </Button>
            <Button className="" color="blue">
              Sign Up
            </Button>
          </ButtonGroup>
        </div>
      </nav>
    </div>
  )
}
