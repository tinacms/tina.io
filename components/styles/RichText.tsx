import { css } from 'styled-components';

/* Layout for rich text (markdown output): spacing, borders and media.
   Type comes from the RICH_TEXT class (styles/tailwind.css), which maps bare
   headings, paragraphs, links, code and table cells onto the type roles —
   so nothing here sets a font, size, weight, line height or text colour.
   Use the RichTextWrapper component, which applies both. */

const RichText = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    margin: 2rem 0 1.5rem 0;
    &:first-child {
      margin-top: 0;
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

  blockquote {
    display: block;
    background-color: var(--color-seafoam);
    border: 1px solid var(--color-seafoam-dark);
    border-left-width: 6px;
    border-radius: 3px;
    padding: 1em;
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
    border-radius: 5px;
    border: 1px solid rgb(237, 238, 238);
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
`;

export default RichText;
