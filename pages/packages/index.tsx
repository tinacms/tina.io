import {
    DocsLayout,
    Wrapper,
    DocsTextWrapper,
    Footer,
  } from '../../components/layout'
  import React, { useState } from 'react'
  import { NextSeo } from 'next-seo'
  import DocTemplate, {
    DocsNavToggle,
    DocsMobileTinaIcon,
    DocsContent,
    DocsHeaderNav,
  } from '../docs/[...slug]'
  import { DocsNav, Overlay } from '../../components/ui'
import { GetStaticProps } from 'next'
import { getDocProps } from '../../utils/docs/getDocProps'
import { GithubError } from 'next-tinacms-github'
  
export const getStaticProps: GetStaticProps = async function(props) {
    try {
      return await getDocProps(props, 'index')
    } catch (e) {
      if (e instanceof GithubError) {
        return {
          props: {
            previewError: { ...e }, //workaround since we cant return error as JSON
          },
        }
      } else {
        throw e
      }
    }
  }
  
  export default DocTemplate
  