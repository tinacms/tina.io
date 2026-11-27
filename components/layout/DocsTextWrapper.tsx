import DocsRichText from 'components/styles/DocsRichText';
import React from 'react';
import styled from 'styled-components';
import { RICH_TEXT } from '../styles/typography';

/* Styles rich text (markdown output): RICH_TEXT maps the markdown elements
   onto the type roles, DocsRichText adds the spacing. */

export const DocsTextWrapper = ({ children }) => {
  React.useEffect(() => {
    /* https://codepen.io/chriscoyier/pen/YzXeXjK */

    var players = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
    var fitVids = document.querySelectorAll(players.join(','));

    if (fitVids.length) {
      // Loop through videos
      for (var i = 0; i < fitVids.length; i++) {
        // Get Video Information
        var fitVid = fitVids[i];
        var width = fitVid.getAttribute('width');
        var height = fitVid.getAttribute('height');
        // @ts-expect-error
        var aspectRatio = height / width;
        var parentDiv = fitVid.parentNode;

        // Wrap it in a DIV
        var div = document.createElement('div');
        div.className = 'fitVids-wrapper';
        div.style.paddingBottom = `${aspectRatio * 100}%`;
        parentDiv.insertBefore(div, fitVid);
        fitVid.remove();
        div.appendChild(fitVid);

        // Clear height/width from fitVid
        fitVid.removeAttribute('height');
        fitVid.removeAttribute('width');
      }
    }
  }, []);

  return <TextWrapper className={RICH_TEXT}>{children}</TextWrapper>;
};

const TextWrapper = styled.div`
  ${DocsRichText}
`;
