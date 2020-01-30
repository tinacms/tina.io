import React from 'react'
import styled, { css } from 'styled-components'

const Hero = styled(({ overlap, children, ...styleProps }) => {
  return <div {...styleProps}>{children}</div>
})`
  position: relative;
  text-align: center;
  padding: 8rem 1rem 6rem 1rem;

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

export default Hero
