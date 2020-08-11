import React from 'react'
import styled from 'styled-components'
import DocsRichText from '../styles/DocsRichText'
import { useRouter } from 'next/router'
import { FallbackPlaceholder } from 'components/fallback-placeholder'

/* Styles rich text (markdown output)
 */

export const DocsTextWrapper = ({ children }) => {
  const router = useRouter()
  return router.isFallback ? (
    <FallbackPlaceholder
      wrapperStyles={{ paddingLeft: 0, paddingRight: 0 }}
      placeholderStyles={{ marginTop: '1rem' }}
    />
  ) : (
    <TextWrapper>{children}</TextWrapper>
  )
}

const TextWrapper = styled.div`
  ${DocsRichText}
  min-height: 68vh;
`
