import React from 'react'
import styled, { css } from 'styled-components'
import HeroBg from '../../public/svg/hero-bg.svg'

export const Hero = ({ narrow = false, children }) => {
  return (
    <div
      className={`relative overflow-visible z-10 text-center px-8 pb-10 md:pb-16 lg:pb-28 pt-32 lg:pt-40`}
    >
      <HeroTitle narrow={narrow}>{children}</HeroTitle>
      <HeroBg className="absolute pointer-events-none -z-1 left-0 bottom-0 w-full h-auto" />
    </div>
  )
}

export const HeroTitle = styled(({ narrow, children, ...styleProps }) => {
  return <h2 {...styleProps}>{children}</h2>
})`
  font-family: var(--font-tuner);
  font-weight: bold;
  font-style: normal;
  font-size: 2.5rem;
  line-height: 1.3;
  letter-spacing: 0.1px;
  display: inline-block;
  color: transparent;
  background: linear-gradient(
    to right,
    var(--color-orange-light),
    var(--color-orange),
    var(--color-orange-dark)
  );
  -webkit-background-clip: text;
  background-clip: text;
  text-align: center;
  margin: 0 auto;
  max-width: 12em;

  @media (min-width: 800px) {
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    font-size: 3.5rem;
  }

  ${props =>
    props.narrow &&
    css`
      max-width: 9em;
    `};
`
