import React from "react";
import styled from "styled-components";
import TinaIconSvg from "../public/svg/tina-icon.svg";

const TinaIcon = styled(({ ...styleProps }) => {
  return (
    <a href="/" {...styleProps}>
      <h1>
        <TinaIconSvg />
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

export default TinaIcon;
