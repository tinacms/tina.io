import React from "react";
import styled from "styled-components";

const Layout = styled(({ children, ...styleProps }) => {
  return <div {...styleProps}>{children}</div>;
})`
  background: pink;
`;

export default Layout;
