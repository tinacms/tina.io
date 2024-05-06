import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { addToMailchimp } from '../../utils'
import { Input, Button } from '../ui'
import ModalConfirmation from '../ui/ModalConfirmation'
interface EmailFormProps {
  isFooter: boolean
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [isEntering, setIsEntering] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
};

const handleCloseModal = () => {
    setIsOpen(false);
};

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

          handleOpenModal();
          // alert(
          //   'Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit.'
          // )
          
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
      <Input
        placeholder="Your email..."
        name="email"
        type="text"
        onChange={handleEmailChange}
        onFocus={handleEmailChange}
      />

      {isOpen ? <ModalConfirmation isOpen={isOpen} onClose={handleCloseModal} 
      body={
      <div>
        <div>
          <h1 className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent`}>
            Welcome Aboard!
          </h1>
        </div>
        <div>
          <p className="text-base lg:text-md">Thank you for subscribing to our newsletter. We will keep you updated with the latest news and updates.</p>
        </div>
        <div>
        <Button color="blue" size='small'>
          Subscribe
        </Button>
        </div>
      </div>
      } /> : false}

      {props.isFooter ? (
        isEntering && (
          <Button type="submit" color="orange" size="small">
            Subscribe
          </Button>
        )
      ) : (
        <Button type="submit" color="orange" size="small">
          Subscribe
        </Button>
      )}
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
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 38rem;
  padding: 0;
  gap: 0.5rem;

  ${(props) =>
    props.isEntering &&
    css`
      grid-gap: 0.5rem;
      align-items: center;
    `}

  ${(props) =>
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
