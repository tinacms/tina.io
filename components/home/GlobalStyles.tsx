/* styles.js */
import css from 'styled-jsx/css'

export const GlobalStyles = css.global`
  :root {
    --color-orange: #ec4815;
    --color-orange-light: #eb6337;
    --color-orange-dark: #dc4419;
    --color-yellow: #f2c94c;
    --color-green: #6fcf97;
    --color-black: #1c1b2e;
    --color-blue: rgb(36, 23, 72);
    --color-white: #ffffff;
    --color-gray: #f3f3f3;
    --color-light-gray: #fafafa;
    --color-seafoam: #e6faf8;
    --color-seafoam-dark: #b4f4e0;

    --color-emphasis: var(--color-orange);
    --color-card-background: var(--color-light-gray);

    --spacer-size: 4.5rem;
    --section-padding: calc(var(--spacer-size) * 2);
    --container-padding: 1.5rem;
  }

  html {
    min-width: 400px;
  }

  .section {
    padding: var(--section-padding) 0;
  }

  h1,
  h2,
  h3,
  h4 {
    p {
      font-weight: inherit;
    }
  }

  .headingHuge {
    font-family: var(--font-tuner);
    font-weight: bold;
    font-size: 2.75rem;
    line-height: 1.4;

    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }

    :global(em),
    :global(strong) {
      font-weight: inherit;
      color: var(--color-emphasis);
      font-style: inherit;
    }
  }

  .headingLarge {
    font-family: var(--font-tuner);
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 1rem;
    font-size: 2.25rem;
  }

  .headingMedium {
    font-size: 1.675rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .textHuge {
    display: block;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.375rem;

    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }
  }

  .textLarge {
    font-size: 1.125rem;
    opacity: 0.85;

    &:not(:last-child) {
      margin-bottom: 1.25rem;
    }
  }

  .spacer {
    display: block;
    width: 100%;
    height: var(--spacer-size);
  }

  .spacerBig {
    height: calc(var(--spacer-size) * 1.5);
  }

  .dottedBorder {
    border-top: none;
    border-right: none;
    border-left: none;
    border-image: initial;
    border-bottom: 4px dotted var(--color-orange);
    width: 6rem;
    max-width: 100%;
    display: block;
    height: 0px;
    margin: 1.5rem 0px;
  }

  .orange {
    background: linear-gradient(
      to top right,
      var(--color-orange),
      var(--color-orange-light)
    );
    color: var(--color-white);
  }

  .black {
    background: var(--color-black);
    color: var(--color-white);
  }

  .blue {
    background: var(--color-blue);
    color: var(--color-white);
    --color-emphasis: var(--color-orange-light);
  }

  .lightGray {
    background: var(--color-light-gray);
    color: var(--color-black);
    --color-card-background: var(--color-white);
  }

  .white {
    background: var(--color-white);
    color: var(--color-blue);
  }
`
