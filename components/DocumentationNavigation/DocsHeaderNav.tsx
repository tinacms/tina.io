import React from 'react'
import { LinkButton } from '../ui'
import { DynamicLink } from '../ui/DynamicLink'
import data from '../../content/docs-navigation.json'

export const DocsHeaderNav = () => {
  return (
    <nav className="w-full p-4 lg:px-10 flex-1 flex flex-wrap-reverse justify-end items-end md:items-center gap-2 md:gap-x-6 lg:gap-x-10">
      <ul className="gap-6 lg:gap-10 hidden md:flex">
        {data &&
          data.map(({ id, href, label }) => {
            return (
              <li key={id}>
                <DynamicLink href={href} passHref>
                  <div className="flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium">
                    {label}
                  </div>
                </DynamicLink>
              </li>
            )
          })}
      </ul>
      <div className="flex justify-start items-center gap-4">
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
    </nav>
  )
}
