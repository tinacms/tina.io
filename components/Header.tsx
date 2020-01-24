import React from "react";
import styled from "styled-components";
import Button from "./Button";
import TinaIconSvg from "../svg/tina-icon.svg";

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

const Nav = styled(({ ...styleProps }) => {
  return (
    <ul {...styleProps}>
      <li>
        <Button>DOCS</Button>
      </li>
      <li>
        <Button>BLOG</Button>
      </li>
      <li>
        <Button>COMMUNITY</Button>
      </li>
      <li>
        <Button>TEAMS</Button>
      </li>
    </ul>
  );
})`
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;

  li {
    margin: 0 0.3725rem;
  }
`;

const Github = styled.div``;

export default Header;
