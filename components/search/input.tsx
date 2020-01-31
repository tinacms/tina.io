import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import * as debounce from 'lodash/debounce'
import { IconWrapper, Input, SearchContainer } from './styles'
import { SearchIcon } from './SearchIcon'
import styled from 'styled-components'

export default connectSearchBox(({ refine, ...rest }) => {
  const debouncedSearch = debounce((e: any) => refine(e.target.value), 250)
  const onChange = (e: any) => {
    e.persist()
    debouncedSearch(e)
  }

  return (
    <SearchContainer>
      <Input type="text" placeholder="Search" aria-label="Search" onChange={onChange} {...rest} />
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
    </SearchContainer>
  )
}) as any
