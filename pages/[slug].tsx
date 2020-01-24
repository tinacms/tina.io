import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../components/Layout";

const Page = props => {
  const router = useRouter();

  const slug = router.query.slug;

  return <Layout pathname={"/" + slug}></Layout>;
};

export default Page;
