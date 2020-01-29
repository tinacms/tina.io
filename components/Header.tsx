import React from "react";
import styled from "styled-components";
import TinaIcon from "./TinaIcon";
import Nav from "./Nav";

const Header = styled(({ ...styleProps }) => {
  return (
    <header {...styleProps}>
      <TinaIcon />
      <Nav />
      <Github />
    </header>
  );
})`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  z-index: 100;
`;

const Github = styled.div``;

export default Header;
