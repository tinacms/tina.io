import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { addToMailchimp } from '../../utils'
import { Input, Button } from '../ui'
import ModalConfirmation from 'components/ui/ModalConfirmation'
import useToggle from '../../utils/useToggle';


interface EmailFormProps {
  isFooter: boolean
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [isEntering, setIsEntering] = useState(false)

  const [isSuccessOpen, toggleSuccess] = useToggle(false);
  const [isErrorOpen, toggleError] = useToggle(false);
  const [isDuplicateOpen, toggleDuplicate] = useToggle(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const result = await addToMailchimp(email);
    if (result.result === 'success') {
      toggleSuccess();
    } else {
      if(result.message === 'Bad Request'){
        toggleDuplicate();
      }
      else
      {
        toggleError();
      }
    }
  } catch (error) {
    console.error('Error submitting email:', error);
    toggleError();
  }
};


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
    onClose={toggleSuccess}
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
          <Button color="blue" size="medium" onClick={toggleSuccess}>
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
    onClose={toggleError}
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
          <Button color="orange" size="medium" onClick={toggleError}>
            GO BACK
          </Button>
        </div>
      </div>
    }
  />
)}

{isDuplicateOpen && (
  <ModalConfirmation
    isOpen={isDuplicateOpen}
    onClose={toggleDuplicate}
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
          Already Subscribed
        </h1>
        <p
          className="text-base lg:text-md"
          style={{ marginBottom: '1rem' }}
        >
          You're already in our herd! Missing our emails? Let's fix that!
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button color="white" size="medium" onClick={toggleDuplicate} style={{marginRight: '1rem'}}>
            GO BACK
          </Button>
          <Button color="blue" size="medium" onClick={toggleDuplicate}>
            CONTACT US
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
