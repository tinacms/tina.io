import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import TinaIconSvg from '../../public/svg/tina-icon.svg'

export const TinaIcon = styled(({ ...styleProps }, props) => {
  return (
    <Link href="/">
      <a {...styleProps}>
        <h1>
          <TinaIconSvg />
        </h1>
      </a>
    </Link>
  )
})`
  text-decoration: none;
  fill: var(--color-primary);

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  svg {
    height: 40px;
    width: auto;
  }
`
