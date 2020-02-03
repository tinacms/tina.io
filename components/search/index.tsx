import React, { useState, useEffect, createRef } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import {
  Root,
  PoweredBy,
  HitsWrapper,
  HitsResults,
  IndexContainer,
  NoResultsLabel,
} from './styles'
import Input from './input'
import { hitComponents } from './hitComps'

const DEFAULT_ALGOLIA_APP_ID = '80HKRA52OJ'
const DEFAULT_ALGOLIA_SEARCH_KEY = 'f13c10ad814c92b85f380deadc2db2dc'

const IndexResults = connectStateResults(
  ({ searchResults: res, children }: any) => {
    return res && res.nbHits > 0 ? children : null
  }
)

const IndexStats = connectStateResults(({ searchResults: res }) => {
  return (
    <>
      {res &&
        res.nbHits > 0 &&
        `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`}
    </>
  )
})

const useClickOutside = (ref: any, handler: any, events?: any) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = (event: any) =>
    ref.current && !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse, color }: any) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID || DEFAULT_ALGOLIA_APP_ID, //dummy search index if none exist
    (process.env.GATSBY_ALGOLIA_SEARCH_KEY ||
      DEFAULT_ALGOLIA_SEARCH_KEY) as string
  )
  useClickOutside(ref, () => setFocus(false))

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      {query.length > 0 && focus && (
        <HitsWrapper show={true}>
          <HitsResults>
            <AllIndicesResults />
            {indices.map(
              ({
                name,
                title,
                hitComp,
              }: {
                name: string
                title: string
                hitComp: any
              }) => (
                <Index key={name} indexName={name}>
                  <IndexResults>
                    <IndexContainer>
                      <header>
                        <h3>{title}</h3>
                        <IndexStats />
                      </header>
                      {/*
                    // @ts-ignore */}
                      <Hits
                        hitComponent={hitComponents[hitComp](() =>
                          setFocus(false)
                        )}
                      />
                    </IndexContainer>
                  </IndexResults>
                </Index>
              )
            )}
            <PoweredBy />
          </HitsResults>
        </HitsWrapper>
      )}
    </InstantSearch>
  )
}

const AllIndicesResults = connectStateResults(
  ({ allSearchResults, searchState: state, children }: any) => {
    const hasResults =
      allSearchResults &&
      Object.values(allSearchResults).some(
        (results: any) => results && results.nbHits > 0
      )
    return (
      <>
        {children}
        {!hasResults && (
          <NoResultsLabel>No results found for '{state.query}'</NoResultsLabel>
        )}
      </>
    )
  }
)
