import React from "react";
import styled from "styled-components";

const Hero = styled(({ children, ...styleProps }) => {
  return <div {...styleProps}>{children}</div>;
})``;

export default Hero;
