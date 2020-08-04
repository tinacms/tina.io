import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Hit } from 'react-instantsearch-core'
import path from 'path'
import { DynamicLink } from '../ui/DynamicLink'
import { formatDate } from '../../utils'

const DocHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <DynamicLink href={path.join('/docs', (hit as any).slug)}>
    <div onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      {hit['_highlightResult'].excerpt.matchLevel !== 'none' && (
        <Highlight attribute="excerpt" hit={hit} tagName="mark" />
      )}
    </div>
  </DynamicLink>
)

const BlogHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => {
  console.log(hit)

  return (
    <DynamicLink href={path.join('/blog', (hit as any).slug)}>
      <div onClick={clickHandler}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
        {hit['_highlightResult'].excerpt.matchLevel !== 'none' && (
          <Highlight attribute="excerpt" hit={hit} tagName="mark" />
        )}
        <div>{formatDate(hit.date)}</div>
      </div>
    </DynamicLink>
  )
}

export const hitComponents = {
  ['DocHit']: DocHit,
  ['BlogHit']: BlogHit,
}
