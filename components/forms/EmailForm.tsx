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
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleSuccessModal = () => {
    setIsSuccessOpen(true);
};

const handleCloseModal = () => {
    setIsSuccessOpen(false);
};

const handleOpenErrorModal = () => {
  setIsErrorOpen(true);
};

const handleCloseErrorModal = () => {
  setIsErrorOpen(false);
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault()
    addToMailchimp(email)
    .then((data) => {
      console.log(data)
      handleOpenErrorModal();
    })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        if (error.message === 'Timeout') {
          handleSuccessModal();          
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

      {isSuccessOpen && (
  <ModalConfirmation
    isOpen={isSuccessOpen}
    onClose={handleCloseModal}
    body={
      <div
        style={{
          padding: '1.5rem',
          margin: '0',
        }}
      >
        <h1
          className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent`}
          style={{ fontSize: '2.5rem', margin: '0' }}
        >
          Welcome Aboard!
        </h1>
        <p
          className="text-base lg:text-md"
          style={{ marginBottom: '1rem' }}
        >
          You've been added to the llama list.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: '0',
            padding: '0.5rem 0',
          }}
        >
          <Button color="blue" size="medium" onClick={handleCloseModal}>
            OK
          </Button>
        </div>
      </div>
    }
  />
)}

{isErrorOpen && (
  <ModalConfirmation
    isOpen={isErrorOpen}
    onClose={handleCloseErrorModal}
    body={
      <div
        style={{
          padding: '1.5rem',
        }}
      >
        <h1
          className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent`}
          style={{ fontSize: '2.5rem', margin: '0' }}
        >
          Hold your llamas!
        </h1>
        <p
          className="text-base lg:text-md"
          style={{ marginBottom: '1rem' }}
        >
          Couldn't sign you up. Please retry or contact us!
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button color="orange" size="medium" onClick={handleCloseErrorModal}>
            GO BACK
          </Button>
        </div>
      </div>
    }
  />
)}
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
