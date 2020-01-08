import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Index = props => {
  return (
    <Layout pathname="/">
      <Title>Welcome to TinaCMS!</Title>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default Index;

Index.getInitialProps = async function() {
  const configData = await import(`../data/config.json`);
  return {
    ...configData
  };
};
