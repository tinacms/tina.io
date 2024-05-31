import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { addToMailchimp } from '../../utils';
import { Input, Button } from '../ui';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BettyWithLlama from '../../public/img/BettyWithLlama.png';
import { ImCross } from "react-icons/im";
import { IoIosWarning } from "react-icons/io";
import { TiTick } from "react-icons/ti";

interface EmailFormProps {
  isFooter: boolean;
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEntering, setIsEntering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setSuccessMessage('');
    setWarningMessage('');
    setErrorMessage('');
    try {
      const result = await addToMailchimp(email, firstName, lastName);
      if (result.result === 'success') {
        setSuccessMessage("You've been added to the llama list.");
      } else if (result.message === 'Bad Request') {
        setWarningMessage("You're already in our herd!");
      } else {
        setErrorMessage('There was an error. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setErrorMessage('There was an error. Please try again.');
    }
    setIsProcessing(false);
  };
  

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsEntering(true);
      setter(event.currentTarget.value);
    };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-1 bg-white max-w-7xl mx-auto">
      <div className="relative lg:h-full md:h-64 h-32">
        <Image 
          src={BettyWithLlama} 
          alt="Betty with a llama" 
          layout="fill"
          objectFit="cover"
          className="w-full h-full" 
        />
      </div>
      <div className="lg:pt-12 lg:pb-7">
      <StyledEmailForm
        id="newsletter-signup"
        onSubmit={handleSubmit}
        isFooter={props.isFooter}
        isEntering={isEntering}
        className="flex flex-col justify-center pt-8 pb-9 p-10 md:p-12 lg:p-20"
      >
      <h1 className="inline-block lg:text-left md:text-left sm:text-center m-0 md:text-4xl font-tuner lg:text-3xl text-2xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        Join the Herd! 🦙
      </h1>
        <p className="text-left w-full mt-2 mb-4">
          Become part of our coding community and stay updated with the latest tips and news. Learn more about the community and get llama-zing content delivered to your inbox!
        </p>
        {successMessage ? (
          <Message className="text-success mb-4">
            <TiTick />
            <span>{successMessage}</span>
          </Message>
        ) : warningMessage ? (
          <Message className="text-warning mb-4">
            <IoIosWarning />
            <span>{warningMessage}</span>
          </Message>
        ) : (
          <>
            {errorMessage && (
              <Message className="text-error mb-4">
                <ImCross />
                <span>{errorMessage}</span>
              </Message>
            )}
            <div className="input-group w-full md:mb-1">
              <Input
                placeholder="First name"
                name="firstName"
                type="text"
                onChange={handleInputChange(setFirstName)}
                onFocus={handleInputChange(setFirstName)}
                disabled={isProcessing}
                className="w-full lg:mb-0"
              />
              <Input
                placeholder="Last name"
                name="lastName"
                type="text"
                onChange={handleInputChange(setLastName)}
                onFocus={handleInputChange(setLastName)}
                disabled={isProcessing}
                className="w-full"
              />
            </div>
            <div className="input-group w-full mt-2 mb-1">
              <Input
                placeholder="Email"
                name="email"
                type="email"
                onChange={handleInputChange(setEmail)}
                onFocus={handleInputChange(setEmail)}
                disabled={isProcessing}
                className="w-full"
              />
            </div>
            <div className="w-full flex justify-end">
            <Button
              type="submit"
              color="orange"
              disabled={isProcessing}
              className="mt-4"
            >
              {isProcessing ? 'Processing...' : 'Subscribe'}
            </Button>
          </div>
          </>
        )}
      </StyledEmailForm>
      </div>
    </div>
  );
};

EmailForm.defaultProps = {
  isFooter: false,
};

interface StyledEmailFormProps {
  isFooter?: boolean;
  isEntering: boolean;
}

const StyledEmailForm = styled.form<StyledEmailFormProps>`
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    @media (min-width: 768px) {
      flex-direction: row;

      & > * {
        flex: 1;
      }
    }
  }

  .text-success {
    color: green;
    font-family: tuner-regular;
    font-size: 14px;
  }

  .text-warning {
    color: orange;
    font-family: tuner-regular;
    font-size: 14px;
  }

  .text-error {
    color: #D22F2F;
    font-family: tuner-regular;
    font-size: 14px;
  }

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
`;

const Message = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    margin-left: 0.5rem;
  }
`;

export default StyledEmailForm;
