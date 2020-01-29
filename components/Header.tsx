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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Github = styled.div``;

export default Header;
