import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { addToMailchimp } from '../../utils'
import { Input, Button } from '../ui'
import ModalConfirmation from 'components/ui/ModalConfirmation'
import useToggle from '../../utils/useToggle';
import { useRouter } from 'next/router'


interface EmailFormProps {
  isFooter: boolean
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [isEntering, setIsEntering] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false);

  const [isSuccessOpen, toggleSuccess] = useToggle(false);
  const [isErrorOpen, toggleError] = useToggle(false);
  const [isDuplicateOpen, toggleDuplicate] = useToggle(false);


  const {push} = useRouter()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsProcessing(true);
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
  setIsProcessing(false);
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
        disabled= {isProcessing}
      />
      {isEntering && (
          <Button 
            type="submit" 
            color="orange" 
            disabled={isProcessing}
            >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" strokeDasharray="80" strokeDashoffset="60" />
                </svg>
                Processing...
              </>
            ) : 'Subscribe'}
          </Button>
        )}
      {isSuccessOpen && (
        <ModalConfirmation
          isOpen={isSuccessOpen}
          onClose={toggleSuccess}
          body={
            <div className="p-6 m-0">
              <h1 className="font-tuner inline-block text-4xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent m-0">
                Welcome Aboard!
              </h1>
              <p className="text-base lg:text-md mb-4">
                You've been added to the llama list.
              </p>
              <div className="flex justify-end items-center m-0 py-2">
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
            <div className="p-6">
              <h1 className="font-tuner inline-block text-4xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent m-0">
                Hold your llamas!
              </h1>
              <p className="text-base lg:text-md mb-4">
                Couldn't sign you up. Please retry or contact us!
              </p>
              <div className="flex justify-end">
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
            <div className="p-6">
              <h1 className="font-tuner inline-block text-4xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent m-0">
                Already Subscribed
              </h1>
              <p className="text-base lg:text-md mb-4">
                You're already in our herd! Missing our emails? Let's fix that!
              </p>
              <div className="flex justify-end">
                <Button color="white" size="medium" onClick={toggleDuplicate} className="mr-4">
                  GO BACK
                </Button>
                <Button color="blue" size="medium" onClick={ () => 
                  {
                    push('docs/support');
                    toggleDuplicate();  
                  }}>
                  CONTACT US
                </Button>
              </div>
            </div>
          }
        />
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
