import React from 'react'
import styled from 'styled-components'
import { DynamicLink } from './DynamicLink'
import data from '../../content/navigation.json'

export const LinkNav = ({}) => {
  return (
    <ul className="gap-1 lg:columns-2">
      {data.map(item => {
        if (item.href) {
          return <LinkItem item={item} />
        }
        if (item.items) {
          return item.items.map(item => {
            return <LinkItem item={item} />
          })
        }
      })}
    </ul>
  )
}

export const LinkItem = ({ item }) => {
  const { id, href, label } = item
  return (
    <li key={id} className="">
      <DynamicLink href={href} passHref>
        <a className="inline-block drop-shadow-sm relative opacity-90 hover:opacity-100 text-white uppercase text-lg lg:text-xl font-tuner transition duration-150 ease-out hover:-translate-y-px active:translate-y-px hover:-translate-x-px active:translate-x-px">
          {label}
        </a>
      </DynamicLink>
    </li>
  )
}
