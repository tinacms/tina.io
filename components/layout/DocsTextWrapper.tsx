import DocsRichText from 'components/styles/DocsRichText';
import React from 'react';
import styled from 'styled-components';

/* Styles rich text (markdown output)
 */

export const DocsTextWrapper = ({ children }) => {
  React.useEffect(() => {
    /* https://codepen.io/chriscoyier/pen/YzXeXjK */

    const players = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
    const fitVids = document.querySelectorAll(players.join(','));

    if (fitVids.length) {
      // Loop through videos
      for (let i = 0; i < fitVids.length; i++) {
        // Get Video Information
        const fitVid = fitVids[i];
        const width = fitVid.getAttribute('width');
        const height = fitVid.getAttribute('height');
        // @ts-ignore
        const aspectRatio = height / width;
        const parentDiv = fitVid.parentNode;

        // Wrap it in a DIV
        const div = document.createElement('div');
        div.className = 'fitVids-wrapper';
        div.style.paddingBottom = aspectRatio * 100 + '%';
        parentDiv.insertBefore(div, fitVid);
        fitVid.remove();
        div.appendChild(fitVid);

        // Clear height/width from fitVid
        fitVid.removeAttribute('height');
        fitVid.removeAttribute('width');
      }
    }
  }, []);

  return <TextWrapper>{children}</TextWrapper>;
};

const TextWrapper = styled.div`
  ${DocsRichText}
`;
