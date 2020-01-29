import React from "react";
import styled from "styled-components";
import Button from "./Button";

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

export default Nav;
