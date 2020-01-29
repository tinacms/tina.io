import React from "react";
import styled from "styled-components";

const Hero = styled(({ children, ...styleProps }) => {
  return <div {...styleProps}>{children}</div>;
})`
  position: relative;
  text-align: center;
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 4rem;
  margin-bottom: 2rem;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/svg/header-bg.svg");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  @media (min-width: var(--breakpoint-medium, 800px)) {
    /* */
  }

  @media (min-width: var(--breakpoint-large, 1200px)) {
    /* */
  }
`;

export default Hero;
