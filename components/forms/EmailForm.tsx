import React, { useState } from 'react'
import styled from 'styled-components'
import addToMailchimp from '../../utils/addToMailchimp'

import Button from '../ui/Button'

interface EmailFormProps {
  isFooter: boolean
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [isEntering, setIsEntering] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addToMailchimp(email)
      .then((data: any) => {
        alert(data.msg)
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        if (error.message === 'Timeout') {
          alert(
            'Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit.'
          )
        }
        console.error(error)
      })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEntering(true)
    setEmail(event.currentTarget.value)
  }

  return (
    <StyledForm id="newsletter-signup" onSubmit={handleSubmit}>
      <input
        placeholder="Your email..."
        name="email"
        type="text"
        onChange={handleEmailChange}
        onFocus={handleEmailChange}
      />
      {props.isFooter ? (
        isEntering && <Button type="submit">Subscribe</Button>
      ) : (
        <Button type="submit" primary>
          Subscribe
        </Button>
      )}
    </StyledForm>
  )
}

EmailForm.defaultProps = {
  isFooter: false,
}

const StyledForm = styled('form')`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  grid-gap: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 38rem;
  padding: 0;
  input {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08),
      0px 2px 3px rgba(0, 0, 0, 0.12);
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
    &:focus {
      box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset,
        rgba(236, 72, 21, 0.7) 0px 0px 0px 3px, rgba(0, 0, 0, 0.12) 0px 2px 3px;
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

  @media (min-width: 800px) {
    grid-template-rows: auto;
    grid-template-columns: auto 8rem;
  }
`
