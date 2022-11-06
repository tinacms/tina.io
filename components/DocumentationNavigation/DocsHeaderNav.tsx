import React from 'react'
import styled, { css } from 'styled-components'
import { Button, ButtonGroup } from '../ui'
import { DynamicLink } from '../ui/DynamicLink'
import data from '../../content/docs-navigation.json'
import Link from 'next/link'

export const DocsHeaderNav = () => {
  return (
    <nav className="w-full p-4 lg:px-10 flex-1 flex flex-wrap-reverse justify-end items-end md:items-center gap-2 md:gap-x-6 lg:gap-x-10">
      <ul className="gap-6 lg:gap-10 hidden md:flex">
        {data &&
          data.map(({ id, href, label }) => {
            return (
              <li key={id}>
                <DynamicLink href={href} passHref>
                  <a className="flex items-center text-blue-700 hover:text-blue-500 transition ease-out duration-150 cursor-pointer drop-shadow-sm text-base font-medium">
                    {label}
                  </a>
                </DynamicLink>
              </li>
            )
          })}
      </ul>
      <div className="flex justify-start items-center gap-4">
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
    </nav>
  )
}
