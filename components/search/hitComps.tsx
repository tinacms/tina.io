import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Hit } from 'react-instantsearch-core'
import path from 'path'
import { DynamicLink } from '../ui/DynamicLink'
import { formatDate } from '../../utils'

const DocHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <div>
    <span onClick={clickHandler}>
      <DynamicLink href={path.join('/docs', (hit as any).slug)}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </DynamicLink>
    </span>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

const BlogHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <div>
    <span onClick={clickHandler}>
      <DynamicLink href={path.join('/blog', (hit as any).slug)}>
        <h4 onClick={clickHandler}>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </DynamicLink>
    </span>
    <div>{formatDate(hit.date)}</div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const hitComponents = {
  ['DocHit']: DocHit,
  ['BlogHit']: BlogHit,
}
