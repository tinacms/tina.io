import { css } from 'styled-components';

/* Layout for rich text in Content, Columns, Features and legal-page blocks:
   spacing, wrapping, borders and media. Type comes from the RICH_TEXT class
   (styles/tailwind.css), which maps bare headings, paragraphs, links, code and
   table cells onto the type roles — so nothing here sets a font, size, weight,
   line height or text colour. Use the DocsTextWrapper component, which applies
   both. */

const DocsRichText = css`
  /* Long words and URLs wrap instead of overflowing */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  a {
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    padding-top: 1rem;
    margin: 1rem 0 1.5rem 0;
    &:first-child {
      margin-top: 0;
      padding-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  p,
  iframe,
  blockquote,
  image {
    margin: 1.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding-left: 2rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.5rem;
  }

  p img,
  iframe {
    display: block;
    margin: 1.5rem auto;
    border-radius: 5px;
    border: 1px solid rgb(237, 238, 238);
    overflow: hidden;
  }

  iframe {
    max-width: 100%;
  }

  iframe.wide {
    position: relative;
    min-width: 66vw;
    max-width: 1400px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  blockquote {
    display: block;
    background-color: var(--color-seafoam);
    border: 1px solid var(--color-seafoam-dark);
    border-left-width: 6px;
    border-radius: 3px;
    padding: 1em;
  }

  li blockquote {
    border: none;
    border-radius: 0;
    background: none;
    padding: 0 0 0 1rem;
    border-left: 1px solid var(--color-seafoam-dark);
    margin: -1rem 0 1.5rem 0 !important;
  }

  hr {
    display: block;
    border: none;
    background: url('/svg/hr.svg');
    background-size: auto 100%;
    background-repeat: no-repeat;
    height: 7px;
    width: 100%;
    margin: 2rem 0px;
  }

  pre {
    background-color: var(--neutral-background);
    border: 1px solid var(--neutral-border-subtle);
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    overflow-wrap: normal;
    tab-size: 4;
    hyphens: none;
    padding: 1em;
    margin: 0.5em 0px;
    overflow: auto;
    border-radius: 0.3rem;
    /* Wrap long lines instead of breaking the layout */
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    code {
      white-space: pre-wrap !important;
      word-wrap: break-word !important;
    }
  }

  table {
    width: 100%;
  }

  tr:nth-child(even) {
    background-color: var(--neutral-background);
  }

  th,
  td {
    padding: 0.4rem 0.5rem;
    border-bottom: 1px solid var(--neutral-border-subtle);
  }

  th {
    border-bottom-width: 3px;
  }

  .callout {
    margin: 2rem 0;
    padding: 1.5rem 2rem;
    background-image: url(/img/clouds.jpg);
    background-position: center top;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    grid-gap: 2rem;
    align-content: center;
    align-items: center;
    border-radius: 0.3rem;
    border: 1px solid var(--color-seafoam);
    overflow: hidden;

    @media (min-width: 1000px) {
      grid-gap: 2.5rem;
      grid-template-columns: 1fr 2fr;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    h3 {
      margin-bottom: 1.25rem;
    }

    p {
      margin: 0 0 1.375rem 0;
    }

    img {
      position: relative;
      max-width: 14rem;
      margin: -1rem 0;

      @media (min-width: 1000px) {
        margin: -1rem 0 -3rem 0;
      }
    }
  }

  /* A button, not text: buttons are out of scope for the type roles (#4964). */
  .calloutButton {
    flex: 0 0 auto;
    position: relative;
    text-decoration: none;
    font-size: 1.125rem;
    line-height: 1;
    font-weight: bold;
    padding: 0.75rem 1.625rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    outline: none;
    background: var(--color-orange);
    transition: background 150ms ease-out;
    color: white;

    :hover,
    ::focus,
    :active {
      background: var(--color-orange-light);
    }

    svg {
      display: inline-block;
      width: auto;
      height: 1.125em;
      margin-left: 0.75rem;
    }
  }
`;

export default DocsRichText;
