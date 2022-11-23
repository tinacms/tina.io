import styled, { css } from 'styled-components'

interface WrapperProps {
  narrow?: boolean
  wide?: boolean
  align?: string
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 2rem;

  ${(props) =>
    props.align === 'left' &&
    css`
      text-align: left;
    `};

  ${(props) =>
    props.align === 'center' &&
    css`
      text-align: center;
    `};

  ${(props) =>
    props.align === 'right' &&
    css`
      text-align: right;
    `};

  ${(props) =>
    props.narrow &&
    css`
      max-width: 900px;

      @media (min-width: 600px) {
        width: 60%;
      }

      @media (min-width: 1000px) {
        width: 55%;
      }
    `};

  ${(props) =>
    props.wide &&
    css`
      max-width: 1500px;

      @media (min-width: 600px) {
        width: 100%;
      }

      @media (min-width: 1000px) {
        width: 92%;
      }
    `};
`
