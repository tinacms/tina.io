import { css } from 'styled-components'

/*
    Code styles adapted from: 

    Name:       Base16 Atelier Sulphurpool Light
    Author:     Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/sulphurpool)

    Prism template by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/prism/)
    Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)

  */

const Code = css`
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'Inconsolata', Consolas, Menlo, Monaco, 'Andale Mono WT',
      'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter',
      'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',
      'Nimbus Mono L', 'Courier New', Courier, monospace;
    font-size: 16px;
    line-height: 24px;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    border-radius: 0.3rem;
    color: var(--color-secondary);
    border-radius: 3px;
  }

  /* Code blocks */
  pre[class*='language-'] {
    background-color: var(--color-light);
    border: 1px solid var(--color-light-dark);
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  /* Inline code */
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

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #898ea4;
  }

  .token.punctuation {
    color: #5e6687;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.operator,
  .token.boolean,
  .token.number {
    color: #c76b29;
  }

  .token.property {
    color: #c08b30;
  }

  .token.tag {
    color: #3d8fd1;
  }

  .token.string {
    color: #269d9b;
  }

  .token.selector {
    color: #6679cc;
  }

  .token.attr-name {
    color: #c76b29;
  }

  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #c2a7fb;
  }

  .token.attr-value,
  .token.keyword,
  .token.control,
  .token.directive,
  .token.unit {
    color: #ac9739;
  }

  .token.statement,
  .token.regex,
  .token.atrule {
    color: #22a2c9;
  }

  .token.placeholder,
  .token.variable {
    color: #3d8fd1;
  }

  .token.deleted {
    text-decoration: line-through;
  }

  .token.inserted {
    border-bottom: 1px dotted #202746;
    text-decoration: none;
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.important {
    color: #c94922;
  }

  .token.entity {
    cursor: help;
  }

  pre > code.highlight {
    outline: 0.4em solid #c94922;
    outline-offset: 0.4em;
  }

  /* overrides color-values for the Line Numbers plugin
   * http://prismjs.com/plugins/line-numbers/
   */
  .line-numbers .line-numbers-rows {
    border-right-color: #dfe2f1;
  }

  .line-numbers-rows > span:before {
    color: #979db4;
  }

  /* overrides color-values for the Line Highlight plugin
   * http://prismjs.com/plugins/line-highlight/
   */
  .line-highlight {
    background: rgba(107, 115, 148, 0.2);
    background: -webkit-linear-gradient(
      left,
      rgba(107, 115, 148, 0.2) 70%,
      rgba(107, 115, 148, 0)
    );
    background: linear-gradient(
      to right,
      rgba(107, 115, 148, 0.2) 70%,
      rgba(107, 115, 148, 0)
    );
  }

  .language-diff .token.unchanged {
    color: var(--color-grey);
  }
  .language-diff .token.inserted {
    color: #269d9b;
    border-bottom: none;
  }
  .language-diff .token.deleted {
    color: var(--color-primary);
  }
`

export default Code
