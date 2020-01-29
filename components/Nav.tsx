import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";

const Nav = styled(({ ...styleProps }) => {
  return (
    <ul {...styleProps}>
      <li>
        <Link href={"/docs"}>
          <Button>DOCS</Button>
        </Link>
      </li>
      <li>
        <Link href={"/blog"}>
          <Button>BLOG</Button>
        </Link>
      </li>
      <li>
        <Link href={"/community"}>
          <Button>COMMUNITY</Button>
        </Link>
      </li>
      <li>
        <Link href={"/teams"}>
          <Button>TEAMS</Button>
        </Link>
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
