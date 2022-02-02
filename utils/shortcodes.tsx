import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

// SRC: https://github.com/tinacms/tinacms/blob/main/packages/%40tinacms/toolkit/src/packages/icons/Warning.tsx#L21
export const WarningIcon = ({ ...props }) => (
  <svg
    viewBox="0 0 32 32"
    fill="inherit"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M31.2176 28.768L16.9664 2.1568C16.8686 1.98698 16.7278 1.84593 16.5581 1.74786C16.3884 1.64978 16.1959 1.59814 16 1.59814C15.804 1.59814 15.6115 1.64978 15.4419 1.74786C15.2722 1.84593 15.1314 1.98698 15.0336 2.1568L0.783977 28.768C0.688907 28.9338 0.639554 29.1219 0.640959 29.3131C0.642365 29.5042 0.694478 29.6916 0.791977 29.856C0.991977 30.1936 1.35518 30.4 1.74878 30.4H30.2512C30.4442 30.4003 30.6339 30.3503 30.8017 30.2549C30.9695 30.1595 31.1095 30.022 31.208 29.856C31.3054 29.6916 31.3576 29.5044 31.3593 29.3133C31.361 29.1222 31.3121 28.9341 31.2176 28.768V28.768ZM17.6 27.2H14.4V24H17.6V27.2ZM17.6 21.6H14.4V11.2H17.6V21.6Z"
      fill="inherit"
    />
  </svg>
)

export const WarningCallout = styled(({ text, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <WarningIcon />
    </div>
  )
})`
  position: relative;
  display: block;
  font-size: 1.125rem;
  background-color: var(--color-warning);
  border: 1px solid var(--color-warning-dark);
  border-left-width: 6px;
  border-radius: 3px;
  padding: 1rem 1rem 1rem 3.5rem;

  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }

  a,
  a:visited {
    color: var(--color-tina-blue-dark) !important;
    font-weight: bold;
  }

  svg {
    position: absolute;
    top: 1.25rem;
    left: 1rem;
    width: 1.5rem;
    height: auto;
    fill: var(--color-orange);
  }
`
