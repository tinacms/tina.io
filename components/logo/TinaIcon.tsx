import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import TinaIconSvg from '../../public/svg/tina-icon.svg'

interface TinaIconProps {
  docs?: boolean
  styleProps?: any
}

export const TinaIcon = styled(({ docs, ...styleProps }: TinaIconProps) => {
  const link = docs ? '/docs' : '/'

  return (
    <Link href={link}>
      <a {...styleProps}>
        <h1>
          <TinaIconSvg />
          {docs && <span>Docs</span>}
        </h1>
      </a>
    </Link>
  )
})`
  text-decoration: none;
  fill: var(--color-primary);

  h1 {
    margin: 0;
    font-size: 1.75rem;
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 1rem;
    font-family: var(--font-tuner);
    color: var(--color-primary);
  }

  svg {
    height: 40px;
    width: auto;
  }
`
