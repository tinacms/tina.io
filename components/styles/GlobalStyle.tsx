import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

import Code from './Code'

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
`

export const GlobalStyle = createGlobalStyle`
  ${CssReset}

  /* Tuner Regular */
  @font-face {
    font-family: 'tuner-regular';
    font-style: normal;
    font-weight: regular;
    font-display: fallback;
    src: url("/fonts/tunerweb-regular.eot") format("eot"),
        url("/fonts/tunerweb-regular.woff") format("woff");
  }

  /* Inter Regular */
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/Inter-Regular.woff2") format("woff2"),
        url("/fonts/Inter-Regular.woff") format("woff");
  }

  /* Inter Italic */
  @font-face {
    font-family: 'Inter';
    font-style:  italic;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/Inter-Italic.woff2") format("woff2"),
        url("/fonts/Inter-Italic.woff") format("woff");
  }

  /* Inter Bold */
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: 700;
    font-display: swap;
    src: url("/fonts/Inter-Bold.woff2") format("woff2"),
        url("/fonts/Inter-Bold.woff") format("woff");
  }

  html {
    font-size: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    line-height: 1.5;
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    -webkit-font-smooth: 'antialiased';
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    /* Color */
    --color-primary: #EC4815;
    --color-primary-dark: #CE411D;
    --color-secondary: #302454;
    --color-secondary-dark: #241748;
    --color-seafoam: #E6FAF8;
    --color-seafoam-dark: #B4F4E0;
    --color-light: #f4f4f4;
    --color-light-dark: #E9E9EC;
    --color-grey: #595959;
    --color-grey-dark: #404040;

    /* Layout */
    --breakpoint-small: 400px;
    --breakpoint-medium: 800px;
    --breakpoint-large: 1200px;

    /* Typography */
    --font-tuner: 'tuner-regular', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;

    * {
      box-sizing: inherit;
      font-variant-numeric: inherit;
      font-family: inherit;
      line-height: inherit;
      font-size: 100%;
      font-weight: normal;
      scrollbar-width: thin;
      scrollbar-color: #E1DDEC transparent;
      &::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
        border-left: 1px solid var(--color-light-dark);
      }
      &::-webkit-scrollbar-thumb {
        background-color: #E1DDEC;
        border-radius: 0;
        border: none;
      }
    }
  }
`
