import React from 'react'
import styled from 'styled-components'
import DocsRichText from '../styles/DocsRichText'

/* Styles rich text (markdown output)
 */

export const DocsTextWrapper = React.memo(styled.div`
  ${DocsRichText}
  min-height: 68vh;
`)
