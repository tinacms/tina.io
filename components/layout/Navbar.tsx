import React from 'react'
import Link from 'next/link'
import { Container } from '../blocks'
import TinaIcon from '../../public/svg/tina-icon.svg'
import GitHubButton from 'react-github-btn'
import data from '../../content/navigation.json'
import { Button, ButtonGroup } from 'components/ui/Button'

export function Navbar({}) {
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <Link href="/">
        <a className="">
          <TinaIcon className="w-10 h-auto block fill-orange-500" />
        </a>
      </Link>
      <nav className="flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 sm:gap-6">
        <ul className="flex gap-6">
          {data.map(item => {
            if (item.href) {
              const { id, href, label } = item
              return (
                <li key={id} className="font-medium text-base">
                  <Link href={href}>{label}</Link>
                </li>
              )
            } else {
              const { id, label } = item
              return (
                <li key={id} className="font-medium text-base">
                  {label}
                </li>
              )
            }
          })}
        </ul>
        <div className="flex items-center gap-6">
          <GitHubButton
            href="https://github.com/tinacms/tinacms"
            data-color-scheme="no-preference: dark; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Star TinaCMS on GitHub"
          >
            Star
          </GitHubButton>
          <ButtonGroup>
            <Button className="">Log In</Button>
            <Button className="" color="blue">
              Sign Up
            </Button>
          </ButtonGroup>
        </div>
      </nav>
    </div>
  )
}
