import React from 'react';
import styled from 'styled-components';
import RichText from '../styles/RichText';
import { RICH_TEXT } from '../styles/typography';

/* Styles rich text (markdown output): RICH_TEXT maps the markdown elements
   onto the type roles, RichText adds the spacing. */

export const RichTextWrapper = React.memo(styled.div.attrs({
  className: RICH_TEXT,
})`
  ${RichText}
`);
