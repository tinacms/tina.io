import React from 'react'
import axios from 'axios'
import { connectSearchBox } from 'react-instantsearch-dom'
// @ts-ignore
import * as debounce from 'lodash/debounce'
import { IconWrapper, Input, SearchContainer } from './styles'
import { SearchIcon } from './SearchIcon'
import crypto from 'crypto'

/* Copied from SearchBoxProvided in react-instantsearch-dom */
interface SearchBoxProps {
  refine: (...args: any[]) => any
  currentRefinement: string
  isSearchStalled: boolean
  expanded: boolean
}

export const logSearchQuery = async (query: string) => {
  let aid = window.sessionStorage.getItem('tina_anon_sessionid')
  if (!aid) {
    aid = crypto.randomBytes(16).toString('hex')
    window.sessionStorage.setItem('tina_anon_sessionid', aid)
  }
  return axios.post('/api/analytics/', {
    id: aid,
    query,
    timestamp: Date.now()
  })
}

export default connectSearchBox(
  ({ refine, expanded, ...rest }: SearchBoxProps) => {
    const debouncedSearch = debounce((e: any) => {
      refine(e.target.value)
      logSearchQuery(e.target.value).catch(console.error)
    }, 250)
    const onChange = (e: any) => {
      e.persist()
      debouncedSearch(e)
    }

    return (
      <SearchContainer expanded={expanded}>
        <Input
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={onChange}
          expanded={expanded}
          {...rest}
        />
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
      </SearchContainer>
    )
  }
) as any
