import React from "react";
import styled from "styled-components";

function Home() {
  return <Title>Welcome to TinaCMS!</Title>;
}

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default Home;
