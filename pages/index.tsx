import React from "react";
import styled from "styled-components";

import Layout from "../components/Layout";
import Header from "../components/Header";
import Hero from "../components/Hero";

const Index = props => {
  return (
    <Layout pathname="/">
      <Header />
      <Hero>
        <h1>Build real-time editing into your site.</h1>
      </Hero>
    </Layout>
  );
};

export default Index;
