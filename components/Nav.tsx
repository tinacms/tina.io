import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";

const Nav = styled(({ ...styleProps }) => {
  return (
    <ul {...styleProps}>
      <li>
        <Link href={"/docs"} passHref>
          <Button as="a" white>
            DOCS
          </Button>
        </Link>
      </li>
      <li>
        <Link href={"/blog"} passHref>
          <Button as="a" white>
            BLOG
          </Button>
        </Link>
      </li>
      <li>
        <Link href={"/community"} passHref>
          <Button as="a" white>
            COMMUNITY
          </Button>
        </Link>
      </li>
      <li>
        <Link href={"/teams"} passHref>
          <Button as="a" white>
            TEAMS
          </Button>
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
