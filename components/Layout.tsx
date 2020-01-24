import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

const Layout = styled(({ children, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <GlobalStyle />
      {children}
    </div>
  );
})``;

export default Layout;
