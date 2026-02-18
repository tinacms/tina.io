// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import styled from 'styled-components';
import TinaWordmarkSvg from '../../public/svg/tina-wordmark.svg';

export const TinaWordmark = styled(({ ...styleProps }) => {
  return (
    <a href="/" {...styleProps}>
      <span className="logo-wrapper">
        <TinaWordmarkSvg />
      </span>
    </a>
  );
})`
  text-decoration: none;

  .logo-wrapper {
    display: block;
    margin: 0;
    font-size: 1rem;
  }

  svg {
    height: 35px;
    width: auto;
    fill: inherit;
  }
`;
