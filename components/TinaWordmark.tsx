import React from "react";
import styled from "styled-components";
import TinaWordmarkSvg from "../svg/tina-wordmark.svg";

const TinaWordmark = styled(({ ...styleProps }) => {
  return (
    <a href="/" {...styleProps}>
      <h1>
        <TinaWordmarkSvg />
      </h1>
    </a>
  );
})`
  text-decoration: none;

  h1 {
    margin: 0;
  }

  svg {
    height: 40px;
    width: auto;
  }
`;

export default TinaWordmark;
