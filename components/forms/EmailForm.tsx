import React, { useState } from 'react'
//TODO: set up mailchimp stuff
// import addToMailchimp from 'gatsby-plugin-mailchimp'
import styled from 'styled-components'

import Button from '../ui/Button'

interface EmailFormProps {
  isFooter: boolean
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [isEntering, setIsEntering] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // addToMailchimp(email)
    // 	.then(data => {
    // 		alert(data.msg)
    // 	})
    // 	.catch((error: Error) => {
    // 		// Errors in here are client side
    // 		// Mailchimp always returns a 200
    // 		if (error.message === 'Timeout') {
    // 			alert(
    // 				'Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit.'
    // 			)
    // 		}
    // 		console.error(error)
    // 	})
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEntering(true)
    setEmail(event.currentTarget.value)
  }

  return (
    <StyledForm id="newsletter-signup" onSubmit={handleSubmit}>
      {props.isFooter ? (
        isEntering && <Button type="submit">Subscribe</Button>
      ) : (
        <Button type="submit">Subscribe</Button>
      )}
      <input
        placeholder="Your email..."
        name="email"
        type="text"
        onChange={handleEmailChange}
        onFocus={handleEmailChange}
      />
    </StyledForm>
  )
}

EmailForm.defaultProps = {
  isFooter: false,
}

const StyledForm = styled('form')`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  grid-template-areas:
    'cta btn'
    'input input';
  h3 {
    grid-area: cta;
    align-self: center;
    margin-right: 12px;
  }
  input {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08),
      0px 2px 3px rgba(0, 0, 0, 0.12);
    grid-area: input;
    border: 0;
    border-radius: 5px;
    background: ${p => p.inputColor};
    color: ${p => p.textColor};
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    cursor: text;
    height: 40px;
    width: 100%;
    padding: 0 16px;
    transition: all 85ms ease-out;
    font-family: 'tuner-regular', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    font-size: 16px;
    ::placeholder {
      opacity: 1;
      font-family: 'tuner-regular', -apple-system, BlinkMacSystemFont,
        'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      transition: opacity 200ms ease;
    }
    &:hover,
    &:focus {
    }
    &:focus,
    &:active {
      outline: none;
      ::placeholder {
        opacity: 0.5;
        transition: opacity 200ms ease;
      }
    }
  }
  @media (min-width: 1200px) {
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-areas: 'cta input btn';
    grid-column-gap: 1rem;
    input {
      margin: 0;
      width: revert;
    }
    h3 {
      font-size: 18px;
      margin-right: 0;
    }
  }
`
