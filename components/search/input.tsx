import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import * as debounce from 'lodash/debounce'
import { IconWrapper, Input, SearchContainer } from './styles'
import { SearchIcon } from './SearchIcon'

export default connectSearchBox(({ refine, expanded, ...rest }) => {
  const debouncedSearch = debounce((e: any) => refine(e.target.value), 250)
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
}) as any
