import { Highlight, Snippet } from 'react-instantsearch-dom'

import { DynamicLink } from '../ui/DynamicLink'
import { Hit } from 'react-instantsearch-core'
import React from 'react'
import { formatDate } from '../../utils'
import path from 'path'
import styled from 'styled-components'

const DocHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <DynamicLink href={path.join('/docs', (hit as any).slug)}>
    <div onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      {hit['_highlightResult'].excerpt.matchLevel !== 'none' && (
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      )}
    </div>
  </DynamicLink>
)

const BlogHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => {
  return (
    <DynamicLink href={path.join('/blog', (hit as any).slug)}>
      <div onClick={clickHandler}>
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
        {hit['_highlightResult'].excerpt.matchLevel !== 'none' && (
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        )}
        <div>{formatDate(hit.date)}</div>
      </div>
    </DynamicLink>
  )
}

const PackageHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => {
  return (
    <DynamicLink href={path.join('/packages', `/${hit.package}`)}>
      <div onClick={clickHandler}>
        <h4>
          <Highlight attribute="package" hit={hit} tagName="mark" />
        </h4>
        {hit['_highlightResult'].excerpt.matchLevel !== 'none' && (
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        )}
      </div>
    </DynamicLink>
  )
}

export const hitComponents = {
  ['DocHit']: DocHit,
  ['BlogHit']: BlogHit,
  ['PackageHit']: PackageHit,
}
