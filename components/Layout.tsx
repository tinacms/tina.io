import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyle";

const Layout = styled(({ children, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <Head>
        <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
      </Head>
      <GlobalStyle />
      {children}
    </div>
  );
})``;

export default Layout;
