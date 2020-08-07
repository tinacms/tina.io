import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Hit } from 'react-instantsearch-core'
import path from 'path'
import { DynamicLink } from '../ui/DynamicLink'
import { formatDate } from '../../utils'
import styled from 'styled-components'

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

const GuideHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <DynamicLink href={path.join('/guides', (hit as any).slug)}>
    <div onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
      <GuideTitle>
        <Highlight attribute="guideTitle" hit={hit} tagName="mark" />{' '}
      </GuideTitle>
      {hit['_highlightResult'].excerpt.matchLevel !== 'none' && (
        <Highlight attribute="excerpt" hit={hit} tagName="mark" />
      )}
    </div>
  </DynamicLink>
)

const GuideTitle = styled.div`
  margin-top: -0.5rem;
  + * {
    margin-top: 1rem;
    display: block;
  }
  [class*='Highlight'] {
    font-size: 0.8rem;
    font-style: italic;
  }
`

const BlogHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => {
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
  ['GuideHit']: GuideHit,
  ['BlogHit']: BlogHit,
}
