import React, { useState } from "react";
// import addToMailchimp from 'gatsby-plugin-mailchimp'
import styled from "styled-components";

interface EmailFormProps {
  inputColor: string;
  textColor: string;
  cta: string;
  btnColor: string;
  btnTextColor: string;
  isFooter: boolean;
}

const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToMailchimp(email)
      .then(data => {
        alert(data.msg);
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        if (error.message === "Timeout") {
          alert(
            "Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit."
          );
        }
        console.error(error);
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEntering(true);
    setEmail(event.currentTarget.value);
  };

  return (
    <StyledForm
      id="newsletter-signup"
      inputColor={props.inputColor}
      textColor={props.textColor}
      onSubmit={handleSubmit}
    >
      <Heading as="h3" size="h3">
        {props.cta}
      </Heading>

      {props.isFooter ? (
        isEntering && (
          <StyledButton btnColor={props.btnColor} type="submit">
            <Heading as="h5" size="label" color={`${props.btnTextColor}`}>
              Subscribe
            </Heading>
          </StyledButton>
        )
      ) : (
        <StyledButton btnColor={props.btnColor} type="submit">
          <Heading as="h5" size="label" color={`${props.btnTextColor}`}>
            Subscribe
          </Heading>
        </StyledButton>
      )}
      <input
        placeholder="Your email..."
        name="email"
        type="text"
        onChange={handleEmailChange}
        onFocus={handleEmailChange}
      />
    </StyledForm>
  );
};

EmailForm.defaultProps = {
  inputColor: "#B13617",
  textColor: colors.mintChocoChip,
  cta: "Stay in touch 👉",
  btnColor: colors.seafoam,
  btnTextColor: colors.hunterOrange,
  isFooter: false
};

export default EmailForm;

interface StyledFormProps {
  inputColor: string;
  textColor: string;
}

const StyledForm = styled("form")<StyledFormProps>`
  padding: ${space.xSmallDesktop}px 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  grid-template-areas:
    "cta btn"
    "input input";
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
    margin-top: ${space.xSmallDesktop}px;
    transition: all 85ms ease-out;
    font-family: "tuner-regular", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-size: 16px;
    ::placeholder {
      color: ${p => p.textColor};
      opacity: 1;
      font-family: "tuner-regular", -apple-system, BlinkMacSystemFont,
        "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
        "Droid Sans", "Helvetica Neue", sans-serif;
      font-size: 16px;
      transition: opacity 200ms ease;
    }
    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08),
        0 0 0 3px ${p => rgba(p.inputColor, 0.7)},
        0px 2px 3px rgba(0, 0, 0, 0.12);
    }
    &:focus,
    &:active {
      outline: none;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08),
        0 0 0 3px ${p => rgba(p.textColor, 0.7)},
        0px 2px 3px rgba(0, 0, 0, 0.12);
      ::placeholder {
        opacity: 0.5;
        transition: opacity 200ms ease;
      }
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-areas: "cta input btn";
    grid-column-gap: ${space.xSmallDesktop}px;
    input {
      margin: 0;
      width: revert;
    }
    h3 {
      font-size: 18px;
      margin-right: 0;
    }
  }
`;

interface StyledButtonProps {
  btnColor: string;
}

const StyledButton = styled("button")<StyledButtonProps>`
  justify-self: end;
  grid-area: btn;
  width: max-content;
  /* filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.25));
  transform: scale3d(1, 1, 1); */
  transform: translate3d(0px, 0px, 0px);
  transition: transform 180ms ease-in;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  background-color: ${p => p.btnColor};
  border-radius: 100px;
  border: 0;
  cursor: pointer;
  white-space: no-wrap;
  text-decoration: none;
  text-transform: uppercase;
  height: 40px;
  padding: 0;
  &:hover,
  &:focus {
    text-decoration: none;
    /* filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.35));
    transform: scale3d(1.03, 1.03, 1.13);
    transition: all 250ms ease-out; */
    transform: translate3d(-3px, 0px, 2px);
    transition: transform 150ms ease-out;
  }
  &:focus {
    box-shadow: 0 0 0 3px ${p => rgba(p.btnColor, 0.5)};
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }
  h5 {
    padding: 0 ${space.md}px;
  }
`;
