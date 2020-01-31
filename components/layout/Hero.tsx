import React from 'react'
import styled, { css } from 'styled-components'

export const Hero = styled(({ overlap, narrow, children, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <HeroTitle narrow={narrow}>{children}</HeroTitle>
    </div>
  )
})`
  position: relative;
  text-align: center;
  padding: 8rem 1rem 6rem 1rem;
  width: 100%;
  overflow-x: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    min-width: 800px;
    background-image: url('/svg/header-bg.svg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
    transform: translate3d(-50%, 0, 0);
  }

  @media (min-width: 1200px) {
    padding: 9rem 1rem;
  }

  ${props =>
    props.overlap &&
    css`
      padding-bottom: 12rem;
      margin-bottom: -6rem;

      @media (min-width: 1200px) {
        padding: 9rem 1rem 21rem 1rem;
        margin-bottom: -14rem;
      }
    `};

  ${props =>
    props.mini &&
    css`
      padding: 0;
      height: 10rem;
      margin-bottom: -6rem;

      @media (min-width: 1200px) {
        padding: 0;
      }
    `};
`

export const HeroTitle = styled(({ narrow, children, ...styleProps }) => {
  return <h2 {...styleProps}>{children}</h2>
})`
  font-family: var(--font-tuner);
  font-weight: regular;
  font-style: normal;
  font-size: 2.5rem;
  line-height: 1.3;
  letter-spacing: 0.1px;
  color: var(--color-primary);
  text-align: center;
  margin: 0 auto;
  max-width: 12em;

  @media (min-width: 800px) {
    font-size: 3rem;
  }

  @media (min-width: 1200px) {
    font-size: 4rem;
  }

  ${props =>
    props.narrow &&
    css`
      max-width: 9em;
    `};
`
