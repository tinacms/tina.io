import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { addToMailchimp } from '../../utils'
import { Input, Button } from '../ui'

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
    <StyledEmailForm
      id="newsletter-signup"
      onSubmit={handleSubmit}
      isFooter={props.isFooter}
      isEntering={isEntering}
    >
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Input
          placeholder="Your email..."
          name="email"
          type="text"
          onChange={handleEmailChange}
          onFocus={handleEmailChange}
        />
        {props.isFooter ? (
          isEntering && <Button type="submit" color="orange" size='small'>Subscribe</Button>
        ) : (
          <Button type='submit' color="orange" size='small' >
            Subscribe
          </Button>
        )}
      </div>
    </StyledEmailForm>
  )
}

EmailForm.defaultProps = {
  isFooter: false,
}

interface StyledEmailFormProps {
  isFooter?: boolean
  isEntering: boolean
}

const StyledEmailForm = styled.form<StyledEmailFormProps>`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  align-items: center;
  width: 100%;
  max-width: 38rem;
  padding: 0;

  
  @media (min-width: 800px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr auto;
  }

  ${props =>
    props.isEntering &&
    css`
    grid-gap: 0.5rem; 
    align-items: center;
    `}
    
  ${props =>
    props.isFooter &&
    css`
      width: auto;
      ${Input} {
        width: 18rem;
        background: rgba(0, 0, 0, 0.05);
        color: via-blue-900;
        ::placeholder {
          color: via-blue-900;
        }
        align-self: center;
      }
    `};
`
