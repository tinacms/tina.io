import React from "react";
import { createGlobalStyle, css } from "styled-components";

const CssReset = css`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${CssReset}

  @font-face {
    font-family: 'tuner-regular';
    font-style: normal;
    font-weight: regular;
    font-display: fallback;
    src: url('tunerweb-regular.eot') format('embedded-opentype');
    src: url('tunerweb-regular.eot?#iefix') format('embedded-opentype'), url('tunerweb-regular.woff') format('woff');
  }

  html {
    font-size: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    line-height: 1.5;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;

    --color-primary: #EC4815;


    * {
      box-sizing: inherit;
      font-variant-numeric: inherit;
      font-family: inherit;
      line-height: inherit;
      font-size: 100%;
      font-weight: normal;
    }

    @media (min-width: 800px) {
      font-size: 112.5%;
    }

    @media (min-width: 1200px) {
      font-size: 125%;
    }

    @media (min-width: 1600px) {
      font-size: 137.5%;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'tuner-regular', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }
`;
