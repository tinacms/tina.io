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

  /* Tuner Regular */
  @font-face {
    font-family: 'tuner-regular';
    font-style: normal;
    font-weight: regular;
    font-display: fallback;
    src: url("/static/fonts/tunerweb-regular.eot") format("eot"),
        url("/static/fonts/tunerweb-regular.woff") format("woff");
  }

  /* Inter Regular */
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 400;
    font-display: swap;
    src: url("/static/fonts/Inter-Regular.woff2") format("woff2"),
        url("/static/fonts/Inter-Regular.woff") format("woff");
  }

  /* Inter Italic */
  @font-face {
    font-family: 'Inter';
    font-style:  italic;
    font-weight: 400;
    font-display: swap;
    src: url("/static/fonts/Inter-Italic.woff2") format("woff2"),
        url("/static/fonts/Inter-Italic.woff") format("woff");
  }

  /* Inter Bold */
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 700;
    font-display: swap;
    src: url("/static/fonts/Inter-Bold.woff2") format("woff2"),
        url("/static/fonts/Inter-Bold.woff") format("woff");
  }

  html {
    font-size: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
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
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'tuner-regular', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-weight: regular;
    font-style: normal;
    color: var(--color-primary, #EC4815);
  }

  h1, .h1 {
    font-size: 4rem;
    line-height: 1.3;
    letter-spacing: 0.1px;
  }

  h2, .h2 {
    font-size: 2rem;
    line-height: 1.3;
    letter-spacing: 0.1px;
  }
`;
