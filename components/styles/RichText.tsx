import { css } from 'styled-components'

const RichText = css`
  /* Spacing */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2rem 0 1.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  p {
    margin: 1.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  /* Styling */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-tuner);
    font-weight: regular;
    font-style: normal;
    em {
      font-style: normal;
      color: var(--color-secondary-dark);
    }
  }

  h1,
  .h1 {
    font-size: 2.5rem;
    line-height: 1.3;
    letter-spacing: 0.1px;
    color: var(--color-primary);

    @media (min-width: 800px) {
      font-size: 3rem;
    }

    @media (min-width: 1200px) {
      font-size: 4rem;
    }
  }

  h2,
  .h2 {
    font-size: 2rem;
    line-height: 1.3;
    letter-spacing: 0.1px;
    color: var(--color-primary);
  }

  h3,
  .h3 {
    font-size: 1.5rem;
    line-height: 1.3;
    letter-spacing: 0.1px;
    color: var(--color-secondary-dark);
  }

  p {
    font-size: 1.125rem;
    color: var(--color-secondary-dark);

    img {
      display: block;
      margin: 1.5rem auto;
      border-radius: 5px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(237, 238, 238);
      border-image: initial;
      overflow: hidden;
    }
  }

  a {
    color: inherit;
    opacity: 0.8;
    text-decoration: underline rgba(0, 0, 0, 0.3);
    transition: all 185ms ease-out;

    &:hover,
    &:focus {
      opacity: 1;
      color: var(--color-primary);
      text-decoration-color: var(--color-primary);
    }
  }

  hr {
    border: none;
    border-bottom: 3px dotted var(--color-primary);
    width: 8rem;
    max-width: 100%;
    display: block;
    height: 0px;
    margin: 2rem 0;
  }

  strong {
    font-weight: bold;
  }

  :not(pre) > code {
    padding: 0.1em 0.2em;
    border-radius: 0.3em;
    background-color: var(--color-light);
    border: 1px solid var(--color-light-dark);
    border-radius: 0.3rem;
    color: var(--color-primary);
    font-size: 18px;
    line-height: 28px;
  }
`

export default RichText
