import React from 'react'
import styled from 'styled-components'
import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
} from 'components/layout'
import { NextSeo } from 'next-seo'
import { LastModified } from './terms-of-service'
import Link from 'next/link'

export default () => (
  <Layout>
    <NextSeo title={'Vercel Integration'} description={'Vercel Integration'} />
    <Hero>Vercel Integration</Hero>
    <RichTextWrapper>
      <Section>
        <Wrapper>
          <LastModified>Last Modified: August 9, 2021</LastModified>
          Our integration lets you easily deploy your sites to Vercel through the Tina dashboard.
          <br />
          We will act on your behalf to create a project, configure environment variables, and trigger a deployment.
          <br />
          Once the project is created, feel free to revoke our integration's access, as it's only used for getting the project set up.
        </Wrapper>
      </Section>
    </RichTextWrapper>
  </Layout>
)