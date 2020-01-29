import React from 'react'
import styled from 'styled-components'

const ArrowList = styled(({ children, ...styleProps }) => {
  return <ul {...styleProps}>{children}</ul>
})`
  margin: 0;
  list-style: none;
  padding-left: 0;
  color: var(--color-secondary-dark, #241748);
  li {
    position: relative;
    margin-bottom: 1rem;
    padding-left: 2.5em;
    font-size: 1.125rem;
    &:before {
      content: '↳';
      position: absolute;
      font-weight: bold;
      left: 2px;
      top: -1px;
      font-size: 1.75rem;
      line-height: 1;
      color: var(--color-primary, #ec4815);
    }
  }
`

export default ArrowList
